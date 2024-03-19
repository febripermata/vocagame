"use client";

import Avatar from "@/components/avatar/avatar";
import Button from "@/components/button/button";
import Input from "@/components/input/input";
import Label from "@/components/label/label";
import Sidebar from "@/components/sidebar";
import { logout } from "@/redux/auth/authSlice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";

import { useDispatch, useSelector } from "react-redux";

interface SettingPageProps {
    //
}

const SettingPage: React.FC<SettingPageProps> = ({ ...props }) => {
    const username = useAppSelector((state) => state.auth.username);

    return (
        <>
            <header className="my-10 py-5 bg-primary rounded-xl">
                <div className="w-full max-w-screen-sm mx-auto text-center">
                    <h1 className="text-white text-4xl lg:text-5xl font-bold mb-4">
                        Lorem
                    </h1>
                    <p className="text-secondary text-sm mb-4">
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Repellat quibusdam esse accusamus rerum laudantium
                        eum, reprehenderit saepe sapiente exercitationem
                        aliquam?
                    </p>
                </div>
            </header>

            <div className="flex items-center justify-between mb-10">
                <div className="flex space-x-2 items-center">
                    <Avatar src={null} />
                    <span className="text-sm font-semibold">{username}</span>
                </div>
                <Button>Edit Profile</Button>
            </div>

            <div className="flex items-start flex-col lg:flex-row">
                <Sidebar />
                {/*  */}
            </div>
        </>
    );
};

export default SettingPage;
