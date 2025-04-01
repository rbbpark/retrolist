import { render, screen } from "@testing-library/react";
import { SortSelect } from "./sort-select";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { vi, Mock } from "vitest";
import userEvent from "@testing-library/user-event";

// Mock the Next.js navigation hooks
vi.mock("next/navigation", () => ({
  usePathname: vi.fn(),
  useSearchParams: vi.fn(),
  useRouter: vi.fn(),
}));

describe("SortSelect", () => {
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

  it("renders with default sort option (Release date latest)", () => {
    render(<SortSelect />);
    expect(screen.getByText("Sort:")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toHaveTextContent(
      "Release date (latest)"
    );
  });

  it("renders with custom initial sort option", () => {
    render(<SortSelect sortBy="device_name" order="asc" />);
    expect(screen.getByRole("combobox")).toHaveTextContent(
      "Alphabetically, A-Z"
    );
  });

  it("updates URL when selecting a new sort option", async () => {
    const user = userEvent.setup();
    render(<SortSelect />);

    // Open the select dropdown
    await user.click(screen.getByRole("combobox"));

    // Select "Price (highest)" option
    await user.click(screen.getByText("Price (highest)"));

    expect(mockReplace).toHaveBeenCalledWith(
      "/test?page=1&sort_by=price_low&order=desc"
    );
  });

  it("preserves existing URL parameters when updating sort", async () => {
    const existingParams = new URLSearchParams();
    existingParams.set("search", "test");
    (useSearchParams as Mock).mockReturnValue(existingParams);

    const user = userEvent.setup();
    render(<SortSelect />);

    await user.click(screen.getByRole("combobox"));
    await user.click(screen.getByText("Price (highest)"));

    expect(mockReplace).toHaveBeenCalledWith(
      "/test?search=test&page=1&sort_by=price_low&order=desc"
    );
  });

  it("renders all sort options", async () => {
    const user = userEvent.setup();
    render(<SortSelect />);

    await user.click(screen.getByRole("combobox"));

    // Check if all sort options are present
    expect(screen.getByText("Alphabetically, A-Z")).toBeInTheDocument();
    expect(screen.getByText("Alphabetically, Z-A")).toBeInTheDocument();
    expect(screen.getByText("Price (highest)")).toBeInTheDocument();
    expect(screen.getByText("Price (lowest)")).toBeInTheDocument();
    expect(screen.getAllByText("Release date (latest)")).toHaveLength(2);
    expect(screen.getByText("Release date (oldest)")).toBeInTheDocument();
    expect(screen.getByText("Screen size (largest)")).toBeInTheDocument();
    expect(screen.getByText("Screen size (smallest)")).toBeInTheDocument();
  });

  it("resets page to 1 when changing sort", async () => {
    const existingParams = new URLSearchParams();
    existingParams.set("page", "2");
    (useSearchParams as Mock).mockReturnValue(existingParams);

    const user = userEvent.setup();
    render(<SortSelect />);

    await user.click(screen.getByRole("combobox"));
    await user.click(screen.getByText("Price (highest)"));

    expect(mockReplace).toHaveBeenCalledWith(
      "/test?page=1&sort_by=price_low&order=desc"
    );
  });
});
