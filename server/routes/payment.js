import express from "express";
import { paymentInstance } from "../constant.js";
import db from "../db.js";
import Razorpay from "razorpay";
import { isGuest } from "../middleware.js";
import crypto from "crypto";

const router = express.Router();

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// router.post("/", isGuest, async (req, res) => {
router.post("/", async (req, res) => {
  try {
    const { amount, currency, receipt } = req.body;

    const orderRequest = await paymentInstance.orders.create({
      amount: amount * 100, // Amount in paise
      currency: currency || "INR",
      receipt: receipt || `Receipt for user ${req.user?.id || 1}`,
    });

    db.query(
      "INSERT INTO payment (order_id, cost, user_id, status) VALUES (?, ?, ?, ?)",
      [orderRequest.id, amount, req.user?.id || 1, "unverified"],
      (err, result) => {
        if (err) {
          console.error("Error storing payment order:", err);
          return res.status(500).json({
            message: "Failed to store payment order",
            error: err.message,
          });
        }

        res.status(201).json({
          message: "Payment order created successfully",
          orderId: orderRequest.id,
        });
      }
    );
  } catch (error) {
    console.error("Error creating payment order:", error);
    res.status(500).json({
      message: "Failed to create payment order",
      error: error.message,
    });
  }
});

// Get payment details
router.get("/:paymentId", (req, res) => {
  // Logic to get payment details
  res.status(200).json({ message: "Payment details retrieved successfully" });
});

// Update payment status
router.put("/:paymentId", (req, res) => {
  // Logic to update payment status
  res.status(200).json({ message: "Payment status updated successfully" });
});

// List all payments
router.get("/", (req, res) => {
  // Logic to list all payments
  res.status(200).json({ message: "Payments retrieved successfully" });
});

// Create booking and payment order
router.post("/bookings", async (req, res) => {
  const { guest_id, room_id, from_date, end_date, amount, userId } = req.body;
  const connection = await db.promise().getConnection();

  try {
    await connection.beginTransaction();

    // Check for overlapping bookings
    const [existingBookings] = await connection.query(
      'SELECT * FROM booking WHERE room_id = ? AND status = "confirmed" AND ((from_date <= ? AND end_date >= ?) OR (from_date <= ? AND end_date >= ?))',
      [room_id, from_date, from_date, end_date, end_date]
    );

    if (existingBookings.length > 0) {
      throw new Error("Room is not available for the selected dates");
    }

    // Lock the room row
    const [rooms] = await connection.query(
      "SELECT * FROM room WHERE id = ? AND (lock_until IS NULL OR lock_until < NOW()) FOR UPDATE",
      [room_id]
    );

    if (!rooms.length) {
      throw new Error("Room is not available");
    }

    const room = rooms[0];

    // Set lock_until to 5 minutes from now
    const lockUntil = new Date(Date.now() + 5 * 60 * 1000);
    await connection.query("UPDATE room SET lock_until = ? WHERE id = ?", [
      lockUntil,
      room_id,
    ]);

    // Create booking
    const [bookingResult] = await connection.query(
      "INSERT INTO booking (guest_id, room_id, from_date, end_date, status) VALUES (?, ?, ?, ?, ?)",
      [guest_id, room_id, from_date, end_date, "pending"]
    );

    // Create Razorpay order
    const orderRequest = await paymentInstance.orders.create({
      amount: amount * 100, // Amount in paise
      currency: "INR",
      receipt: `Receipt for booking ${bookingResult.insertId}`,
    });

    // Store payment order in the database
    await connection.query(
      "INSERT INTO payment (id, cost, user_id, status) VALUES (?, ?, ?, ?)",
      [orderRequest.id, amount, userId, "unverified"]
    );

    await connection.commit();
    res.status(201).json({
      message: "Booking and payment order created successfully",
      orderId: orderRequest.id,
    });
  } catch (error) {
    await connection.rollback();
    console.error("Error during transaction:", error);
    res
      .status(500)
      .json({ message: "Transaction error", error: error.message });
  } finally {
    connection.release();
  }
});

// Verify payment signature
router.post("/verify", async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;
  const connection = await db.promise().getConnection();

  try {
    await connection.beginTransaction();

    // Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      throw new Error("Invalid payment signature");
    }

    // Update payment status
    const [result] = await connection.query(
      "UPDATE payment SET status = 'verified', payment_id = ? WHERE order_id = ?",
      [razorpay_payment_id, razorpay_order_id]
    );

    if (result.affectedRows === 0) {
      throw new Error("Payment record not found");
    }

    // Get booking details
    const [payments] = await connection.query(
      "SELECT booking_id FROM payment WHERE order_id = ?",
      [razorpay_order_id]
    );

    if (payments.length === 0) {
      throw new Error("Payment record not found");
    }

    // Update booking status
    await connection.query(
      "UPDATE booking SET status = 'confirmed' WHERE id = ?",
      [payments[0].booking_id]
    );

    // Update room status
    await connection.query(
      "UPDATE room r JOIN booking b ON r.id = b.room_id SET r.status = 'Occupied', r.lock_until = NULL WHERE b.id = ?",
      [payments[0].booking_id]
    );

    await connection.commit();
    res.json({ status: "success" });
  } catch (error) {
    await connection.rollback();
    console.error("Payment verification error:", error);
    res.status(400).json({ status: "error", message: error.message });
  } finally {
    connection.release();
  }
});

export default router;
