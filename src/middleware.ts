import { NextRequest, NextResponse } from "next/server";
import { decrypt, updateSession } from "./lib";
import { cookies } from 'next/headers';

const protectedRoutes = ['/dashboard', '/projects', '/settings'];

const publicRoutes = ['/', '/login'];

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.includes(path);
    const isPublicRoute = publicRoutes.includes(path);

    const cookie = cookies().get('session')?.value;
    const session = await decrypt(cookie as string);

    if (isProtectedRoute && !session?.user) {
        return NextResponse.redirect(new URL('/login', request.nextUrl));
    }

    if (
        isPublicRoute &&
        session?.user &&
        !request.nextUrl.pathname.startsWith('/dashboard')
    ) {
        return NextResponse.redirect(new URL('/dashboard', request.nextUrl));
    }
    return await updateSession(request);
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/dashboard', '/login', '/settings', '/projects'],
}