import { create } from "zustand";
import { FormField } from "@/types/form";
import { devtools } from "zustand/middleware";

interface FormBuilderState {
  items: FormField[];
  addItem: (item: FormField) => void;
  removeItem: (id: string) => void;
  moveItem: (from: number, to: number) => void;
  updateItem: (id: string, data: Partial<FormField>) => void;
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
    moveItem: (from, to) =>
      set((state) => {
        const updated = [...state.items];
        const [moved] = updated.splice(from, 1);
        updated.splice(to, 0, moved);
        return { items: updated };
      }),
    updateItem: (id, data) =>
      set((state) => ({
        items: state.items.map((item) =>
          item.id === id ? { ...item, ...data } : item
        ),
      })),
  }))
);
