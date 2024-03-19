"use client";

import * as React from "react";

import Label from "@/components/label/label";
import Input from "@/components/input/input";
import Button from "@/components/button/button";
import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "@/components/theme-toggle";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { login } from "@/redux/auth/authSlice";

const loginSchema = z.object({
    username: z
        .string()
        .min(4, "Username harus lebih dari 4 karakter")
        .max(20, "Username harus kurang dari 20 karakter")
        .regex(
            /^[a-zA-Z0-9_]*$/,
            "Username hanya boleh berisi huruf dan angka"
        ),
    password: z
        .string()
        .min(8, "Password harus lebih dari 8 karakter")
        .max(20, "Password harus kurang dari 20 karakter"),
});

type Login = z.infer<typeof loginSchema>;

const LoginPage: React.FC = () => {
    const router = useRouter();
    const dispath = useDispatch<AppDispatch>();
    const username = useAppSelector((state) => state.auth.username);

    const [error, setError] = React.useState<string>("");
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Login>({
        resolver: zodResolver(loginSchema),
        reValidateMode: "onBlur",
    });

    // if user already logged in, redirect to profile page
    React.useEffect(() => {
        if (username) {
            router.push("/user/profile");
        }
    }, [username]);

    const onSubmit: SubmitHandler<Login> = async (data) => {
        const { username, password } = data;

        const response = await fetch("http://localhost:3000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            const data = await response.json();
            setError(data.message);
            return;
        }

        const result = await response.json();
        const user = result.data.user;

        // store in redux
        dispath(login(user));
        router.push("/user/profile");
    };

    return (
        <main className="grid grid-cols-1 lg:grid-cols-2 h-screen">
            <div className="bg-primary text-white hidden relative lg:flex flex-col items-center justify-center p-10">
                <Image
                    src="/diamond.svg"
                    width={300}
                    height={300}
                    alt="diamond"
                    className="absolute pointer-events-none bottom-0 right-0 w-auto h-auto"
                />
                <Image
                    src="/oval.svg"
                    width={300}
                    height={300}
                    alt="oval"
                    className="absolute pointer-events-none top-0 left-0 w-auto h-auto"
                />
            </div>

            <div className="bg-white flex items-center justify-center relative">
                <div className="absolute top-5 right-5">
                    <ThemeToggle />
                </div>
                <div className="w-full max-w-screen-sm mx-auto p-10 ">
                    <h1 className="text-primary text-4xl lg:text-5xl font-bold mb-4">
                        Silahkan Login
                    </h1>
                    <p className="text-gray-600 text-sm mb-8">
                        Masukkan Username dan password anda untuk masuk
                    </p>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col space-y-4 mb-8">
                            <div>
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    type="text"
                                    placeholder="Username anda..."
                                    {...register("username", {
                                        required: true,
                                    })}
                                    className={
                                        errors.username && "border-red-500"
                                    }
                                />
                                <p className="text-red-500 text-xs mt-2">
                                    {errors.username?.message}
                                </p>
                            </div>

                            <div>
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    type="password"
                                    placeholder="Password anda..."
                                    {...register("password", {
                                        required: true,
                                    })}
                                    className={
                                        errors.password && "border-red-500"
                                    }
                                />
                                <p className="text-red-500 text-xs mt-2">
                                    {errors.password?.message}
                                </p>
                            </div>
                        </div>

                        <div className="w-full flex mb-8 flex-col">
                            <p className="text-red-500 text-xs mb-2">{error}</p>
                            <Button type="submit" className="w-full py-4 px-5">
                                Masuk Sekarang
                            </Button>
                        </div>

                        <p className="text-gray-600 text-sm text-center font-semibold">
                            Belum punya akun?{" "}
                            <Link
                                href="/auth/register"
                                className="text-primary"
                            >
                                Daftar disini
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default LoginPage;
