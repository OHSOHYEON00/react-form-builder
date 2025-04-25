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
    {
      name: "minLength",
      label: "Min Length",
      type: "numberInput",
    },
    { name: "required", label: "Required", type: "checkBox" },
  ],
  numberInput: [
    { name: "min", label: "Min", type: "numberInput" },
    { name: "max", label: "Max", type: "numberInput" },
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
    {
      name: "maxLength",
      label: "Max Length",
      type: "numberInput",
      placeholder: "e.g. 50",
    },
    {
      name: "minLength",
      label: "Min Length",
      type: "numberInput",
    },
    { name: "required", label: "Required", type: "checkBox" },
  ],
};

export const defaultFormMeta: Partial<
  Record<metaConfigName, string | boolean | number | undefined>
> = {
  required: false,
};

import { z, ZodObject, ZodTypeAny } from "zod";

function toOptionalNumber(val: unknown) {
  if (val === "" || val === undefined || val === null) return undefined;
  const num = Number(val);
  return Number.isFinite(num) ? num : undefined;
}

/*
  defines the meta structure for each formItem
  determines if the meta is valid in the "Form Creator" step
*/
export const metaValidationMap = {
  input: {
    placeholder: z.string().optional(),
    maxLength: z
      .preprocess(toOptionalNumber, z.number().min(1).max(999).optional())
      .optional(),
    minLength: z
      .preprocess(toOptionalNumber, z.number().min(0).optional())
      .optional(),
    required: z.boolean().optional(),
  },
  numberInput: {
    min: z.preprocess(toOptionalNumber, z.number().optional()).optional(),
    max: z.preprocess(toOptionalNumber, z.number().optional()).optional(),
  },
  textArea: {
    placeholder: z.string().optional(),
    maxLength: z
      .preprocess(toOptionalNumber, z.number().min(1).max(999).optional())
      .optional(),
    minLength: z
      .preprocess(toOptionalNumber, z.number().min(0).optional())
      .optional(),
    required: z.boolean().optional(),
  },
  checkBox: {
    defaultChecked: z.boolean().optional(),
    required: z.boolean().optional(),
  },
} as const;

export type MetaValidationMap = typeof metaValidationMap;

type FormItemType = keyof MetaValidationMap;

export const generateMetaSchema = (
  type: FormItemType
): ZodObject<Record<string, ZodTypeAny>> => {
  const config = metaValidationMap[type];
  if (!config) return z.object({});
  return z.object(config);
};
