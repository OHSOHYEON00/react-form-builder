import { FormField, FormItemTypeKeys } from "@/types/form";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { z, ZodString, ZodOptional, ZodTypeAny } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type GetBaseZodTypeResult = z.ZodString | z.ZodAny | z.ZodBoolean | z.ZodNumber;

// Default Zod type mapping based on form field types
const getBaseZodType = (itemType: FormItemTypeKeys): GetBaseZodTypeResult => {
  switch (itemType) {
    case "input":
    case "textArea":
      return z.string();
    case "checkBox":
      return z.boolean();
    case "numberInput":
      return z.number();
    default:
      return z.any();
  }
};

// Add Zod validations using meta information
/*
  configures validation for final submission of user-created fields.
  generates field-specific validation logic when submitting the rendered form
*/
export const generateDynamicSchema = (fields: FormField[]) => {
  const schemaFields: Record<
    string,
    ZodOptional<GetBaseZodTypeResult> | GetBaseZodTypeResult
  > = {};

  fields.forEach((field) => {
    const base = getBaseZodType(field.formItem as FormItemTypeKeys);
    const fieldName = field.name;
    const fieldMeta = field.meta;

    let fieldValidation: ZodTypeAny = base;

    if (fieldValidation instanceof ZodString) {
      if (fieldMeta.minLength) {
        const minLength =
          typeof fieldMeta.minLength === "string"
            ? parseInt(fieldMeta.minLength)
            : fieldMeta.minLength;
        fieldValidation = (fieldValidation as ZodString).min(minLength, {
          message: `This must be minimum ${fieldMeta.minLength} characters`,
        });
      }

      if (fieldMeta.maxLength) {
        const maxLength =
          typeof fieldMeta.maxLength === "string"
            ? parseInt(fieldMeta.maxLength)
            : fieldMeta.maxLength;
        fieldValidation = (fieldValidation as ZodString).max(maxLength, {
          message: `This must be aximum ${fieldMeta.maxLength} characters`,
        });
      }
    }

    if (!fieldMeta.required) {
      fieldValidation =
        fieldValidation.optional() as ZodOptional<GetBaseZodTypeResult>;
    }

    schemaFields[fieldName] = fieldValidation;
  });

  return z.object(schemaFields);
};

const checkboxKeys = (name: string) => !!name.includes("checkBox");

export const normalizeFormData = (data: Record<string, unknown>) => {
  return Object.fromEntries(
    Object.entries(data).map(([key, value]) => {
      if (value === undefined) {
        return [key, checkboxKeys(key) ? false : null];
      }
      return [key, value];
    })
  );
};
