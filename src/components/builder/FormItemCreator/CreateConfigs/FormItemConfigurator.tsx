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

  if (configs.length <= 0) {
    return <></>;
  }

  const renderInput = (
    type: keyof typeof FormItemType,
    field: ControllerRenderProps<FieldValues>
  ) => {
    switch (type) {
      case "input":
        return <Input {...field} className=" w-full" />;
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
      default:
        return null;
    }
  };

  return (
    <>
      <h2 className="border-b-2 border-stone-200 pb-2 mt-8 font-medium">
        Validation Configs
      </h2>
      <div className="gap-6 flex md:flex-wrap md:flex-row flex-col">
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
    </>
  );
};
export default FormItemConfigurator;
