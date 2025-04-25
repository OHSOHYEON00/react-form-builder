import { configType, metaConfigName } from "@/types/meta";

export const metaConfigs: Record<string, configType[]> = {
  input: [
    {
      name: "placeholder",
      label: "Placeholder",
      type: "input",
      placeholder: "Enter placeholder...",
    },
    {
      name: "maxLength",
      label: "Max Length",
      type: "numberInput",
      placeholder: "e.g. 50",
    },
    { name: "required", label: "Required", type: "checkBox" },
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
    { name: "required", label: "Required", type: "checkBox" },
  ],
};

export const defaultFormMeta: Record<metaConfigName, string | boolean> = {
  required: false,
  placeholder: "",
  defaultChecked: false,
  maxLength: "0",
  minLength: "0",
};
