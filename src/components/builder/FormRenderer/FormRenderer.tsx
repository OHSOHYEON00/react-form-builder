import { useFormBuilderStore } from "@/components/store/useFormBuilderStore";
import { Form } from "@/components/ui/form";
import { FormItemTypeKeys } from "@/types/form";
import Header from "@/components/ui/header";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { generateZodSchemaFromFormItems } from "@/lib/utils";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import ItemRenderer from "../common/ItemRenderer";

const FormRenderer = () => {
  const items = useFormBuilderStore((store) => store.items);

  const schema = generateZodSchemaFromFormItems(items);

  const form = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (e: z.infer<typeof schema>) => {
    console.log("진짜 submit!", e, form.formState);
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
    </>
  );
};

export default FormRenderer;
