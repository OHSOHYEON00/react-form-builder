import { useFormBuilderStore } from "@/components/store/useFormBuilderStore";
import { Form, FormField } from "@/components/ui/form";
import { BaseFormField } from "./BaseFormItemUI";
import { FormItemTypeKeys } from "@/types/form";
import {
  ControllerRenderProps,
  FieldValues,
} from "node_modules/react-hook-form/dist/types";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import Header from "@/components/ui/header";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { generateZodSchemaFromFormItems } from "@/lib/utils";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const FormRenderer = () => {
  const items = useFormBuilderStore((store) => store.items);

  const schema = generateZodSchemaFromFormItems(items);

  const form = useForm({
    resolver: zodResolver(schema),
  });

  const renderInput = (
    type: FormItemTypeKeys,
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
      case "textArea":
        return <Textarea {...field} />;
      default:
        return null;
    }
  };

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
          <div className="gap-6 flex md:flex-wrap sm:flex-col">
            {items.map((item) => {
              return (
                <FormField
                  key={item.id}
                  control={form.control}
                  name={item.name}
                  render={({ field }) => (
                    <BaseFormField
                      key={item.id}
                      id={item.id}
                      {...(item.meta || {})}
                      label={item.label || ``}
                    >
                      {renderInput(item.formItem as FormItemTypeKeys, {
                        ...field,
                        ...item.meta,
                      })}
                    </BaseFormField>
                  )}
                />
              );
            })}
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
