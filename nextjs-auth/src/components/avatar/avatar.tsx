import { cn } from "@/lib/utils";
import { CircleUserRound } from "lucide-react";
import Image from "next/image";
import * as React from "react";

interface AvatarProps {
    src: string | null;
    variant?: "light" | "dark";
}

const Avatar: React.FC<AvatarProps> = ({ src, variant = "light" }) => {
    return (
        <>
            {src ? (
                <Image
                    src={src}
                    alt="Avatar"
                    width={32}
                    height={32}
                    className="rounded-full"
                />
            ) : (
                <CircleUserRound
                    className={cn(
                        "h-6 w-6",
                        variant === "light" ? "text-primary" : "text-white"
                    )}
                />
            )}
        </>
    );
};

export default Avatar;
