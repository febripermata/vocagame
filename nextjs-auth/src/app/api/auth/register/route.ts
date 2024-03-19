"use server";

import { NextResponse } from "next/server";
import { z, ZodError } from "zod";

import prisma from "@/lib/database";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { cookies } from "next/headers";
import { Prisma } from "@prisma/client";

const registerSchema = z.object({
    username: z
        .string()
        .min(4, "Username harus lebih dari 4 karakter")
        .max(20, "Username harus kurang dari 20 karakter")
        .regex(
            /^[a-zA-Z0-9_]*$/,
            "Username hanya boleh berisi huruf dan angka"
        ),
    phone: z.string().min(10, "Nomor handphone harus lebih dari 10 karakter"),
    password: z
        .string()
        .min(8, "Password harus lebih dari 8 karakter")
        .max(20, "Password harus kurang dari 20 karakter"),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const data = registerSchema.parse(body);

        // check if username already exist
        const user = await prisma.user.findUnique({
            where: {
                username: data.username,
            },
        });

        if (user) {
            return NextResponse.json(
                { message: "Username sudah digunakan" },
                { status: 400 }
            );
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(data.password, salt);

        // create user
        const newUser = await prisma.user.create({
            data: {
                username: data.username,
                phone: data.phone,
                password: hash,
            },
        });

        // generate token
        const token = jwt.sign(
            { id: newUser.id, username: newUser.username },
            process.env.JWT_SECRET as string,
            {
                expiresIn: "1h",
            }
        );

        // set token to cookie
        cookies().set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60,
        });

        return NextResponse.json(
            {
                message: "Berhasil register",
                data: {
                    token,
                    user: {
                        id: newUser.id,
                        username: newUser.username,
                        phone: newUser.phone,
                    },
                },
            },
            { status: 201 }
        );
    } catch (error) {
        if (error instanceof ZodError) {
            return NextResponse.json(
                { message: error.errors },
                { status: 400 }
            );
        }

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            // unique constraint error
            if (error.code === "P2002") {
                return NextResponse.json(
                    {
                        message:
                            "Username atau nomor handphone sudah digunakan",
                    },
                    { status: 400 }
                );
            }
        }

        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
