import supertest from "supertest";
import createServer from "../../src/utils/server";
import {
  DeviceSchema,
  DeviceSchemaCompact,
  DeviceSchemaFull,
} from "../../src/schema/device.schema";

const app = createServer();

describe("device", () => {
  describe("get device", () => {
    describe("given a device does not exist", () => {
      it("should return a 404, ", async () => {
        const deviceId = "test123";
        await supertest(app).get(`/api/device/${deviceId}`).expect(404);
      });
    });

    describe("given a device does exist", () => {
      it("should return a 200 and the device", async () => {
        const deviceId = "bKvaN54i";
        const { body, statusCode } = await supertest(app).get(
          `/api/device/${deviceId}`
        );
        expect(statusCode).toBe(200);
        const parsed = DeviceSchema.safeParse(body);
        expect(parsed.success).toBe(true);
      });
    });
  });

  describe("get devices", () => {
    describe("given no query params", () => {
      it("should return a 200 and a list of devices, applying default settings", async () => {
        const { body, statusCode } = await supertest(app).get("/api/device/");
        expect(statusCode).toBe(200);
        expect(body.data).toBeDefined();
        expect(body.pagination).toBeDefined();
        expect(body.data.length).toBe(10);
        // validate each device object
        for (const device of body.data) {
          const parsed = DeviceSchemaFull.safeParse(device);
          expect(parsed.success).toBe(true);
        }
      });
    });

    describe("given invalid parameters", () => {
      it("should return 400", async () => {
        const query = {
          not_valid: "test",
        };
        await supertest(app).get(`/api/device/`).query(query).expect(400);
      });
    });

    describe("given pagination", () => {
      it("should respect page and limit parameters", async () => {
        const query = {
          page: 2,
          page_size: 5,
        };
        const { body, statusCode } = await supertest(app)
          .get(`/api/device/`)
          .query(query);
        expect(statusCode).toBe(200);
        expect(body.data).toBeDefined();
        expect(body.pagination).toBeDefined();
        expect(body.data.length).toBeLessThanOrEqual(5);
        expect(body.pagination.page).toBe(2);
        expect(body.pagination.page_size).toBe(5);
      });
    });

    describe("given search", () => {
      it("should filter device name by search string", async () => {
        const query = {
          search: "amber",
        };
        const { body, statusCode } = await supertest(app)
          .get(`/api/device/`)
          .query(query);
        expect(statusCode).toBe(200);
        for (const device of body.data) {
          expect(
            device.device_name.toLowerCase().includes("amber")
          ).toBeTruthy();
        }
      });
    });

    describe("given a min_price filter", () => {
      it("should return devices with prices greater than min_price", async () => {
        const query = {
          min_price: "30",
        };
        const { body, statusCode } = await supertest(app)
          .get(`/api/device/`)
          .query(query);
        expect(statusCode).toBe(200);
        for (const device of body.data) {
          expect(device.price_low >= 30).toBeTruthy();
        }
      });
    });

    describe("given sort order", () => {
      it("should apply a sort", async () => {
        const query = {
          sort_by: "price_low",
          order: "asc",
        };
        const { body, statusCode } = await supertest(app)
          .get(`/api/device/`)
          .query(query);
        expect(statusCode).toBe(200);

        const prices = body.data.map((device: any) => device.price_low);
        const sortedPrices = [...prices].sort((a, b) => a - b);
        expect(prices).toEqual(sortedPrices);
      });
    });

    describe("given a compact detail level", () => {
      it("should return devices with less detail", async () => {
        const query = {
          detail: "compact",
        };
        const { body, statusCode } = await supertest(app)
          .get(`/api/device/`)
          .query(query);
        expect(statusCode).toBe(200);
        for (const device of body.data) {
          const parsed = DeviceSchemaCompact.safeParse(device);
          expect(parsed.success).toBe(true);
        }
      });
    });
  });
});
