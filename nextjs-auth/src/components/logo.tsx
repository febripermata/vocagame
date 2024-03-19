import * as React from "react";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
    className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
    return (
        <Image
            src="/logo.png"
            alt="Logo"
            width={120}
            height={70}
            className={cn("h-auto w-auto", className)}
        />
    );
};

export default Logo;
