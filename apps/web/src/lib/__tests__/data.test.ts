import { Device, GetDevicesResponseType } from "@retrolist/shared";
import { fetchDevices, fetchDeviceById } from "../data";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

const mockFullResponse = {
  data: [
    {
      id: "5lyKARo6",
      device_name: "MSI Claw 7 AI+",
      brand: "MSI",
      release_date: "2025-02-01T08:00:00.000Z",
      price_low: 800,
      price_high: null,
      image_id: "image_72c1e56ac69dc",
      form_factor: "Horizontal",
      screen_size_inches: 7,
      resolution: "1920 x 1080",
      aspect_ratio: "16:9",
      shell_material: "Plastic",
      gbc: 5,
      nes: 5,
      genesis: 5,
      gba: 5,
      snes: 5,
      psx: 5,
      nds: 5,
      n64: 5,
      dreamcast: 5,
      psp: 5,
      saturn: 5,
      ngc: 5,
      wii: 5,
      n3ds: 5,
      ps2: 5,
      wiiu: 5,
      switch: 5,
      ps3: 5,
      has_analogs: true,
      has_dual_analogs: true,
      has_hall_analogs: false,
      has_l3_r3: true,
      has_l2_r2: true,
      has_analog_triggers: true,
      has_shoulder_buttons: true,
      has_wifi: true,
      has_bt: true,
      has_lte: false,
      has_usb_otg: false,
      has_thunderbolt: true,
      has_video_output: true,
      has_audio_output: true,
      has_rumble: true,
      has_dual_external_sd: false,
    },
    {
      id: "AQsRiYmd",
      device_name: "V20",
      brand: "PowKiddy",
      release_date: "2025-02-01T08:00:00.000Z",
      price_low: 55,
      price_high: null,
      image_id: "image_7a0f6acd8615d",
      form_factor: "Vertical",
      screen_size_inches: 3.5,
      resolution: "640 x 480",
      aspect_ratio: "4:3",
      shell_material: "Plastic",
      gbc: 5,
      nes: 5,
      genesis: 5,
      gba: 5,
      snes: 5,
      psx: 5,
      nds: 5,
      n64: 4,
      dreamcast: 4,
      psp: 4,
      saturn: 3,
      ngc: 2,
      wii: 1,
      n3ds: 1,
      ps2: 1,
      wiiu: 1,
      switch: 1,
      ps3: 1,
      has_analogs: true,
      has_dual_analogs: true,
      has_hall_analogs: false,
      has_l3_r3: true,
      has_l2_r2: true,
      has_analog_triggers: false,
      has_shoulder_buttons: true,
      has_wifi: false,
      has_bt: false,
      has_lte: false,
      has_usb_otg: true,
      has_thunderbolt: false,
      has_video_output: false,
      has_audio_output: true,
      has_rumble: null,
      has_dual_external_sd: true,
    },
  ],
  pagination: {
    total: 2,
    page: 1,
    page_size: 10,
    pages: 1,
  },
} as GetDevicesResponseType;

const mockGetDeviceByIdResponse = {
  id: "AQsRiYmd",
  image_id: "image_7a0f6acd8615d",
  device_name: "V20",
  brand: "PowKiddy",
  release_date: "2025-02-01T08:00:00.000Z",
  form_factor: "Vertical",
  os_raw: "Linux (EmuELEC)",
  gbc: 5,
  nes: 5,
  genesis: 5,
  gba: 5,
  snes: 5,
  psx: 5,
  nds: 5,
  n64: 4,
  dreamcast: 4,
  psp: 4,
  saturn: 3,
  ngc: 2,
  wii: 1,
  n3ds: 1,
  ps2: 1,
  wiiu: 1,
  switch: 1,
  ps3: 1,
  chipset: "Allwinner A133 Plus",
  cpu_model: "Cortex-A53",
  cpu_cores: "4 Cores",
  cpu_threads: "4 Threads",
  cpu_clock: "1.8 GHz - 2.0 GHz",
  cpu_arch: "ARM",
  gpu_model: "PowerVR GE8300",
  gpu_cores: "1 Core",
  gpu_clock: "660 MHz",
  ram_gb: "1 GB DDR3",
  screen_size_inches: 3.5,
  screen_type: "IPS",
  resolution: "640 x 480",
  ppi: 228.57,
  aspect_ratio: "4:3",
  screen_lens: "Tempered Glass (OCA Laminated)",
  battery_capacity: "5000 mAh",
  cooling_raw: null,
  has_cooling: false,
  dpad_raw: "Cross Upper placement",
  analogs_raw: "Dual thumbsticks with L3/R3 Lower placement",
  has_l3_r3: true,
  has_hall_analogs: false,
  has_dual_analogs: true,
  has_analogs: true,
  face_buttons: "4 Buttons",
  shoulder_buttons_raw: "L1, R1, L2, R2 Horizontal, Shelf",
  has_analog_triggers: false,
  has_l2_r2: true,
  has_shoulder_buttons: true,
  extra_buttons_raw: "Power, Reset, Volume +-",
  charge_port_raw: "USB-C Bottom facing",
  storage_raw: "Dual External MicroSD",
  has_dual_external_sd: true,
  connectivity_raw: "USB-C OTG",
  has_lte: false,
  has_usb_otg: true,
  has_thunderbolt: false,
  has_bt: false,
  has_wifi: false,
  video_output_raw: null,
  has_video_output: false,
  audio_output_raw: "3.5mm Headphone Bottom facing",
  has_audio_output: true,
  speaker_raw: "Single Mono Front facing",
  has_rumble: null,
  sensors_raw: "❌",
  volume_desc: "Dedicated Buttons",
  dimensions_mm: "85.3 mm x 133 mm x 23 - 27 mm",
  weight_g: null,
  shell_material: "Plastic",
  color_options: "Yellow, White, Transparent Black",
  reviews:
    "https://www.youtube.com/watch?v=j1nJP0akFDk https://www.youtube.com/shorts/5SiVMh9fG_8",
  price_low: 55,
  price_high: null,
  emulation_desc: "N64, PSP & Dreamcast playable but not all at full speed",
} as Device;

describe("fetchDevices", () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("should successfully fetch devices", async () => {
    const mockResponse = {
      ok: true,
      json: () => Promise.resolve(mockFullResponse),
    };
    (global.fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce(
      mockResponse
    );

    const result = await fetchDevices("page=1&page_size=10");
    expect(result).toEqual(mockFullResponse);
    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:3001/api/device?page=1&page_size=10"
    );
  });

  it("should handle network error", async () => {
    (global.fetch as unknown as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
      new Error("Network error")
    );

    await expect(fetchDevices("")).rejects.toThrow(
      "Failed to fetch devices data."
    );
  });

  it("should handle non-ok response", async () => {
    const mockResponse = {
      ok: false,
      status: 404,
    };
    (global.fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce(
      mockResponse
    );

    await expect(fetchDevices("")).rejects.toThrow(
      "Failed to fetch devices data."
    );
  });

  it("should handle validation error", async () => {
    const invalidResponse = {
      pagination: {
        total: 0,
        page: 1,
        page_size: 10,
        pages: 0,
      },
    };
    const mockResponse = {
      ok: true,
      json: () => Promise.resolve(invalidResponse),
    };
    (global.fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce(
      mockResponse
    );

    await expect(fetchDevices("")).rejects.toThrow(
      "Failed to fetch devices data."
    );
  });
});

describe("fetchDeviceById", () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("should successfully fetch a device by id", async () => {
    const mockResponse = {
      ok: true,
      json: () => Promise.resolve(mockGetDeviceByIdResponse),
    };
    (global.fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce(
      mockResponse
    );

    const result = await fetchDeviceById("AQsRiYmd");
    expect(result).toEqual(mockGetDeviceByIdResponse);
    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:3001/api/device/AQsRiYmd"
    );
  });

  it("should handle network error", async () => {
    (global.fetch as unknown as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
      new Error("Network error")
    );

    await expect(fetchDeviceById("AQsRiYmd")).rejects.toThrow(
      "Failed to fetch device data."
    );
  });

  it("should handle non-ok response", async () => {
    const mockResponse = {
      ok: false,
      status: 404,
    };
    (global.fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce(
      mockResponse
    );

    await expect(fetchDeviceById("AQsRiYmd")).rejects.toThrow(
      "Failed to fetch device data."
    );
  });

  it("should handle validation error", async () => {
    const invalidResponse = {
      id: "invalid",
      // Missing required fields
    };
    const mockResponse = {
      ok: true,
      json: () => Promise.resolve(invalidResponse),
    };
    (global.fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce(
      mockResponse
    );

    await expect(fetchDeviceById("AQsRiYmd")).rejects.toThrow(
      "Failed to fetch device data."
    );
  });
});
