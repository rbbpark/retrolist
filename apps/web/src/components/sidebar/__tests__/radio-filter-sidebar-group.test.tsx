import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { RadioFilterSidebarGroup } from "../radio-filter-sidebar-group";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import userEvent from "@testing-library/user-event";

// Mock the next/navigation hooks
vi.mock("next/navigation", () => ({
  useSearchParams: vi.fn(),
  usePathname: vi.fn(),
  useRouter: vi.fn(),
}));

describe("RadioFilterSidebarGroup", () => {
  const mockReplace = vi.fn();
  const mockSearchParams = new URLSearchParams();
  const mockPathname = "/test";

  beforeEach(() => {
    vi.clearAllMocks();
    (useRouter as any).mockReturnValue({ replace: mockReplace });
    (useSearchParams as any).mockReturnValue(mockSearchParams);
    (usePathname as any).mockReturnValue(mockPathname);
  });

  it("renders with default props", async () => {
    const user = userEvent.setup();
    render(
      <RadioFilterSidebarGroup
        title="Test Group"
        id="test-group"
        options={["Option 1", "Option 2"]}
      />
    );

    expect(screen.getByText("Test Group")).toBeInTheDocument();

    // click on collapsible header
    const testGroup = screen.getByText("Test Group");
    expect(testGroup).toBeInTheDocument();
    await user.click(testGroup);

    expect(screen.getByText("None")).toBeInTheDocument();
    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.getByText("Option 2")).toBeInTheDocument();
  });

  it("updates URL when selecting an option", async () => {
    const user = userEvent.setup();
    render(
      <RadioFilterSidebarGroup
        title="Test Group"
        id="test-group"
        options={["Option 1", "Option 2"]}
      />
    );

    // click on collapsible header
    const testGroup = screen.getByText("Test Group");
    expect(testGroup).toBeInTheDocument();
    await user.click(testGroup);

    const option1Radio = screen.getByLabelText("Option 1");
    await user.click(option1Radio);

    expect(mockReplace).toHaveBeenCalledWith(
      "/test?page=1&test-group=Option+1"
    );
  });

  it("removes parameter from URL when selecting 'None'", async () => {
    const user = userEvent.setup();
    // Set initial search params with a value
    mockSearchParams.set("test-group", "Option 1");

    render(
      <RadioFilterSidebarGroup
        title="Test Group"
        id="test-group"
        options={["Option 1", "Option 2"]}
        value="Option 1"
      />
    );

    // click on collapsible header
    const testGroup = screen.getByText("Test Group");
    expect(testGroup).toBeInTheDocument();
    await user.click(testGroup);

    const noneRadio = screen.getByLabelText("None");
    await user.click(noneRadio);

    expect(mockReplace).toHaveBeenCalledWith("/test?page=1");
  });

  it("preserves existing URL parameters when updating", async () => {
    const user = userEvent.setup();
    mockSearchParams.set("existing-param", "value");

    render(
      <RadioFilterSidebarGroup
        title="Test Group"
        id="test-group"
        options={["Option 1", "Option 2"]}
      />
    );

    // click on collapsible header
    const testGroup = screen.getByText("Test Group");
    expect(testGroup).toBeInTheDocument();
    await user.click(testGroup);

    const option1Radio = screen.getByLabelText("Option 1");
    await user.click(option1Radio);

    expect(mockReplace).toHaveBeenCalledWith(
      "/test?test-group=Option+1&existing-param=value&page=1"
    );
  });
});
