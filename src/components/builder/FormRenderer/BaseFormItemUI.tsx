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
  id: string;
  className?: string;
};

export const BaseFormField = ({
  required,
  label,
  children,
  description,
  id,
  className = "",
}: React.PropsWithChildren<BaseFormFieldProps>) => {
  return (
    <FormItem
      key={id}
      className={`grid grid-rows-1 gap-y-4 md:grid-cols-[minmax(4rem,8rem)_auto] md:grid-flow-col items-center ${className}`}
    >
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
    </FormItem>
  );
};
