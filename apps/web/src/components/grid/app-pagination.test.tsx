import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { AppPagination } from "./app-pagination";
import { usePathname, useSearchParams } from "next/navigation";

// Mock next/navigation hooks
vi.mock("next/navigation", () => ({
  usePathname: vi.fn(),
  useSearchParams: vi.fn(),
}));

describe("AppPagination", () => {
  // Setup default mock values
  beforeEach(() => {
    (usePathname as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
      "/test"
    );
    (useSearchParams as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
      new URLSearchParams()
    );
  });

  it("renders pagination with all pages when total pages is 7 or less", () => {
    render(<AppPagination page={1} pages={5} />);

    // Check if all page numbers are rendered
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();

    // Check if navigation buttons are present
    expect(screen.getByRole("link", { name: /previous/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /next/i })).toBeInTheDocument();
  });

  it("renders pagination with ellipsis when current page is in the middle", () => {
    render(<AppPagination page={5} pages={10} />);

    // Check if first page is rendered
    expect(screen.getByText("1")).toBeInTheDocument();

    // Check if ellipsis is rendered
    const ellipses = screen.getAllByTestId("pagination-ellipsis");
    expect(ellipses).toHaveLength(2);

    // Check if current page and neighbors are rendered
    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("6")).toBeInTheDocument();

    // Check if last page is rendered
    expect(screen.getByText("10")).toBeInTheDocument();
  });

  it("renders pagination with ellipsis when current page is near the start", () => {
    render(<AppPagination page={2} pages={10} />);

    // Check if first three pages are rendered
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();

    // Check if ellipsis is rendered
    expect(screen.getByTestId("pagination-ellipsis")).toBeInTheDocument();

    // Check if last two pages are rendered
    expect(screen.getByText("9")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
  });

  it("renders pagination with ellipsis when current page is near the end", () => {
    render(<AppPagination page={9} pages={10} />);

    // Check if first two pages are rendered
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();

    // Check if ellipsis is rendered
    expect(screen.getByTestId("pagination-ellipsis")).toBeInTheDocument();

    // Check if last three pages are rendered
    expect(screen.getByText("8")).toBeInTheDocument();
    expect(screen.getByText("9")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
  });

  it("disables previous button when on first page", () => {
    render(<AppPagination page={1} pages={5} />);

    const previousButton = screen.getByRole("link", { name: /previous/i });
    expect(previousButton).toHaveAttribute("aria-disabled", "true");
  });

  it("disables next button when on last page", () => {
    render(<AppPagination page={5} pages={5} />);

    const nextButton = screen.getByRole("link", { name: /next/i });
    expect(nextButton).toHaveAttribute("aria-disabled", "true");
  });

  it("marks current page as active", () => {
    render(<AppPagination page={3} pages={5} />);

    const activePage = screen.getByText("3").closest("a");
    expect(activePage).toHaveAttribute("aria-current", "page");
  });

  it("preserves existing search params when creating page URLs", () => {
    const searchParams = new URLSearchParams("sort=asc&filter=test");
    (useSearchParams as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
      searchParams
    );
    render(<AppPagination page={1} pages={5} />);

    const nextButton = screen.getByRole("link", { name: /next/i });
    expect(nextButton).toHaveAttribute(
      "href",
      "/test?sort=asc&filter=test&page=2"
    );
  });
});
