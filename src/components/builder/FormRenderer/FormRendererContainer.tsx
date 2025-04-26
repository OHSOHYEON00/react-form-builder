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

  return <>{items && <FormRenderer items={items} onSubmit={onSubmit} />}</>;
};

export default FormRendererContainer;
