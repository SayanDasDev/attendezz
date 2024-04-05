"use client"

import * as React from "react";

import { cn } from "@/lib/utils";

const CircularProgress = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl w-8 h-8 relative text-card-foreground",
      className
    )}
    {...props}
  />
));
CircularProgress.displayName = "CircularProgress";

const CircularProgressSvg = React.forwardRef<
  SVGSVGElement,
  React.SVGProps<SVGSVGElement>
>(({ className, ...props }, ref) => (
  <svg
    ref={ref}
    className={cn("w-full h-full rotate-[-90deg]", className)}
    viewBox="0 0 160 160"
    {...props}
  />
));
CircularProgressSvg.displayName = "CircularProgressSvg";

const CircularProgressTrace = React.forwardRef<
  SVGCircleElement,
  React.SVGProps<SVGCircleElement>
>(({ className, ...props }, ref) => (
  <circle
    ref={ref}
    className={cn("stroke-muted text-transparent", className)}
    r="70"
    cx="80"
    cy="80"
    fill="currentColor"
    stroke="#e0e0e0"
    strokeWidth="12px"
    {...props}
  />
));
CircularProgressTrace.displayName = "CircularProgressTrace";

interface CircularProgressIndicatorProps
  extends React.SVGProps<SVGCircleElement> {
  value: number;
}

const CircularProgressIndicator = React.forwardRef<
  SVGCircleElement,
  CircularProgressIndicatorProps
>(({ className, value, ...props }, ref) => {
  const dasharray: number = typeof props.r === 'number' ? 2 * Math.PI * props.r : 439.6;
  const dashoffset: number = dasharray - (dasharray * value) / 100;
  return (
    <circle
      ref={ref}
      className={cn("stroke-primary text-transparent", className)}
      r="70"
      cx="80"
      cy="80"
      fill="currentColor"
      stroke="#60e6a8"
      strokeLinecap="round"
      strokeWidth="12px"
      strokeDasharray={`${dasharray}px`}
      strokeDashoffset={`${dashoffset}px`}
      {...props}
    >
    </circle>
  );
});
CircularProgressIndicator.displayName = "CircularProgressIndicator";

const CircularProgressVal = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "font-bold select-none text-primary leading-none tracking-tight absolute inset-0 flex items-center justify-center",
      className
    )}
    {...props}
  />
));
CircularProgressVal.displayName = "CircularProgressVal";

export {
  CircularProgress,
  CircularProgressSvg,
  CircularProgressVal,
  CircularProgressTrace,
  CircularProgressIndicator,
};
