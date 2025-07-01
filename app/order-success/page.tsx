"use client";

import { useParams, useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react";
import Navbar from "@/components/NavBar";
import Link from "next/link";

export default function OrderSuccessPage() {
  const { orderId } = useParams();
  const router = useRouter();

  return (
    <>
      <Navbar />
      <div className="max-w-md mx-auto p-4 text-center">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-12 w-12 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Order Successful!</h1>
          <p className="text-gray-600 mb-6">
            Thank you for your purchase. Your order has been confirmed.
          </p>
          
          <div className="bg-gray-100 p-4 rounded-lg mb-6">
            <p className="font-medium">Order ID: {orderId}</p>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => router.push("/")}
              className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Continue Shopping
            </button>
            <Link
              href="/orders"
              className="block w-full py-2 text-center border border-gray-300 rounded hover:bg-gray-50 transition"
            >
              View Orders
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}