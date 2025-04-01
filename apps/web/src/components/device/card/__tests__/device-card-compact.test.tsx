import { render, screen } from "@testing-library/react";
import { DeviceCardCompact } from "../device-card-compact";
import { mockCompactDevice } from "@tests/fixtures/mockData";

describe("DeviceCardCompact", () => {
  it("renders device name and brand", () => {
    render(<DeviceCardCompact device={mockCompactDevice} />);
    expect(screen.getByText("QRD Vortex F5")).toBeInTheDocument();
    expect(screen.getByText("QRD")).toBeInTheDocument();
  });

  it("renders formatted release date", () => {
    render(<DeviceCardCompact device={mockCompactDevice} />);
    expect(screen.getByText("February 2025")).toBeInTheDocument();
  });

  it("renders device specifications as badges", () => {
    render(<DeviceCardCompact device={mockCompactDevice} />);
    expect(screen.getByText("Horizontal")).toBeInTheDocument();
    expect(screen.getByText('5.5"')).toBeInTheDocument();
  });

  it("renders price correctly when only price_low is available", () => {
    render(<DeviceCardCompact device={mockCompactDevice} />);
    expect(screen.getByText("$90")).toBeInTheDocument();
  });

  it("renders price range when both price_low and price_high are available", () => {
    const deviceWithPriceRange = {
      ...mockCompactDevice,
      price_high: 120,
    };
    render(<DeviceCardCompact device={deviceWithPriceRange} />);
    expect(screen.getByText("$90 - $120")).toBeInTheDocument();
  });

  it("renders device image with correct attributes", () => {
    render(<DeviceCardCompact device={mockCompactDevice} />);
    const image = screen.getByAltText("Picture of the device");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("width", "150");
    expect(image).toHaveAttribute("height", "150");
    expect(image).toHaveAttribute(
      "src",
      expect.stringContaining(mockCompactDevice.image_id)
    );
  });

  it("renders as a link to the device detail page", () => {
    render(<DeviceCardCompact device={mockCompactDevice} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", `/device/${mockCompactDevice.id}`);
  });
});
