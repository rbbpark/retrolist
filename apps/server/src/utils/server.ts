import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import morgan from "morgan";
import indexRoutes from "../routes/index";
import config from "config";

function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(morgan("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

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
      stack: config.get("NODE_ENV") === "production" ? "🥞" : err.stack,
    });
  });

  return app;
}

export default createServer;
