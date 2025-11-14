import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import todoRoutes from "./routes/todo.routes"
import cors from 'cors';
import { errorHandler } from "./middleware/errorHandler";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.LOCAL_ORIGIN_URL,
  credentials: true
}));

app.use(express.json());

connectDB();

app.use("/api/todos", todoRoutes);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Todo API",
      version: "1.0.0",
      description: "API for managing Todo tasks",
    },
  },
  apis: ["./src/routes/*.ts"],
};

const specs = swaggerJSDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
