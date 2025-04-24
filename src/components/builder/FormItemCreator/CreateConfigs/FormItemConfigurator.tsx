import { metaConfigs } from "@/types/metaConfigs";
import { BaseFormField } from "../../FormRenderer/BaseFormItemUI";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/ui/form";
import {
  ControllerRenderProps,
  FieldValues,
  useFormContext,
} from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { FormItemType } from "@/types/form";

const FormItemConfigurator = ({ type }: { type: FormItemType }) => {
  const configs = metaConfigs[type] || [];
  const { control } = useFormContext();

  const renderInput = (
    type: keyof typeof FormItemType,
    field: ControllerRenderProps<FieldValues>
  ) => {
    switch (type) {
      case "input":
        return <Input {...field} />;
      case "numberInput":
        return <Input {...field} type="number" />;
      case "checkBox":
        return (
          <Checkbox
            {...field}
            checked={field.value}
            onCheckedChange={field.onChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-2">
      {configs.map(({ name, label, type: configType }) => (
        <FormField
          key={name}
          control={control}
          name={`meta.${name}`}
          render={({ field }) => (
            <BaseFormField
              id={`${type}.${name}`}
              required={false}
              label={label}
            >
              {renderInput(configType, field)}
            </BaseFormField>
          )}
        />
      ))}
    </div>
  );
};
export default FormItemConfigurator;
