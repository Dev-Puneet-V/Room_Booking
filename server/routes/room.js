import express from "express";
import db from "../db.js";
import { isAdmin, isGuest } from "../middleware.js";
import { paymentInstance } from "../constant.js";
import crypto from "crypto";

const router = express.Router();

// Get all rooms (accessible to all authenticated users)
router.get("/", async (req, res) => {
  const connection = await db.promise().getConnection();
  try {
    const [rooms] = await connection.query(
      "SELECT * FROM room ORDER BY number"
    );
    res.json(rooms);
  } catch (error) {
    console.error("Error fetching rooms:", error);
    res.status(500).json({ message: "Failed to fetch rooms" });
  } finally {
    connection.release();
  }
});

// Create new room (admin only)
router.post("/", isAdmin, async (req, res) => {
  const { number, type, price, status, image_url } = req.body;
  const connection = await db.promise().getConnection();

  try {
    await connection.beginTransaction();

    // Validate room type
    const validRoomTypes = ["Single", "Double", "Suite", "Deluxe"];
    if (!validRoomTypes.includes(type)) {
      await connection.rollback();
      return res.status(400).json({
        message:
          "Invalid room type. Must be one of: Single, Double, Suite, Deluxe",
      });
    }

    // Check if room number already exists
    const [existing] = await connection.query(
      "SELECT number FROM room WHERE number = ?",
      [number]
    );

    if (existing.length > 0) {
      await connection.rollback();
      return res.status(400).json({ message: "Room number already exists" });
    }

    await connection.query(
      "INSERT INTO room (number, type, cost, status, image) VALUES (?, ?, ?, ?, ?)",
      [number, type, price, status || "Empty", image_url]
    );

    await connection.commit();
    res.status(201).json({ message: "Room created successfully" });
  } catch (error) {
    await connection.rollback();
    console.error("Error creating room:", error);
    res.status(500).json({ message: "Failed to create room" });
  } finally {
    connection.release();
  }
});

// Update room (admin only)
router.put("/:number", isAdmin, async (req, res) => {
  const { type, price, status, image_url } = req.body;
  const { number } = req.params;
  const connection = await db.promise().getConnection();

  try {
    await connection.beginTransaction();

    // Validate room type
    const validRoomTypes = ["Single", "Double", "Suite", "Deluxe"];
    if (type && !validRoomTypes.includes(type)) {
      await connection.rollback();
      return res.status(400).json({
        message:
          "Invalid room type. Must be one of: Single, Double, Suite, Deluxe",
      });
    }

    // Check if room exists
    const [existing] = await connection.query(
      "SELECT number FROM room WHERE number = ?",
      [number]
    );

    if (existing.length === 0) {
      await connection.rollback();
      return res.status(404).json({ message: "Room not found" });
    }

    await connection.query(
      "UPDATE room SET type = ?, cost = ?, status = ?, image = ? WHERE number = ?",
      [type, price, status, image_url, number]
    );

    await connection.commit();
    res.json({ message: "Room updated successfully" });
  } catch (error) {
    await connection.rollback();
    console.error("Error updating room:", error);
    res.status(500).json({ message: "Failed to update room" });
  } finally {
    connection.release();
  }
});

// Delete room (admin only)
router.delete("/:number", isAdmin, async (req, res) => {
  const { number } = req.params;
  const connection = await db.promise().getConnection();

  try {
    await connection.beginTransaction();

    // Check if room exists
    const [existing] = await connection.query(
      "SELECT id, number FROM room WHERE number = ?",
      [number]
    );

    if (existing.length === 0) {
      await connection.rollback();
      return res.status(404).json({ message: "Room not found" });
    }

    // Check if room has any bookings
    const [bookings] = await connection.query(
      "SELECT id FROM booking WHERE room_id = ? AND status != 'Cancelled'",
      [existing[0].id]
    );

    if (bookings.length > 0) {
      await connection.rollback();
      return res.status(400).json({
        message: "Cannot delete room with active bookings",
      });
    }

    await connection.query("DELETE FROM room WHERE number = ?", [number]);

    await connection.commit();
    res.json({ message: "Room deleted successfully" });
  } catch (error) {
    await connection.rollback();
    console.error("Error deleting room:", error);
    res.status(500).json({ message: "Failed to delete room" });
  } finally {
    connection.release();
  }
});

// Get single room details
router.get("/:number", async (req, res) => {
  const { number } = req.params;
  const connection = await db.promise().getConnection();

  try {
    const [rooms] = await connection.query(
      "SELECT * FROM room WHERE number = ?",
      [number]
    );

    if (rooms.length === 0) {
      return res.status(404).json({ message: "Room not found" });
    }

    res.json(rooms[0]);
  } catch (error) {
    console.error("Error fetching room:", error);
    res.status(500).json({ message: "Failed to fetch room" });
  } finally {
    connection.release();
  }
});

// 1. View/Lock Room Endpoint (5-minute lock)
router.post("/:roomNumber/view", isGuest, async (req, res) => {
  const connection = await db.promise().getConnection();
  try {
    const { roomNumber } = req.params;
    const guest = req.user;

    // Check if room is empty and not locked by other guest
    const [result] = await connection.query(
      `SELECT * FROM room WHERE number = ? AND status = 'Empty' AND (lock_until IS NULL OR (lock_until > NOW() AND viewer_user_id = ?) OR lock_until < NOW())`,
      [roomNumber, guest.id]
    );

    if (result.length === 0) {
      return res.status(404).json({ message: "Room not found" });
    }

    if (
      result[0]?.viewer_user_id === guest?.id &&
      result[0]?.status === "Empty" &&
      new Date(result[0]?.lock_until).getTime() > Date.now()
    ) {
      return res.status(200).json({
        message: "Room found and locked",
        data: {
          ...result[0],
        },
      });
    }

    // If room is found, set the 5-minute lock
    const lockUntil = new Date(Date.now() + 5 * 60 * 1000);
    await connection.query(
      `UPDATE room SET lock_until = ?, views = ?, viewer_user_id = ? WHERE number = ?`,
      [lockUntil, result[0]?.views + 1, guest.id, roomNumber]
    );

    return res.status(200).json({
      message: "Room found and locked",
      data: {
        ...result[0],
        lock_until: lockUntil,
        viewer_user_id: guest.id,
        views: result[0]?.views + 1,
        total_bookings: result[0]?.total_bookings,
      },
    });
  } catch (error) {
    console.error("Error viewing/locking room:", error);
    return res.status(500).json({ message: error.message });
  } finally {
    connection.release();
  }
});

// Unlock room
router.patch("/:roomNumber/unlock", isGuest, async (req, res) => {
  const connection = await db.promise().getConnection();
  try {
    const { roomNumber } = req.params;
    const guest = req.user;

    const [result] = await connection.query(
      `UPDATE room SET lock_until = NULL, viewer_user_id = NULL WHERE number = ? AND viewer_user_id = ?`,
      [roomNumber, guest.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Room not found or not locked by the guest",
      });
    }

    return res.status(200).json({ message: "Room unlocked successfully" });
  } catch (error) {
    console.error("Error unlocking room:", error);
    return res.status(500).json({ message: error.message });
  } finally {
    connection.release();
  }
});

// 3. Initiate Booking/Payment Endpoint (15-minute lock)
router.post("/:roomNumber/book", isGuest, async (req, res) => {
  const { roomNumber } = req.params;
  const guest = req.user;
  const { from_date, days } = req.body;

  if (!from_date || !days) {
    return res.status(400).json({
      message:
        "Missing required fields: from_date, days, and amount are required",
    });
  }

  // Calculate end_date
  let end_date = new Date(from_date);
  end_date.setDate(end_date.getDate() + parseInt(days));
  // end_date = end_date.toISOString().slice(0, 19).replace("T", " ");
  const connection = await db.promise().getConnection(); // Get a connection from the pool

  try {
    await connection.beginTransaction();

    // Check if room exists and is locked by this user
    const [rooms] = await connection.query(
      `SELECT * FROM room 
       WHERE number = ? 
       AND status = 'Empty' 
       AND lock_until > NOW() 
       AND viewer_user_id = ? 
       FOR UPDATE`,
      [roomNumber, guest.id]
    );
    console.log(rooms);

    if (!rooms || rooms.length === 0) {
      throw new Error("Room not found or not available for booking");
    }

    const room = rooms[0];

    // Check for overlapping bookings
    const [existingBookings] = await connection.query(
      `SELECT * FROM booking 
       WHERE room_id = ? 
       AND status = 'confirmed' 
       AND ((from_date <= ? AND end_date >= ?) 
       OR (from_date <= ? AND end_date >= ?))`,
      [
        room.id,
        from_date,
        from_date,
        end_date.toISOString(),
        end_date.toISOString(),
      ]
    );

    if (existingBookings.length > 0) {
      throw new Error("Room is not available for the selected dates");
    }

    // Extend lock for 15 minutes
    const lockUntil = new Date(Date.now() + 15 * 60 * 1000);
    await connection.query("UPDATE room SET lock_until = ? WHERE id = ?", [
      lockUntil,
      room.id,
    ]);

    // Create booking
    const [bookingResult] = await connection.query(
      `INSERT INTO booking 
       (guest_id, room_id, from_date, end_date, status, amount) 
       VALUES (?, ?, ?, ?, 'pending', ?)`,
      [
        guest.id,
        room.id,
        new Date(from_date?.split("T")[0]),
        new Date(end_date.toISOString().split("T")[0]),
        room.cost * days,
      ]
    );

    // Create Razorpay order
    const orderRequest = await paymentInstance.orders.create({
      amount: room.cost * days * 100, // Convert to paise
      currency: "INR",
      receipt: `booking_${bookingResult.insertId}`,
      notes: {
        booking_id: bookingResult.insertId,
        room_id: room.id,
        guest_id: guest.id,
      },
    });

    // Store payment details
    await connection.query(
      `INSERT INTO payment 
       (order_id, booking_id, cost, user_id, status) 
       VALUES (?, ?, ?, ?, 'unverified')`,
      [orderRequest.id, bookingResult.insertId, room?.cost * days, guest.id]
    );

    await connection.commit(); // Commit transaction

    res.status(201).json({
      message: "Booking initiated and payment order created",
      data: {
        orderId: orderRequest.id,
        bookingId: bookingResult.insertId,
        amount: room?.cost * days,
        currency: "INR",
        room: {
          id: room.id,
          number: room.number,
          type: room.type,
        },
        booking: {
          from_date: from_date,
          end_date: end_date.toISOString(),
          days: days,
        },
      },
    });
  } catch (error) {
    console.error("Error in booking process:", error);
    await connection.rollback(); // Rollback transaction on error
    res.status(400).json({
      message: error.message || "Error processing booking request",
    });
  } finally {
    connection.release(); // Release connection back to the pool
  }
});

export default router;
