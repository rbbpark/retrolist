import { z } from "zod";

const ratingSchema = z.number().min(1).max(5);

export const DeviceSchema = z.object({
  // Device identification
  id: z.string(),
  image_id: z.string(),
  device_name: z.string(),
  brand: z.string(),
  release_date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),

  // System specifications
  form_factor: z.enum(["Vertical", "Horizontal", "Clamshell"]),
  os_raw: z.string(),

  // Emulation (1-5 rating)
  gbc: ratingSchema,
  nes: ratingSchema,
  genesis: ratingSchema,
  gba: ratingSchema,
  snes: ratingSchema,
  psx: ratingSchema,
  nds: ratingSchema,
  n64: ratingSchema,
  dreamcast: ratingSchema,
  psp: ratingSchema,
  saturn: ratingSchema,
  ngc: ratingSchema,
  wii: ratingSchema,
  n3ds: ratingSchema,
  ps2: ratingSchema,
  wiiu: ratingSchema,
  switch: ratingSchema,
  ps3: ratingSchema,

  // SoC specifications
  chipset: z.string().nullable(),
  cpu_model: z.string().nullable(),
  cpu_cores: z.string().nullable(),
  cpu_threads: z.string().nullable(),
  cpu_clock: z.string().nullable(),
  cpu_arch: z.string().nullable(),
  gpu_model: z.string().nullable(),
  gpu_cores: z.string().nullable(),
  gpu_clock: z.string().nullable(),
  ram_gb: z.string().nullable(),

  // Display specs
  screen_size_inches: z.number(),
  screen_type: z.enum([
    "AMOLED Touchscreen",
    "IPS",
    "IPS Touchscreen",
    "LCD Touchscreen",
    "LTPS LCD",
    "LTPS Touchscreen",
    "Monochrome OLED",
    "OLED",
    "OLED Touchscreen",
    "QLED Touchscreen",
    "TFT",
  ]),
  resolution: z.enum([
    "1024 x 600",
    "1024 x 768",
    "1080 x 680",
    "1240 x 1080",
    "1280 x 480",
    "1280 x 720",
    "1280 x 800",
    "1280 x 960",
    "128 x 64",
    "1334 x 750",
    "1600 x 1440",
    "1620 x 1080",
    "1920 x 1080",
    "1920 x 1152",
    "1920 x 1200",
    "2048 x 1536",
    "2400 x 1080",
    "240 x 240",
    "2560 x 1440",
    "2560 x 1600",
    "320 x 240",
    "320 x 480",
    "3840 x 2160",
    "480 x 272",
    "480 x 320",
    "480 x 360",
    "640 x 480",
    "720 x 480",
    "720 x 720",
    "72 x 40",
    "750 x 560",
    "800 x 400",
    "800 x 480",
    "800 x 600",
    "854 x 480",
    "94 x 64",
    "960 × 544",
    "960 x 544",
    "960 x 640",
    "960 x 720",
  ]),
  ppi: z.number(),
  aspect_ratio: z
    .enum([
      "10:9",
      "1:1",
      "128:75",
      "16:10",
      "16:9",
      "20:9",
      "2:1",
      "31:27",
      "3:2",
      "4:3",
      "47:32",
      "5:3",
      "8:3",
      "9:5",
    ])
    .nullable(),
  screen_lens: z.string().nullable(),

  // Hardware specs
  battery_capacity: z.string(),
  cooling_raw: z.string().nullable(),
  has_cooling: z.boolean().nullable(),

  // Control specs
  dpad_raw: z.enum([
    "Cross Lower placement",
    "Cross Upper placement",
    "Disc Lower placement",
    "Disc Upper placement",
    "Separated Buttons Lower placement",
    "Separated Buttons Upper placement",
    "Separated Cross (PS Vita) Lower placement",
    "Separated Cross (PS Vita) Upper placement",
  ]),
  analogs_raw: z.string().nullable(),
  has_l3_r3: z.boolean(),
  has_hall_analogs: z.boolean(),
  has_dual_analogs: z.boolean(),
  has_analogs: z.boolean(),
  face_buttons: z.enum(["2 Buttons", "4 Buttons", "6 Buttons"]),
  shoulder_buttons_raw: z.string().nullable(),
  has_analog_triggers: z.boolean(),
  has_l2_r2: z.boolean(),
  has_shoulder_buttons: z.boolean(),
  extra_buttons_raw: z.string().nullable(),

  // Connectivity specs
  charge_port_raw: z.string().nullable(),
  storage_raw: z.string(),
  has_dual_external_sd: z.boolean(),
  connectivity_raw: z.string().nullable(),
  has_lte: z.boolean(),
  has_usb_otg: z.boolean(),
  has_thunderbolt: z.boolean(),
  has_bt: z.boolean(),
  has_wifi: z.boolean(),
  video_output_raw: z.string().nullable(),
  has_video_output: z.boolean().nullable(),
  audio_output_raw: z.string().nullable(),
  has_audio_output: z.boolean(),
  speaker_raw: z.string().nullable(),
  has_rumble: z.boolean().nullable(),
  sensors_raw: z.string().nullable(),
  volume_desc: z.string().nullable(),

  // Exterior specs
  dimensions_mm: z.string().nullable(),
  weight_g: z.number().nullable(),
  shell_material: z.enum([
    "Metal (Aluminum)",
    "Metal (Magnesium Aluminum Alloy)",
    "Plastic",
    "Plastic & Aluminum",
    "Plastic or Metal (Aluminum)",
  ]),
  color_options: z.string(),

  // Reviews, pricing, emulation notes
  reviews: z.string().nullable(),
  price_low: z.number(),
  price_high: z.number().nullable(),
  emulation_desc: z.string().nullable(),
});

// Export the type from the schema
export type Device = z.infer<typeof DeviceSchema>;

export const DeviceSchemaCompact = DeviceSchema.pick({
  id: true,
  device_name: true,
  price_low: true,
  image_id: true,
});

export const DeviceSchemaFull = DeviceSchema.pick({
  id: true,
  device_name: true,
  brand: true,
  release_date: true,
  price_low: true,
  image_id: true,
});
