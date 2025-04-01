import { render, screen } from "@testing-library/react";
import { DeviceCardFull } from "./device-card-full";
import { DeviceFullView } from "@retrolist/shared";

const mockDevice = {
  id: "KAphAkrl",
  device_name: "QRD Vortex F5",
  brand: "QRD",
  release_date: "2025-02-01T08:00:00.000Z",
  price_low: 90,
  price_high: null,
  image_id: "image_007aa1db93d96",
  form_factor: "Horizontal",
  screen_size_inches: 5.5,
  resolution: "1280 x 720",
  aspect_ratio: "16:9",
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
  n3ds: 2,
  ps2: 2,
  wiiu: 1,
  switch: 1,
  ps3: 1,
  has_analogs: true,
  has_dual_analogs: true,
  has_hall_analogs: true,
  has_l3_r3: true,
  has_l2_r2: true,
  has_analog_triggers: false,
  has_shoulder_buttons: true,
  has_wifi: false,
  has_bt: true,
  has_lte: false,
  has_usb_otg: true,
  has_thunderbolt: false,
  has_video_output: true,
  has_audio_output: true,
  has_rumble: false,
  has_dual_external_sd: false,
} as DeviceFullView;

describe("DeviceCardFull", () => {
  it("renders device name and brand", () => {
    render(<DeviceCardFull device={mockDevice} />);
    expect(screen.getByText("QRD Vortex F5")).toBeInTheDocument();
    expect(screen.getByText("QRD")).toBeInTheDocument();
  });

  it("renders formatted release date", () => {
    render(<DeviceCardFull device={mockDevice} />);
    expect(screen.getByText("February 2025")).toBeInTheDocument();
  });

  it("renders device specifications", () => {
    render(<DeviceCardFull device={mockDevice} />);
    expect(screen.getByText(/Form Factor:/)).toBeInTheDocument();
    expect(screen.getByText(/Screen:/)).toBeInTheDocument();
    expect(screen.getByText(/Aspect Ratio:/)).toBeInTheDocument();
    expect(screen.getByText(/Material:/)).toBeInTheDocument();
  });

  it("renders price correctly when only price_low is available", () => {
    render(<DeviceCardFull device={mockDevice} />);
    expect(screen.getByText("$90")).toBeInTheDocument();
  });

  it("renders price range when both price_low and price_high are available", () => {
    const deviceWithPriceRange = {
      ...mockDevice,
      price_high: 120,
    };
    render(<DeviceCardFull device={deviceWithPriceRange} />);
    expect(screen.getByText("$90 - $120")).toBeInTheDocument();
  });

  it("renders device image with correct attributes", () => {
    render(<DeviceCardFull device={mockDevice} />);
    const image = screen.getByAltText("Picture of the device");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("width", "200");
    expect(image).toHaveAttribute("height", "200");
    expect(image).toHaveAttribute(
      "src",
      expect.stringContaining(mockDevice.image_id)
    );
  });

  it("renders section headers for features", () => {
    render(<DeviceCardFull device={mockDevice} />);
    expect(screen.getByText("Emulation:")).toBeInTheDocument();
    expect(screen.getByText("Controls:")).toBeInTheDocument();
    expect(screen.getByText("Connectivity:")).toBeInTheDocument();
  });
});
