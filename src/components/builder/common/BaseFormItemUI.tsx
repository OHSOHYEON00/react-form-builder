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

export type BaseFormFieldProps = {
  required?: boolean;
  label: string;
  description?: string;
  id: string;
  className?: string;
  error?: string;
  isFixItemSize?: boolean;
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
              className="truncate font-normal"
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
      <FormLabel className="truncate min-w-0 font-normal">
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
  error,
  isFixItemSize = false,
}: React.PropsWithChildren<BaseFormFieldProps>) => {
  const gridSize = isFixItemSize
    ? "md:grid-cols-[minmax(4rem,8rem)_11rem]"
    : "md:grid-cols-[minmax(4rem,8rem)_auto]";
  return (
    <>
      <FormItem
        key={id}
        className={`grid w-full h-full grid-rows-1 gap-y-4 ${gridSize} md:grid-flow-col items-center`}
      >
        <div>
          <Label label={label} required={required} />
          {description && (
            <FormDescription className="">{description}</FormDescription>
          )}
          <div className="md:min-h-[1.25rem]"></div>
        </div>

        <div className="flex flex-col justify-center ">
          <FormControl>{children}</FormControl>
          <div className="min-h-[1.25rem]">
            {error && (
              <FormMessage className=" break-all text-xs text-start text-red-500 md:ml-1 mt-2">
                {error}
              </FormMessage>
            )}
          </div>
        </div>
      </FormItem>
    </>
  );
};
