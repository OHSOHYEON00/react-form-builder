import { useFormBuilderStore } from "@/components/store/useFormBuilderStore";
import { Form } from "@/components/ui/form";
import { FormItemTypeKeys } from "@/types/form";
import Header from "@/components/ui/header";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { generateZodSchemaFromFormItems, normalizeFormData } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import ItemRenderer from "../common/ItemRenderer";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { useEffect } from "react";

const FormRenderer = () => {
  const items = useFormBuilderStore((store) => store.items);

  const schema = generateZodSchemaFromFormItems(items);

  const form = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    items.forEach((item) => {
      if (item.name?.includes("checkBox")) {
        form.setValue(item.name, item.meta?.defaultChecked);
      }
    });
  }, [items, form]);

  const onSubmit = () => {
    const process = normalizeFormData(form.getValues());

    toast("Form has been submitted.", {
      description: (
        <pre className="mt-2 w-[260px]  rounded-md bg-slate-950 p-4">
          <p className="text-white">{JSON.stringify(process, null, 2)}</p>
        </pre>
      ),
      action: {
        label: "Undo",
        onClick: () => {},
      },
    });
  };

  return (
    <>
      <Header>Your Custom Form</Header>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <div className="gap-6 flex md:flex-wrap flex-col">
            <ItemRenderer
              items={items}
              control={form.control}
              getType={(item) => item.formItem as FormItemTypeKeys}
              getFieldProps={(item, field) => ({
                ...field,
                ...item.meta,
              })}
            />
          </div>

          <Button className="cursor-pointer w-28 self-end" type="submit">
            Submit
          </Button>
          <div>{JSON.stringify(form.formState.errors)}</div>
        </form>
      </Form>
      <Toaster />
    </>
  );
};

export default FormRenderer;
