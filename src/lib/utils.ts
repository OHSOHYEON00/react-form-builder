import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function stringToInt(value: string): number | undefined {
  if (typeof value === "string") {
    const parsed = parseInt(value, 10);
    return isNaN(parsed) ? undefined : parsed;
  }
  if (typeof value === "number") {
    return value;
  }
  return undefined;
}
