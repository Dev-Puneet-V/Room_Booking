import express from "express";
import db from "../db.js";
import { isAdmin } from "../middleware.js";

const router = express.Router();

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

export default router;
