import { FormField, formItemKeys, FormItemTypeKeys } from "@/types/form";
import { z } from "zod";
import { generateMetaSchema } from "./meta";

const validationMap: Record<
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

    if (maxLength && +maxLength <= 0) {
      ctx.addIssue({
        path: ["meta", "maxLength"],
        message: "Max length must be greater or equal to 1",
        code: z.ZodIssueCode.custom,
      });
    }

    if (minLength && maxLength && +minLength > +maxLength) {
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
    const { required, min, max } = meta;

    if (required && (!min || +min <= 0)) {
      ctx.addIssue({
        path: ["meta", "min"],
        message: "Min must be greater or equal to 1",
        code: z.ZodIssueCode.custom,
      });
    }

    if (min && max && +min > +max) {
      ctx.addIssue({
        path: ["meta", "min"],
        message: "Min must be less than or equal to Max",
        code: z.ZodIssueCode.custom,
      });
    }
  },
};

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
