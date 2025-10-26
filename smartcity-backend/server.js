import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Suppress Mongoose deprecation warnings
mongoose.set("strictQuery", true);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Root route
app.get("/", (req, res) => {
  res.send("SmartCity Reporter Backend is running ✅");
});

// Auth routes
app.use("/auth", authRoutes);

// Example protected route
import { verifyJwt } from "./middleware/authMiddleware.js";
app.get("/protected", verifyJwt, (req, res) => {
  res.json({ message: `Hello ${req.user.name}`, user: req.user });
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
