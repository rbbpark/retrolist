import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();

import config from "./config/config";
const app = express();

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
import indexRoutes from "./routes/index";

// Use routes
app.use("/", indexRoutes);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Route not found" });
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  console.error(err.stack);
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
  });
});

// Start server
app.listen(config.PORT, () => {
  console.log(
    `Server is running on port ${config.PORT} in ${config.NODE_ENV} mode`
  );
});

export default app;
