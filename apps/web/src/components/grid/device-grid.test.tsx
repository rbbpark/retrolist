import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { DeviceGrid } from "./device-grid";
import { fetchDevices } from "@/lib/data";
import { GetDevicesResponseType } from "@retrolist/shared";

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

const mockCompactResponse = {
  data: [
    {
      id: "163bWzK4",
      device_name: "GAMEMT E6 Max",
      price_low: 80,
      price_high: null,
      image_id: "image_73f2f90f7a176",
      brand: "GAMEMT",
      form_factor: "Horizontal",
      screen_size_inches: 5,
      release_date: "2025-03-01T08:00:00.000Z",
    },
    {
      id: "QgIRsQvw",
      device_name: "U8",
      price_low: 30,
      price_high: null,
      image_id: "image_9e41c29b6e8bb",
      brand: "Game Console",
      form_factor: "Horizontal",
      screen_size_inches: 4,
      release_date: "2025-03-01T08:00:00.000Z",
    },
  ],
  pagination: {
    total: 2,
    page: 1,
    page_size: 10,
    pages: 1,
  },
};

// Mock the fetchDevices function
vi.mock("@/lib/data", () => ({
  fetchDevices: vi.fn(),
}));

describe("DeviceGrid", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders a grid with two devices", async () => {
    (fetchDevices as any).mockResolvedValue(mockFullResponse);
    const queryString = "test query";
    render(await DeviceGrid({ queryString }));
    const deviceGrid = screen.getByTestId("device-grid");
    expect(deviceGrid).toBeInTheDocument();
    expect(deviceGrid.children.length).toBe(2);
    expect(screen.getByText("MSI Claw 7 AI+")).toBeInTheDocument();
    expect(screen.getByText("V20")).toBeInTheDocument();
    expect(screen.getAllByText("Emulation:")).toHaveLength(2);
    expect(screen.getByTestId("pagination")).toBeInTheDocument();
  });

  it("calls fetchDevices with the provided queryString", async () => {
    (fetchDevices as any).mockResolvedValue(mockFullResponse);

    const queryString = "test query";
    render(await DeviceGrid({ queryString }));

    expect(fetchDevices).toHaveBeenCalledWith(queryString);
  });

  it("renders compact device cards when compact device data is returned", async () => {
    (fetchDevices as any).mockResolvedValue(mockCompactResponse);

    const queryString = "test query";
    render(await DeviceGrid({ queryString }));
    const deviceGrid = screen.getByTestId("device-grid");
    expect(deviceGrid).toBeInTheDocument();
    expect(deviceGrid.children.length).toBe(2);
    expect(screen.getByText("GAMEMT E6 Max")).toBeInTheDocument();
    expect(screen.getByText("U8")).toBeInTheDocument();
    // check if text Emulation is not in the document
    expect(screen.queryByText("Emulation:")).not.toBeInTheDocument();
    expect(screen.getByTestId("pagination")).toBeInTheDocument();
  });

  it("renders 'No devices found' message when no devices are returned", async () => {
    const mockEmptyResponse = {
      data: [],
      pagination: {
        total: 0,
        page: 1,
        page_size: 10,
        pages: 1,
      },
    };
    (fetchDevices as any).mockResolvedValue(mockEmptyResponse);
    const { getByText } = render(await DeviceGrid({ queryString: "test" }));
    expect(getByText("No devices found")).toBeInTheDocument();
  });
});
