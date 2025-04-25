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
  }))
);
