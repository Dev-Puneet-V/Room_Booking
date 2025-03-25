import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import roomRoutes from "./routes/room.js";
import authRoutes from "./routes/auth.js";
import paymentRoutes from "./routes/payment.js";
import webhookRoutes from "./routes/webhook.js";
import db from "./db.js";
import bookingRoutes from "./routes/booking.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Get directory name in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CORS configuration
const corsOptions = {
  origin: "http://localhost:5173", // or your frontend domain
  credentials: true, // Allow credentials (cookies)
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["set-cookie"],
};

// Middleware
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

// Serve static files from public directory
app.use(express.static(path.join(__dirname, "./public")));

app.use((req, res, next) => {
  const start = Date.now();
  const timestamp = new Date().toISOString();

  // Log request details
  console.log(`[${timestamp}] ${req.method} ${req.url}`);

  // Log request body if present
  if (Object.keys(req.body).length > 0) {
    console.log("Request Body:", JSON.stringify(req.body, null, 2));
  }

  // Track response
  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(
      `[${timestamp}] ${req.method} ${req.url} ${res.statusCode} - ${duration}ms`
    );
  });

  next();
});

app.use("/api/v1/room", roomRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/webhook", webhookRoutes);
app.use("/api/v1/booking", bookingRoutes);

// Serve index.html for the root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// db();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
