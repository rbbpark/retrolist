import { z } from "zod";

const DeviceQuerySchema = z.object({
  id: z.string(),
});

// Export schema for validation middleware
export const getDeviceSchema = z.object({
  params: DeviceQuerySchema,
});

export type GetDeviceInput = z.infer<typeof DeviceQuerySchema>;
