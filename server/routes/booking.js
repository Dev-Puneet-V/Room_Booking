import express from "express";
import db from "../db.js";
import { isGuest } from "../middleware.js";

const router = express.Router();

// Get user's bookings
router.get("/user", isGuest, async (req, res) => {
  const connection = await db.promise().getConnection();
  try {
    const [bookings] = await connection.query(
      `SELECT b.*, r.number as room_number, r.type as room_type, r.cost as room_price 
       FROM booking b 
       JOIN room r ON b.room_id = r.id 
       WHERE b.guest_id = ? 
       ORDER BY b.created_on DESC`,
      [req.user.id]
    );
    res.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Failed to fetch bookings" });
  } finally {
    connection.release();
  }
});

// Get booking details
router.get("/:id", isGuest, async (req, res) => {
  const connection = await db.promise().getConnection();
  try {
    const [bookings] = await connection.query(
      `SELECT b.*, r.number as room_number, r.type as room_type, r.cost as room_price 
       FROM booking b 
       JOIN room r ON b.room_id = r.id 
       WHERE b.id = ? AND b.guest_id = ?`,
      [req.params.id, req.user.id]
    );

    if (bookings.length === 0) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json(bookings[0]);
  } catch (error) {
    console.error("Error fetching booking:", error);
    res.status(500).json({ message: "Failed to fetch booking" });
  } finally {
    connection.release();
  }
});

// Cancel booking
router.patch("/:id/cancel", isGuest, async (req, res) => {
  const connection = await db.promise().getConnection();
  try {
    await connection.beginTransaction();

    // Get booking details
    const [bookings] = await connection.query(
      "SELECT * FROM booking WHERE id = ? AND guest_id = ? FOR UPDATE",
      [req.params.id, req.user.id]
    );

    if (bookings.length === 0) {
      throw new Error("Booking not found");
    }

    const booking = bookings[0];

    // Check if booking can be cancelled
    if (booking.status !== "confirmed") {
      throw new Error("Cannot cancel booking in current status");
    }

    // Update booking status
    await connection.query(
      "UPDATE booking SET status = 'cancelled' WHERE id = ?",
      [booking.id]
    );

    // Update room status
    await connection.query("UPDATE room SET status = 'Empty' WHERE id = ?", [
      booking.room_id,
    ]);

    await connection.commit();
    res.json({ message: "Booking cancelled successfully" });
  } catch (error) {
    await connection.rollback();
    console.error("Error cancelling booking:", error);
    res.status(400).json({ message: error.message });
  } finally {
    connection.release();
  }
});

export default router;
