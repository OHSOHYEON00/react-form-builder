import Combobox from "@/components/ui/comboBox";
import { FormField } from "@/components/ui/form";
import { FormCreatorSchemaTypes, FormItemType } from "@/types/form";
import { defaultFormMeta } from "@/types/metaConfigs";
import { Control } from "node_modules/react-hook-form/dist/types/form";
import { useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { BaseFormField } from "../../FormRenderer/BaseFormItemUI";

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
        <BaseFormField
          label="New Form Item"
          required={true}
          id={"formItem"}
          className="w-1/2"
        >
          <Combobox
            {...field}
            options={formItemOptions}
            _onSelect={(e) => {
              field.onChange(e);
              handleItemChanged();
            }}
          />
        </BaseFormField>
      )}
    />
  );
};

export default NewItemTypeSelector;
