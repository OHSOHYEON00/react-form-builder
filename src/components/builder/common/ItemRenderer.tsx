import { Checkbox } from "@/components/ui/checkbox";
import { FormField, FormFieldProps } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormField as FormFieldType, FormItemTypeKeys } from "@/types/form";
import {
  ControllerRenderProps,
  FieldValues,
} from "node_modules/react-hook-form/dist/types";
import { BaseFormField } from "./BaseFormItemUI";

const renderInput = (
  type: FormItemTypeKeys,
  field: ControllerRenderProps<FieldValues>
) => {
  switch (type) {
    case "input":
      return <Input {...field} />;
    case "numberInput":
      return <Input {...field} type="number" className="md:w-1/2 w-full" />;
    case "checkBox":
      return (
        <Checkbox
          {...field}
          checked={field.value}
          onCheckedChange={field.onChange}
        />
      );
    case "textArea":
      return <Textarea {...field} />;
    default:
      return null;
  }
};

export interface FormFieldRendererProps {
  items: FormFieldType[];
  control: FormFieldProps["control"];
  getType: (item: FormFieldType) => FormItemTypeKeys;
  getFieldProps: (
    item: FormFieldType,
    field: ControllerRenderProps<FieldValues>
  ) => ControllerRenderProps<FieldValues>;
}

const ItemRenderer = ({
  items,
  control,
  getType,
  getFieldProps,
}: FormFieldRendererProps) => {
  return (
    <>
      {items.map((item) => (
        <FormField
          key={item.id}
          control={control}
          name={item.name}
          render={({ field }) => (
            <BaseFormField
              key={item.id}
              id={item.id}
              label={item.label || ""}
              {...(item.meta || {})}
              error={item.error}
            >
              {renderInput(getType(item), getFieldProps(item, field))}
            </BaseFormField>
          )}
        ></FormField>
      ))}
    </>
  );
};

export default ItemRenderer;
