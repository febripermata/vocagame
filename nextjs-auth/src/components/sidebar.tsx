"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { LogOut, Settings, UserCircle } from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/auth/authSlice";
import { AppDispatch } from "@/redux/store";

interface SidebarProps {
    //
}

const links = [
    {
        href: "/user/profile",
        icon: UserCircle,
        label: "Profile",
    },
    {
        href: "/user/setting",
        icon: Settings,
        label: "Settings",
    },
];

const Sidebar: React.FC<SidebarProps> = ({ ...props }) => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const pathname = usePathname();

    const handleLogout = () => {
        dispatch(logout());
        router.push("/auth/login");
    };

    return (
        <div className="w-full lg:max-w-[300px] border-r shrink-0 lg:min-h-96 relative border rounded-xl p-3 pb-14 mb-10">
            <ul className="flex flex-col space-y-2">
                {links.map((link) => (
                    <li key={link.href}>
                        <Link
                            href={link.href}
                            className={cn(
                                "text-gray-600 text-sm flex items-center space-x-2 w-full",
                                pathname === link.href
                                    ? "text-primary font-semibold bg-secondary rounded-md p-2"
                                    : "bg-transparent p-2 rounded-md"
                            )}
                        >
                            <link.icon size={18} />
                            <span>{link.label}</span>
                        </Link>
                    </li>
                ))}
            </ul>
            <div className="absolute bottom-0 left-0 border-t w-full p-3">
                <button
                    onClick={handleLogout}
                    className="text-red-500 text-sm flex items-center space-x-2 w-full hover:bg-red-50 rounded-md p-2 transition-colors duration-200 ease-in-out"
                >
                    <LogOut size={18} />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
