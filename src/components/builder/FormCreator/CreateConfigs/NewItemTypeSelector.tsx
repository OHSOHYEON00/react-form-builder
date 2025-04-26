import Combobox from "@/components/ui/comboBox";
import { FormField, FormFieldProps } from "@/components/ui/form";
import { FormItemType } from "@/types/form";
import { defaultFormMeta } from "@/config/meta/meta";
import { useCallback } from "react";
import { Control, useFormContext, useFormState } from "react-hook-form";
import { BaseFormField } from "../../common/BaseFormItemUI";
import { FormCreatorSchemaTypes } from "@/config/form/form";

const NewItemTypeSelector = ({
  control,
}: {
  control: Control<FormCreatorSchemaTypes, unknown, FormCreatorSchemaTypes>;
}) => {
  const formItemOptions = Object.keys(FormItemType).map((type) => ({
    value: type,
    label: FormItemType[type as keyof typeof FormItemType],
  }));
  const error = useFormState({ control })?.errors?.formItem?.message || "";

  const { setValue } = useFormContext();

  const handleItemChanged = useCallback(() => {
    setValue("meta", defaultFormMeta);
  }, [setValue]);

  return (
    <FormField
      control={control as unknown as FormFieldProps["control"]}
      name="formItem"
      render={({ field }) => (
        <BaseFormField
          label="New Form Item"
          required={true}
          id={"formItem"}
          className="w-1/2"
          error={error}
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
