"use client";
import { useEffect, useState } from "react";
import { getUser, logoutUser } from "@/utils/storage";
import { useRouter } from "next/navigation";
import Navbar from "@/components/NavBar";

// Placeholder orders data
const sampleOrders = [
    {
        orderId: "ORD123456",
        date: "2024-06-01",
        status: "Delivered",
        total: 2499,
        items: [
            {
                productId: "1",
                productName: "Classic Shoe",
                imageUrl: "https://picsum.photos/seed/shoe1/80/80",
                quantity: 1,
                price: 1299,
            },
            {
                productId: "2",
                productName: "Streetwear Shoe",
                imageUrl: "https://picsum.photos/seed/shoe2/80/80",
                quantity: 1,
                price: 1200,
            },
        ],
    },
    {
        orderId: "ORD654321",
        date: "2024-05-20",
        status: "Shipped",
        total: 1499,
        items: [
            {
                productId: "3",
                productName: "Skate Shoe",
                imageUrl: "https://picsum.photos/seed/shoe3/80/80",
                quantity: 1,
                price: 1499,
            },
        ],
    },
];

export default function User() {
    const [user, setUser] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        const u = getUser();
        setUser(u);
    }, []);

    const handleLogout = () => {
        logoutUser();
        setUser(null);
    };

    const handleLogin = () => {
        router.push("/login");
    };

    return (
        <>
            <Navbar />
            <main className="max-w-6xl mx-auto p-4">
                <div className="py-4 text-3xl font-bold">My Account</div>
                <div className="bg-white rounded-2xl border border-gray-300 p-8 shadow-sm mb-8">
                    {!user ? (
                        <div className="flex flex-col items-center justify-center min-h-[200px]">
                            <div className="text-gray-500 text-lg mb-4">No user logged in.</div>
                            <button
                                onClick={handleLogin}
                                className="bg-black text-white px-6 py-2 rounded-full font-semibold hover:bg-gray-900 transition"
                            >
                                Login
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                                    <img src="/icons/user.svg" alt="User" className="w-10 h-10" />
                                </div>
                                <div>
                                    <div className="text-xl font-bold">{user.name}</div>
                                    <div className="text-gray-500 text-sm">{user.email}</div>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <div className="text-gray-400 text-xs uppercase mb-1">Phone</div>
                                    <div className="font-medium">{user.phone}</div>
                                </div>
                                <div>
                                    <div className="text-gray-400 text-xs uppercase mb-1">User ID</div>
                                    <div className="font-mono text-sm">{user.userId}</div>
                                </div>
                            </div>
                            <div className="pt-6">
                                <button
                                    onClick={handleLogout}
                                    className="bg-red-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-red-600 transition"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                {/* My Orders Section */}
                {user && (
                    <section className="mb-8">
                        <div className="py-4 text-2xl font-bold">My Orders</div>
                        <div className="bg-white rounded-2xl border border-gray-300 p-0 overflow-hidden">
                            {/* Table Header - hidden on mobile */}
                            <div className="hidden md:grid grid-cols-12 items-center px-6 py-3 border-b border-gray-300 text-gray-500 font-semibold text-sm">
                                <div className="col-span-3">Order ID</div>
                                <div className="col-span-2">Date</div>
                                <div className="col-span-2">Status</div>
                                <div className="col-span-3">Items</div>
                                <div className="col-span-2 text-right">Total</div>
                            </div>
                            {/* Table Body */}
                            {sampleOrders.length === 0 ? (
                                <div className="p-6 text-gray-500">You have no orders yet.</div>
                            ) : (
                                sampleOrders.map((order) => (
                                    <div
                                        key={order.orderId}
                                        className="flex flex-col md:grid md:grid-cols-12 items-start md:items-center ml-2 md:ml-6 mr-2 md:mr-6 py-6 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition"
                                    >
                                        {/* Order ID */}
                                        <div className="col-span-3 font-mono text-sm mb-2 md:mb-0">{order.orderId}</div>
                                        {/* Date */}
                                        <div className="col-span-2 text-sm text-gray-500 mb-2 md:mb-0">{order.date}</div>
                                        {/* Status */}
                                        <div className="col-span-2 text-sm mb-2 md:mb-0">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${order.status === "Delivered" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>{order.status}</span>
                                        </div>
                                        {/* Items */}
                                        <div className="col-span-3 flex flex-wrap gap-2 mb-2 md:mb-0">
                                            {order.items.map((item) => (
                                                <div key={item.productId} className="flex items-center gap-2 bg-gray-100 rounded-lg px-2 py-1">
                                                    <img src={item.imageUrl} alt={item.productName} className="w-8 h-8 object-cover rounded" />
                                                    <span className="text-xs font-medium">{item.productName} x{item.quantity}</span>
                                                </div>
                                            ))}
                                        </div>
                                        {/* Total */}
                                        <div className="col-span-2 text-right font-bold text-lg">₹{order.total.toLocaleString()}</div>
                                    </div>
                                ))
                            )}
                        </div>
                    </section>
                )}
            </main>
        </>
    );
}