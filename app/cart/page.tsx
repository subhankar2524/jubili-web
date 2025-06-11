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
    <div style={{ background: "#fff8f8", minHeight: "100vh", padding: "32px" }}>
      <nav style={{ marginBottom: 24, color: "#b76e79", fontSize: 16 }}>
        Home <span style={{ color: "#000" }}>/</span> <span style={{ color: "#b76e79" }}>Shopping Cart</span>
      </nav>
      <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 24 }}>Shopping Cart</h1>
      <div style={{ display: "flex", gap: 64 }}>
        {/* Cart Items */}
        <div style={{ flex: 2 }}>
          {cartItems.map((item) => (
            <div key={item.id} style={{ display: "flex", alignItems: "center", marginBottom: 24 }}>
              <Image
                src={item.image}
                alt={item.name}
                width={64}
                height={64}
                style={{ borderRadius: 8, background: "#eee", marginRight: 16 }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 500 }}>{item.name}</div>
                <div style={{ color: "#b76e79", fontSize: 14 }}>Size: {item.size}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <button style={{
                  border: "none",
                  background: "#f5eaea",
                  borderRadius: "50%",
                  width: 32,
                  height: 32,
                  color: "#b76e79",
                  fontSize: 18,
                  cursor: "pointer"
                }}>-</button>
                <span style={{ minWidth: 24, textAlign: "center" }}>{item.quantity}</span>
                <button style={{
                  border: "none",
                  background: "#f5eaea",
                  borderRadius: "50%",
                  width: 32,
                  height: 32,
                  color: "#b76e79",
                  fontSize: 18,
                  cursor: "pointer"
                }}>+</button>
              </div>
            </div>
          ))}
        </div>
        {/* Order Summary */}
        <div style={{ flex: 1, minWidth: 280 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>Order Summary</h2>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, color: "#b76e79" }}>
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, color: "#b76e79" }}>
            <span>Shipping</span>
            <span>${shipping.toFixed(2)}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, color: "#b76e79" }}>
            <span>Taxes</span>
            <span>${taxes.toFixed(2)}</span>
          </div>
          <div style={{ borderTop: "1px solid #eee", margin: "16px 0" }} />
          <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: 18 }}>
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button
            style={{
              marginTop: 32,
              width: "100%",
              background: "#f44336",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "12px 0",
              fontSize: 16,
              fontWeight: 600,
              cursor: "pointer"
            }}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
    </>
  );
}