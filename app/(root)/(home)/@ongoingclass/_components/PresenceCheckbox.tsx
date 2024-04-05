"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";

import { cn } from "@/lib/utils";
import { UserRoundCheck, UserRoundX } from "lucide-react";

const PresenceCheckbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => {

  return (
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(
        "peer h-12 w-12 shrink-0 relative rounded-sm shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-destructive disabled:cursor-not-allowed disabled:opacity-50 bg-destructive data-[state=checked]:ring-success data-[state=checked]:bg-success data-[state=checked]:text-primary-foreground",
        className
      )}
      {...props}
    >
      <div className="flex items-center absolute inset-0 justify-center text-current">
        <UserRoundX className="h-6 w-6 text-primary-foreground" />
      </div>
      <CheckboxPrimitive.Indicator
        className={cn("flex items-center absolute inset-0 justify-center text-current data-[state=indeterminate]:hidden")}
      >
        <UserRoundCheck className="h-6 w-6 text-primary-foreground bg-success" />
      </CheckboxPrimitive.Indicator>
      <CheckboxPrimitive.Indicator
        className={cn("flex items-center absolute inset-0 justify-center text-current data-[state=checked]:hidden")}
      >
        <UserRoundCheck className="h-6 w-6 text-primary-foreground bg-destructive" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
});

PresenceCheckbox.displayName = CheckboxPrimitive.Root.displayName;

export { PresenceCheckbox };
