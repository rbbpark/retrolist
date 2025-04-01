import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { CheckboxFilterSidebarGroup } from "../checkbox-filter-sidebar-group";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

// Mock the next/navigation hooks
vi.mock("next/navigation", () => ({
  useSearchParams: vi.fn(),
  usePathname: vi.fn(),
  useRouter: vi.fn(),
}));

describe("CheckboxFilterSidebarGroup", () => {
  const mockOptions = [
    { id: "option1", title: "Option 1", value: false },
    { id: "option2", title: "Option 2", value: true },
  ];

  const mockReplace = vi.fn();
  const mockSearchParams = new URLSearchParams();
  const mockPathname = "/test";

  beforeEach(() => {
    vi.clearAllMocks();
    (useRouter as any).mockReturnValue({ replace: mockReplace });
    (useSearchParams as any).mockReturnValue(mockSearchParams);
    (usePathname as any).mockReturnValue(mockPathname);
  });

  it("renders with the correct title and options", () => {
    render(
      <CheckboxFilterSidebarGroup title="Test Group" options={mockOptions} />
    );

    expect(screen.getByText("Test Group")).toBeInTheDocument();
    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.getByText("Option 2")).toBeInTheDocument();
  });

  it("handles checkbox state changes correctly", () => {
    render(
      <CheckboxFilterSidebarGroup title="Test Group" options={mockOptions} />
    );

    const option1Checkbox = screen.getByRole("checkbox", { name: "Option 1" });
    fireEvent.click(option1Checkbox);

    expect(mockReplace).toHaveBeenCalledWith("/test?page=1&option1=true");
  });

  it("removes parameter when checkbox is unchecked", () => {
    // Set up initial state with option2 checked
    mockSearchParams.set("option2", "true");

    render(
      <CheckboxFilterSidebarGroup title="Test Group" options={mockOptions} />
    );

    const option2Checkbox = screen.getByRole("checkbox", { name: "Option 2" });
    fireEvent.click(option2Checkbox);

    expect(mockReplace).toHaveBeenCalledWith("/test?page=1");
  });

  it("toggles collapsible section when clicking the trigger", () => {
    render(
      <CheckboxFilterSidebarGroup title="Test Group" options={mockOptions} />
    );

    const trigger = screen.getByText("Test Group");
    fireEvent.click(trigger);

    // Check if the content is visible
    expect(screen.getByText("Option 1")).toBeVisible();
    expect(screen.getByText("Option 2")).toBeVisible();
  });
});
