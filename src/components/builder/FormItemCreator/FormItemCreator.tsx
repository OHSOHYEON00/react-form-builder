import { FormCreatorSchema, FormItemType } from "@/types/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../../ui/form";
import { Button } from "../../ui/button";
import NewItemLabelInput from "./CreateConfigs/NewItemLabelInput";
import NewItemTypeSelector from "./CreateConfigs/NewItemTypeSelector";
import FormItemConfigurator from "./CreateConfigs/FormItemConfigurator";
import { z } from "zod";
import { defaultFormMeta } from "@/types/metaConfigs";

const FormItemCreator = () => {
  const form = useForm({
    resolver: zodResolver(FormCreatorSchema),
    defaultValues: {
      label: "",
      formItem: undefined,
      meta: defaultFormMeta,
    },
  });

  const onSubmit = (e: z.infer<typeof FormCreatorSchema>) => {
    console.log(e);
    console.log("?>>> on Submit", form.getValues());
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <h2>Add New Field</h2>

        <NewItemLabelInput control={form.control} />
        <NewItemTypeSelector control={form.control} />
        <FormItemConfigurator type={form.watch("formItem") as FormItemType} />
        <Button className="cursor-pointer" type="submit">
          Submit
        </Button>
        <div>{JSON.stringify(form.watch())}</div>
        <div>{JSON.stringify(form.formState.errors)}</div>
      </form>
    </Form>
  );
};

export default FormItemCreator;
