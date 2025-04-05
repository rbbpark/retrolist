import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { SiteHeader } from "../site-header";
import { SidebarProvider } from "@/components/ui/sidebar";

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

describe("SiteHeader", () => {
  it("renders the header with all required elements", () => {
    render(
      <SidebarProvider>
        <SiteHeader />
      </SidebarProvider>
    );

    // Check if header exists with correct classes
    const header = screen.getByRole("banner");
    expect(header).toBeInTheDocument();

    // Check if sidebar trigger exists with proper accessibility
    const sidebarTrigger = screen.getByRole("button", {
      name: /toggle sidebar/i,
    });
    expect(sidebarTrigger).toBeInTheDocument();

    // Check if Retrolist link exists
    const retrolistLink = screen.getByRole("link", { name: "retrolist" });
    expect(retrolistLink).toBeInTheDocument();
    expect(retrolistLink).toHaveAttribute("href", "/device");

    // Check if mode toggle exists
    const modeToggle = screen.getByRole("button", { name: /toggle theme/i });
    expect(modeToggle).toBeInTheDocument();
  });
});
