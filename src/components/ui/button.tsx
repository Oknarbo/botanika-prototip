import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-botanika-green focus-visible:ring-offset-2 focus-visible:ring-offset-botanika-dark disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-botanika-green text-botanika-dark hover:bg-botanika-green/90 shadow-lg shadow-botanika-green/20",
        secondary:
          "bg-botanika-cream/10 text-botanika-cream border border-botanika-cream/20 hover:bg-botanika-cream/15",
        outline:
          "border border-botanika-green/40 text-botanika-green hover:bg-botanika-green/10",
        ghost: "text-botanika-cream/80 hover:bg-botanika-cream/10 hover:text-botanika-cream",
        cream: "bg-botanika-cream text-botanika-dark hover:bg-botanika-cream/90",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 rounded-lg px-4 text-xs",
        lg: "h-14 rounded-2xl px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
