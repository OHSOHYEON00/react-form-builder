import { z } from "zod";
import { metaConfigName } from "./metaConfigs";

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
export const FormCreatorSchema = z.object({
  label: z.string().optional(),
  formItem: z.enum(formItemKeys as [string, ...string[]]),
  meta: z.record(z.union([z.string(), z.boolean()]).optional()).optional(),
});

export const FormSchema = z
  .record(z.union([z.string(), z.boolean()]).optional())
  .optional();

export type FormCreatorSchemaTypes = z.infer<typeof FormCreatorSchema>;
