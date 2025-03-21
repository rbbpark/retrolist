import express from "express";
const router = express.Router();

// Home route
router.get("/", (req, res) => {
  res.json({ message: "Welcome to RetroList API" });
});

export default router;
