import { FormField, FormFieldProps } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { BaseFormField } from "../../common/BaseFormItemUI";
import { FormCreatorSchemaTypes } from "@/types/form";
import { Control } from "react-hook-form";

const NewItemLabelInput = ({
  control,
}: {
  control: Control<FormCreatorSchemaTypes>;
}) => {
  return (
    <FormField
      control={control as unknown as FormFieldProps["control"]}
      name="label"
      render={({ field }) => {
        return (
          <BaseFormField required={false} id={"label"} label={"Label"}>
            <Input placeholder="Input form label" {...field} />
          </BaseFormField>
        );
      }}
    />
  );
};

export default NewItemLabelInput;
