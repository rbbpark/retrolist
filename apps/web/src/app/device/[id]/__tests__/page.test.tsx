import { vi } from "vitest";
import { render, screen } from "@testing-library/react";
import * as data from "@/lib/data";
import Page from "../page";
import { mockGetDeviceByIdResponse } from "@tests/fixtures/mockData";

// Mock next/navigation and next/image first
vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

vi.mock("next/image", () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} />
  ),
}));

describe("Device Page", () => {
  beforeEach(() => {
    vi.spyOn(data, "fetchDeviceById").mockResolvedValue(
      mockGetDeviceByIdResponse
    );
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  test("renders device details correctly", async () => {
    const params = { id: mockGetDeviceByIdResponse.id };
    const { container } = render(await Page({ params }));

    // Test basic device information
    expect(
      screen.getByText(mockGetDeviceByIdResponse.brand, { exact: false })
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockGetDeviceByIdResponse.device_name, { exact: false })
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockGetDeviceByIdResponse.form_factor, { exact: false })
    ).toBeInTheDocument();

    // Test system specifications
    expect(
      screen.getByText(mockGetDeviceByIdResponse.os_raw, { exact: false })
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockGetDeviceByIdResponse.storage_raw, { exact: false })
    ).toBeInTheDocument();

    // Test processor information
    expect(
      screen.getByText(mockGetDeviceByIdResponse.chipset!, { exact: false })
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockGetDeviceByIdResponse.cpu_model!, { exact: false })
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockGetDeviceByIdResponse.cpu_cores!, { exact: false })
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockGetDeviceByIdResponse.cpu_threads!, { exact: false })
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockGetDeviceByIdResponse.cpu_clock!, { exact: false })
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockGetDeviceByIdResponse.cpu_arch!, { exact: false })
    ).toBeInTheDocument();

    // Test GPU information
    expect(
      screen.getByText(mockGetDeviceByIdResponse.gpu_model!, { exact: false })
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockGetDeviceByIdResponse.gpu_cores!, { exact: false })
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockGetDeviceByIdResponse.gpu_clock!, { exact: false })
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockGetDeviceByIdResponse.ram_gb!, { exact: false })
    ).toBeInTheDocument();

    // Test display specifications
    expect(
      screen.getByText(
        `${mockGetDeviceByIdResponse.screen_size_inches}" ${mockGetDeviceByIdResponse.screen_type}`,
        { exact: false }
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockGetDeviceByIdResponse.resolution, { exact: false })
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockGetDeviceByIdResponse.ppi.toString(), {
        exact: false,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockGetDeviceByIdResponse.aspect_ratio!, {
        exact: false,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockGetDeviceByIdResponse.screen_lens!, { exact: false })
    ).toBeInTheDocument();

    // Test physical specifications
    expect(
      screen.getByText(mockGetDeviceByIdResponse.battery_capacity, {
        exact: false,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockGetDeviceByIdResponse.dimensions_mm!, {
        exact: false,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockGetDeviceByIdResponse.color_options, {
        exact: false,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockGetDeviceByIdResponse.shell_material, {
        exact: false,
      })
    ).toBeInTheDocument();

    // Test controls
    expect(
      screen.getByText(mockGetDeviceByIdResponse.dpad_raw, { exact: false })
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockGetDeviceByIdResponse.face_buttons, { exact: false })
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockGetDeviceByIdResponse.shoulder_buttons_raw!, {
        exact: false,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockGetDeviceByIdResponse.extra_buttons_raw!, {
        exact: false,
      })
    ).toBeInTheDocument();

    // Test connectivity
    expect(
      screen.getByText(mockGetDeviceByIdResponse.charge_port_raw!, {
        exact: false,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockGetDeviceByIdResponse.connectivity_raw!, {
        exact: false,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockGetDeviceByIdResponse.audio_output_raw!, {
        exact: false,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockGetDeviceByIdResponse.speaker_raw!, { exact: false })
    ).toBeInTheDocument();

    // Test price
    expect(
      screen.getByText(`$${mockGetDeviceByIdResponse.price_low}`, {
        exact: false,
      })
    ).toBeInTheDocument();

    // Test emulation description
    expect(
      screen.getByText(`"${mockGetDeviceByIdResponse.emulation_desc}"`, {
        exact: false,
      })
    ).toBeInTheDocument();

    // Test image rendering
    const deviceImage = container.querySelector(
      'img[alt="Picture of the device"]'
    );
    expect(deviceImage).toBeInTheDocument();
    expect(deviceImage).toHaveAttribute(
      "src",
      `https://domwi9apobskw.cloudfront.net/${mockGetDeviceByIdResponse.image_id}.png`
    );
  });
});
