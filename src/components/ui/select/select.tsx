import { Fragment } from "react";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import { SelectProps } from "@/types/ui";

export function Select({ value, onChange, options, placeholder = "Select...", className, ariaLabel }: SelectProps) {
  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className={cn("relative", className)}>
      <Listbox value={value} onChange={onChange}>
        {({ open }) => (
          <>
            <ListboxButton
              aria-label={ariaLabel}
              className={cn(
                "flex h-10 w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm ring-offset-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 hover:border-slate-300 cursor-pointer",
                open && "ring-2 ring-blue-600 ring-offset-2 border-blue-600"
              )}
            >
              <span className={cn("block truncate", !selectedOption && "text-slate-500")}>
                {selectedOption ? selectedOption.label : placeholder}
              </span>
              <span className="pointer-events-none flex items-center">
                <ChevronDownIcon
                  className={cn(
                    "h-4 w-4 text-slate-400 transition-transform duration-200",
                    open && "rotate-180"
                  )}
                  aria-hidden="true"
                />
              </span>
            </ListboxButton>

            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <ListboxOptions className="absolute z-50 mt-2 max-h-60 w-full overflow-auto rounded-xl border border-slate-200 bg-white p-1 text-sm shadow-xl focus:outline-none animate-in fade-in zoom-in-95 duration-200">
                {options.map((option) => (
                  <ListboxOption
                    key={option.value}
                    value={option.value}
                    className={({ active, selected }) =>
                      cn(
                        "relative flex w-full cursor-pointer select-none items-center justify-between rounded-lg py-2.5 px-3 outline-none transition-colors",
                        active ? "bg-slate-50 text-slate-900" : "text-slate-700",
                        selected && "bg-blue-50 text-blue-700 font-medium"
                      )
                    }
                  >
                    {({ selected }) => (
                      <>
                        <span className={cn("block truncate", selected ? "font-medium" : "font-normal")}>
                          {option.label}
                        </span>
                        {selected && (
                          <span className="flex items-center">
                            <CheckIcon className="h-4 w-4" aria-hidden="true" />
                          </span>
                        )}
                      </>
                    )}
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </Transition>
          </>
        )}
      </Listbox>
    </div>
  );
}
