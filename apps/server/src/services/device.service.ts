import { db } from "../utils/db";

// export async function findDeviceById() {}

export async function getDevices({
  page = 1,
  page_size = 10,
  search,
  sort_by = "release_date",
  order = "desc",
}: {
  page: number;
  page_size: number;
  search?: string;
  sort_by?: "device_name" | "screen_size_inches" | "release_date";
  order?: "asc" | "desc";
}) {
  const offset = (page - 1) * page_size;

  let query = db.selectFrom("handheld_devices");

  if (search) {
    query = query.where((eb) =>
      eb.or([
        eb(
          eb.fn("lower", ["device_name"]),
          "like",
          `%${search.toLowerCase()}%`
        ),
        eb(eb.fn("lower", ["brand"]), "like", `%${search.toLowerCase()}%`),
      ])
    );
  }

  // Apply sorting if sort_by parameter is provided
  if (sort_by) {
    if (sort_by === "device_name") {
      query = query.orderBy((eb) => eb.fn("lower", [sort_by]), order);
    } else {
      query = query.orderBy(sort_by, order);
    }
  }

  // Get total count for pagination metadata
  let countQuery = db
    .selectFrom("handheld_devices")
    .select(db.fn.count("id").as("count"));

  // Apply the same search filter to count query
  if (search) {
    countQuery = countQuery.where((eb) =>
      eb.or([
        eb(
          eb.fn("lower", ["device_name"]),
          "like",
          `%${search.toLowerCase()}%`
        ),
        eb(eb.fn("lower", ["brand"]), "like", `%${search.toLowerCase()}%`),
      ])
    );
  }

  const countResult = await countQuery.executeTakeFirst();

  const total = Number(countResult?.count || 0);

  // Get paginated results
  const devices = await query
    .selectAll()
    .limit(page_size)
    .offset(offset)
    .execute();

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
