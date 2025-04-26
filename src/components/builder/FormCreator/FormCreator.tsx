import { FormCreatorTestId, FormField, FormItemType } from "@/types/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../../ui/form";
import { Button } from "../../ui/button";
import NewItemLabelInput from "./CreateConfigs/NewItemLabelInput";
import NewItemTypeSelector from "./CreateConfigs/NewItemTypeSelector";
import FormItemConfigurator from "./CreateConfigs/FormItemConfigurator";
import { z } from "zod";
import { defaultFormMeta } from "@/config/meta/meta";
import Header from "@/components/ui/header";
import { useFormBuilderStore } from "@/components/store/useFormBuilderStore";
import { FormCreatorSchema } from "@/config/form/creator/formCreator";
import { nanoid } from "nanoid";

const FormCreator = () => {
  const addItem = useFormBuilderStore((store) => store.addItem);

  const form = useForm({
    resolver: zodResolver(FormCreatorSchema),
    defaultValues: {
      label: "",
      formItem: "",
      meta: defaultFormMeta,
    },
  });

  const onSubmit = (e: z.infer<typeof FormCreatorSchema>) => {
    const value =
      e.formItem === "checkBox"
        ? !!e.meta?.defaultChecked
        : (e as any).value ?? "";
    const newId = `${nanoid(7)}-${e.formItem}`;

    const newItem: FormField = {
      ...e,
      value,
      id: newId,
      name: (e as any).name || newId,
    } as FormField;
    addItem(newItem);
  };

  return (
    <section className="">
      <Header data-testid={FormCreatorTestId.header}>Add New Field</Header>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <div className="flex md:flex-row gap-6 justify-between flex-col">
            <NewItemLabelInput control={form.control} />
            <NewItemTypeSelector control={form.control} />
          </div>

          <FormItemConfigurator type={form.watch("formItem") as FormItemType} />

          <Button
            data-testid={FormCreatorTestId.submit}
            className="cursor-pointer w-28 self-end"
            type="submit"
          >
            Submit
          </Button>
        </form>
      </Form>
    </section>
  );
};

export default FormCreator;
