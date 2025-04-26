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
            <FormLabel
              className="truncate "
              onClick={(e) => e.preventDefault()}
            >
              {label} {required && <span className="text-red-500 ">*</span>}
            </FormLabel>
          </TooltipTrigger>
          <TooltipContent collisionPadding={{ top: 20, left: 20 }}>
            <p className="max-w-[200px] md:max-w-[400px] break-all text-center p-2">
              {label}
            </p>
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
        className={`grid h-full grid-rows-1 gap-y-4 md:grid-cols-[minmax(4rem,8rem)_auto] md:grid-flow-col items-center`}
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
