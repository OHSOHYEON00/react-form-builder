import { FormCreatorSchemaTypes } from "@/config/form/form";
import { metaConfigName } from "./meta";

export enum FormItemType {
  input = "Input",
  checkBox = "Checkbox",
  numberInput = "NumberInput",
  textArea = "Textarea",
}

export type FormItemTypeKeys = keyof typeof FormItemType;
export const formItemKeys = Object.keys(
  FormItemType
) as Array<FormItemTypeKeys>;

export interface FormField extends FormCreatorSchemaTypes {
  id: string;
  name: string;
  meta: Record<metaConfigName, string | boolean | any>;
  error?: string;
  value?: string | boolean | any;
}
