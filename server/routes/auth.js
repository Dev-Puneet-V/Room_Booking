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
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

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
  try {
    const { email, password } = req.body;

    // Check if email already exists
    const [existingUsers] = await db
      .promise()
      .query("SELECT * FROM guest WHERE email = ?", [email]);

    if (existingUsers.length > 0) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await hashPassword(password);
    const query = `INSERT INTO guest (email, password) VALUES (?, ?);`;
    const values = [email, hashedPassword]; // Use part of email as default name

    const [result] = await db.promise().query(query, values);

    const token = generateToken({
      id: result.insertId,
      type: "guest",
      date: Date.now(),
    });

    res.cookie("token", token, cookieOptions);
    res.status(200).json({
      message: "Registration successful",
      data: {
        id: result.insertId,
        email,
        type: "guest",
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Registration failed" });
  }
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

// Check auth status endpoint
router.get("/check", async (req, res) => {
  try {
    // Get token from cookie
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        authenticated: false,
        message: "No token found",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    let user;

    // Check based on user type
    if (decoded.type === "admin") {
      const [admins] = await db
        .promise()
        .query("SELECT * FROM admin WHERE id = ?", [decoded.id]);

      if (!admins || admins.length === 0) {
        return res.status(401).json({
          authenticated: false,
          message: "Admin not found",
        });
      }
      user = admins[0];
    } else if (decoded.type === "guest") {
      const [guests] = await db
        .promise()
        .query("SELECT * FROM guest WHERE id = ?", [decoded.id]);

      if (!guests || guests.length === 0) {
        return res.status(401).json({
          authenticated: false,
          message: "Guest not found",
        });
      }
      user = guests[0];
    } else {
      return res.status(401).json({
        authenticated: false,
        message: "Invalid user type",
      });
    }

    // Send back user info
    res.json({
      authenticated: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        type: decoded.type,
      },
    });
  } catch (error) {
    // Token verification failed
    console.error("Auth check error:", error);
    res.status(401).json({
      authenticated: false,
      message: "Invalid token",
    });
  }
});

export default router;
