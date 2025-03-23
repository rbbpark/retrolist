import express from "express";
import {
  getDevicesHandler,
  getDeviceByIdHandler,
} from "../controllers/device.controller";
import { getDevicesSchema } from "../schema/device/";
import validateResource from "../middleware/validateResource";

const router = express.Router();

// Get all devices
router.get("/", validateResource(getDevicesSchema), getDevicesHandler);

// Get a specific device by ID
router.get("/:id", getDeviceByIdHandler);

export default router;
