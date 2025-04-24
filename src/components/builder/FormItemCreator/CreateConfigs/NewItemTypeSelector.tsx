import Combobox from "@/components/ui/comboBox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { FormCreatorSchemaTypes, FormItemType } from "@/types/form";
import { defaultFormMeta } from "@/types/metaConfigs";
import { Control } from "node_modules/react-hook-form/dist/types/form";
import { useCallback } from "react";
import { useFormContext } from "react-hook-form";

const NewItemTypeSelector = ({
  control,
}: {
  control: Control<FormCreatorSchemaTypes, unknown, FormCreatorSchemaTypes>;
}) => {
  const formItemOptions = Object.keys(FormItemType).map((type) => ({
    value: type,
    label: FormItemType[type as keyof typeof FormItemType],
  }));

  const { setValue } = useFormContext();

  const handleItemChanged = useCallback(() => {
    setValue("meta", defaultFormMeta);
  }, [setValue]);

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
              _onSelect={(e) => {
                field.onChange(e);
                handleItemChanged();
              }}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default NewItemTypeSelector;
