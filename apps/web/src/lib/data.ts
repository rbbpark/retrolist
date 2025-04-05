import {
  GetDevicesResponseSchema,
  GetDevicesResponseType,
  Device,
  DeviceSchema,
} from "@retrolist/shared";

// API URL from environment variable, fallback to localhost for development
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export async function fetchDevices(
  queryString: string
): Promise<GetDevicesResponseType> {
  try {
    const response = await fetch(`${API_URL}/api/device?${queryString}`);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    const validatedData = GetDevicesResponseSchema.safeParse(data);

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedData.success) {
      console.error(validatedData.error.issues);
      throw new Error("Validation failed");
    }
    return data;
  } catch (error) {
    console.error("Fetching Error:", error);
    throw new Error("Failed to fetch devices data.");
  }
}

export async function fetchDeviceById(id: string): Promise<Device> {
  try {
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    const response = await fetch(`${API_URL}/api/device/${id}`);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    const validatedData = DeviceSchema.safeParse(data);

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedData.success) {
      console.error(validatedData.error.issues);
      throw new Error("Validation failed");
    }
    return data;
  } catch (error) {
    console.error("Fetching Error:", error);
    throw new Error("Failed to fetch device data.");
  }
}
