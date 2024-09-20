import { login } from "@/app/lib/lib";
import { NextResponse } from "next/server";

// Handle login
export async function POST(req: Request) {
    const { email, password } = await req.json();
    const response = await login(email, password);

    return NextResponse.json(response);
}
