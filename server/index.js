import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import authRouter from "../routers/authRouter.js";
import movieRouter from "../routers/movieRouter.js";
import { connectDb } from "../config/db.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({ origin: "*", credentials: true }));

connectDb().catch(console.error);

app.use("/api/auth", authRouter);
app.use("/api/movies", movieRouter);

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.get("/", (req, res) => {
  res.json({ message: "Backend running" });
});

export default app;
