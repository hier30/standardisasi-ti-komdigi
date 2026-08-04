import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-4 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#013f82] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[#013f82] text-white hover:bg-[#00295a]",
        outline: "border border-[#c3c6d2] bg-white text-[#00295a] hover:bg-[#eaf3fb]",
        ghost: "text-[#00295a] hover:bg-[#eaf3fb]",
        danger: "bg-[#ba1a1a] text-white hover:bg-[#93000a]",
      },
      size: { default: "h-11", sm: "h-9 min-h-9 px-3", icon: "size-11 min-h-11 p-0" },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, ...props }, ref) => (
  <button ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
));
Button.displayName = "Button";

export { buttonVariants };
