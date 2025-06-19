"use client";

import Navbar from "@/components/NavBar";
import Image from "next/image";

export default function CartPage() {
  // Example cart data
  const cartItems = [
    {
      id: 1,
      name: "Classic Cotton T-Shirt",
      size: "M",
      image: "/images/tshirt.png",
      price: 25.0,
      quantity: 1,
    },
    {
      id: 2,
      name: "Comfortable Running Shoes",
      size: "8",
      image: "/images/shoes.png",
      price: 35.0,
      quantity: 1,
    },
    {
      id: 3,
      name: "Slim Fit Jeans",
      size: "30",
      image: "/images/jeans.png",
      price: 15.0,
      quantity: 1,
    },
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 5.0;
  const taxes = 7.5;
  const total = subtotal + shipping + taxes;

  return (
    <>
    <Navbar />
    
    </>
  );
}