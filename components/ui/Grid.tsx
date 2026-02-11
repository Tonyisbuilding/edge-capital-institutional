import * as React from "react";
import { cn } from "@/lib/utils";

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
    cols?: number;
}

const Grid = React.forwardRef<HTMLDivElement, GridProps>(
    ({ className, cols = 1, children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    "grid gap-8",
                    {
                        "grid-cols-1": cols === 1,
                        "md:grid-cols-2": cols === 2,
                        "md:grid-cols-3": cols === 3,
                        "md:grid-cols-4": cols === 4,
                    },
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);
Grid.displayName = "Grid";
export { Grid };
