import { create } from "zustand";
import { FormField } from "@/types/form";
import { devtools } from "zustand/middleware";

interface FormBuilderState {
  items: FormField[];
  addItem: (item: FormField) => void;
  removeItem: (id: string) => void;
}

export const useFormBuilderStore = create<FormBuilderState>()(
  devtools((set) => ({
    items: [],
    addItem: (item) =>
      set((state) => {
        if (state.items?.find((val) => val.id === item.id)) {
          return {
            items: [...state.items],
          };
        }

        return {
          items: [...state.items, item],
        };
      }),
    removeItem: (id) =>
      set((state) => ({
        items: state.items.filter((item) => item.id !== id),
      })),
  }))
);
