import express from "express";
import db from "../db.js";
import { cookieOptions } from "../constant.js";
import {
  hashPassword,
  verifyPassword,
  generateToken,
  verifyToken,
} from "../helpers.js";
import { isAdmin } from "../middleware.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { type, email, password } = req.body;
  console.log(type, email, password);
  let query = "";
  let values = "";
  if (type === "admin") {
    query = `SELECT * FROM admin WHERE email = ?;`;
    values = [email];
  } else if (type === "guest") {
    query = `SELECT * FROM guest WHERE email = ?;`;
    values = [email];
  } else if (type === "employee") {
    query = `SELECT * FROM employee WHERE email = ?;`;
    values = [email];
  } else {
    return res.status(400).json({ message: "Invalid user type" });
  }

  db.query(query, values, async (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    if (result.length === 0)
      return res.status(401).json({ message: "User not found" });

    const isPasswordValid = await verifyPassword(password, result[0].password);
    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid password" });

    const token = generateToken({ id: result[0].id, type, date: Date.now() });
    res.cookie("token", token, cookieOptions);
    res.status(200).json({
      message: "Login successful",
      data: {
        id: result[0].insertId,
        type,
        name: result[0].name,
        email: result[0].email,
      },
    });
  });
});

router.post("/register", async (req, res) => {
  const { type, email, password } = req.body;
  const hashedPassword = await hashPassword(password);
  let query = `INSERT INTO guest (email, password) VALUES (?, ?);`;
  let values = [email, hashedPassword];

  db.query(query, values, (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    const token = generateToken({
      id: result.insertId,
      type,
      date: Date.now(),
    });
    res.cookie("token", token, cookieOptions);
    res.status(200).json({
      message: "Registration successful",
      data: {
        id: result.insertId,
        email,
      },
    });
  });
});

router.post("/register-employee", isAdmin, (req, res) => {
  try {
    const { email, password, type, salary } = req.body;
    const query = `INSERT INTO employee (email, password, type, salary) VALUES (?, ?, ?, ?);`;
    const values = [email, password, type, salary];

    db.execute(query, values, (err, result) => {
      if (err) return res.status(500).json({ message: err.message });
      res.status(200).json({
        message: "Employee registered successfully",
        data: {
          id: result.insertId,
          email,
          type,
          salary,
        },
      });
    });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("token", cookieOptions);
  res.status(200).json({ message: "Logout successful" });
});

export default router;
