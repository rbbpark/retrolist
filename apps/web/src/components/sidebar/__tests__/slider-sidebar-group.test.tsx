import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { SliderSidebarGroup } from "@/components/sidebar/slider-sidebar-group";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import userEvent from "@testing-library/user-event";

// Mock ResizeObserver
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.ResizeObserver = ResizeObserver;

// Mock the next/navigation hooks
vi.mock("next/navigation", () => ({
  useSearchParams: vi.fn(),
  usePathname: vi.fn(),
  useRouter: vi.fn(),
}));

describe("SliderSidebarGroup", () => {
  const mockProps = {
    title: "Test Range",
    min: 0,
    max: 100,
    step: 1,
    minParamName: "minValue",
    maxParamName: "maxValue",
    values: {},
  };

  const mockRouter = {
    replace: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (useRouter as any).mockReturnValue(mockRouter);
    (usePathname as any).mockReturnValue("/test");
    (useSearchParams as any).mockReturnValue(new URLSearchParams());
  });

  it("renders with default values", () => {
    render(<SliderSidebarGroup {...mockProps} />);

    expect(screen.getByText("Test Range")).toBeInTheDocument();
  });

  it("renders with provided values", async () => {
    const user = userEvent.setup();
    const propsWithValues = {
      ...mockProps,
      values: {
        minValue: 20,
        maxValue: 80,
      },
    };

    render(<SliderSidebarGroup {...propsWithValues} />);

    // click on collapsible header
    const header = screen.getByText("Test Range");
    expect(header).toBeInTheDocument();
    await user.click(header);

    const lowInput = screen.getByPlaceholderText("Low");
    const highInput = screen.getByPlaceholderText("High");

    expect(lowInput).toHaveValue(20);
    expect(highInput).toHaveValue(80);
  });

  it("updates URL parameters when Apply is clicked", async () => {
    const user = userEvent.setup();
    render(<SliderSidebarGroup {...mockProps} />);

    // click on collapsible header
    const header = screen.getByText("Test Range");
    expect(header).toBeInTheDocument();
    await user.click(header);

    const applyButton = screen.getByRole("button", { name: /apply/i });
    await user.click(applyButton);

    expect(mockRouter.replace).toHaveBeenCalledWith(
      expect.stringContaining("page=1")
    );
  });

  it("clears URL parameters when values are at min/max", async () => {
    const user = userEvent.setup();

    const propsWithMinMax = {
      ...mockProps,
      values: {
        minValue: 0,
        maxValue: 100,
      },
    };

    render(<SliderSidebarGroup {...propsWithMinMax} />);

    // click on collapsible header
    const header = screen.getByText("Test Range");
    expect(header).toBeInTheDocument();
    await user.click(header);

    const applyButton = screen.getByRole("button", { name: /apply/i });
    await user.click(applyButton);

    expect(mockRouter.replace).toHaveBeenCalledWith(
      expect.not.stringContaining("minValue")
    );
    expect(mockRouter.replace).toHaveBeenCalledWith(
      expect.not.stringContaining("maxValue")
    );
  });
});
