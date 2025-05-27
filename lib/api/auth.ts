import { User } from "@/types/user";

const BASE_URL = "https://kickstart-59ea.onrender.com";

export async function loginUser(email: string, password: string): Promise<{ user: User; token: string }> {
    const url = `${BASE_URL}/api/users/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;
    const res = await fetch(url, { method: "GET" });
    const data = await res.json();
    console.log("Login API response:", data); // Log the response
    if (!res.ok) {
        throw new Error(data.message || "Login failed");
    }
    return { user: data.user, token: data.token };
}

export async function signupUser(
    fullname: string,
    email: string,
    phone: string,
    password: string
): Promise<{ user: User; token: string }> {
    const url = "https://kickstart-59ea.onrender.com/api/users/signup";
    const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullname, email, phone, password }),
    });
    const data = await res.json();
    console.log("Signup API response:", data);
    if (!res.ok) {
        throw new Error(data.message || "Signup failed");
    }
    return { user: data.user, token: data.token };
}