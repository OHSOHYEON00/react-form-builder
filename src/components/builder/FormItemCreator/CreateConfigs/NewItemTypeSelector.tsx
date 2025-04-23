import Combobox from "@/components/ui/comboBox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { FormCreatorSchemaTypes, FormItemType } from "@/types/form";
import { Control } from "node_modules/react-hook-form/dist/types/form";

const NewItemTypeSelector = ({
  control,
}: {
  control: Control<FormCreatorSchemaTypes, unknown, FormCreatorSchemaTypes>;
}) => {
  const formItemOptions = Object.keys(FormItemType).map((type) => ({
    value: type,
    label: FormItemType[type as keyof typeof FormItemType],
  }));

  return (
    <FormField
      control={control}
      name="formItem"
      render={({ field }) => (
        <FormItem>
          <FormLabel>New Form Item</FormLabel>
          <FormControl>
            <Combobox
              {...field}
              options={formItemOptions}
              _onSelect={field.onChange}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default NewItemTypeSelector;
