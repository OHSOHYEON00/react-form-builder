import { z } from "zod";

export enum FormItemType {
  input = "Input",
  checkBox = "Checkbox",
  numberInput = "NumberInput",
  textArea = "Textarea",
}
export type FormItem = {
  type: FormItemType;
  id: string;
};

export const FormCreatorSchema = z.object({
  label: z.string(),
  formItem: z.nativeEnum(FormItemType),
});

export type FormCreatorSchemaTypes = z.infer<typeof FormCreatorSchema>;
