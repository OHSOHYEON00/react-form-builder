import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

type BaseFormFieldProps = {
  required?: boolean;
  label: string;
  description?: string;
  id: string;
  className?: string;
  error?: string;
};

export const BaseFormField = ({
  required,
  label,
  children,
  description,
  id,
  className = "",
  error,
}: React.PropsWithChildren<BaseFormFieldProps>) => {
  return (
    <div className={`${className}`}>
      <FormItem
        key={id}
        className={`grid grid-rows-1 gap-y-4 md:grid-cols-[minmax(4rem,8rem)_auto] md:grid-flow-col items-center`}
      >
        <FormLabel>
          {label} {required && <span className="text-red-500">*</span>}
        </FormLabel>
        {description && (
          <FormDescription className="">{description}</FormDescription>
        )}
        <FormControl>{children}</FormControl>
      </FormItem>
      {error && (
        <FormMessage className="sm:text-sm text-xs text-red-500">
          {error}
        </FormMessage>
      )}
    </div>
  );
};
