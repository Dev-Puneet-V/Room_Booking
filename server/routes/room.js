import express from "express";
import db from "../db.js";
import { isAdmin, isGuest } from "../middleware.js";
import { paymentInstance } from "../constant.js";
import crypto from "crypto";

const router = express.Router();

// Function to release expired locks
const releaseExpiredLocks = async (connection) => {
  try {
    // Release locks that have expired and are not for occupied rooms
    await db.query(
      `UPDATE room 
       SET lock_until = NULL, status = CASE 
         WHEN status = 'Under maintenance' THEN 'Empty'
         ELSE status 
       END
       WHERE lock_until IS NOT NULL 
       AND lock_until < NOW() 
       AND status != 'Occupied'`
    );
  } catch (error) {
    console.error("Error releasing expired locks:", error);
  }
};

router.post("/", isAdmin, (req, res) => {
  const { number, type, cost, status, capacity, facilities } = req.body;

  const query = `INSERT INTO room (number, type, cost, status, capacity, facilities) VALUES (?, ?, ?, ?, ?, ?)`;
  const values = [number, type, cost, status, capacity, facilities];

  db.query(query, values, (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    res.status(201).json({
      message: "Room created successfully",
      data: {
        id: result.insertId,
        number,
        type,
        cost,
        status,
        capacity,
        facilities,
      },
    });
  });
});

router.get("/:roomNumber", (req, res) => {
  const { roomNumber } = req.params;

  const query = `SELECT * FROM room WHERE number = ?`;
  const values = [roomNumber];

  db.query(query, values, (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Database query error", error: err.message });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Room not found" });
    }
    res
      .status(200)
      .json({ message: "Room retrieved successfully", data: result[0] });
  });
});

router.put("/:roomNumber", isAdmin, (req, res) => {
  const { roomNumber } = req.params;
  const { number, type, cost, status, capacity, facilities } = req.body;

  const fields = [];
  const values = [];

  if (number) {
    fields.push("number = ?");
    values.push(number);
  }
  if (type) {
    fields.push("type = ?");
    values.push(type);
  }
  if (cost) {
    fields.push("cost = ?");
    values.push(cost);
  }
  if (status) {
    fields.push("status = ?");
    values.push(status);
  }
  if (capacity) {
    fields.push("capacity = ?");
    values.push(capacity);
  }
  if (facilities) {
    fields.push("facilities = ?");
    values.push(facilities);
  }

  if (fields.length === 0) {
    return res.status(400).json({ message: "No fields to update" });
  }

  const query = `UPDATE room SET ${fields.join(", ")} WHERE number = ?`;
  values.push(roomNumber);

  db.query(query, values, (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Database update error", error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Room not found" });
    }

    const selectQuery = "SELECT * FROM room WHERE number = ?";
    db.query(selectQuery, [number], (selectErr, selectResult) => {
      if (selectErr) {
        return res.status(500).json({
          message: "Error retrieving updated room data",
          error: selectErr.message,
        });
      }
      res
        .status(200)
        .json({ message: "Room updated successfully", data: selectResult[0] });
    });
  });
});

router.delete("/:roomNumber", isAdmin, (req, res) => {
  const { roomNumber } = req.params;

  const query = `DELETE FROM room WHERE number = ?`;
  const values = [roomNumber];

  db.query(query, values, (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Database delete error", error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.status(200).json({ message: "Room deleted successfully" });
  });
});

// 1. View/Lock Room Endpoint (5-minute lock)
router.post("/:roomNumber/view", isGuest, async (req, res) => {
  try {
    const { roomNumber } = req.params;
    const guest = req.user;
    //check if room is empty and not locked by other guest
    const query1 = `SELECT * FROM room WHERE number = ? AND status = 'Empty' AND (lock_until IS NULL OR (lock_until > NOW() AND viewer_user_id = ?) OR lock_until < NOW())`;
    const values = [roomNumber, guest.id];
    db.query(query1, values, (err, result) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: "Room not found" });
      }

      console.log(
        new Date(result[0]?.lock_until).getTime() < Date.now(),
        new Date(result[0]?.lock_until).getTime(),
        Date.now()
      );
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
      const updateQuery = `UPDATE room SET lock_until = ? , views = ?, viewer_user_id = ? WHERE number = ?`;
      db.query(
        updateQuery,
        [lockUntil, result[0]?.views + 1, guest.id, roomNumber],
        (updateErr) => {
          if (updateErr) {
            return res.status(500).json({ message: updateErr.message });
          }
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
        }
      );
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
//user comes -> views the room -> click on book now(check if room is available) -> if available then lock the room for 15 minutes -> if not available then return not available
//
router.patch("/:roomNumber/unlock", isGuest, async (req, res) => {
  try {
    const { roomNumber } = req.params;
    const guest = req.user;
    const updateQuery = `UPDATE room SET lock_until = NULL, viewer_user_id = NULL WHERE number = ? AND viewer_user_id = ?`;
    db.query(updateQuery, [roomNumber, guest.id], (err, result) => {
      if (err) return res.status(500).json({ message: err.message });
      if (result.affectedRows === 0)
        return res
          .status(404)
          .json({ message: "Room not found or not locked by the guest" });
      return res.status(200).json({ message: "Room unlocked successfully" });
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
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
    await connection.query(
      "UPDATE room SET lock_until = ? WHERE id = ?",
      [lockUntil, room.id]
    );

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
