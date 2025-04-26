// validationMap.test.tsx
import { describe, it, expect, vi } from "vitest";
import { z } from "zod";
import { validationMap } from "../form";
import { FormField } from "@/types/form";

// mocked ctx
const createMockCtx = () => {
  return {
    addIssue: vi.fn(),
  } as unknown as z.RefinementCtx;
};

describe("validationMap", () => {
  describe("input validation", () => {
    it("should add issue when required and minLength is missing or <= 0", () => {
      const ctx = createMockCtx();
      const meta = { required: true, minLength: 0, maxLength: 10 };

      validationMap.input?.(meta as FormField["meta"], ctx);

      expect(ctx.addIssue).toHaveBeenCalledWith(
        expect.objectContaining({
          path: ["meta", "minLength"],
          message: "Min length must be greater or equal to 1",
        })
      );
    });

    it("should add issue when not required and minLength < 0", () => {
      const ctx = createMockCtx();
      const meta = { required: false, minLength: -1, maxLength: 10 };

      validationMap.input?.(meta as FormField["meta"], ctx);

      expect(ctx.addIssue).toHaveBeenCalledWith(
        expect.objectContaining({
          path: ["meta", "minLength"],
          message: "Min length must be greater or equal to 0",
        })
      );
    });

    it("should add issue when maxLength <= 0", () => {
      const ctx = createMockCtx();
      const meta = { required: true, minLength: 1, maxLength: 0 };

      validationMap.input?.(meta as FormField["meta"], ctx);

      expect(ctx.addIssue).toHaveBeenCalledWith(
        expect.objectContaining({
          path: ["meta", "maxLength"],
          message: "Max length must be greater or equal to 1",
        })
      );
    });

    it("should add issue when minLength > maxLength", () => {
      const ctx = createMockCtx();
      const meta = { required: true, minLength: 10, maxLength: 5 };

      validationMap.input?.(meta as FormField["meta"], ctx);

      expect(ctx.addIssue).toHaveBeenCalledWith(
        expect.objectContaining({
          path: ["meta", "minLength"],
          message: "Min length must be less than or equal to Max length",
        })
      );
    });
  });

  describe("textArea validation", () => {
    it("should behave same as input", () => {
      const ctx = createMockCtx();
      const meta = { required: true, minLength: 0, maxLength: 10 };

      validationMap.textArea?.(meta as FormField["meta"], ctx);

      expect(ctx.addIssue).toHaveBeenCalledWith(
        expect.objectContaining({
          path: ["meta", "minLength"],
          message: "Min length must be greater or equal to 1",
        })
      );
    });
  });

  describe("checkBox validation", () => {
    it("should do nothing", () => {
      const ctx = createMockCtx();
      const meta = {};

      validationMap.checkBox?.(meta as FormField["meta"], ctx);

      expect(ctx.addIssue).not.toHaveBeenCalled();
    });
  });

  describe("numberInput validation", () => {
    it("should add issue when required and min is missing or <= 0", () => {
      const ctx = createMockCtx();
      const meta = { required: true, min: 0, max: 10 };

      validationMap.numberInput?.(meta as FormField["meta"], ctx);

      expect(ctx.addIssue).toHaveBeenCalledWith(
        expect.objectContaining({
          path: ["meta", "min"],
          message: "Min must be greater or equal to 1",
        })
      );
    });

    it("should add issue when min > max", () => {
      const ctx = createMockCtx();
      const meta = { required: false, min: 10, max: 5 };

      validationMap.numberInput?.(meta as FormField["meta"], ctx);

      expect(ctx.addIssue).toHaveBeenCalledWith(
        expect.objectContaining({
          path: ["meta", "min"],
          message: "Min must be less than or equal to Max",
        })
      );
    });
  });
});
