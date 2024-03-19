"use client";

import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import * as React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    classname?: string;
    variant?: "light" | "dark";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, variant = "light", ...props }, ref) => {
        const [show, setShow] = React.useState(false);

        const handleToggle = () => {
            setShow(!show);
        };

        return (
            <div className="relative">
                <input
                    ref={ref}
                    {...props}
                    type={show ? "text" : props.type}
                    className={cn(
                        "border rounded-full py-4 px-5 w-full focus:outline-none focus:ring-2 focus:ring-primary text-sm",
                        variant === "light"
                            ? "bg-white border-gray-300"
                            : "bg-primary border-white border-opacity-60 placeholder:text-white placeholder:text-opacity-40",
                        props.disabled && "bg-gray-100",
                        className
                    )}
                />
                <div
                    role="button"
                    onClick={() => handleToggle()}
                    className={cn(
                        "absolute top-1/2 right-5 transform -translate-y-1/2 cursor-pointer",
                        props.type === "password" ? "block" : "hidden"
                    )}
                >
                    {show ? (
                        <EyeOff
                            size={18}
                            className={cn(
                                variant === "light"
                                    ? "text-gray-600"
                                    : "text-white"
                            )}
                        />
                    ) : (
                        <Eye
                            size={18}
                            className={cn(
                                variant === "light"
                                    ? "text-gray-600"
                                    : "text-white"
                            )}
                        />
                    )}
                </div>
            </div>
        );
    }
);

Input.displayName = "Input";

export default Input;
