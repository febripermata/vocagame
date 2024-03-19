"use client";
import * as React from "react";

import Button from "@/components/button/button";
import Input from "@/components/input/input";
import Label from "@/components/label/label";
import ThemeToggle from "@/components/theme-toggle";
import Image from "next/image";
import Link from "next/link";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { login } from "@/redux/auth/authSlice";

interface RegisterPageProps {
    //
}

const registerSchema = z
    .object({
        username: z
            .string()
            .min(4, "Username harus lebih dari 4 karakter")
            .max(20, "Username harus kurang dari 20 karakter")
            .regex(
                /^[a-zA-Z0-9_]*$/,
                "Username hanya boleh berisi huruf dan angka"
            ),
        phone: z
            .string()
            .min(10, "Nomor handphone harus lebih dari 10 karakter"),
        password: z
            .string()
            .min(8, "Password harus lebih dari 8 karakter")
            .max(20, "Password harus kurang dari 20 karakter"),
        confirm: z.string(),
    })
    .refine((data) => data.password === data.confirm, {
        message: "Password tidak sama",
        path: ["confirm-password"],
    });

type Register = z.infer<typeof registerSchema>;

const RegisterPage: React.FC<RegisterPageProps> = ({ ...props }) => {
    const router = useRouter();
    const dispath = useDispatch<AppDispatch>();
    const username = useAppSelector((state) => state.auth.username);

    const [error, setError] = React.useState<string>("");
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Register>({
        resolver: zodResolver(registerSchema),
        reValidateMode: "onBlur",
    });

    // if user already logged in, redirect to profile page
    React.useEffect(() => {
        if (username) {
            router.push("/user/profile");
        }
    }, [username]);

    const onSubmit: SubmitHandler<Register> = async (data) => {
        const { username, phone, password } = data;

        const response = await fetch(
            "http://localhost:3000/api/auth/register",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, phone, password }),
            }
        );

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
        <div className="h-screen bg-primary text-white relative px-10">
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

            <div className="absolute top-5 right-5">
                <ThemeToggle variant="dark" />
            </div>

            <div className="w-full max-w-screen-sm mx-auto flex flex-col justify-center h-full">
                <h1 className="text-white text-4xl lg:text-5xl font-bold mb-4">
                    Daftarkan Akun
                </h1>
                <p className="text-secondary text-sm mb-8">
                    Masukkan Username dan password anda untuk masuk
                </p>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col space-y-4 mb-8">
                        <div>
                            <Label variant="dark" htmlFor="username">
                                Username
                            </Label>
                            <Input
                                variant="dark"
                                type="text"
                                placeholder="Username anda..."
                                {...register("username", {
                                    required: true,
                                })}
                                className={errors.username && "border-red-500"}
                            />
                            <p className="text-red-500 text-xs mt-2">
                                {errors.username?.message}
                            </p>
                        </div>

                        <div>
                            <Label variant="dark" htmlFor="phone">
                                Nomor Handphone
                            </Label>
                            <Input
                                variant="dark"
                                type="text"
                                placeholder="Nomor handphone anda"
                                {...register("phone", {
                                    required: true,
                                })}
                                className={errors.phone && "border-red-500"}
                            />
                            <p className="text-red-500 text-xs mt-2">
                                {errors.phone?.message}
                            </p>
                        </div>

                        <div>
                            <Label variant="dark" htmlFor="password">
                                Password
                            </Label>
                            <Input
                                variant="dark"
                                type="password"
                                placeholder="Password anda..."
                                {...register("password", {
                                    required: true,
                                })}
                                className={errors.password && "border-red-500"}
                            />
                            <p className="text-red-500 text-xs mt-2">
                                {errors.password?.message}
                            </p>
                        </div>

                        <div>
                            <Label variant="dark" htmlFor="confirm">
                                Konfirmasi Password
                            </Label>
                            <Input
                                variant="dark"
                                type="password"
                                placeholder="Masukkan kembali password anda"
                                {...register("confirm", {
                                    required: true,
                                })}
                                className={errors.confirm && "border-red-500"}
                            />
                            <p className="text-red-500 text-xs mt-2">
                                {errors.confirm?.message}
                            </p>
                        </div>
                    </div>

                    <div className="w-full flex mb-8 flex-col">
                        <p className="text-red-500 text-xs mb-2">{error}</p>
                        <Button
                            type="submit"
                            className="w-full bg-white py-4 px-5"
                        >
                            Daftar Sekarang
                        </Button>
                    </div>

                    <p className="text-secondary text-sm text-center font-semibold">
                        Sudah punya akun?{" "}
                        <Link href="/auth/login" className="text-white">
                            Login Sekarang
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
