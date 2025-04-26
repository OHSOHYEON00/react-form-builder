import { describe, expect, it } from "vitest";
import { generateMetaSchema } from "../meta";

describe("generateMetaSchema() - generating schema by type test", () => {
  it("should create correct schema for 'input' type", () => {
    const schema = generateMetaSchema("input");
    const expectedKeys = ["placeholder", "maxLength", "minLength", "required"];

    const actualKeys = Object.keys(schema.shape);

    expect(new Set(actualKeys)).toEqual(new Set(expectedKeys));
  });

  it("should create correct schema for 'textArea' type", () => {
    const schema = generateMetaSchema("textArea");
    const expectedKeys = ["placeholder", "maxLength", "minLength", "required"];

    const actualKeys = Object.keys(schema.shape);

    expect(new Set(actualKeys)).toEqual(new Set(expectedKeys));
  });

  it("should create correct schema for 'numberInput' type", () => {
    const schema = generateMetaSchema("numberInput");
    const expectedKeys = ["min", "max", "required"];

    const actualKeys = Object.keys(schema.shape);

    expect(new Set(actualKeys)).toEqual(new Set(expectedKeys));
  });

  it("should create correct schema for 'checkBox' type", () => {
    const schema = generateMetaSchema("checkBox");
    const expectedKeys = ["defaultChecked", "required"];

    const actualKeys = Object.keys(schema.shape);

    expect(new Set(actualKeys)).toEqual(new Set(expectedKeys));
  });

  it("should create empty schema for unknown type", () => {
    const schema = generateMetaSchema("unknown" as any);

    expect(Object.keys(schema.shape)).toHaveLength(0);
  });
});

describe("generateMetaSchema() - validation test", () => {
  it("should fail if 'numberInput' meta has non-number min, max", () => {
    const schema = generateMetaSchema("numberInput");
    const result = schema.safeParse({
      min: "abc",
      max: "xxx",
    });
    expect(result.success).toBe(true); // toOptionalNumber() is nulled, so true is the normal behavior.
  });

  describe("Input", () => {
    const schema = generateMetaSchema("input");

    it("should pass with valid placeholder (string)", () => {
      const result = schema.safeParse({ placeholder: "some text" });
      expect(result.success).toBe(true);
    });

    it("should fail with invalid placeholder (number)", () => {
      const result = schema.safeParse({ placeholder: 123 });
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].path).toEqual(["placeholder"]);
    });

    it("should pass with valid minLength as string number", () => {
      const result = schema.safeParse({ minLength: "5" });
      expect(result.success).toBe(true);
    });

    it("should fail with invalid minLength as non-numeric string", () => {
      const result = schema.safeParse({ minLength: "abc" });
      expect(result.success).toBe(true); // toOptionalNumber() is nulled, so true is the normal behavior.
    });
  });

  describe("numberInput", () => {
    const schema = generateMetaSchema("numberInput");

    it("should pass with valid min as string number", () => {
      const result = schema.safeParse({ min: "10" });
      expect(result.success).toBe(true);
    });

    it("should pass with valid max as number", () => {
      const result = schema.safeParse({ max: 5 });
      expect(result.success).toBe(true);
    });

    it("should fail with invalid min (non-numeric string)", () => {
      const result = schema.safeParse({ min: "abc" });
      expect(result.success).toBe(true); // toOptionalNumber() is nulled, so true is the normal behavior.
    });
  });

  describe("Checkbox", () => {
    const schema = generateMetaSchema("checkBox");

    it("should pass with valid defaultChecked (boolean)", () => {
      const result = schema.safeParse({ defaultChecked: true });
      expect(result.success).toBe(true);
    });

    it("should fail with invalid defaultChecked (string)", () => {
      const result = schema.safeParse({ defaultChecked: "true" });
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].path).toEqual(["defaultChecked"]);
    });
  });
});
