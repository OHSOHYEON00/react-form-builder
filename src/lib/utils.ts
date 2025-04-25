import { FormField, FormItemTypeKeys } from "@/types/form";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { z, ZodType, ZodObject, ZodString } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type GetBaseZodTypeResult = z.ZodString | z.ZodAny | z.ZodBoolean | z.ZodNumber;

// 폼 필드 타입에 따른 기본 zod 타입 매핑
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

// meta 정보를 바탕으로 zod 유효성 추가
const applyMetaValidation = (
  schema: ZodType<unknown>,
  meta: FormField["meta"]
): ZodType<unknown> => {
  let result = schema;

  if (!meta) return result;

  if (meta.required) {
    result = result.refine(
      (val) =>
        typeof val === "string" ? val.trim().length > 0 : val !== undefined,
      {
        message: "This field is required",
      }
    );
  }

  if (result instanceof ZodString) {
    if (meta.minLength) {
      result = (result as ZodString).min(Number(meta.minLength), {
        message: `Minimum ${meta.minLength} characters`,
      });
    }

    if (meta.maxLength) {
      result = (result as ZodString).max(Number(meta.maxLength), {
        message: `Maximum ${meta.maxLength} characters`,
      });
    }
  }

  return result;
};

// 전체 스키마 생성기
export const generateZodSchemaFromFormItems = (
  fields: FormField[]
): ZodObject<Record<string, ZodType<unknown>>> => {
  const shape: Record<string, ZodType<unknown>> = {};

  fields.forEach((field) => {
    const base = getBaseZodType(field.formItem as FormItemTypeKeys);
    const validated = applyMetaValidation(base, field.meta);
    shape[field.id] = validated;
  });

  return z.object(shape);
};
