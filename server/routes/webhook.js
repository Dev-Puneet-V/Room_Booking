// server/routes/webhook.js
import express from "express";
import crypto from "crypto";
import db from "../db.js"; // Assuming you have a db.js for database connection
import dotenv from "dotenv";
dotenv.config();
const router = express.Router();

const verifyWebhookSignature = (req) => {
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
  const signature = req.headers["x-razorpay-signature"];
  const shasum = crypto.createHmac("sha256", webhookSecret);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest("hex");
  return digest === signature;
};

router.post("/razorpay", async (req, res) => {
  let connection;
  try {
    // Verify webhook signature
    if (!verifyWebhookSignature(req)) {
      return res.status(400).json({ message: "Invalid webhook signature" });
    }

    const { payload, event } = req.body;
    const { payment } = payload;
    const orderId = payment.entity.order_id;

    connection = await db.promise().getConnection(); // Get connection from pool
    await connection.beginTransaction(); // Start transaction

    // Lock the payment row for update
    const [payments] = await connection.query(
      "SELECT * FROM payment WHERE order_id = ? FOR UPDATE",
      [orderId]
    );

    if (!payments.length) {
      throw new Error("Payment record not found");
    }

    const paymentRecord = payments[0];

    // Lock the corresponding booking
    const [bookings] = await connection.query(
      "SELECT * FROM booking WHERE id = ? FOR UPDATE",
      [paymentRecord.booking_id]
    );

    if (!bookings.length) {
      throw new Error("Booking record not found");
    }

    const booking = bookings[0];

    // Lock the corresponding room
    const [rooms] = await connection.query(
      "SELECT * FROM room WHERE id = ? FOR UPDATE",
      [booking.room_id]
    );

    if (!rooms.length) {
      throw new Error("Room record not found");
    }

    const room = rooms[0];
    console.log(event);
    if (event === "payment.captured" || event === "order.paid") {
      // Update payment status
      await connection.query(
        "UPDATE payment SET status = 'verified', payment_id = ? WHERE order_id = ?",
        [payment.entity.id, orderId]
      );

      // Update booking status
      await connection.query(
        "UPDATE booking SET status = 'confirmed', payment_id = ? WHERE id = ?",
        [paymentRecord.id, paymentRecord.booking_id]
      );

      // Update room status
      await connection.query(
        "UPDATE room SET status = 'Occupied', lock_until = NULL, viewer_user_id = NULL, total_booking = ? WHERE id = ?",
        [room?.total_booking + 1, room.id]
      );
    } else if (event === "payment.failed") {
      // Delete payment record
      await connection.query("DELETE FROM payment WHERE order_id = ?", [
        orderId,
      ]);

      // Delete booking record
      await connection.query("DELETE FROM booking WHERE id = ?", [
        paymentRecord.booking_id,
      ]);

      // Reset room status
      await connection.query(
        "UPDATE room SET status = 'Empty', lock_until = NULL, viewer_user_id = NULL WHERE id = ?",
        [room.id]
      );
    } else {
      console.log("Unhandled webhook event:", event);
    }

    await connection.commit(); // Commit transaction

    res.json({ status: "success" });
  } catch (error) {
    if (connection) {
      await connection.rollback(); // Rollback in case of error
    }
    console.error("Webhook processing error:", error);
    res.status(500).json({
      status: "error",
      message: error.message || "Error processing webhook",
    });
  } finally {
    if (connection) {
      connection.release(); // Release the connection back to the pool
    }
  }
});

export default router;
