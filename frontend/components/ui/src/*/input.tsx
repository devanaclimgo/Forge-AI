import * as React from "react";

import { cn } from "../../../../lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-[#94a3b8] focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-[#38bdf8]/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-[#1f2937]/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-[#fb923c]/20 md:text-sm dark:bg-[#1f2937]/30 dark:disabled:bg-[#1f2937]/80 dark:aria-invalid:border-[#fb923c]/50 dark:aria-invalid:ring-[#fb923c]/40",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
