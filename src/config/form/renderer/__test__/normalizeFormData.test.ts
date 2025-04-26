// normalizeFormData.test.ts
import { normalizeFormData } from "@/lib/utils";
import { describe, it, expect } from "vitest";

describe("normalizeFormData", () => {
  it("replaces undefined values with null for normal fields", () => {
    const input = {
      name: "Alice",
      age: undefined,
    };

    const output = normalizeFormData(input);

    expect(output).toEqual({
      name: "Alice",
      age: null,
    });
  });

  it("replaces undefined values with false for checkbox fields", () => {
    const input = {
      checkBoxTerms: undefined,
      checkBoxSubscribe: undefined,
    };

    const output = normalizeFormData(input);

    expect(output).toEqual({
      checkBoxTerms: false,
      checkBoxSubscribe: false,
    });
  });

  it("keeps defined values unchanged", () => {
    const input = {
      name: "Bob",
      checkBoxAgree: true,
      email: "bob@example.com",
    };

    const output = normalizeFormData(input);

    expect(output).toEqual(input);
  });
});
