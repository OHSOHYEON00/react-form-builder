import { create } from "zustand";
import { nanoid } from "nanoid";
import { FormField } from "@/types/form";
import { devtools } from "zustand/middleware";

interface FormBuilderState {
  items: FormField[];
  addItem: (item: Partial<FormField>) => void;
}

export const useFormBuilderStore = create<FormBuilderState>()(
  devtools((set) => ({
    items: [],
    addItem: (item) =>
      set((state) => {
        const value =
          item.formItem === "checkBox"
            ? !!item.meta?.defaultChecked
            : item.value ?? "";
        const newId = `${nanoid()}-${item.formItem}`;
        return {
          items: [
            ...state.items,
            {
              ...item,
              value,
              id: newId,
              name: item.name || newId,
            } as FormField,
          ],
        };
      }),
  }))
);
