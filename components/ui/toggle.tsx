"use client"

import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const toggleVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground",
        present:
          "border border-emerald-300 text-emerald-500 bg-emerald-50 shadow-sm hover:bg-emerald-100 hover:text-emerald-600 data-[state=on]:bg-emerald-600 data-[state=on]:text-emerald-50",
        absent:
          "border border-red-300 text-red-500 bg-red-50 shadow-sm hover:bg-red-100 hover:text-red-600 data-[state=on]:bg-red-600 data-[state=on]:text-red-50",
        location:
         "base-medium p-2 h-full border border-primary/50 hover:border-primary text-primary hover:text-primary bg-accent-foreground/80 hover:bg-accent-foreground/70 hover rounded-full text-center flex items-center justify-center data-[state=on]:bg-primary/80 data-[state=on]:text-accent-foreground data-[state=on]:scale-[98%] transition-transform duration-200",
      },
      size: {
        default: "h-9 px-3",
        sm: "h-8 px-2",
        lg: "h-10 px-3",
        none: "py-3 px-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size, className }))}
    {...props}
  />
))

Toggle.displayName = TogglePrimitive.Root.displayName

export { Toggle, toggleVariants }
