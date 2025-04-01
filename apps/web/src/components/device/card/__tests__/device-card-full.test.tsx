import { render, screen } from "@testing-library/react";
import { DeviceCardFull } from "../device-card-full";
import { mockFullDevice } from "@tests/fixtures/mockData";

describe("DeviceCardFull", () => {
  it("renders device name and brand", () => {
    render(<DeviceCardFull device={mockFullDevice} />);
    expect(screen.getByText("QRD Vortex F5")).toBeInTheDocument();
    expect(screen.getByText("QRD")).toBeInTheDocument();
  });

  it("renders formatted release date", () => {
    render(<DeviceCardFull device={mockFullDevice} />);
    expect(screen.getByText("February 2025")).toBeInTheDocument();
  });

  it("renders device specifications", () => {
    render(<DeviceCardFull device={mockFullDevice} />);
    expect(screen.getByText(/Form Factor:/)).toBeInTheDocument();
    expect(screen.getByText(/Screen:/)).toBeInTheDocument();
    expect(screen.getByText(/Aspect Ratio:/)).toBeInTheDocument();
    expect(screen.getByText(/Material:/)).toBeInTheDocument();
  });

  it("renders price correctly when only price_low is available", () => {
    render(<DeviceCardFull device={mockFullDevice} />);
    expect(screen.getByText("$90")).toBeInTheDocument();
  });

  it("renders price range when both price_low and price_high are available", () => {
    const deviceWithPriceRange = {
      ...mockFullDevice,
      price_high: 120,
    };
    render(<DeviceCardFull device={deviceWithPriceRange} />);
    expect(screen.getByText("$90 - $120")).toBeInTheDocument();
  });

  it("renders device image with correct attributes", () => {
    render(<DeviceCardFull device={mockFullDevice} />);
    const image = screen.getByAltText("Picture of the device");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("width", "200");
    expect(image).toHaveAttribute("height", "200");
    expect(image).toHaveAttribute(
      "src",
      expect.stringContaining(mockFullDevice.image_id)
    );
  });

  it("renders section headers for features", () => {
    render(<DeviceCardFull device={mockFullDevice} />);
    expect(screen.getByText("Emulation:")).toBeInTheDocument();
    expect(screen.getByText("Controls:")).toBeInTheDocument();
    expect(screen.getByText("Connectivity:")).toBeInTheDocument();
  });
});
