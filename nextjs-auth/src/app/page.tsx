"use client";

import Link from "next/link";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center bg-primary text-white">
            <h1>Hello Worald</h1>
            <Link href="/auth/login">Login</Link>
            <Link href="/auth/register">Register</Link>
        </main>
    );
}
