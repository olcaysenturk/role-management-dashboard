import React from "react";
import { cn } from "@/lib/utils";
import { InputProps } from "@/types/ui";

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, id, ...props }, ref) => {
    return (
      <div className="w-full">
        <input
          id={id}
          type={type}
          aria-invalid={!!error}
          aria-describedby={error && id ? `${id}-error` : undefined}
          className={cn(
            "flex h-10 w-full rounded-xl border bg-white px-3 py-2 text-sm transition-all focus:outline-none focus:ring-4 disabled:cursor-not-allowed disabled:opacity-50",
            error 
              ? "border-red-300 focus:border-red-500 focus:ring-red-100 placeholder:text-red-300" 
              : "border-slate-200 focus:border-blue-600 focus:ring-blue-100 placeholder:text-slate-400",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && id && (
          <p id={`${id}-error`} className="text-red-500 text-xs mt-1.5 font-medium" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";
