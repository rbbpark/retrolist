import { render, screen } from "@testing-library/react";
import { ControlBadges } from "./control-badges";

describe("ControlBadges", () => {
  const defaultProps = {
    hasAnalogs: false,
    hasDualAnalogs: false,
    hasHallAnalogs: false,
    hasL3R3: false,
    hasL2R2: false,
    hasAnalogTriggers: false,
    hasShoulderButtons: false,
    hasRumble: false,
  };

  it("renders no badges when all props are false", () => {
    render(<ControlBadges {...defaultProps} />);
    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
  });

  it("renders analog badge when hasAnalogs is true", () => {
    render(<ControlBadges {...defaultProps} hasAnalogs={true} />);
    expect(screen.getByText("Analog")).toBeInTheDocument();
  });

  it("renders dual analog badge when hasDualAnalogs is true", () => {
    render(<ControlBadges {...defaultProps} hasDualAnalogs={true} />);
    expect(screen.getByText("Dual Analog")).toBeInTheDocument();
  });

  it("renders hall effect badge when hasHallAnalogs is true", () => {
    render(<ControlBadges {...defaultProps} hasHallAnalogs={true} />);
    expect(screen.getByText("Hall Effect")).toBeInTheDocument();
  });

  it("renders L3/R3 badge when hasL3R3 is true", () => {
    render(<ControlBadges {...defaultProps} hasL3R3={true} />);
    expect(screen.getByText("L3/R3")).toBeInTheDocument();
  });

  it("renders L2/R2 badge when hasL2R2 is true", () => {
    render(<ControlBadges {...defaultProps} hasL2R2={true} />);
    expect(screen.getByText("L2/R2")).toBeInTheDocument();
  });

  it("renders analog triggers badge when hasAnalogTriggers is true", () => {
    render(<ControlBadges {...defaultProps} hasAnalogTriggers={true} />);
    expect(screen.getByText("Analog Triggers")).toBeInTheDocument();
  });

  it("renders shoulder buttons badge when hasShoulderButtons is true", () => {
    render(<ControlBadges {...defaultProps} hasShoulderButtons={true} />);
    expect(screen.getByText("Shoulder Buttons")).toBeInTheDocument();
  });

  it("renders rumble badge when hasRumble is true", () => {
    render(<ControlBadges {...defaultProps} hasRumble={true} />);
    expect(screen.getByText("Rumble")).toBeInTheDocument();
  });

  it("renders multiple badges when multiple props are true", () => {
    render(
      <ControlBadges
        {...defaultProps}
        hasAnalogs={true}
        hasDualAnalogs={true}
        hasRumble={true}
      />
    );
    expect(screen.getByText("Analog")).toBeInTheDocument();
    expect(screen.getByText("Dual Analog")).toBeInTheDocument();
    expect(screen.getByText("Rumble")).toBeInTheDocument();
  });
});
