import express from "express"
import authRouter from "./routers/authRouter.js"
import movieRouter from "./routers/movieRouter.js"
import dotenv from "dotenv"
import cors from "cors"
import path from "path"
import { connectDb } from "./config/db.js"
dotenv.config()

connectDb()

const app = express()
app.use(express.json());
app.use(cors());

app.use("/api/auth",authRouter)
app.use("/api/movies",movieRouter)

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));


const PORT = process.env.PORT || 8000

app.listen(PORT,()=>{
    console.log("Server running on PORT : ",PORT)
})