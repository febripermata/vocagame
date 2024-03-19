"use client";

import * as React from "react";
import Link from "next/link";

import Logo from "@/components/logo";
import Avatar from "@/components/avatar/avatar";
import ThemeToggle from "@/components/theme-toggle";
import { useAppSelector } from "@/redux/store";
import { useRouter } from "next/navigation";

interface ProfileLayoutProps extends React.PropsWithChildren {
    //
}

const ProfileLayout: React.FC<ProfileLayoutProps> = ({
    children,
    ...props
}) => {
    const router = useRouter();
    const username = useAppSelector((state) => state.auth.username);

    React.useEffect(() => {
        if (!username) {
            router.push("/auth/login");
        }
    }, [username]);

    return (
        <>
            <nav className="bg-primary text-white p-4">
                <div className="w-full max-w-screen-lg mx-auto flex justify-between items-center h-8">
                    <Logo />
                    <Link
                        href="/user/profile"
                        className="flex space-x-2 items-center"
                    >
                        <Avatar src={null} variant="dark" />
                    </Link>
                </div>
            </nav>

            <main className="w-full max-w-screen-lg mx-auto p-4 min-h-screen">
                {children}
            </main>

            <footer className="bg-primary text-white">
                <div className="w-full max-w-screen-lg mx-auto flex justify-between items-start py-10 px-4">
                    <div className="flex flex-col max-w-sm items-start">
                        <Logo className="mb-4" />
                        <p className="text-sm text-secondary">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Non, ex laudantium ipsum voluptatem quas sit
                            nostrum, provident.
                        </p>
                    </div>
                    <ThemeToggle variant="dark" />
                </div>
                <p className="text-center text-sm py-4">
                    &copy; 2024 All rights reserved
                </p>
            </footer>
        </>
    );
};

export default ProfileLayout;
