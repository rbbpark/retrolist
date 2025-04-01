import { render, screen, fireEvent } from "@testing-library/react";
import { SearchInput } from "../search-input";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { vi, Mock } from "vitest";
import userEvent from "@testing-library/user-event";

// Mock the Next.js navigation hooks
vi.mock("next/navigation", () => ({
  usePathname: vi.fn(),
  useSearchParams: vi.fn(),
  useRouter: vi.fn(),
}));

describe("SearchInput", () => {
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

  it("renders the search input with default placeholder", () => {
    render(<SearchInput />);
    expect(
      screen.getByPlaceholderText("Search device name or brand")
    ).toBeInTheDocument();
  });

  it("renders with initial search text if provided", () => {
    render(<SearchInput searchText="initial search" />);
    const input = screen.getByPlaceholderText("Search device name or brand");
    expect(input).toHaveValue("initial search");
  });

  it("updates search text when user types", async () => {
    const user = userEvent.setup();
    render(<SearchInput />);

    const input = screen.getByPlaceholderText("Search device name or brand");
    await user.type(input, "test search");

    expect(input).toHaveValue("test search");
  });

  it("updates URL when user presses Enter", async () => {
    const user = userEvent.setup();
    render(<SearchInput />);

    const input = screen.getByPlaceholderText("Search device name or brand");
    await user.type(input, "test search");
    await user.keyboard("{Enter}");

    expect(mockReplace).toHaveBeenCalledWith("/test?page=1&search=test+search");
  });

  it("removes search parameter from URL when search is empty", async () => {
    const user = userEvent.setup();
    render(<SearchInput />);

    const input = screen.getByPlaceholderText("Search device name or brand");
    await user.type(input, "test search");
    await user.keyboard("{Enter}");
    await user.clear(input);
    await user.keyboard("{Enter}");

    expect(mockReplace).toHaveBeenCalledWith("/test?page=1");
  });

  it("preserves existing URL parameters when updating search", async () => {
    const existingParams = new URLSearchParams();
    existingParams.set("sort", "price");
    (useSearchParams as Mock).mockReturnValue(existingParams);

    const user = userEvent.setup();
    render(<SearchInput />);

    const input = screen.getByPlaceholderText("Search device name or brand");
    await user.type(input, "test search");
    await user.keyboard("{Enter}");

    expect(mockReplace).toHaveBeenCalledWith(
      "/test?sort=price&page=1&search=test+search"
    );
  });

  it("updates search text when searchText prop changes", () => {
    const { rerender } = render(<SearchInput searchText="initial" />);
    expect(
      screen.getByPlaceholderText("Search device name or brand")
    ).toHaveValue("initial");

    rerender(<SearchInput searchText="updated" />);
    expect(
      screen.getByPlaceholderText("Search device name or brand")
    ).toHaveValue("updated");
  });
});
