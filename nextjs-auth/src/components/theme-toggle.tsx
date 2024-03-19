"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
    variant?: "light" | "dark";
    hideLabel?: boolean;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({
    variant = "light",
    hideLabel = false,
    ...props
}) => {
    const { theme, setTheme } = useTheme();

    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => setMounted(true), []);
    if (!mounted) return null;

    return (
        <div className="relative">
            <input
                type="checkbox"
                checked={theme === "orange"}
                onChange={() => setTheme(theme === "blue" ? "orange" : "blue")}
                className="sr-only"
                id="toggle"
            />
            <div className="flex items-center space-x-2">
                <span
                    className={cn(
                        "text-sm text-gray-600 font-semibold",
                        variant === "dark" ? "text-white" : "text-gray-600",
                        hideLabel && "sr-only"
                    )}
                >
                    Blue
                </span>
                <label
                    htmlFor="toggle"
                    className="flex items-center cursor-pointer"
                >
                    <div
                        className={cn(
                            "w-10 h-6 rounded-full p-1 bg-gray-200",
                            variant === "dark" && "bg-opacity-40"
                        )}
                    >
                        <div
                            className={cn(
                                "bg-white w-4 h-4 rounded-full transform duration-300 ease-in-out",
                                theme === "orange" ? "translate-x-4" : ""
                            )}
                        ></div>
                    </div>
                </label>
                <span
                    className={cn(
                        "text-sm text-gray-600 font-semibold",
                        variant === "dark" ? "text-white" : "text-gray-600",
                        hideLabel && "sr-only"
                    )}
                >
                    Orange
                </span>
            </div>
        </div>
    );
};

export default ThemeToggle;
