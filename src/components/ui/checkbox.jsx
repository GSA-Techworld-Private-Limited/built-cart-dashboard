import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

const Checkbox = React.forwardRef(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    onChange={props.changeEvent}
    className={cn(
      `peer h-7 w-7 shrink-0 border ${props.border} ring-offset-[#0FB001] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-transparent data-[state=checked]:text-slate-50 dark:border-slate-800 dark:border-slate-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 dark:data-[state=checked]:bg-transparent dark:data-[state=checked]:text-slate-900`,
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      onChange={props.changeEvent}
      className={cn("flex items-center justify-center text-current")}
    >
      <Check onChange={props.changeEvent} className="h-5 w-5 text-[#0FB001]" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
