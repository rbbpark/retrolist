import { render, screen } from "@testing-library/react";
import { ConnectivityBadges } from "./connectivity-badges";

describe("ConnectivityBadges", () => {
  const defaultProps = {
    hasWifi: false,
    hasBt: false,
    hasLte: false,
    hasUsbOtg: false,
    hasThunderbolt: false,
    hasVideoOutput: false,
    hasAudioOutput: false,
    hasDualExternalSD: false,
  };

  it("renders no badges when all props are false", () => {
    render(<ConnectivityBadges {...defaultProps} />);
    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
  });

  it("renders Wi-Fi badge when hasWifi is true", () => {
    render(<ConnectivityBadges {...defaultProps} hasWifi={true} />);
    expect(screen.getByText("Wi-Fi")).toBeInTheDocument();
  });

  it("renders Bluetooth badge when hasBt is true", () => {
    render(<ConnectivityBadges {...defaultProps} hasBt={true} />);
    expect(screen.getByText("Bluetooth")).toBeInTheDocument();
  });

  it("renders LTE badge when hasLte is true", () => {
    render(<ConnectivityBadges {...defaultProps} hasLte={true} />);
    expect(screen.getByText("LTE")).toBeInTheDocument();
  });

  it("renders USB OTG badge when hasUsbOtg is true", () => {
    render(<ConnectivityBadges {...defaultProps} hasUsbOtg={true} />);
    expect(screen.getByText("USB OTG")).toBeInTheDocument();
  });

  it("renders Thunderbolt badge when hasThunderbolt is true", () => {
    render(<ConnectivityBadges {...defaultProps} hasThunderbolt={true} />);
    expect(screen.getByText("Thunderbolt")).toBeInTheDocument();
  });

  it("renders Video Output badge when hasVideoOutput is true", () => {
    render(<ConnectivityBadges {...defaultProps} hasVideoOutput={true} />);
    expect(screen.getByText("Video Output")).toBeInTheDocument();
  });

  it("renders Audio Output badge when hasAudioOutput is true", () => {
    render(<ConnectivityBadges {...defaultProps} hasAudioOutput={true} />);
    expect(screen.getByText("Audio Output")).toBeInTheDocument();
  });

  it("renders Dual External SD badge when hasDualExternalSD is true", () => {
    render(<ConnectivityBadges {...defaultProps} hasDualExternalSD={true} />);
    expect(screen.getByText("Dual External SD")).toBeInTheDocument();
  });

  it("renders multiple badges when multiple props are true", () => {
    render(
      <ConnectivityBadges
        {...defaultProps}
        hasWifi={true}
        hasBt={true}
        hasUsbOtg={true}
      />
    );
    expect(screen.getByText("Wi-Fi")).toBeInTheDocument();
    expect(screen.getByText("Bluetooth")).toBeInTheDocument();
    expect(screen.getByText("USB OTG")).toBeInTheDocument();
  });
});
