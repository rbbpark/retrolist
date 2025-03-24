import { z } from "zod";
import { DeviceSchema } from "../device.schema";
import { FilterField } from "../../types/filter";
import { stringToNumber, stringToBoolean } from "../common.schema";

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
    .refine((val) => val === true, {
      message: "Value must be true",
    })
    .transform((val) => ({ value: 3, operator: "gte" }) as FilterField<number>)
    .optional();
};

// Combined schema for device queries with pagination and filtering
const DevicesQuerySchema = z
  .object({
    // Pagination parameters
    page: stringToNumber.default("1"),
    page_size: stringToNumber.default("10"),
    // view mode
    detail: z.enum(["compact", "full"]).default("full"),
    // Search
    search: z.string().optional(),
    // Sorting parameters
    order: z.enum(["asc", "desc"]).default("desc"),
    sort_by: z
      .enum(["device_name", "screen_size_inches", "release_date", "price_low"])
      .default("release_date"),
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
    // custom filterable fields
    min_price: createNumberFilter(),
    max_price: createNumberFilter(),
    min_screen_size: createNumberFilter(),
    max_screen_size: createNumberFilter(),
  })
  .strict() // do not accept unexpected arguments
  .transform((data) => {
    // Transform filters from query params into a filter array
    const { page, page_size, detail, search, order, sort_by, ...rest } = data;
    let filters = { ...rest };
    let filterArray: FilterField<any>[] = [];
    for (const [key, value] of Object.entries(filters)) {
      // handle special cases
      if (key === "min_price") {
        filterArray.push({
          name: "price_low",
          value: value.value,
          operator: "gte",
        } as FilterField<number>);
      } else if (key === "max_price") {
        filterArray.push({
          name: "price_low",
          value: value.value,
          operator: "lte",
        } as FilterField<number>);
      } else if (key === "min_screen_size") {
        filterArray.push({
          name: "screen_size_inches",
          value: value.value,
          operator: "gte",
        } as FilterField<number>);
      } else if (key === "max_screen_size") {
        filterArray.push({
          name: "screen_size_inches",
          value: value.value,
          operator: "lte",
        } as FilterField<number>);
      } else {
        const filter = value;
        filter.name = key;
        filterArray.push(filter);
      }
    }

    return {
      page,
      page_size,
      detail,
      search,
      order,
      sort_by,
      filters: filterArray,
    };
  });

// Export schema for validation middleware
export const getDevicesSchema = z.object({
  query: DevicesQuerySchema,
});

// Export type for controller and service usage
export type GetDevicesInput = z.infer<typeof DevicesQuerySchema>;
