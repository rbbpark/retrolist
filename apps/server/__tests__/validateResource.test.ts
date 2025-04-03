import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import validate from "../src/middleware/validateResource";
import { expect, describe, beforeEach, it, vi } from "vitest";

describe("Validate Resource Middleware", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction;

  beforeEach(() => {
    mockRequest = {
      body: {},
      query: {},
      params: {},
    };

    mockResponse = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn(),
    };

    nextFunction = vi.fn() as unknown as NextFunction;
  });

  it("should call next() when validation passes", () => {
    // Create a simple schema
    const schema = z.object({
      body: z.object({
        name: z.string(),
        age: z.number(),
      }),
      query: z.object({}),
      params: z.object({}),
    });

    // Set up valid request data
    mockRequest.body = { name: "John", age: 30 };

    // Call middleware
    validate(schema)(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    // Verify next was called
    expect(nextFunction).toHaveBeenCalled();
    expect(mockResponse.status).not.toHaveBeenCalled();
  });

  it("should replace request properties with validated data", () => {
    // Create a schema that transforms data
    const schema = z.object({
      body: z.object({
        name: z.string().transform((val) => val.toUpperCase()),
        age: z.coerce.number(), // converts string to number
      }),
      query: z.object({}),
      params: z.object({}),
    });

    // Set up request data
    mockRequest.body = { name: "john", age: "30" };

    // Call middleware
    validate(schema)(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    // Verify data was transformed
    expect(mockRequest.body.name).toBe("JOHN");
    expect(mockRequest.body.age).toBe(30);
    expect(typeof mockRequest.body.age).toBe("number");
  });

  it("should return 400 status with error messages when validation fails", () => {
    // Create a schema
    const schema = z.object({
      body: z.object({
        name: z.string(),
        email: z.string().email(),
      }),
      query: z.object({}),
      params: z.object({}),
    });

    // Set up invalid request data
    mockRequest.body = { name: "John", email: "invalid-email" };

    // Call middleware
    validate(schema)(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    // Verify error response
    expect(nextFunction).not.toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.send).toHaveBeenCalled();
  });
});
