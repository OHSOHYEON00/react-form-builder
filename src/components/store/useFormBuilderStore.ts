// useFormBuilderStore.ts
import { create } from "zustand";
import { nanoid } from "nanoid";
import { FormField } from "@/types/form";

interface FormBuilderState {
  items: FormField[];
  addItem: (item: Partial<FormField>) => void;
}

export const useFormBuilderStore = create<FormBuilderState>((set) => ({
  items: [],
  addItem: (item) =>
    set((state) => {
      const newId = `${nanoid()}-${item.formItem}`;
      return {
        items: [
          ...state.items,
          {
            ...item,
            id: newId,
            name: item.name || newId,
          } as FormField,
        ],
      };
    }),
}));
