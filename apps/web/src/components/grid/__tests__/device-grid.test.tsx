import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { DeviceGrid } from "../device-grid";
import { fetchDevices } from "@/lib/data";
import {
  mockFullResponse,
  mockCompactResponse,
} from "@tests/fixtures/mockData";

// Mock the fetchDevices function
vi.mock("@/lib/data", () => ({
  fetchDevices: vi.fn(),
}));

describe("DeviceGrid", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders a grid with two devices", async () => {
    (fetchDevices as any).mockResolvedValue(mockFullResponse);
    const queryString = "test query";
    render(await DeviceGrid({ queryString }));
    const deviceGrid = screen.getByTestId("device-grid");
    expect(deviceGrid).toBeInTheDocument();
    expect(deviceGrid.children.length).toBe(2);
    expect(screen.getByText("MSI Claw 7 AI+")).toBeInTheDocument();
    expect(screen.getByText("V20")).toBeInTheDocument();
    expect(screen.getAllByText("Emulation:")).toHaveLength(2);
    expect(screen.getByTestId("pagination")).toBeInTheDocument();
  });

  it("calls fetchDevices with the provided queryString", async () => {
    (fetchDevices as any).mockResolvedValue(mockFullResponse);

    const queryString = "test query";
    render(await DeviceGrid({ queryString }));

    expect(fetchDevices).toHaveBeenCalledWith(queryString);
  });

  it("renders compact device cards when compact device data is returned", async () => {
    (fetchDevices as any).mockResolvedValue(mockCompactResponse);

    const queryString = "test query";
    render(await DeviceGrid({ queryString }));
    const deviceGrid = screen.getByTestId("device-grid");
    expect(deviceGrid).toBeInTheDocument();
    expect(deviceGrid.children.length).toBe(2);
    expect(screen.getByText("GAMEMT E6 Max")).toBeInTheDocument();
    expect(screen.getByText("U8")).toBeInTheDocument();
    // check if text Emulation is not in the document
    expect(screen.queryByText("Emulation:")).not.toBeInTheDocument();
    expect(screen.getByTestId("pagination")).toBeInTheDocument();
  });

  it("renders 'No devices found' message when no devices are returned", async () => {
    const mockEmptyResponse = {
      data: [],
      pagination: {
        total: 0,
        page: 1,
        page_size: 10,
        pages: 1,
      },
    };
    (fetchDevices as any).mockResolvedValue(mockEmptyResponse);
    const { getByText } = render(await DeviceGrid({ queryString: "test" }));
    expect(getByText("No devices found")).toBeInTheDocument();
  });
});
