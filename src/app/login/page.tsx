"use client"

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronLeftIcon } from "@radix-ui/react-icons"
import { useState } from "react";
import Image from "next/image"

import { useRouter } from 'next/navigation'

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState('');
    const [isLoading, setLoading] = useState(false);

    const router = useRouter()

    const handleLogin = async () => {
        setError('');
        setLoading(true)
        try {
            setTimeout(async () => {
                const res = await fetch("/api/auth", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, password }),
                });
                setLoading(false)
                const data = await res.json();
                if (data.status === 200) {
                    window.location.href = "/dashboard"; // Redirect after successful login
                } else {
                    setError(data.message);
                }
            }, 2000)
        } catch (err) {
            setError("An error occurred during login. " + err);
        }
    };

    return (
        <>
            <div className="hidden md:h-screen">
                <Image
                    src="/examples/authentication-light.png"
                    width={1280}
                    height={843}
                    alt="Authentication"
                    className="block dark:hidden"
                />
            </div>
            <div className="container relative h-screen flex-col items-center justify-center sm:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
                <div className="relative w-full h-[1/2] md:h-full flex md:flex-col bg-muted p-10 text-white dark:border-r lg:flex">
                    <div className="absolute inset-0 bg-zinc-900" />
                    <div className="relative z-20 flex items-center text-lg font-medium">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mr-2 h-6 w-6"
                        >
                            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                        </svg>
                        Admin Panel
                    </div>
                </div>
                <div className="p-8">
                    <div className="mx-auto w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        <div className="flex flex-row-reverse items-center justify-between">
                            <Button onClick={() => router.push('/')} className="relative left-0 w-3/2 flex flex-start flex-row-reverse items-center gap-x-1" variant="ghost" size="icon">
                                <div className="w-12 flex text-gray-500 text-base">
                                    <span>Home</span>
                                </div>
                                <ChevronLeftIcon className="h-4 w-4" />
                            </Button>
                            <div className="text-base">
                                {error && <p style={{ color: 'red' }}>{error}</p>}
                            </div>
                        </div>
                        <div className="h-[1/2] flex-col space-y-6">
                            <form action={handleLogin}>
                                <div className="grid gap-8">
                                    <div className="grid gap-1">
                                        <Label className="sr-only" htmlFor="email">
                                            Email
                                        </Label>
                                        <Input
                                            id="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="name@example.com"
                                            type="email"
                                            autoCapitalize="none"
                                            autoComplete="email"
                                            autoCorrect="off"
                                            disabled={isLoading}
                                        />
                                    </div>
                                    <div className="grid gap-1">
                                        <Label className="sr-only" htmlFor="password">
                                            Password
                                        </Label>
                                        <Input
                                            id="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="password"
                                            type="password"
                                            disabled={isLoading}
                                        />
                                    </div>
                                    <Button disabled={isLoading}>
                                        {isLoading && (
                                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                                        )}
                                        Sign In
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div >
            </div >
        </>
    )
}