import { render, screen } from "@testing-library/react";
import { DetailSelect } from "../detail-select";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { vi, Mock } from "vitest";
import userEvent from "@testing-library/user-event";

// Mock the Next.js navigation hooks
vi.mock("next/navigation", () => ({
  usePathname: vi.fn(),
  useSearchParams: vi.fn(),
  useRouter: vi.fn(),
}));

describe("DetailSelect", () => {
  const mockReplace = vi.fn();
  const mockPathname = "/test";
  const mockSearchParams = new URLSearchParams();
  // Radix UI calls these functions but they are not implemented in jsdom. Mocking to resolve errors
  window.HTMLElement.prototype.hasPointerCapture = vi.fn();
  window.HTMLElement.prototype.scrollIntoView = vi.fn();

  beforeEach(() => {
    // Reset all mocks before each test
    vi.clearAllMocks();

    // Setup default mock implementations
    (useRouter as Mock).mockReturnValue({ replace: mockReplace });
    (usePathname as Mock).mockReturnValue(mockPathname);
    (useSearchParams as Mock).mockReturnValue(mockSearchParams);
  });

  it("renders with Full detail by default", () => {
    render(<DetailSelect />);

    expect(screen.getByText("Detail:")).toBeInTheDocument();
    expect(screen.getByText("Full")).toBeInTheDocument();
  });

  it("renders with Compact detail", () => {
    render(<DetailSelect detail="compact" />);
    expect(screen.getByText("Compact")).toBeInTheDocument();
  });

  it("updates URL when detail value changes", async () => {
    const user = userEvent.setup();
    render(<DetailSelect />);
    // open dropdown
    await user.click(screen.getByRole("combobox"));
    expect(screen.getByText("Compact")).toBeInTheDocument();
    await user.click(screen.getByText("Compact"));
    // url was updated
    expect(mockReplace).toHaveBeenCalledWith("/test?detail=compact");
  });

  it("preserves existing URL parameters when updating detail", async () => {
    // Setup existing URL parameters
    const user = userEvent.setup();
    const existingParams = new URLSearchParams();
    existingParams.set("sort", "price");
    (useSearchParams as Mock).mockReturnValue(existingParams);

    render(<DetailSelect />);

    await user.click(screen.getByRole("combobox"));
    expect(screen.getByText("Compact")).toBeInTheDocument();
    await user.click(screen.getByText("Compact"));

    expect(mockReplace).toHaveBeenCalledWith("/test?sort=price&detail=compact");
  });
});
