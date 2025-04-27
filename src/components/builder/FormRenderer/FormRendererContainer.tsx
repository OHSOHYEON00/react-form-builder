import { useFormBuilderStore } from "@/components/store/useFormBuilderStore";
import FormRenderer from "./FormRenderer";
import { toast } from "sonner";
import { normalizeFormData } from "@/lib/utils";

const FormRendererContainer = () => {
  const items = useFormBuilderStore((store) => store.items);

  const onSubmit = (data: Record<string, unknown>) => {
    const process = normalizeFormData(data);

    toast("Form has been submitted.", {
      description: (
        <p className="mt-2 max-w-[260px] text-white whitespace-pre-wrap break-words overflow-hidden rounded-md bg-slate-950 p-4">
          {JSON.stringify(process, null, 2)}
        </p>
      ),
      action: {
        label: "Undo",
        onClick: () => {},
      },
    });
  };

  return <>{items && <FormRenderer items={items} onSubmit={onSubmit} />}</>;
};

export default FormRendererContainer;
