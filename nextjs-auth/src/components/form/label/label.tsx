import { cn } from "@/lib/utils";
import * as React from "react";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    classname?: string;
}

const Label: React.FC<LabelProps> = ({ className, ...props }) => {
    return (
        <label
            {...props}
            className={cn(
                "text-gray-600 font-semibold text-sm mb-2 block",
                className
            )}
        />
    );
};

export default Label;
