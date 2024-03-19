import { cn } from "@/lib/utils";
import * as React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
}

const Button: React.FC<ButtonProps> = ({ className, ...props }) => {
    return (
        <button
            {...props}
            className={cn(
                "bg-secondary text-primary py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-primary text-sm font-semibold",
                className
            )}
        >
            {props.children}
        </button>
    );
};

export default Button;
