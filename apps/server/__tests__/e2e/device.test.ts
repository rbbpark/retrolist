import supertest from "supertest";
import createServer from "../../src/utils/server";
import { DeviceSchema, DeviceSchemaFull } from "../../src/schema/device.schema";

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

    describe("given pagination", () => {
      it("should respect page and limit parameters", () => {});
    });

    describe("given search", () => {
      it("should filter device name by search string", () => {});
    });

    describe("given a filter", () => {
      it("should filter device name by that filter", () => {});
    });

    describe("given sort order", () => {
      it("should apply a sort", () => {});
    });

    describe("given a detail level", () => {
      it("should return devices with different levels of detail", () => {});
    });

    describe("given invalid parameters", () => {
      it("should return 400", () => {});
    });
  });
});
