import * as React from "react";

import { cn } from "@/lib/utils";
import { CardDescription } from "@/components/ui/card";

const ViewItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("grid grid-cols-[3rem_1fr] gap-3", className)}
    {...props}
  />
));
ViewItem.displayName = "ViewItem";

const ViewItemIcon = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "bg-primary/15 text-primary/80 h-full w-full rounded-sm flex items-center justify-center",
      className
    )}
    {...props}
  />
));
ViewItemIcon.displayName = "ViewItemIcon";

interface ViewItemContentProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: undefined | number | string;
}

const ViewItemContent = React.forwardRef<HTMLDivElement, ViewItemContentProps>(
  ({ className, ...props }, ref) => (
    <div>
      <CardDescription className="select-none truncate">{props.label}</CardDescription>
      <p className={cn(
      "font-medium text-lg",
      className
    )}>{props.value}</p>
    </div>
  )
);
ViewItemContent.displayName = "ViewItemContent";


export { ViewItem, ViewItemIcon, ViewItemContent }