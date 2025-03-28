import { z } from "zod";

export const stringToBoolean = z.string().transform((val, ctx) => {
  const normalized = val.toLowerCase();
  if (normalized === "true") return true;
  if (normalized === "false") return false;
  ctx.addIssue({
    code: z.ZodIssueCode.custom,
    message: "Expected a boolean value",
  });
});

export const stringToNumber = z
  .string()
  .refine((val) => !isNaN(Number(val)), {
    message: "Not a valid number",
  })
  .transform(Number);
