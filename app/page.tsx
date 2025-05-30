"use client";
import { useRouter } from "next/navigation";
import { logoutUser, getUser } from "@/utils/storage";
import { useEffect, useState } from "react";
import Navbar from "@/components/NavBar";
import ProductCard from "@/components/ProductCard";

export default function HomePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    setUser(getUser());
  }, []);

  const handleLogout = () => {
    logoutUser();
    router.push("/login");
  };

  // Sample product data
  const sampleProducts = [
    {
      productId: "1",
      productName: "Classic Shoe",
      productDescription: "Comfortable everyday wear",
      imageUrls: ["/sample-shoe-1.jpg"],
      price: "1299",
      size: "M",
      brand: "Adidas",
      likes: 45,
      reviews: 12
    },
    {
      productId: "2",
      productName: "Streetwear Shoe",
      productDescription: "Urban style for daily use",
      imageUrls: ["/sample-shoe-2.jpg"],
      price: "1499",
      size: "L",
      brand: "Nike",
      likes: 67,
      reviews: 23
    },
    {
      productId: "3",
      productName: "Skate Shoe",
      productDescription: "Perfect for skaters and casual wear",
      imageUrls: ["/sample-shoe-3.jpg"],
      price: "1199",
      size: "M",
      brand: "Vans",
      likes: 38,
      reviews: 15
    }
  ];

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-[#D9D9C3] rounded-lg p-8 flex flex-col justify-center relative overflow-hidden">
            <div className="z-10">
              <h2 className="text-4xl font-bold mb-2">Color of Summer Outfit</h2>
              <p className="text-lg mb-4">Discover the perfect summer collection for your wardrobe</p>
              <button className="bg-black text-white px-6 py-2 rounded-full">View Collection</button>
            </div>
          </div>
          <div className="bg-[#F5F5F5] rounded-lg p-6 flex flex-col justify-between">
            <div>
              <span className="text-sm font-medium">Outdoor Active</span>
              <div className="h-40 mt-2 bg-yellow-400 rounded-lg"></div>
            </div>
            <div className="mt-4">
              <span className="text-sm font-medium">Casual Content</span>
              <div className="h-40 mt-2 bg-red-500 rounded-lg"></div>
            </div>
          </div>
        </section>

        {/* Casual Inspirations Section */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Casual Inspirations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#F5F5F5] rounded-lg p-6 flex flex-col">
              <h3 className="text-lg font-medium mb-2">Casual</h3>
              <div className="flex-grow bg-gray-300 rounded-lg mb-4"></div>
              <button className="border border-black rounded-full px-4 py-2 text-sm">Shop Now</button>
            </div>
            <div className="bg-[#F5F5F5] rounded-lg p-6 flex flex-col">
              <h3 className="text-lg font-medium mb-2">Say it with Shirt</h3>
              <div className="flex-grow bg-gray-300 rounded-lg mb-4"></div>
              <button className="border border-black rounded-full px-4 py-2 text-sm">Shop Now</button>
            </div>
            <div className="bg-[#F5F5F5] rounded-lg p-6 flex flex-col">
              <h3 className="text-lg font-medium mb-2">Funky new get-up</h3>
              <div className="flex-grow bg-gray-300 rounded-lg mb-4"></div>
              <button className="border border-black rounded-full px-4 py-2 text-sm">Shop Now</button>
            </div>
          </div>
        </section>

        {/* Trending Section */}
        <section className="mt-12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Trending</h2>
            <div className="flex space-x-2">
              <button className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">&lt;</button>
              <button className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center">&gt;</button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {sampleProducts.map((product) => (
              <div key={product.productId} className="bg-gray-100 rounded-lg p-4">
                <div className="h-32 bg-white rounded-lg mb-2"></div>
                <h3 className="font-medium">{product.productName}</h3>
                <p className="text-sm text-gray-600">${product.price}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Explore by Colors */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Explore by Colors</h2>
          <div className="flex flex-wrap gap-2">
            <button className="bg-black text-white rounded-full px-4 py-1">All Colors</button>
            <button className="bg-red-500 text-white rounded-full px-4 py-1">Red</button>
            <button className="bg-blue-500 text-white rounded-full px-4 py-1">Blue</button>
            <button className="bg-green-500 text-white rounded-full px-4 py-1">Green</button>
            <button className="bg-yellow-500 text-white rounded-full px-4 py-1">Yellow</button>
            <button className="bg-purple-500 text-white rounded-full px-4 py-1">Purple</button>
            <button className="bg-pink-500 text-white rounded-full px-4 py-1">Pink</button>
            <button className="border border-gray-300 rounded-full px-4 py-1">More Colors</button>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="mt-12 bg-[#F5F5F5] rounded-lg p-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">What people say</h2>
            <p className="text-xl italic mb-4">"I love the way they handle the order."</p>
            <p className="text-sm">All customers receive a personal shopper to help them find exactly what they need.</p>
            <p className="font-medium mt-4">Samantha Wilson</p>
          </div>
        </section>

        {/* Why Shop With Us */}
        <section className="mt-12 mb-12">
          <h2 className="text-2xl font-bold mb-6">Why you'll love to shop on our website</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-black rounded-full mb-4 flex items-center justify-center text-white">❤️</div>
              <h3 className="font-bold mb-2">Take care with love</h3>
              <p className="text-sm text-gray-600">We take care of all your shopping needs with attention to detail and personalized service.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-black rounded-full mb-4 flex items-center justify-center text-white">📞</div>
              <h3 className="font-bold mb-2">Friendly Customer Service</h3>
              <p className="text-sm text-gray-600">Our team is always ready to assist you with any questions or concerns about your purchase.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-black rounded-full mb-4 flex items-center justify-center text-white">🚚</div>
              <h3 className="font-bold mb-2">Refined Process</h3>
              <p className="text-sm text-gray-600">Our streamlined shopping and delivery process ensures a smooth experience from browsing to receiving your items.</p>
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section className="mt-12 mb-16">
          <h2 className="text-2xl font-bold mb-6">From The Blog</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-100 rounded-lg overflow-hidden">
              <div className="h-64 bg-gray-300"></div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-3">How to combine your daily outfit to looks fresh and cool.</h3>
              <p className="text-gray-600 mb-4">Staying stylish everyday doesn't have to be complicated. Master these simple fashion tips to elevate your daily look with minimal effort.</p>
              <button className="text-black font-medium">Read More →</button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
