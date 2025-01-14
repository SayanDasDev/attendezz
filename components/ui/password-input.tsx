import * as React from "react";
import { cn } from "@/lib/utils";
import { Toggle } from "./toggle";
import { Eye, EyeOff } from "lucide-react";

export interface PasswordInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClick = () => setShowPassword(!showPassword);

    return (
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          className={cn(
            "flex h-9 w-full !pr-14 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
        <Toggle
          type="button"
          variant={"outline"}
          size={"sm"}
          onClick={handleClick}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 data-[state=on]:bg-background"
        >
          {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
        </Toggle>
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
