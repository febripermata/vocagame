"use client";

import Avatar from "@/components/avatar/avatar";
import Button from "@/components/button/button";
import Input from "@/components/input/input";
import Label from "@/components/label/label";
import Sidebar from "@/components/sidebar";
import { useAppSelector } from "@/redux/store";
import { ArrowRight } from "lucide-react";
import * as React from "react";

interface ProfilePageProps {
    //
}

const ProfilePage: React.FC<ProfilePageProps> = ({ ...props }) => {
    const username = useAppSelector((state) => state.auth.username);
    const phone = useAppSelector((state) => state.auth.phone);

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
                <div className="w-full max-w-screen-md mx-auto lg:px-10">
                    <h1 className="text-primary text-2xl font-bold mb-2">
                        Edit Profile
                    </h1>
                    <p className="text-gray-600 text-sm mb-8">
                        Masukkan Username dan password anda untuk masuk
                    </p>

                    <form action="" className="flex flex-col space-y-4">
                        <div className="flex flex-col space-y-4 mb-8">
                            <div>
                                <Label htmlFor="username">Nama Anda</Label>
                                <Input
                                    disabled
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={username}
                                />
                            </div>

                            <div>
                                <Label htmlFor="phone">Nomor Handphone</Label>
                                <Input
                                    disabled
                                    type="text"
                                    id="phone"
                                    name="phone"
                                    value={phone}
                                />
                            </div>

                            <div>
                                <Label htmlFor="password">Old Password</Label>
                                <Input
                                    disabled
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Masukkan password anda"
                                />
                            </div>

                            <div>
                                <Label htmlFor="new-password">
                                    New Password
                                </Label>
                                <Input
                                    disabled
                                    type="password"
                                    id="new-password"
                                    name="new-password"
                                    placeholder="Masukkan kembali password anda"
                                />
                            </div>
                        </div>

                        <div className="w-full flex mb-8">
                            <Button
                                type="submit"
                                className="bg-secondary flex space-x-2 items-center"
                            >
                                <span>Edit Profile</span>
                                <ArrowRight size={18} />
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ProfilePage;
