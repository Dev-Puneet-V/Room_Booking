import { decodeToken, verifyToken } from "./helpers.js";
import db from "./db.js";

export const isAdmin = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decodedUser = verifyToken(token);
    const { id, type } = decodedUser;
    if (!id || !type) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (type !== "admin") {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const query = `SELECT * FROM admin WHERE id = ?;`;
    const values = [id];
    db.query(query, values, (err, result) => {
      if (err) return res.status(500).json({ message: err.message });
      if (result.length === 0)
        return res.status(401).json({ message: "Unauthorized" });
      req.user = result[0];
      next();
    });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

export const isEmployee = (req, res, next) => {
  try {
    const { token } = req.body;
    const decodedUser = verifyToken(token);
    const { id, type } = decodedUser;
    if (!id || !type) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (type !== "employee") {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const query = `SELECT * FROM employee WHERE id = ?;`;
    const values = [id];
    db.query(query, values, (err, result) => {
      if (err) return res.status(500).json({ message: err.message });
      if (result.length === 0)
        return res.status(401).json({ message: "Unauthorized" });
      req.user = result[0];
      next();
    });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

export const isGuest = (req, res, next) => {
  try {
    const token = req.cookies.token;
    const decodedUser = verifyToken(token);
    const { id } = decodedUser;
    if (!id) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const query = `SELECT * FROM guest WHERE id = ?;`;
    const values = [id];
    db.query(query, values, (err, result) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      if (result.length === 0) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      req.user = result[0];
      next();
    });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};
