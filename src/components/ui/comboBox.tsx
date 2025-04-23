import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverContentProps,
  PopoverTrigger,
} from "@/components/ui/popover";

type ListType = { value: string; label: string };

interface ComboBoxProps extends PopoverContentProps {
  options?: Array<ListType>;
  initOpen?: boolean;
  initValue?: ListType["value"];
  placeholder?: string;
  _onSelect?: (value: string | undefined) => void;
}

const Combobox = ({
  initOpen = false,
  initValue = undefined,
  options = [],
  placeholder = "Select",
  _onSelect,
}: ComboBoxProps) => {
  const [open, setOpen] = React.useState(initOpen);
  const [value, setValue] = React.useState<string | undefined>(initValue);

  console.log(options, value);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value && options
            ? options.find((options) => options.value === value)?.label
            : placeholder}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={placeholder} className="h-9" />
          <CommandList>
            <CommandEmpty>Not found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue: string) => {
                    const nextValue =
                      currentValue === value ? undefined : currentValue;
                    setValue(nextValue);
                    setOpen(false);
                    _onSelect?.(nextValue);
                  }}
                >
                  {option.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default Combobox;
