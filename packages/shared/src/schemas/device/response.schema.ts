import { DeviceSchema } from "./device.schema";
import { z } from "zod";

export const DeviceSchemaCompact = DeviceSchema.pick({
  id: true,
  device_name: true,
  price_low: true,
  image_id: true,
});
export type DeviceCompactView = z.infer<typeof DeviceSchemaCompact>;

export const DeviceSchemaFull = DeviceSchema.pick({
  id: true,
  device_name: true,
  brand: true,
  release_date: true,
  price_low: true,
  image_id: true,
});
export type DeviceFullView = z.infer<typeof DeviceSchemaFull>;

export const GetDevicesResponseSchema = z.object({
  data: z.union([z.array(DeviceSchemaFull), z.array(DeviceSchemaCompact)]),
  pagination: z.object({
    total: z.number(),
    page: z.number(),
    page_size: z.number(),
    pages: z.number(),
  }),
});
export type GetDevicesResponseType = z.infer<typeof GetDevicesResponseSchema>;
