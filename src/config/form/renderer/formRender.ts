import { stringToInt } from "@/lib/utils";
import { FormField, FormItemTypeKeys } from "@/types/form";
import { z, ZodString, ZodOptional, ZodTypeAny, ZodNumber } from "zod";

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
        const minLength = stringToInt(fieldMeta.minLength) as number;
        fieldValidation = (fieldValidation as ZodString).min(minLength, {
          message: `This must be minimum ${fieldMeta.minLength} characters`,
        });
      }

      if (fieldMeta.maxLength) {
        const maxLength = stringToInt(fieldMeta.maxLength) as number;
        fieldValidation = (fieldValidation as ZodString).max(maxLength, {
          message: `This must be aximum ${fieldMeta.maxLength} characters`,
        });
      }
    }

    if (fieldValidation instanceof ZodNumber) {
      if (fieldMeta.min) {
        const min = stringToInt(fieldMeta.min) as number;
        fieldValidation = (fieldValidation as ZodNumber).min(min, {
          message: `This must be minimum ${min}`,
        });
      }

      if (fieldMeta.max) {
        const max = stringToInt(fieldMeta.max) as number;
        fieldValidation = (fieldValidation as ZodNumber).max(max, {
          message: `This must be minimum ${max}`,
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
