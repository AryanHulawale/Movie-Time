import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import authRouter from "./routers/authRouter.js";
import movieRouter from "./routers/movieRouter.js";
import { connectDb } from "./config/db.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors({
  origin: "https://movie-time-rose.vercel.app",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.options("*", cors());

app.use("/api/auth", authRouter);
app.use("/api/movies", movieRouter);

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.get("/", (req, res) => {
  res.status(200).json({ message: "Backend running" });
});

/* CONNECT DB SAFELY */
connectDb().catch(err => {
  console.error("MongoDB connection failed:", err);
});

export default app;
