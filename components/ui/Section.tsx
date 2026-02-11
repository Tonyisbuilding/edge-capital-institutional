import * as React from "react";
import { cn } from "@/lib/utils";

export interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
    fullWidth?: boolean;
}

const Section = React.forwardRef<HTMLDivElement, SectionProps>(
    ({ className, fullWidth = false, children, ...props }, ref) => {
        return (
            <section
                ref={ref}
                className={cn("py-16 md:py-24", className)}
                {...props}
            >
                <div className={cn("mx-auto px-4 md:px-8", fullWidth ? "w-full" : "max-w-7xl")}>
                    {children}
                </div>
            </section>
        );
    }
);
Section.displayName = "Section";

export { Section };
