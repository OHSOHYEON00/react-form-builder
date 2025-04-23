import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  // FormMessage,
} from "@/components/ui/form";

type BaseFormFieldProps = {
  required?: boolean;
  label: string;
  description?: string;
};

export const BaseFormField = ({
  required,
  label,
  children,
  description,
}: React.PropsWithChildren<BaseFormFieldProps>) => {
  return (
    <FormItem>
      <div className="mb-4">
        <FormLabel>
          {label} {required && <span className="text-red-500">*</span>}
        </FormLabel>
        {description && (
          <FormDescription className="">{description}</FormDescription>
        )}
        <FormControl>{children}</FormControl>
        {/* {error && (
        <FormMessage className="text-sm text-red-500">{error}</FormMessage>
      )} */}
      </div>
    </FormItem>
  );
};
