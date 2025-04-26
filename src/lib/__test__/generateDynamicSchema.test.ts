// generateDynamicSchema.test.ts
import { describe, it, expect } from "vitest";
import { generateDynamicSchema } from "../utils";
import { FormField } from "@/types/form";

describe("generateDynamicSchema", () => {
  it("generates required string field with min and max length", () => {
    const fields = [
      {
        name: "username",
        formItem: "input",
        meta: { required: true, minLength: 3, maxLength: 10 },
      },
    ] as FormField[];

    const schema = generateDynamicSchema(fields);

    const valid = schema.safeParse({ username: "johnDoe" });
    expect(valid.success).toBe(true);

    const tooShort = schema.safeParse({ username: "jo" });
    expect(tooShort.success).toBe(false);

    const tooLong = schema.safeParse({ username: "averyverylongusername" });
    expect(tooLong.success).toBe(false);
  });

  it("allows optional fields to be undefined", () => {
    const fields = [
      {
        name: "bio",
        formItem: "textArea",
        meta: { required: false },
      },
    ] as FormField[];

    const schema = generateDynamicSchema(fields);

    const result = schema.safeParse({});
    expect(result.success).toBe(true);

    const resultWithBio = schema.safeParse({ bio: "I love coding" });
    expect(resultWithBio.success).toBe(true);
  });

  it("validates checkbox as boolean", () => {
    const fields = [
      {
        name: "acceptTerms",
        formItem: "checkBox",
        meta: { required: true },
      },
    ] as FormField[];

    const schema = generateDynamicSchema(fields);

    const valid = schema.safeParse({ acceptTerms: true });
    expect(valid.success).toBe(true);

    const invalid = schema.safeParse({ acceptTerms: "yes" });
    expect(invalid.success).toBe(false);
  });

  it("validates numberInput as number", () => {
    const fields = [
      {
        name: "age",
        formItem: "numberInput",
        meta: { required: true },
      },
    ] as FormField[];

    const schema = generateDynamicSchema(fields);

    const valid = schema.safeParse({ age: 25 });
    expect(valid.success).toBe(true);

    const invalid = schema.safeParse({ age: "25" }); // string이니까 실패
    expect(invalid.success).toBe(false);
  });
});
