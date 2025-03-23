import { z, TypeOf } from "zod";

const stringToNumber = z
  .string()
  .refine((val) => !isNaN(Number(val)), {
    message: "Not a valid number",
  })
  .transform(Number);

const SortOrderSchema = z.enum(["asc", "desc"]);
const SortBySchema = z.enum([
  "device_name",
  "screen_size_inches",
  "release_date",
]);

const DeviceQuerySchema = z
  .object({
    page: stringToNumber,
    page_size: stringToNumber,
    search: z.string().optional(),
    sort_by: SortBySchema.optional(),
    order: SortOrderSchema.optional(),
  })
  .refine(
    (data) => (data.sort_by === undefined) === (data.order === undefined),
    {
      message: "order must be provided if sort_by is provided and vice versa",
      path: ["order"],
    }
  );

export const getDevicesSchema = z.object({
  query: DeviceQuerySchema,
});

export type GetDevicesInput = TypeOf<typeof DeviceQuerySchema>;
