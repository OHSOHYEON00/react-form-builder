import { FormItemType } from "./form";

export type metaConfigName =
  | "placeholder"
  | "required"
  | "maxLength"
  | "defaultChecked"
  | "minLength"
  | "rows";

export interface configType {
  name: metaConfigName;
  label: string;
  type: keyof typeof FormItemType;
  placeholder?: string;
}

export const metaConfigs: Record<string, configType[]> = {
  input: [
    {
      name: "placeholder",
      label: "Placeholder",
      type: "input",
      placeholder: "Enter placeholder...",
    },
    { name: "required", label: "Required", type: "checkBox" },
    {
      name: "maxLength",
      label: "Max Length",
      type: "numberInput",
      placeholder: "e.g. 50",
    },
  ],
  checkBox: [
    {
      name: "defaultChecked",
      label: "Checked by default",
      type: "checkBox",
    },
    { name: "required", label: "Required", type: "checkBox" },
  ],
  textArea: [
    {
      name: "placeholder",
      label: "Placeholder",
      type: "input",
      placeholder: "Enter placeholder...",
    },
    {
      name: "rows",
      label: "Rows",
      type: "textArea",
      placeholder: "e.g. 4",
    },
    { name: "required", label: "Required", type: "checkBox" },
  ],
};
