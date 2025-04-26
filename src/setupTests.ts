import "@testing-library/jest-dom";
import { vi } from "vitest";

global.matchMedia =
  global.matchMedia ||
  (() => ({
    matches: false,
    addListener: vi.fn(),
    removeListener: vi.fn(),
  }));
