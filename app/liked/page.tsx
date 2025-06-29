"use client";

import Navbar from "@/components/NavBar";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getLikedProducts, toggleProductLike, addToCart } from "@/lib/api/products";
import { useRouter } from "next/navigation";
import { getUser } from "@/utils/storage";

export default function LikedProductsPage() {
  const router = useRouter();
  const [likedProducts, setLikedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLiked = async () => {
      try {
        const data = await getLikedProducts();
        setLikedProducts(data || []);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchLiked();
  }, []);

  const handleUnlike = async (productId: string, productCategory: string) => {
    try {
      await toggleProductLike(productId, productCategory);
      setLikedProducts((prev) => prev.filter((item) => item.productId !== productId));
    } catch (err: any) {
      setError(err.message || "Failed to unlike product");
    }
  };

  const handleAddToCart = async (productId: string, productCategory: string) => {
    try {
      const user = getUser();
      if (!user || !user.userId) {
        setError("User not found. Please login.");
        return;
      }
      await addToCart({ userId: user.userId, productId, quantity: "1" });
      // Unlike after adding to cart
      await toggleProductLike(productId, productCategory);
      setLikedProducts((prev) => prev.filter((item) => item.productId !== productId));
    } catch (err: any) {
      setError(err.message || "Failed to add to cart");
    }
  };

  return (
    <>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* <div className="text-lg font-medium text-gray-700">Loading liked products...</div> */}
        </div>
      )}
      <Navbar />
      <div className="max-w-6xl mx-auto p-4">
        <div className="py-4 text-4xl font-bold ${quicksand.className}">
          Your Liked Products
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left: Liked Products List */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-300 p-0 overflow-hidden">
              {/* Table Header - hidden on mobile */}
              <div className="hidden md:grid grid-cols-12 items-center px-6 py-3 border-b border-gray-300 text-gray-500 font-semibold text-sm">
                <div className="col-span-6">Product</div>
                <div className="col-span-6 text-center">Description</div>
              </div>
              {/* Table Body */}
              {error && <div className="p-6 text-red-500">{error}</div>}
              {likedProducts && likedProducts.length > 0 ? (
                likedProducts.map((item: any) => (
                  <div
                    key={item.productId}
                    className="flex flex-col md:grid md:grid-cols-12 items-start md:items-center ml-2 md:ml-6 mr-2 md:mr-6 py-6 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition"
                  >
                    {/* Product Info */}
                    <div className="flex items-center gap-4 col-span-6 w-full md:w-auto mb-2 md:mb-0">
                      <img src={item.imageUrl} alt={item.productName} className="w-16 h-16 object-cover rounded-lg flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-base text-gray-900 break-words max-w-[150px] md:max-w-none">{item.productName}</div>
                        <div className="flex gap-2 mt-2">
                          <button
                            className="bg-gray-200 text-gray-700 rounded-full px-4 py-1 text-sm font-semibold hover:bg-gray-300 transition"
                            onClick={() => handleUnlike(item.productId, item.productCategory)}
                          >
                            Unlike
                          </button>
                          <button
                            className="bg-black text-white rounded-full px-4 py-1 text-sm font-semibold hover:bg-gray-900 transition"
                            onClick={() => handleAddToCart(item.productId, item.productCategory)}
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* Description */}
                    <div className="col-span-6 w-full md:justify-center mb-2 md:mb-0 text-gray-700 text-sm">
                      {item.productDescription || <span className="text-gray-400">No description</span>}
                    </div>
                  </div>
                ))
              ) : (
                !loading && <div className="p-6 text-gray-500">You have not liked any products yet.</div>
              )}
            </div>
          </div>
          {/* Right: Info/Actions */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-300 p-6 mb-6 flex flex-col items-center justify-center h-full">
              <div className="font-semibold mb-4 text-center">Liked products are saved to your account. You can add them to your cart anytime!</div>
              <button 
                className="w-full mt-2 bg-black text-white rounded-full py-3 font-semibold text-lg hover:bg-gray-900 transition"
                onClick={() => router.push("/cart")}
              >
                Go to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 