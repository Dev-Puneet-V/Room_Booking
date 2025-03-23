import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "./db.js";

export const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

export const verifyPassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

export const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error("Invalid token");
  }
};

export const decodeToken = (token) => {
  return jwt.decode(token);
};

export const queryPromise = (sql, values) => {
  return new Promise((resolve, reject) => {
    db.query(sql, values, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};
