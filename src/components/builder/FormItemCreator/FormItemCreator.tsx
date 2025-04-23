import { FormCreatorSchema, FormItemType } from "@/types/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../../ui/form";
import { useCallback } from "react";
import { Button } from "../../ui/button";
import NewItemLabelInput from "./CreateConfigs/NewItemLabelInput";
import NewItemTypeSelector from "./CreateConfigs/NewItemTypeSelector";
import FormItemConfigurator from "./CreateConfigs/FormItemConfigurator";

const FormItemCreator = () => {
  const form = useForm({
    resolver: zodResolver(FormCreatorSchema),
  });

  const onSubmit = useCallback((e: any) => {
    e.preventDefault();
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <h2>Add New Field</h2>

        <NewItemLabelInput control={form.control} />
        <NewItemTypeSelector control={form.control} />
        <FormItemConfigurator type={form.watch("formItem") as FormItemType} />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default FormItemCreator;
