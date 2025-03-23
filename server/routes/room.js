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
    await connection.query(
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
    const query1 = `SELECT * FROM room WHERE number = ? AND status = 'Empty' AND (lock_until IS NULL OR lock_until < NOW() OR viewer_user_id = ?)`;
    const values = [roomNumber, guest.id];
    db.query(query1, values, (err, result) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: "Room not found" });
      }
      if (result[0]?.viewer_user_id === guest?.id) {
        return res.status(200).json({
          message: "Room found and locked",
          data: {
            ...result[0],
          },
        });
      }
      // If room is found, set the 5-minute lock
      const lockUntil = new Date(Date.now() + 5 * 60 * 1000);
      const updateQuery = `UPDATE room SET lock_until = ? , viewer_user_id = ? WHERE number = ?`;
      db.query(updateQuery, [lockUntil, guest.id, roomNumber], (updateErr) => {
        if (updateErr) {
          return res.status(500).json({ message: updateErr.message });
        }
        return res.status(200).json({
          message: "Room found and locked",
          data: {
            ...result[0],
            lock_until: lockUntil,
            viewer_user_id: guest.id,
          },
        });
      });
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// 3. Initiate Booking/Payment Endpoint (15-minute lock)

router.post("/:roomNumber/book", async (req, res) => {
  const { roomNumber } = req.params;
  const { guest_id, from_date, days, amount } = req.body;
  const selectQuery = ``;
});

export default router;
