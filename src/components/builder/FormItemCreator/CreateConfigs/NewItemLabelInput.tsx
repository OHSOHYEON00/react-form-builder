import { FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormCreatorSchemaTypes } from "@/types/form";
import { Control } from "node_modules/react-hook-form/dist/types/form";
import { BaseFormField } from "../../FormRenderer/BaseFormItemUI";

const NewItemLabelInput = ({
  control,
}: {
  control: Control<FormCreatorSchemaTypes, unknown, FormCreatorSchemaTypes>;
}) => {
  return (
    <FormField
      control={control}
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
