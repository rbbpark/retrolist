import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import morgan from "morgan";
import indexRoutes from "../routes/";
import config from "config";

function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(morgan("dev"));
  // make body available in req
  app.use(express.json());

  // Use routes
  app.use("/", indexRoutes);

  // AWS ALB
  app.use((req, res, next) => {
    app.set("trust proxy", true);
    next();
  });

  // 404 handler
  app.use((req: Request, res: Response) => {
    res.status(404).json({ message: "Route not found" });
  });

  // Error handling middleware
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    res.status(statusCode).json({
      message: err.message,
      stack: config.get("NODE_ENV") === "production" ? "🥞" : err.stack,
    });
  });

  return app;
}

export default createServer;
