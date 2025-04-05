import express from "express";
import deviceRoutes from "./devices";
const router = express.Router();

// Home route
router.get("/", (req, res) => {
  res.json({ message: "Welcome to RetroList API" });
});

// health check
router.get("/health", (req, res) => {
  res.status(200).json({ status: "healthy" });
});

// Mount device routes
router.use("/api/device", deviceRoutes);

export default router;
