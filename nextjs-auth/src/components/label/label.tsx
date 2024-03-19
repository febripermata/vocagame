import { cn } from "@/lib/utils";
import * as React from "react";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    classname?: string;
    variant?: "light" | "dark";
}

const Label: React.FC<LabelProps> = ({
    className,
    variant = "light",
    ...props
}) => {
    return (
        <label
            {...props}
            className={cn(
                "font-semibold text-sm mb-2 block",
                variant === "light" ? "text-gray-600" : "text-secondary",
                className
            )}
        />
    );
};

export default Label;
