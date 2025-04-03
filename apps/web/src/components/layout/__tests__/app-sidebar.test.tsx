import { FilterField } from "@retrolist/shared";
import { AppSidebar } from "../app-sidebar";
import { render } from "@testing-library/react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { vi, Mock } from "vitest";
import userEvent from "@testing-library/user-event";

// Mock window.matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

const mockFilters: FilterField<any>[] = [
  { value: "Vertical", operator: "eq", name: "form_factor" },
  { value: "2560 x 1600", operator: "eq", name: "resolution" },
  { name: "price_low", value: 50, operator: "gte" },
  { name: "price_low", value: 200, operator: "lte" },
];

// Mock next/navigation hooks
vi.mock("next/navigation", () => ({
  usePathname: vi.fn(),
  useSearchParams: vi.fn(),
  useRouter: vi.fn(),
}));

describe("AppSidebar", () => {
  const mockReplace = vi.fn();
  const mockPathname = "/test";
  const mockSearchParams = new URLSearchParams();
  const user = userEvent.setup();

  beforeEach(() => {
    (useRouter as Mock).mockReturnValue({ replace: mockReplace });
    (usePathname as Mock).mockReturnValue(mockPathname);
    (useSearchParams as Mock).mockReturnValue(mockSearchParams);
    vi.clearAllMocks();
  });

  it("should render the sidebar with all filter groups", () => {
    const { getByText } = render(
      <SidebarProvider>
        <AppSidebar filters={mockFilters} />
      </SidebarProvider>
    );

    // Check if all filter group titles are present
    expect(getByText("Form Factor")).toBeInTheDocument();
    expect(getByText("Resolution")).toBeInTheDocument();
    expect(getByText("Aspect Ratio")).toBeInTheDocument();
    expect(getByText("Controls")).toBeInTheDocument();
    expect(getByText("Device")).toBeInTheDocument();
    expect(getByText("Connectivity")).toBeInTheDocument();
  });

  it("should display reset filters button when filters are active", () => {
    const { getByText } = render(
      <SidebarProvider>
        <AppSidebar filters={mockFilters} />
      </SidebarProvider>
    );

    const resetButton = getByText(/Reset filters/);
    expect(resetButton).toBeInTheDocument();
    expect(resetButton).toHaveTextContent(
      `Reset filters (${mockFilters.length})`
    );
  });

  it("should not display reset filters button when no filters are active", () => {
    const { queryByText } = render(
      <SidebarProvider>
        <AppSidebar filters={[]} />
      </SidebarProvider>
    );

    expect(queryByText(/Reset filters/)).not.toBeInTheDocument();
  });

  it("should display correct filter values from props", async () => {
    const { getByText } = render(
      <SidebarProvider>
        <AppSidebar filters={mockFilters} />
      </SidebarProvider>
    );

    // Expand sections
    await user.click(getByText("Form Factor"));
    await user.click(getByText("Resolution"));

    // Check if filter values are displayed
    expect(getByText("Vertical")).toBeInTheDocument();
    expect(getByText("2560 x 1600")).toBeInTheDocument();
  });
});
