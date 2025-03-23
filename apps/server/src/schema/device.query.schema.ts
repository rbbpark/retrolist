import { z } from "zod";
import { DeviceSchema } from "./device.schema";
import { FilterField } from "../types/filter";

// Standard parser for query string parameters
const stringToBoolean = z.string().transform((val, ctx) => {
  const normalized = val.toLowerCase();
  if (normalized === "true") return true;
  if (normalized === "false") return false;
  ctx.addIssue({
    code: z.ZodIssueCode.custom,
    message: "Expected a boolean value",
  });
});

const stringToNumber = z
  .string()
  .refine((val) => !isNaN(Number(val)), {
    message: "Not a valid number",
  })
  .transform(Number);

// Reusable transformers for common field types that return FilterField objects
const createNumberFilter = () => {
  return stringToNumber
    .transform((value) => ({ value, operator: "eq" }) as FilterField<number>)
    .optional();
};

const createBooleanFilter = () => {
  return stringToBoolean
    .transform((value) => ({ value, operator: "eq" }) as FilterField<boolean>)
    .optional();
};

const createEnumFilter = <T extends z.ZodTypeAny>(schema: T) => {
  return z
    .string()
    .pipe(schema)
    .transform(
      (value) => ({ value, operator: "eq" }) as FilterField<z.infer<T>>
    )
    .optional();
};

// Custom transformers for specific filter scenarios
const createCompatibilityFilter = () => {
  return stringToBoolean
    .transform((val, ctx) => {
      if (val === true) {
        return { value: 3, operator: "gte" } as FilterField<number>;
      }
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Value must be true",
      });
    })
    .optional();
};

// Combined schema for device queries with pagination and filtering
const DeviceQuerySchema = z
  .object({
    // Pagination parameters
    page: stringToNumber.default("1"),
    page_size: stringToNumber.default("10"),
    search: z.string().optional(),

    // Sorting parameters
    order: z.enum(["asc", "desc"]).optional(),
    sort_by: z
      .enum(["device_name", "screen_size_inches", "release_date", "price_low"])
      .optional(),

    // All filterable fields
    form_factor: createEnumFilter(DeviceSchema.shape.form_factor),
    gbc: createCompatibilityFilter(),
    nes: createCompatibilityFilter(),
    genesis: createCompatibilityFilter(),
    gba: createCompatibilityFilter(),
    snes: createCompatibilityFilter(),
    psx: createCompatibilityFilter(),
    nds: createCompatibilityFilter(),
    n64: createCompatibilityFilter(),
    dreamcast: createCompatibilityFilter(),
    psp: createCompatibilityFilter(),
    saturn: createCompatibilityFilter(),
    ngc: createCompatibilityFilter(),
    wii: createCompatibilityFilter(),
    n3ds: createCompatibilityFilter(),
    ps2: createCompatibilityFilter(),
    wiiu: createCompatibilityFilter(),
    switch: createCompatibilityFilter(),
    ps3: createCompatibilityFilter(),
    screen_type: createEnumFilter(DeviceSchema.shape.screen_type),
    resolution: createEnumFilter(DeviceSchema.shape.resolution),
    aspect_ratio: createEnumFilter(DeviceSchema.shape.aspect_ratio),
    dpad_raw: createEnumFilter(DeviceSchema.shape.dpad_raw),
    face_buttons: createEnumFilter(DeviceSchema.shape.face_buttons),
    has_l3_r3: createBooleanFilter(),
    has_hall_analogs: createBooleanFilter(),
    has_dual_analogs: createBooleanFilter(),
    has_analogs: createBooleanFilter(),
    has_analog_triggers: createBooleanFilter(),
    has_l2_r2: createBooleanFilter(),
    has_shoulder_buttons: createBooleanFilter(),
    has_dual_external_sd: createBooleanFilter(),
    has_lte: createBooleanFilter(),
    has_usb_otg: createBooleanFilter(),
    has_thunderbolt: createBooleanFilter(),
    has_bt: createBooleanFilter(),
    has_wifi: createBooleanFilter(),
    has_video_output: createBooleanFilter(),
    has_audio_output: createBooleanFilter(),
    has_rumble: createBooleanFilter(),
    shell_material: createEnumFilter(DeviceSchema.shape.shell_material),
    // custom filters
    max_screen_size: createNumberFilter(),
    min_screen_size: createNumberFilter(),
    max_price: createNumberFilter(),
    min_price: createNumberFilter(),
  })
  .transform((data) => {
    // Extract special query params
    const { page, page_size, search, order, sort_by, ...rest } = data;

    let filters = { ...rest };
    let filterArray: FilterField<any>[] = [];

    for (const [key, value] of Object.entries(filters)) {
      const filter = value;
      filter.name = key;
      filterArray.push(filter);
    }

    // group filters
    return {
      page,
      page_size,
      search,
      order,
      sort_by,
      filters: filterArray,
    };
  })
  .refine(
    (data) => (data.sort_by === undefined) === (data.order === undefined),
    {
      message: "order and sort_by must be provided together",
      path: ["order"],
    }
  );

// Export schema for validation middleware
export const getDevicesSchema = z.object({
  query: DeviceQuerySchema,
});

// Export type for controller and service usage
export type GetDevicesInput = z.infer<typeof DeviceQuerySchema>;
