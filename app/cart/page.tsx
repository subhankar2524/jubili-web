"use client";

import Navbar from "@/components/NavBar";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getUser } from "@/utils/storage";
import { getCartItems, addToCart, removeFromCart } from "@/lib/api/products";
import CartProductCard from "@/components/CartProductCard";
import { FaTrash } from "react-icons/fa";

export default function CartPage() {
  const [cartData, setCartData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [voucher, setVoucher] = useState("");  

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const user = getUser();
        if (!user || !user.userId) {
          setError("User not found. Please login.");
          setLoading(false);
          return;
        }
        const data = await getCartItems(user.userId);
        setCartData(data);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  const handleQuantityChange = async (productId: string, newQuantity: number) => {
    if (loading) return;
    setLoading(true);
    try {
      const user = getUser();
      if (!user || !user.userId) {
        setError("User not found. Please login.");
        setLoading(false);
        return;
      }
      await addToCart({ userId: user.userId, productId, quantity: String(newQuantity) });
      // Refresh cart
      const data = await getCartItems(user.userId);
      setCartData(data);
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromCart = async (productId: string) => {
    if (loading) return;
    setLoading(true);
    try {
      const user = getUser();
      if (!user || !user.userId) {
        setError("User not found. Please login.");
        setLoading(false);
        return;
      }
      await removeFromCart({ userId: user.userId, productId });
      // Refresh cart
      const data = await getCartItems(user.userId);
      setCartData(data);
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto p-4">

      <div className="py-4 text-4xl font-bold">
        What's in your Bag?
      </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left: Cart Items Table */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-300 p-0 overflow-hidden">
              {/* Table Header - hidden on mobile */}
              <div className="hidden md:grid grid-cols-12 items-center px-6 py-3 border-b border-gray-300 text-gray-500 font-semibold text-sm">
                <div className="col-span-5">Product Code</div>
                <div className="col-span-3 text-center">Quantity</div>
                <div className="col-span-2 text-center">Total</div>
                <div className="col-span-2 text-center">Action</div>
              </div>
              {/* Table Body */}
              {loading && <div className="p-6">Loading cart...</div>}
              {error && <div className="p-6 text-red-500">{error}</div>}
              {cartData && cartData.items && cartData.items.length > 0 ? (
                cartData.items.map((item: any) => (
                  <div
                    key={item.productId}
                    className="flex flex-col md:grid md:grid-cols-12 items-start md:items-center ml-2 md:ml-6 mr-2 md:mr-6 py-6 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition"
                  >
                    {/* Product Info */}
                    <div className="flex items-center gap-4 col-span-5 w-full md:w-auto mb-2 md:mb-0">
                      <img src={item.imageUrl} alt={item.productName} className="w-16 h-16 object-cover rounded-lg flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-base text-gray-900 break-words max-w-[150px] md:max-w-none">{item.productName}</div>
                        <div className="text-xs text-gray-500">Set : Colour: {item.color || "-"}</div>
                      </div>
                    </div>
                    {/* Quantity */}
                    <div className="flex items-center gap-2 col-span-3 w-full md:justify-center mb-2 md:mb-0">
                      <span className="block md:hidden text-xs text-gray-500 min-w-[60px]">Quantity</span>
                      <button
                        className="w-8 h-8 rounded-full border border-gray-300 text-lg font-bold flex items-center justify-center hover:bg-gray-100 transition disabled:opacity-50"
                        onClick={() => handleQuantityChange(item.productId, Math.max(1, item.quantity - 1))}
                        disabled={loading || item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="mx-2 font-medium text-base">{item.quantity}</span>
                      <button
                        className="w-8 h-8 rounded-full border border-gray-300 text-lg font-bold flex items-center justify-center hover:bg-gray-100 transition disabled:opacity-50"
                        onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                        disabled={loading}
                      >
                        +
                      </button>
                    </div>
                    {/* Total */}
                    <div className="flex items-center col-span-2 w-full md:justify-center mb-2 md:mb-0">
                      <span className="block md:hidden text-xs text-gray-500 min-w-[40px] mr-2">Total</span>
                      <span className="font-semibold text-lg text-gray-900">${item.totalDiscountedPrice.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})}</span>
                    </div>
                    {/* Action */}
                    <div className="flex items-center col-span-2 w-full md:justify-center">
                      <span className="block md:hidden text-xs text-gray-500 min-w-[40px] mr-2">Action</span>
                      <button
                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition text-gray-500 disabled:opacity-50"
                        onClick={() => handleRemoveFromCart(item.productId)}
                        disabled={loading}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                !loading && <div className="p-6 text-gray-500">Your cart is empty.</div>
              )}
            </div>
          </div>
          {/* Right: Order Summary */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-300 p-6 mb-6">
              <div className="font-semibold mb-4">Order Summery</div>
              {/* Voucher input group */}
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Discount voucher"
                  className="flex-1 w-full rounded-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 pr-28"
                  value={voucher}
                  onChange={e => setVoucher(e.target.value)}
                />
                <button
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-gray-900 text-white px-7 py-2 text-sm font-semibold hover:bg-black transition shadow"
                  style={{ minWidth: 80 }}
                >
                  Apply
                </button>
              </div>
              <div className="flex justify-between mb-2 text-sm">
                <span>Sub Total</span>
                <span>{cartData ? `${cartData.totalOriginalPrice?.toLocaleString()} USD` : "-"}</span>
              </div>
              <div className="flex justify-between mb-2 text-sm">
                <span>Discount (10%)</span>
                <span className="text-green-700">{cartData ? `-${cartData.totalDiscount?.toLocaleString()}USD` : "-"}</span>
              </div>
              <div className="flex justify-between mb-2 text-sm">
                <span>Delivery fee</span>
                <span>{cartData ? `${cartData.shippingCharge?.toLocaleString()} USD` : "-"}</span>
              </div>
              <div className="flex justify-between items-center mt-4 mb-2 text-lg font-bold">
                <span>Total</span>
                <span>{cartData ? `$${cartData.finalTotal?.toLocaleString()} USD` : "-"}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                <span className="inline-block w-4 h-4 rounded-full border border-gray-300 flex-shrink-0 flex items-center justify-center mr-1">✓</span>
                90 Day Limited Warranty against manufacturer's defects <span className="underline cursor-pointer">Details</span>
              </div>
              <button className="w-full mt-2 bg-black text-white rounded-full py-3 font-semibold text-lg hover:bg-gray-900 transition">Checkout Now</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}