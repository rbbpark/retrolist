import {
  GetDevicesResponseSchema,
  GetDevicesResponseType,
} from "@retrolist/shared";

export async function fetchDevices({
  page,
  pageSize,
}: {
  page: number;
  pageSize: number;
}): Promise<GetDevicesResponseType> {
  try {
    console.log("Fetching devices data...");
    const queryParams = new URLSearchParams({
      page: page + "",
      page_size: pageSize + "",
    });

    // await new Promise((resolve) => setTimeout(resolve, 3000));
    const response = await fetch(
      `http://localhost:3001/api/device?${queryParams.toString()}`
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

    return data;
  } catch (error) {
    console.error("Fetching Error:", error);
    throw new Error("Failed to fetch devices data.");
  }
}
