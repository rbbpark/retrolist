import { z, TypeOf } from "zod";

const stringToNumber = z
  .string()
  .refine((val) => !isNaN(Number(val)), {
    message: "Not a valid number",
  })
  .transform(Number);

export const getDevicesSchema = z.object({
  query: z.object({
    page: stringToNumber,
    page_size: stringToNumber,
  }),
});

export type GetDevicesInput = TypeOf<typeof getDevicesSchema>;
