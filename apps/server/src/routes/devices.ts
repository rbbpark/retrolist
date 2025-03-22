import express from "express";
import { getDevicesHandler } from "../controllers/device.controller";
import { getDevicesSchema } from "../schema/device.schema";
import validateResource from "../middleware/validateResource";

const router = express.Router();

// Get all devices
router.get("/", validateResource(getDevicesSchema), getDevicesHandler);

// // Get a specific device by ID
// router.get("/:id", (req, res) => {
//   // TODO
//   // res.json({ message: `Get device with ID: ${req.params.id}` });
// });

export default router;
