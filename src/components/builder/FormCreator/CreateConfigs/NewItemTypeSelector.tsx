import Combobox from "@/components/ui/comboBox";
import { FormField, FormFieldProps } from "@/components/ui/form";
import { FormCreatorTestId, FormItemType } from "@/types/form";
import { defaultFormMeta } from "@/config/meta/meta";
import { useCallback } from "react";
import { Control, useFormContext, useFormState } from "react-hook-form";
import { BaseFormField } from "../../common/BaseFormItemUI";
import { FormCreatorSchemaTypes } from "@/config/form/creator/formCreator";

const NewItemTypeSelector = ({
  control,
}: {
  control: Control<FormCreatorSchemaTypes, unknown, FormCreatorSchemaTypes>;
}) => {
  const formItemOptions = Object.keys(FormItemType).map((type) => ({
    value: type,
    label: FormItemType[type as keyof typeof FormItemType],
    testId: FormItemType[type as keyof typeof FormItemType],
  }));
  const error = useFormState({ control })?.errors?.formItem?.message || "";

  const { setValue, formState, clearErrors } = useFormContext();

  const handleItemChanged = useCallback(() => {
    setValue("meta", defaultFormMeta);
    if (formState.errors) clearErrors();
  }, [setValue, formState.errors, clearErrors]);

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
            dataTestId={FormCreatorTestId.comboBox}
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
