import express from "express";
import { paymentInstance } from "../constant.js";
import db from "../db.js";
import Razorpay from "razorpay";

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

router.post("/bookings", async (req, res) => {
  const { guest_id, room_id, from_date, end_date, amount, userId } = req.body;

  db.getConnection((err, connection) => {
    if (err) {
      console.error("Error getting database connection:", err);
      return res.status(500).json({ message: "Database connection error" });
    }

    connection.beginTransaction(async (err) => {
      if (err) {
        console.error("Error starting transaction:", err);
        return res.status(500).json({ message: "Transaction error" });
      }

      try {
        // Check for overlapping bookings
        const [existingBookings] = await connection.query(
          'SELECT * FROM booking WHERE room_id = ? AND status = "confirmed" AND ((from_date <= ? AND end_date >= ?) OR (from_date <= ? AND end_date >= ?))',
          [room_id, from_date, from_date, end_date, end_date]
        );

        if (existingBookings.length > 0) {
          throw new Error("Room is not available for the selected dates");
        }

        // Lock the room row
        const [room] = await connection.query(
          "SELECT * FROM room WHERE id = ? AND (lock_until IS NULL OR lock_until < NOW()) FOR UPDATE",
          [room_id]
        );
        if (!room) {
          throw new Error("Room is not available");
        }

        // Set lock_until to 5 minutes from now
        const lockUntil = new Date(Date.now() + 5 * 60 * 1000);
        await connection.query("UPDATE room SET lock_until = ? WHERE id = ?", [
          lockUntil,
          room_id,
        ]);

        // Create booking
        const bookingQuery =
          "INSERT INTO booking (guest_id, room_id, from_date, end_date, status) VALUES (?, ?, ?, ?, ?)";
        const bookingValues = [
          guest_id,
          room_id,
          from_date,
          end_date,
          "pending",
        ];
        const [bookingResult] = await connection.query(
          bookingQuery,
          bookingValues
        );

        // Create Razorpay order
        const orderRequest = await razorpay.orders.create({
          amount: amount * 100, // Amount in paise
          currency: "INR",
          receipt: `Receipt for booking ${bookingResult.insertId}`,
        });

        // Store payment order in the database
        const paymentQuery =
          "INSERT INTO payment (id, cost, user_id, status) VALUES (?, ?, ?, ?)";
        const paymentValues = [orderRequest.id, amount, userId, "unverified"];
        await connection.query(paymentQuery, paymentValues);

        // Commit transaction
        connection.commit((err) => {
          if (err) {
            console.error("Error committing transaction:", err);
            return connection.rollback(() => {
              res.status(500).json({ message: "Transaction commit error" });
            });
          }
          res.status(201).json({
            message: "Booking and payment order created successfully",
            orderId: orderRequest.id,
          });
        });
      } catch (error) {
        console.error("Error during transaction:", error);
        connection.rollback(() => {
          res
            .status(500)
            .json({ message: "Transaction error", error: error.message });
        });
      } finally {
        connection.release();
      }
    });
  });
});

export default router;
