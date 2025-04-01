import { render, screen } from "@testing-library/react";
import { CompatibilityBadges } from "../compatibility-badges";

describe("CompatibilityBadges", () => {
  const defaultProps = {
    gbc: 0,
    nes: 0,
    genesis: 0,
    gba: 0,
    snes: 0,
    psx: 0,
    nds: 0,
    n64: 0,
    dreamcast: 0,
    psp: 0,
    saturn: 0,
    ngc: 0,
    wii: 0,
    n3ds: 0,
    ps2: 0,
    wiiu: 0,
    switch: 0,
    ps3: 0,
  };

  it("renders no badges when all ratings are 0", () => {
    render(<CompatibilityBadges {...defaultProps} />);
    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
  });

  it("renders badge with correct color for rating >= 4", () => {
    render(<CompatibilityBadges {...defaultProps} gbc={5} />);
    const badge = screen.getByText("GBC");
    expect(badge).toHaveClass("bg-green-500");
  });

  it("renders badge with correct color for rating >= 3", () => {
    render(<CompatibilityBadges {...defaultProps} nes={3} />);
    const badge = screen.getByText("NES");
    expect(badge).toHaveClass("bg-yellow-500");
  });

  it("renders badge with correct color for rating >= 2", () => {
    render(<CompatibilityBadges {...defaultProps} genesis={2} />);
    const badge = screen.getByText("Genesis");
    expect(badge).toHaveClass("bg-orange-500");
  });

  it("renders badge with correct color for rating < 2", () => {
    render(<CompatibilityBadges {...defaultProps} gba={1} />);
    const badge = screen.getByText("GBA");
    expect(badge).toHaveClass("bg-red-500");
  });

  it("renders multiple badges when multiple ratings are provided", () => {
    render(
      <CompatibilityBadges
        {...defaultProps}
        gbc={5}
        nes={3}
        genesis={2}
        gba={1}
      />
    );
    expect(screen.getByText("GBC")).toBeInTheDocument();
    expect(screen.getByText("NES")).toBeInTheDocument();
    expect(screen.getByText("Genesis")).toBeInTheDocument();
    expect(screen.getByText("GBA")).toBeInTheDocument();
  });

  it("filters out ratings that are 0 or undefined", () => {
    render(
      <CompatibilityBadges
        {...defaultProps}
        gbc={5}
        nes={0}
        genesis={undefined}
        gba={3}
      />
    );
    expect(screen.getByText("GBC")).toBeInTheDocument();
    expect(screen.queryByText("NES")).not.toBeInTheDocument();
    expect(screen.queryByText("Genesis")).not.toBeInTheDocument();
    expect(screen.getByText("GBA")).toBeInTheDocument();
  });
});
