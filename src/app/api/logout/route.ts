import { logout } from "../../../lib";
import { NextResponse } from "next/server";

// Handle logout
export async function POST() {
    const response = await logout();

    return NextResponse.json(response);
}
