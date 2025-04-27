import { FormField, formItemKeys, FormItemTypeKeys } from "@/types/form";
import { z } from "zod";
import { generateMetaSchema } from "../../meta/meta";
import {
  FieldErrors,
  FieldValues,
} from "node_modules/react-hook-form/dist/types";

/**
 * Info: Responsible for different validation logic for each form field type (formItemType)
 */
export const validationMap: Record<
  FormItemTypeKeys,
  ((meta: FormField["meta"], ctx: z.RefinementCtx) => void) | undefined
> = {
  input: (meta, ctx) => {
    const { required, minLength, maxLength } = meta;

    if (required && (!minLength || +minLength <= 0)) {
      ctx.addIssue({
        path: ["meta", "minLength"],
        message: "Min length must be greater or equal to 1",
        code: z.ZodIssueCode.custom,
      });
    }

    if (!required && minLength && +minLength < 0) {
      ctx.addIssue({
        path: ["meta", "minLength"],
        message: "Min length must be greater or equal to 0",
        code: z.ZodIssueCode.custom,
      });
    }

    if (typeof maxLength !== "undefined" && +maxLength <= 0) {
      ctx.addIssue({
        path: ["meta", "maxLength"],
        message: "Max length must be greater or equal to 1",
        code: z.ZodIssueCode.custom,
      });
    }

    if (
      typeof minLength !== "undefined" &&
      typeof maxLength !== "undefined" &&
      +minLength > +maxLength
    ) {
      ctx.addIssue({
        path: ["meta", "minLength"],
        message: "Min length must be less than or equal to Max length",
        code: z.ZodIssueCode.custom,
      });
    }
  },

  textArea: (meta, ctx) => {
    validationMap["input"]?.(meta, ctx);
  },

  checkBox: () => {},

  numberInput: (meta, ctx) => {
    const { min, max } = meta;
    if (min && max && +min > +max) {
      ctx.addIssue({
        path: ["meta", "min"],
        message: "Min must be less than or equal to Max",
        code: z.ZodIssueCode.custom,
      });
    }
  },
};

/**
 * Info: Function to create a validation schema for the form item itself
 * - perform dynamically generated validations for meta fields
 * - add specific validations for each form field via validationMap
 */
export const FormCreatorSchema = z
  .object({
    label: z.string().optional(),
    formItem: z.enum(formItemKeys as [string, ...string[]], {
      errorMap: () => {
        return { message: "This field is required" };
      },
    }),
    meta: z
      .record(z.union([z.string(), z.boolean(), z.number()]).optional())
      .optional(),
  })
  // dynamic validation for meta in FormCreatorSchema
  .superRefine((data, ctx) => {
    const metaSchema = generateMetaSchema(data.formItem as FormItemTypeKeys);

    const result = metaSchema.safeParse(data.meta || {});

    if (!result.success) {
      const issues = result.error.issues;
      for (const issue of issues) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: issue.message,
          path: ["meta", ...(issue.path || [])],
        });
      }
    }

    if (data.meta === undefined) return;

    const validator = validationMap[data.formItem as FormItemTypeKeys];
    if (validator && data.meta) {
      validator(data.meta, ctx);
    }
  });

export const FormSchema = z
  .record(z.union([z.string(), z.boolean()]).optional())
  .optional();

export type FormCreatorSchemaTypes = z.infer<typeof FormCreatorSchema>;

export function getValueByPath(
  path: string,
  errors?: FieldErrors<FieldValues>
) {
  return path.split(".").reduce((acc, key) => acc?.[key], errors);
}
