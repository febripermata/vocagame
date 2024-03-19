"use server";

import { NextResponse } from "next/server";
import { z, ZodError } from "zod";

import prisma from "@/lib/database";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { cookies } from "next/headers";

const userSchema = z.object({
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

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const data = userSchema.parse(body);

        // find user by username
        const user = await prisma.user.findUnique({
            where: {
                username: data.username,
            },
        });

        // if user not found
        if (!user) {
            return NextResponse.json(
                { message: "Username tidak ditemukan" },
                { status: 404 }
            );
        }

        // if user found, compare password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(body.password, salt);
        const compare = await bcrypt.compare(data.password, hash);

        // if password not match
        if (!compare) {
            return NextResponse.json(
                { message: "Password tidak valid" },
                { status: 401 }
            );
        }

        // generate token
        const token = jwt.sign(
            { username: user.username, id: user.id },
            process.env.JWT_SECRET as string,
            { expiresIn: "1h" }
        );

        // store data in cookie for 1 minute
        cookies().set("token", token, {
            maxAge: 60,
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
        });

        return NextResponse.json(
            {
                message: "Berhasil login",
                data: {
                    token,
                    user: {
                        id: user.id,
                        phone: user.phone,
                        username: user.username,
                    },
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error(error);

        if (error instanceof ZodError) {
            return NextResponse.json(
                {
                    message: "Data tidak valid",
                    errors: error.errors,
                },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { message: "Terjadi kesalahan" },
            { status: 500 }
        );
    }
}
