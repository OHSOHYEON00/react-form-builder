import { z } from "zod";
import { metaConfigName } from "./meta";
import { generateMetaSchema } from "@/config/meta";

export enum FormItemType {
  input = "Input",
  checkBox = "Checkbox",
  numberInput = "NumberInput",
  textArea = "Textarea",
}

export type FormItemTypeKeys = keyof typeof FormItemType;
const formItemKeys = Object.keys(FormItemType) as Array<FormItemTypeKeys>;

export interface FormField extends FormCreatorSchemaTypes {
  id: string;
  name: string;
  meta: Record<metaConfigName, string | boolean | any>;
}
export const FormCreatorSchema = z
  .object({
    label: z.string().optional(),
    formItem: z.enum(formItemKeys as [string, ...string[]], {
      errorMap: () => {
        return { message: "This field is required" };
      },
    }),
    meta: z.record(z.union([z.string(), z.boolean()]).optional()).optional(),
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
  });

export const FormSchema = z
  .record(z.union([z.string(), z.boolean()]).optional())
  .optional();

export type FormCreatorSchemaTypes = z.infer<typeof FormCreatorSchema>;
