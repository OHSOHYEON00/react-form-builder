import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormCreatorSchemaTypes } from "@/types/form";
import { Control } from "node_modules/react-hook-form/dist/types/form";

const NewItemLabelInput = ({
  control,
}: {
  control: Control<FormCreatorSchemaTypes, unknown, FormCreatorSchemaTypes>;
}) => {
  return (
    <FormField
      control={control}
      name="label"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Label</FormLabel>
          <FormControl>
            <Input placeholder="Input form label" {...field} />
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default NewItemLabelInput;
