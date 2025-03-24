import express from "express";
import {
  getDevicesHandler,
  getDeviceByIdHandler,
} from "../controllers/device.controller";
import { getDeviceSchema, getDevicesSchema } from "../schema/device/";
import validateResource from "../middleware/validateResource";

const router = express.Router();

// Get all devices
router.get("/", validateResource(getDevicesSchema), getDevicesHandler);

// Get a specific device by ID
router.get("/:id", validateResource(getDeviceSchema), getDeviceByIdHandler);

export default router;
