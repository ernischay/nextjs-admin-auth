import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("12hr")
        .sign(key);
}

export async function decrypt(input: string): Promise<any> {
    if (!input) {
        return null
    }
    try {
        const { payload } = await jwtVerify(input, key, {
            algorithms: ["HS256"],
        });
        return payload;
    } catch (error: any) {
        console.log(error)
    }
}

export async function login(email: string, password: string) {
    // Verify credentials && get the user
    const user = { email: email, password: password };

    if (email !== "user@example.com") {
        return { status: 401, message: "Invalid credentials" };
    }

    // Create the session
    const expires = new Date(Date.now() + 12 * 60 * 60 * 1000);
    const session = await encrypt({ user, expires });

    // Save the session in a cookie
    cookies().set("session", session, { expires, httpOnly: true });
    return { status: 200, message: "Success" };
}

export async function logout() {
    // Destroy the session
    cookies().set("session", "", { expires: new Date(0) });
    cookies().delete("session")
    return { status: 200, message: "Success" };
}

export async function getSession() {
    const session = cookies().get("session")?.value;
    if (!session) return null;
    return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
    const session = request.cookies.get("session")?.value;
    if (!session) return;

    // Refresh the session so it doesn't expire
    const parsed = await decrypt(session);
    const res = NextResponse.next();
    if (parsed) {
        parsed.expires = new Date(Date.now() + 12 * 60 * 60 * 1000);
        res.cookies.set({
            name: "session",
            value: await encrypt(parsed),
            httpOnly: true,
            expires: parsed.expires,
        });
    }
    return res;
}