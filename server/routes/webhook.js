// server/routes/webhook.js
import express from "express";
import crypto from "crypto";
import db from "../db.js"; // Assuming you have a db.js for database connection

const router = express.Router();

router.post("/razorpay", async (req, res) => {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  const shasum = crypto.createHmac("sha256", secret);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest("hex");

  if (digest === req.headers["x-razorpay-signature"]) {
    const event = req.body;

    db.getConnection((err, connection) => {
      if (err) {
        console.error("Error getting database connection:", err);
        return res.status(500).json({ message: "Database connection error" });
      }

      connection.beginTransaction(async (err) => {
        try {
          const orderId = event.payload.payment.entity.order_id;

          // Get booking and payment details
          const [payment] = await connection.query(
            "SELECT * FROM payment WHERE order_id = ?",
            [orderId]
          );
          const [booking] = await connection.query(
            "SELECT * FROM booking WHERE id = ?",
            [payment.booking_id]
          );

          if (event.event === "payment.captured") {
            // Payment successful - confirm booking and update room status
            await connection.query(
              "UPDATE booking SET status = 'confirmed' WHERE id = ?",
              [booking.id]
            );
            await connection.query(
              "UPDATE payment SET status = 'verified' WHERE order_id = ?",
              [orderId]
            );
            // Update room status to Occupied
            await connection.query(
              "UPDATE room SET status = 'Occupied', lock_until = NULL WHERE id = ?",
              [booking.room_id]
            );
          } else if (event.event === "payment.failed") {
            // Payment failed - cancel booking and reset room status
            await connection.query(
              "UPDATE booking SET status = 'cancelled' WHERE id = ?",
              [booking.id]
            );
            await connection.query(
              "UPDATE payment SET status = 'failed' WHERE order_id = ?",
              [orderId]
            );
            // Reset room status to Empty
            await connection.query(
              "UPDATE room SET status = 'Empty', lock_until = NULL WHERE id = ?",
              [booking.room_id]
            );
          }

          await connection.commit();
          res.status(200).json({ message: "Webhook processed successfully" });
        } catch (error) {
          await connection.rollback();
          console.error("Webhook processing error:", error);
          res.status(500).json({ message: "Webhook processing error" });
        } finally {
          connection.release();
        }
      });
    });
  } else {
    res.status(400).json({ message: "Invalid signature" });
  }
});

export default router;
