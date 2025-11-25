import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";

export const Badge = forwardRef<
  ElementRef<"span">,
  ComponentPropsWithoutRef<"span">
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn(
      "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium",
      className
    )}
    {...props}
  />
));
Badge.displayName = "Badge";
export default Badge;
