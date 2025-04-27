import { useFormBuilderStore } from "@/components/store/useFormBuilderStore";
import { Form } from "@/components/ui/form";
import { FormField, FormItemTypeKeys } from "@/types/form";
import Header from "@/components/ui/header";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import ItemRenderer from "../common/ItemRenderer";
import { Toaster } from "@/components/ui/sonner";
import { useCallback, useEffect } from "react";
import { generateDynamicSchema } from "@/config/form/renderer/formRender";
import DndContainer from "../common/DndContainer";

const FormRenderer = ({
  items,
  onSubmit,
}: {
  items: FormField[];
  onSubmit: () => void;
}) => {
  const removeItem = useFormBuilderStore((store) => store.removeItem);
  const moveItem = useFormBuilderStore((store) => store.moveItem);
  const updateItem = useFormBuilderStore((store) => store.updateItem);

  const schema = generateDynamicSchema(items);

  const form = useForm({
    resolver: zodResolver(schema),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    items.forEach((item) => {
      if (item.name?.includes("checkBox")) {
        const currentValue = form.getValues(item.name);
        if (currentValue === undefined)
          form.setValue(item.name, item.meta?.defaultChecked);
      }
    });
  }, [items, form]);

  const handleRemoveItem = (id: string) => {
    removeItem(id);
    form.unregister(id);
  };

  const handleChangeForm = useCallback(
    (e) => {
      if (e.target?.value !== undefined) {
        const name = e.target.name;
        const item = items.find((item) => item.name === name);

        updateItem(name, { ...item, value: e.target.value });
      }
    },
    [updateItem, items]
  );

  const handleSubmit = useCallback(() => onSubmit(), [onSubmit]);

  return (
    <div className="mt-12">
      <Header>Your Custom Form</Header>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-6"
          noValidate
          onChange={handleChangeForm}
        >
          <DndContainer items={items} moveItem={moveItem}>
            <div className="gap-6 flex md:flex-wrap flex-col">
              <ItemRenderer
                items={items}
                control={form.control}
                getType={(item) => item.formItem as FormItemTypeKeys}
                getFieldProps={(item, field) => ({
                  ...field,
                  ...item.meta,
                  "data-testid": `${item.label}-${item.formItem}`,
                })}
                errors={form?.formState?.errors}
                isHandleItem
                handleRemoveItem={handleRemoveItem}
                isDnd={true}
              />
            </div>
          </DndContainer>

          <Button
            className="cursor-pointer w-28 self-end"
            type="submit"
            disabled={items.length <= 0}
            aria-label="RendererSubmitButton"
          >
            Submit
          </Button>
        </form>
      </Form>
      <Toaster />
    </div>
  );
};

export default FormRenderer;
