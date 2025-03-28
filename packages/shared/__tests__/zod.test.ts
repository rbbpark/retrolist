import { stringToBoolean, stringToNumber } from "../src/schemas/utils.schema";
import {
  createBooleanFilter,
  createEnumFilter,
  createNumberFilter,
  createCompatibilityFilter,
  DeviceSchema,
} from "../src/schemas/device";

describe("Common Schema Transforms", () => {
  describe("stringToBoolean", () => {
    it("should transform 'true' to boolean true", () => {
      const result = stringToBoolean.parse("true");
      expect(result).toBe(true);
    });

    it("should transform 'TRUE' (case insensitive) to boolean true", () => {
      const result = stringToBoolean.parse("TRUE");
      expect(result).toBe(true);
    });

    it("should transform 'false' to boolean false", () => {
      const result = stringToBoolean.parse("false");
      expect(result).toBe(false);
    });

    it("should transform 'FALSE' (case insensitive) to boolean false", () => {
      const result = stringToBoolean.parse("FALSE");
      expect(result).toBe(false);
    });

    it("should throw an error for non-boolean strings", () => {
      expect(() => stringToBoolean.parse("not-a-boolean")).toThrow();
    });

    it("should throw an error for empty string", () => {
      expect(() => stringToBoolean.parse("")).toThrow();
    });

    it("should throw with the expected error message", () => {
      try {
        stringToBoolean.parse("invalid");
      } catch (error: any) {
        expect(error.errors[0].message).toBe("Expected a boolean value");
      }
    });
  });

  describe("stringToNumber", () => {
    it("should transform numeric string to number", () => {
      const result = stringToNumber.parse("123");
      expect(result).toBe(123);
    });

    it("should transform negative numeric string to number", () => {
      const result = stringToNumber.parse("-123");
      expect(result).toBe(-123);
    });

    it("should transform decimal string to number", () => {
      const result = stringToNumber.parse("123.45");
      expect(result).toBe(123.45);
    });

    it("should transform string zero to number zero", () => {
      const result = stringToNumber.parse("0");
      expect(result).toBe(0);
    });

    it("should throw an error for non-numeric strings", () => {
      expect(() => stringToNumber.parse("not-a-number")).toThrow();
    });

    xit("should throw an error for empty string", () => {
      console.log(stringToNumber.parse(""));
      expect(() => stringToNumber.parse("")).toThrow();
    });

    it("should throw with the expected error message", () => {
      try {
        stringToNumber.parse("not-a-number");
      } catch (error: any) {
        expect(error.errors[0].message).toBe("Not a valid number");
      }
    });
  });
});

describe("Filter Functions", () => {
  describe("createNumberFilter", () => {
    const numberFilter = createNumberFilter();

    it("should transform valid string to number filter", () => {
      const result = numberFilter.parse("42");
      expect(result).toEqual({ value: 42, operator: "eq" });
    });

    it("should be optional and allow undefined", () => {
      const result = numberFilter.parse(undefined);
      expect(result).toBeUndefined();
    });

    it("should reject non-numeric strings", () => {
      expect(() => numberFilter.parse("not-a-number")).toThrow();
    });
  });

  describe("createBooleanFilter", () => {
    const booleanFilter = createBooleanFilter();

    it("should transform 'true' to boolean filter with true value", () => {
      const result = booleanFilter.parse("true");
      expect(result).toEqual({ value: true, operator: "eq" });
    });

    it("should transform 'false' to boolean filter with false value", () => {
      const result = booleanFilter.parse("false");
      expect(result).toEqual({ value: false, operator: "eq" });
    });

    it("should be optional and allow undefined", () => {
      const result = booleanFilter.parse(undefined);
      expect(result).toBeUndefined();
    });

    it("should reject invalid boolean strings", () => {
      expect(() => booleanFilter.parse("not-a-boolean")).toThrow();
    });
  });

  describe("createEnumFilter", () => {
    // Using DeviceSchema.shape.form_factor as an example enum
    const formFactorFilter = createEnumFilter(DeviceSchema.shape.form_factor);

    it("should transform valid enum value to filter", () => {
      const result = formFactorFilter.parse("Vertical");
      expect(result).toEqual({ value: "Vertical", operator: "eq" });
    });

    it("should be optional and allow undefined", () => {
      const result = formFactorFilter.parse(undefined);
      expect(result).toBeUndefined();
    });

    it("should reject invalid enum values", () => {
      expect(() => formFactorFilter.parse("InvalidFormFactor")).toThrow();
    });
  });

  describe("createCompatibilityFilter", () => {
    const compatibilityFilter = createCompatibilityFilter();

    it("should transform 'true' to filter with value 3 and gte operator", () => {
      const result = compatibilityFilter.parse("true");
      expect(result).toEqual({ value: 3, operator: "gte" });
    });

    it("should be optional and allow undefined", () => {
      const result = compatibilityFilter.parse(undefined);
      expect(result).toBeUndefined();
    });

    it("should reject 'false' even though it's a valid boolean", () => {
      expect(() => compatibilityFilter.parse("false")).toThrow();
    });

    it("should reject invalid boolean strings", () => {
      expect(() => compatibilityFilter.parse("not-a-boolean")).toThrow();
    });

    // Testing the refinement requirement that value must be true
    it("should include a custom error message for non-true values", () => {
      try {
        compatibilityFilter.parse("false");
      } catch (error: any) {
        expect(error.errors[0].message).toBe("Value must be true");
      }
    });
  });
});
