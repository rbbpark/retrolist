import { fetchDevices, fetchDeviceById } from "../data";
import { vi } from "vitest";
import {
  mockFullResponse,
  mockGetDeviceByIdResponse,
} from "@tests/fixtures/mockData";

describe("fetchDevices", () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("should successfully fetch devices", async () => {
    const mockResponse = {
      ok: true,
      json: () => Promise.resolve(mockFullResponse),
    };
    (global.fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce(
      mockResponse
    );

    const result = await fetchDevices("page=1&page_size=10");
    expect(result).toEqual(mockFullResponse);
    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:3001/api/device?page=1&page_size=10"
    );
  });

  it("should handle network error", async () => {
    (global.fetch as unknown as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
      new Error("Network error")
    );

    await expect(fetchDevices("")).rejects.toThrow(
      "Failed to fetch devices data."
    );
  });

  it("should handle non-ok response", async () => {
    const mockResponse = {
      ok: false,
      status: 404,
    };
    (global.fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce(
      mockResponse
    );

    await expect(fetchDevices("")).rejects.toThrow(
      "Failed to fetch devices data."
    );
  });

  it("should handle validation error", async () => {
    const invalidResponse = {
      pagination: {
        total: 0,
        page: 1,
        page_size: 10,
        pages: 0,
      },
    };
    const mockResponse = {
      ok: true,
      json: () => Promise.resolve(invalidResponse),
    };
    (global.fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce(
      mockResponse
    );

    await expect(fetchDevices("")).rejects.toThrow(
      "Failed to fetch devices data."
    );
  });
});

describe("fetchDeviceById", () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("should successfully fetch a device by id", async () => {
    const mockResponse = {
      ok: true,
      json: () => Promise.resolve(mockGetDeviceByIdResponse),
    };
    (global.fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce(
      mockResponse
    );

    const result = await fetchDeviceById("AQsRiYmd");
    expect(result).toEqual(mockGetDeviceByIdResponse);
    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:3001/api/device/AQsRiYmd"
    );
  });

  it("should handle network error", async () => {
    (global.fetch as unknown as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
      new Error("Network error")
    );

    await expect(fetchDeviceById("AQsRiYmd")).rejects.toThrow(
      "Failed to fetch device data."
    );
  });

  it("should handle non-ok response", async () => {
    const mockResponse = {
      ok: false,
      status: 404,
    };
    (global.fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce(
      mockResponse
    );

    await expect(fetchDeviceById("AQsRiYmd")).rejects.toThrow(
      "Failed to fetch device data."
    );
  });

  it("should handle validation error", async () => {
    const invalidResponse = {
      id: "invalid",
      // Missing required fields
    };
    const mockResponse = {
      ok: true,
      json: () => Promise.resolve(invalidResponse),
    };
    (global.fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce(
      mockResponse
    );

    await expect(fetchDeviceById("AQsRiYmd")).rejects.toThrow(
      "Failed to fetch device data."
    );
  });
});
