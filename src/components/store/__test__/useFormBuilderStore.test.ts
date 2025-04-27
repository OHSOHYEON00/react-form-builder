import { describe, it, expect, beforeEach } from "vitest";
import { act } from "@testing-library/react";
import { useFormBuilderStore } from "../useFormBuilderStore";
import { FormField } from "@/types/form";

describe("formBuilderStore", () => {
  beforeEach(() => {
    // Each test, init store
    useFormBuilderStore.setState({ items: [] });
  });

  it("Initial item list should empty", () => {
    const { items } = useFormBuilderStore.getState();
    expect(items).toEqual([]);
  });

  it("Verify addItem() - add item properly", () => {
    const obj = {
      label: "Test Item",
      formItem: "input",
      id: "1",
      name: "test input",
      meta: {} as FormField["meta"],
    };

    act(() => {
      useFormBuilderStore.getState().addItem(obj);
    });

    const { items } = useFormBuilderStore.getState();
    expect(items).toHaveLength(1);

    expect(items[0]).toMatchObject(obj);
  });

  it("Verify removeItem() - remove specific item", () => {
    act(() => {
      ["1", "2", "3", "4"].forEach((id) => {
        const obj = {
          label: "Test Item",
          formItem: "input",
          id,
          name: "test input",
          meta: {} as FormField["meta"],
        };
        useFormBuilderStore.getState().addItem(obj);
      });

      useFormBuilderStore.getState().removeItem("1");
    });

    const { items } = useFormBuilderStore.getState();
    expect(items).toHaveLength(3);
  });

  it("Check that adding an item with an already existing ID does not overwrite it.", () => {
    act(() => {
      const obj = {
        label: "First Item",
        formItem: "input",
        id: "1",
        name: "test input",
        meta: {} as FormField["meta"],
      };

      useFormBuilderStore.getState().addItem(obj);

      useFormBuilderStore
        .getState()
        .addItem({ ...obj, label: "Second item", formItem: "checkBox" });
    });

    const { items } = useFormBuilderStore.getState();
    expect(items).toHaveLength(1);
    expect(items[0].label).toBe("First Item");
  });

  it("When attempting to delete a non-existent id when calling removeItem, the", () => {
    act(() => {
      useFormBuilderStore.getState().addItem({
        label: "First Item",
        formItem: "input",
        id: "1",
        name: "test input",
        meta: {} as FormField["meta"],
      });
      useFormBuilderStore.getState().removeItem("non-existent-id");
    });

    const { items } = useFormBuilderStore.getState();
    expect(items).toHaveLength(1);
  });

  it("Working fine after adding bulk items", () => {
    act(() => {
      for (let i = 0; i < 150; i++) {
        useFormBuilderStore.getState().addItem({
          label: `Item ${i}`,
          formItem: "input",
          id: `${i}`,
          name: "test input",
          meta: {} as FormField["meta"],
        });
      }
    });

    const { items } = useFormBuilderStore.getState();
    expect(items).toHaveLength(150);
    expect(items[149].label).toBe("Item 149");
  });
});
