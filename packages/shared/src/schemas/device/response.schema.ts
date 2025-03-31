import { DeviceSchema } from "./device.schema";
import { z } from "zod";

export const DeviceSchemaCompact = DeviceSchema.pick({
  id: true,
  device_name: true,
  price_low: true,
  price_high: true,
  image_id: true,
  brand: true,
  form_factor: true,
  screen_size_inches: true,
  release_date: true,
});
export type DeviceCompactView = z.infer<typeof DeviceSchemaCompact>;

export const DeviceSchemaFull = DeviceSchema.pick({
  id: true,
  device_name: true,
  brand: true,
  release_date: true,
  price_low: true,
  price_high: true,
  image_id: true,

  form_factor: true,
  screen_size_inches: true,
  resolution: true,
  aspect_ratio: true,
  shell_material: true,

  // Emulation (1-5 rating)
  gbc: true,
  nes: true,
  genesis: true,
  gba: true,
  snes: true,
  psx: true,
  nds: true,
  n64: true,
  dreamcast: true,
  psp: true,
  saturn: true,
  ngc: true,
  wii: true,
  n3ds: true,
  ps2: true,
  wiiu: true,
  switch: true,
  ps3: true,

  // controls
  has_analogs: true,
  has_dual_analogs: true,
  has_hall_analogs: true,
  has_l3_r3: true,
  has_l2_r2: true,
  has_analog_triggers: true,
  has_shoulder_buttons: true,

  // connectivity
  has_wifi: true,
  has_bt: true,
  has_lte: true,
  has_usb_otg: true,
  has_thunderbolt: true,
  has_video_output: true,
  has_audio_output: true,
  has_rumble: true,
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
