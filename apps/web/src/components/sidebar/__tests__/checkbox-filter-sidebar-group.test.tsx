import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { CheckboxFilterSidebarGroup } from "../checkbox-filter-sidebar-group";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { userEvent } from "@testing-library/user-event";

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

  it("renders with the correct title and options", async () => {
    const user = userEvent.setup();
    render(
      <CheckboxFilterSidebarGroup title="Test Group" options={mockOptions} />
    );

    // click on collapsible header
    const testGroup = screen.getByText("Test Group");
    expect(testGroup).toBeInTheDocument();
    await user.click(testGroup);

    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.getByText("Option 2")).toBeInTheDocument();
  });

  it("handles checkbox state changes correctly", async () => {
    const user = userEvent.setup();
    render(
      <CheckboxFilterSidebarGroup title="Test Group" options={mockOptions} />
    );

    // click on collapsible header
    const testGroup = screen.getByText("Test Group");
    expect(testGroup).toBeInTheDocument();
    await user.click(testGroup);

    // find button before Option 1
    const option1 = screen.getByText("Option 1").previousSibling;
    await user.click(option1 as Element);

    expect(mockReplace).toHaveBeenCalledWith("/test?page=1&option1=true");
  });

  it("removes parameter when checkbox is unchecked", async () => {
    const user = userEvent.setup();

    // Set up initial state with option2 checked
    mockSearchParams.set("option2", "true");

    render(
      <CheckboxFilterSidebarGroup title="Test Group" options={mockOptions} />
    );

    // click on collapsible header
    const testGroup = screen.getByText("Test Group");
    expect(testGroup).toBeInTheDocument();
    await user.click(testGroup);

    const option2 = screen.getByText("Option 2").previousSibling;
    await user.click(option2 as Element);

    expect(mockReplace).toHaveBeenCalledWith("/test?page=1");
  });
});
