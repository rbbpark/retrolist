import { z } from "zod";
import { DevicesQuerySchema } from "@retrolist/shared";

/** Get Device by ID **/
const DeviceQuerySchema = z.object({
  id: z.string(),
});

export const getDeviceSchema = z.object({
  params: DeviceQuerySchema,
});

export type GetDeviceInput = z.infer<typeof DeviceQuerySchema>;

/** Get Devices **/

// for validation middleware
export const getDevicesSchema = z.object({
  query: DevicesQuerySchema,
});

// for controller and service usage
export type GetDevicesInput = z.infer<typeof DevicesQuerySchema>;
