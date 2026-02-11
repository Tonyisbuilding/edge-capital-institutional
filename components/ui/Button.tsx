import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center rounded-none font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-institutional-teal disabled:pointer-events-none disabled:opacity-50 font-serif tracking-wide border-0 cursor-pointer",
                    {
                        "bg-institutional-navy text-institutional-white hover:bg-institutional-navy/90":
                            variant === "primary",
                        "border border-institutional-charcoal bg-transparent text-institutional-charcoal hover:bg-institutional-charcoal/5":
                            variant === "outline",
                        "hover:bg-institutional-charcoal/5 text-institutional-charcoal": variant === "ghost",
                        "h-9 px-4 text-xs": size === "sm",
                        "h-12 px-6 text-sm": size === "md",
                        "h-14 px-8 text-base": size === "lg",
                    },
                    className
                )}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button };
