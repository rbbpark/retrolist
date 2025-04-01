import { render, screen } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { vi, Mock } from "vitest";
import { BackButton } from "../back-button";

// Mock the Next.js navigation hooks
vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

describe("BackButton", () => {
  const mockBack = vi.fn();

  beforeEach(() => {
    // Reset all mocks before each test
    vi.clearAllMocks();

    // Setup default mock implementations
    (useRouter as Mock).mockReturnValue({ back: mockBack });
  });

  it("renders the back button with correct styling", () => {
    render(<BackButton />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("h-8", "w-8", "cursor-pointer");
  });

  it("calls router.back() when clicked", async () => {
    render(<BackButton />);
    const button = screen.getByRole("button");
    await button.click();
    expect(mockBack).toHaveBeenCalledTimes(1);
  });
});
