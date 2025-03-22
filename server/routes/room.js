import express from "express";
import db from "../db.js";

const router = express.Router();

router.post("/", (req, res) => {
  const { number, type, cost, status, capacity, facilities } = req.body;

  const query = `INSERT INTO rooms (number, type, cost, status, capacity, facilities) VALUES (?, ?, ?, ?, ?, ?)`;
  const values = [number, type, cost, status, capacity, facilities];

  db.query(query, values, (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    res.status(201).json({ message: "Room created successfully", result });
  });
});

router.get("/", (req, res) => {
  res.send("Hello World");
});

export default router;
