import express from "express"
import {
  getAllMovies,
  getSortedMovies,
  searchMovies,
  addMovie,
  updateMovie,
  deleteMovie
} from "../controllers/movieController.js"
import upload from "../middleware/upload.js";

import authMiddleware from "../middleware/protect.js"
import { adminOnly } from "../middleware/adminMiddleware.js"

const router = express.Router()

/* USER ROUTES */
router.get("/", getAllMovies)
router.get("/sorted", getSortedMovies)
router.get("/search", searchMovies)

/* ADMIN ROUTES */

router.post("/", authMiddleware, adminOnly, upload.single("image"), addMovie);
router.put("/:id", authMiddleware, adminOnly, upload.single("image"), updateMovie)
router.delete("/:id", authMiddleware, adminOnly, deleteMovie)

export default router
