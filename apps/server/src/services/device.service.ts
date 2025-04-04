import { db } from "../utils/db";
import { FilterField } from "@retrolist/shared/src/types/filter";
import { SelectQueryBuilder } from "kysely";
import { DeviceSchemaCompact, DeviceSchemaFull } from "@retrolist/shared";

// export async function findDeviceById() {}

type GetDevicesInput = {
  page?: number;
  page_size?: number;
  detail?: "compact" | "full";
  search?: string;
  sort_by?: "device_name" | "screen_size_inches" | "release_date" | "price_low";
  order?: "asc" | "desc";
  filters: FilterField<any>[];
};

// Helper function to apply search filters
function applySearch<T>(
  query: SelectQueryBuilder<any, any, T>,
  search?: string
) {
  if (!search) return query;

  return query.where((eb) =>
    eb.or([
      eb(eb.fn("lower", ["device_name"]), "like", `%${search.toLowerCase()}%`),
      eb(eb.fn("lower", ["brand"]), "like", `%${search.toLowerCase()}%`),
    ])
  );
}

// Helper function to apply filters
function applyFilters<T>(
  query: SelectQueryBuilder<any, any, T>,
  filters: FilterField<any>[]
) {
  let result = query;
  for (const filter of filters) {
    const { name, value, operator = "eq" } = filter;

    switch (operator) {
      case "eq":
        result = result.where(name as any, "=", value);
        break;
      case "gt":
        result = result.where(name as any, ">", value);
        break;
      case "lt":
        result = result.where(name as any, "<", value);
        break;
      case "gte":
        result = result.where(name as any, ">=", value);
        break;
      case "lte":
        result = result.where(name as any, "<=", value);
        break;
    }
  }

  return result;
}

function applyDetailLevel<T>(
  query: SelectQueryBuilder<any, any, T>,
  detail: "compact" | "full"
) {
  const keys = Object.keys(
    detail === "compact" ? DeviceSchemaCompact.shape : DeviceSchemaFull.shape
  );
  return query.select(keys);
}

function applySort<T>(
  query: SelectQueryBuilder<any, any, T>,
  sort_by?: "device_name" | "screen_size_inches" | "release_date" | "price_low",
  order: "asc" | "desc" = "desc"
) {
  if (!sort_by) return query;

  if (sort_by === "device_name") {
    return query.orderBy((eb) => eb.fn("lower", [sort_by]), order);
  } else {
    return query.orderBy(sort_by, order);
  }
}

export async function getDevices({
  page = 1,
  page_size = 12,
  detail = "full",
  search,
  sort_by = "release_date",
  order = "desc",
  filters = [],
}: GetDevicesInput) {
  const offset = (page - 1) * page_size;

  // Main query for retrieving data
  let query = db.selectFrom("handheld_devices");
  query = applyDetailLevel(query, detail);
  query = applySearch(query, search);
  query = applyFilters(query, filters);
  query = applySort(query, sort_by, order);

  // Get total count for pagination metadata
  let countQuery = db
    .selectFrom("handheld_devices")
    .select(db.fn.count("id").as("count"));
  countQuery = applySearch(countQuery, search);
  countQuery = applyFilters(countQuery, filters);

  const countResult = await countQuery.executeTakeFirst();
  const total = Number(countResult?.count || 0);

  // Get paginated results
  const devices = await query.limit(page_size).offset(offset).execute();

  return {
    data: devices,
    pagination: {
      total,
      page,
      page_size,
      pages: Math.ceil(total / page_size),
    },
  };
}

export async function getDeviceById(id: string) {
  const device = await db
    .selectFrom("handheld_devices")
    .selectAll()
    .where("id", "=", id)
    .executeTakeFirst();

  return device;
}
