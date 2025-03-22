import { db } from "../utils/db";

// export async function findDeviceById() {}

export async function getDevices({
  page = 1,
  page_size = 10,
}: {
  page: number;
  page_size: number;
}) {
  const offset = (page - 1) * page_size;

  let query = db.selectFrom("handheld_devices");

  // Get total count for pagination metadata
  const countResult = await db
    .selectFrom("handheld_devices")
    .select(db.fn.count("id").as("count"))
    .executeTakeFirst();

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
