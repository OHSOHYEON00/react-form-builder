import { Checkbox } from "@/components/ui/checkbox";
import { FormField, FormFieldProps } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormField as FormFieldType, FormItemTypeKeys } from "@/types/form";
import {
  ControllerRenderProps,
  FieldErrors,
  FieldValues,
} from "node_modules/react-hook-form/dist/types";
import { BaseFormField } from "./BaseFormItemUI";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export interface FormFieldRendererProps {
  items: FormFieldType[];
  control: FormFieldProps["control"];
  getType: (item: FormFieldType) => FormItemTypeKeys;
  getFieldProps: (
    item: FormFieldType,
    field: ControllerRenderProps<FieldValues>
  ) => ControllerRenderProps<FieldValues>;
  errors?: FieldErrors<FieldValues>;
  isHandleItem?: boolean;
  handleRemoveItem?: (id: string) => void;
}

const renderInput = (
  type: FormItemTypeKeys,
  field: ControllerRenderProps<FieldValues>
) => {
  switch (type) {
    case "input":
      return <Input {...field} className="w-full" />;
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

const getErrormsg = (
  name: string,
  errors?: FieldErrors<FieldValues>
): string => {
  if (errors) {
    return errors[name]?.message as string;
  }
  return "";
};

const ItemRenderer = ({
  items,
  control,
  getType,
  getFieldProps,
  errors,
  isHandleItem = false,
  handleRemoveItem,
}: FormFieldRendererProps) => {
  return (
    <>
      {items.map((item) => (
        <div
          key={item.id}
          className="grid grid-cols-[auto_0fr] items-start h-full"
        >
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
                error={getErrormsg(item.name, errors)}
                className="h-full"
              >
                {renderInput(getType(item), getFieldProps(item, field))}
              </BaseFormField>
            )}
          ></FormField>
          {isHandleItem && (
            <Button
              type="button"
              className="cursor-pointer bg-transparent shadow-none text-black ml-2 hover:bg-transparent hover:text-gray-500"
              onClick={() => handleRemoveItem && handleRemoveItem(item.id)}
            >
              <Trash2 />
            </Button>
          )}
        </div>
      ))}
    </>
  );
};

export default ItemRenderer;
