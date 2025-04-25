import { FormItemTypeKeys } from "../types/form";

export type metaConfigName =
  | "placeholder"
  | "required"
  | "maxLength"
  | "defaultChecked"
  | "minLength"
  | "min"
  | "max";

export interface configType {
  name: metaConfigName;
  label: string;
  type: FormItemTypeKeys;
  placeholder?: string;
  formItem?: FormItemTypeKeys;
  error?: string;
}
