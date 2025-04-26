import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type BaseFormFieldProps = {
  required?: boolean;
  label: string;
  description?: string;
  id: string;
  className?: string;
  error?: string;
};

const Label = ({
  label = "",
  required = false,
}: Partial<BaseFormFieldProps>) => (
  <>
    {label.length > 20 ? (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className=" min-w-0">
            <FormLabel className="truncate ">
              {label} {required && <span className="text-red-500 ">*</span>}
            </FormLabel>
          </TooltipTrigger>
          <TooltipContent className="w-1/2 ml-8">
            <p>{label}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ) : (
      <FormLabel className="truncate min-w-0">
        {label} {required && <span className="text-red-500">*</span>}
      </FormLabel>
    )}
  </>
);

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
        <Label label={label} required={required} />
        {description && (
          <FormDescription className="">{description}</FormDescription>
        )}
        <FormControl>{children}</FormControl>
      </FormItem>
      {error && (
        <FormMessage className="sm:text-sm text-end text-xs text-red-500">
          {error}
        </FormMessage>
      )}
    </div>
  );
};
