// Save user to localStorage and token to cookies
export function saveUser(user: any, token: string) {
    if (typeof window !== "undefined") {
        // Save user in localStorage
        localStorage.setItem("user", JSON.stringify(user));
        // Save token in cookie (expires in 7 days)
        document.cookie = `token=${token}; path=/; max-age=${60 * 60 * 24 * 7}`;
    }
}

export function getUser() {
    if (typeof window !== "undefined") {
        const user = localStorage.getItem("user");
        return user ? JSON.parse(user) : null;
    }
    return null;
}

// Get token from cookies
export function getToken() {
    if (typeof window !== "undefined") {
        const match = document.cookie.match(new RegExp('(^| )token=([^;]+)'));
        return match ? match[2] : null;
    }
    return null;
}

export function logoutUser() {
    if (typeof window !== "undefined") {
        // Remove user from localStorage
        localStorage.removeItem("user");
        // Remove token cookie by setting its expiry in the past
        document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    }
}