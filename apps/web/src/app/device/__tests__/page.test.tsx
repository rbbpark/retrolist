import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Page from "../page";
import * as utils from "@/lib/utils";
import React from "react";

// Mock the required components
vi.mock("@/components/ui/sidebar", () => ({
  SidebarProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

vi.mock("@/components/layout/app-sidebar", () => ({
  AppSidebar: () => <div data-testid="app-sidebar" />,
}));

vi.mock("@/components/layout/site-header", () => ({
  SiteHeader: () => <div data-testid="site-header" />,
}));

vi.mock("@/components/grid/device-grid", () => ({
  DeviceGrid: ({ queryString }: { queryString: string }) => (
    <div data-testid="device-grid">{queryString}</div>
  ),
}));

vi.mock("@/components/grid/search-input", () => ({
  SearchInput: () => <div data-testid="search-input" />,
}));

vi.mock("@/components/grid/detail-select", () => ({
  DetailSelect: () => <div data-testid="detail-select" />,
}));

vi.mock("@/components/grid/sort-select", () => ({
  SortSelect: () => <div data-testid="sort-select" />,
}));

const mockSearchParams = {
  page: "1",
  page_size: "12",
  detail: "full",
  search: "",
  sort_by: "release_date",
  order: "asc",
};

describe("Device Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all required components", async () => {
    const Result = await Page({ searchParams: mockSearchParams });
    render(Result);

    screen.debug();

    expect(screen.getByTestId("app-sidebar")).toBeDefined();
    expect(screen.getByTestId("site-header")).toBeDefined();
    expect(screen.getByTestId("device-grid")).toBeDefined();
    expect(screen.getByTestId("search-input")).toBeDefined();
    expect(screen.getByTestId("detail-select")).toBeDefined();
    expect(screen.getByTestId("sort-select")).toBeDefined();
  });

  it("handles search params correctly", async () => {
    const Result = await Page({ searchParams: mockSearchParams });
    render(Result);

    expect(screen.getByTestId("device-grid").textContent).toBe(
      "page=1&page_size=12&detail=full&search=&sort_by=release_date&order=asc"
    );
  });
});
