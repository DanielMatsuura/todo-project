import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import todoRoutes from "./routes/todo.routes"
import cors from 'cors';

dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.LOCAL_ORIGIN_URL,
  credentials: true
}));

app.use(express.json());

connectDB();

app.use("/api/todos", todoRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
