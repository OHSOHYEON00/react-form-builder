import { metaConfigs } from "@/config/meta";
import { useFormContext, useFormState } from "react-hook-form";
import {
  FormItemType,
  FormField as FormFieldType,
  FormItemTypeKeys,
} from "@/types/form";
import ItemRenderer from "../../common/ItemRenderer";

const FormItemConfigurator = ({ type }: { type: FormItemType }) => {
  const { control } = useFormContext();
  const { errors } = useFormState({ control });

  const configs: FormFieldType[] =
    metaConfigs[type]?.map(({ type, name, label }) => ({
      id: `${type}.${name}`,
      name: `meta.${name}`,
      meta: {
        required: false,
      } as FormFieldType["meta"],
      label: label,
      formItem: type,
      error: (errors?.meta && (errors.meta as any)[name]?.message) || "",
    })) || [];

  if (configs.length <= 0) {
    return <></>;
  }

  return (
    <>
      <h2 className="border-b-2 border-stone-200 pb-2 mt-8 font-medium">
        Validation Configs
      </h2>
      <div className="gap-6 flex md:flex-wrap md:flex-row flex-col">
        <ItemRenderer
          items={configs}
          control={control}
          getType={(item) => item.formItem as FormItemTypeKeys}
          getFieldProps={(_, field) => field}
        />
      </div>
    </>
  );
};
export default FormItemConfigurator;
