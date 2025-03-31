import {
  GetDevicesResponseSchema,
  GetDevicesResponseType,
  Device,
  DeviceSchema,
} from "@retrolist/shared";

export async function fetchDevices(
  queryString: string
): Promise<GetDevicesResponseType> {
  try {
    console.log("Fetching devices data...");
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    const response = await fetch(
      `http://localhost:3001/api/device?${queryString}`
    );
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
    console.log("Fetching success");
    return data;
  } catch (error) {
    console.error("Fetching Error:", error);
    throw new Error("Failed to fetch devices data.");
  }
}

export async function fetchDeviceById(id: string): Promise<Device> {
  try {
    console.log("Fetching a device...");
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    const response = await fetch(`http://localhost:3001/api/device/${id}`);
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
    console.log("Fetching success");
    return data;
  } catch (error) {
    console.error("Fetching Error:", error);
    throw new Error("Failed to fetch device data.");
  }
}
