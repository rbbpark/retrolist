import { render, screen } from "@testing-library/react";
import { DeviceCardCompact } from "./device-card-compact";
import { DeviceCompactView } from "@retrolist/shared";

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
} as DeviceCompactView;

describe("DeviceCardCompact", () => {
  it("renders device name and brand", () => {
    render(<DeviceCardCompact device={mockDevice} />);
    expect(screen.getByText("QRD Vortex F5")).toBeInTheDocument();
    expect(screen.getByText("QRD")).toBeInTheDocument();
  });

  it("renders formatted release date", () => {
    render(<DeviceCardCompact device={mockDevice} />);
    expect(screen.getByText("February 2025")).toBeInTheDocument();
  });

  it("renders device specifications as badges", () => {
    render(<DeviceCardCompact device={mockDevice} />);
    expect(screen.getByText("Horizontal")).toBeInTheDocument();
    expect(screen.getByText('5.5"')).toBeInTheDocument();
  });

  it("renders price correctly when only price_low is available", () => {
    render(<DeviceCardCompact device={mockDevice} />);
    expect(screen.getByText("$90")).toBeInTheDocument();
  });

  it("renders price range when both price_low and price_high are available", () => {
    const deviceWithPriceRange = {
      ...mockDevice,
      price_high: 120,
    };
    render(<DeviceCardCompact device={deviceWithPriceRange} />);
    expect(screen.getByText("$90 - $120")).toBeInTheDocument();
  });

  it("renders device image with correct attributes", () => {
    render(<DeviceCardCompact device={mockDevice} />);
    const image = screen.getByAltText("Picture of the device");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("width", "150");
    expect(image).toHaveAttribute("height", "150");
    expect(image).toHaveAttribute(
      "src",
      expect.stringContaining(mockDevice.image_id)
    );
  });

  it("renders as a link to the device detail page", () => {
    render(<DeviceCardCompact device={mockDevice} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", `/device/${mockDevice.id}`);
  });
});
