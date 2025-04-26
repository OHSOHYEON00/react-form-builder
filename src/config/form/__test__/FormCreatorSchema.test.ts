import { FormCreatorSchema } from "@/config/form/form";
import { describe, expect, it, vi } from "vitest";
import { z } from "zod";
import * as generateMetaSchemaModule from "@/config/meta/meta";

vi.mock("@/config/meta/meta", () => ({
  generateMetaSchema: vi.fn(() => z.object({})), // empty schema for test
}));

describe("FormCreatorSchema - check the final schema", () => {
  it("should fail when formItem is missing", () => {
    const result = FormCreatorSchema.safeParse({
      label: "test",
      meta: {},
    });

    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.message).toBe("This field is required");
  });

  it("should fail when meta schema is invalid - missing required", () => {
    const spys: any = vi.spyOn(generateMetaSchemaModule, "generateMetaSchema");
    spys.mockReturnValueOnce(
      z.object({
        requiredField: z.string(),
      })
    );

    const result = FormCreatorSchema.safeParse({
      label: "test",
      formItem: "input", // set valid formItem
      meta: {}, // set invalid meta
    });

    expect(result.success).toBe(false);
    expect(result.error?.issues[0].path).toEqual(["meta", "requiredField"]);
  });

  it("should fail if validationMap fails", () => {
    const result = FormCreatorSchema.safeParse({
      label: "test",
      formItem: "input",
      meta: {
        required: true,
        minLength: 0, // minLength must be greater or equal to 1
      },
    });

    expect(result.success).toBe(false);

    expect(
      result.error?.issues.some(
        (issue) => issue.path.join(".") === "meta.minLength"
      )
    ).toBe(true);
  });

  it("should fail when meta schema is invalid - min > max", () => {
    const result = FormCreatorSchema.safeParse({
      label: "test",
      formItem: "input",
      meta: {
        minLength: 10,
        maxLength: 1,
      },
    });

    expect(result.success).toBe(false);

    expect(
      result.error?.issues.some(
        (issue) => issue.path.join(".") === "meta.minLength"
      )
    ).toBe(true);
  });

  it("should fail when meta schema is invalid - max < 1", () => {
    const result = FormCreatorSchema.safeParse({
      label: "test",
      formItem: "input",
      meta: {
        maxLength: 0,
      },
    });

    expect(result.success).toBe(false);

    expect(
      result.error?.issues.some(
        (issue) => issue.path.join(".") === "meta.maxLength"
      )
    ).toBe(true);
  });
});
