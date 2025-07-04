import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { json } from "stream/consumers";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function searchProducts(productName: string) {
  const token = Cookies.get("token"); 
  const url = `${BASE_URL}/api/products/search-products?productName=${encodeURIComponent(productName)}`;
  console.log(url);
  
  const res = await fetch(
    `${BASE_URL}/api/products/search-products?productName=${encodeURIComponent(productName)}`,
    {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    }
  );
  console.log(res);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function toggleProductLike(productId: string, productCategory: string) {
  const token = Cookies.get("token");
  
  if (!token) {
    toast.error("Please login to like");
    throw new Error("Authentication token not found");
  }

  const res = await fetch(`${BASE_URL}/api/products/like`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      productId,
      productCategory,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to toggle product like");
  }

  const data = await res.json();
  if (data?.message) {
    toast.success(data.message);
  }
  return data;
}

export async function addToCart({ userId, productId, quantity }: { userId: string; productId: string; quantity: string }) {
  const token = Cookies.get("token");

  if (!token) {
    toast.error("Please login to add to cart");
    throw new Error("Authentication token not found");
  }
  
  const res = await fetch(`${BASE_URL}/api/user-actions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      userId,
      actionType: "CART",
      productId,
      quantity,
    }),
  });
  
  if (res.ok) {
    toast.success("Added to cart");
  }

  if (!res.ok) {
    toast.error("Failed to add to cart");
    throw new Error("Failed to add to cart");
  }

  const data = await res.json();
  if (data?.message) {
    toast.success(data.message);
  }
  return data;
}

export async function getCartItems(userId: string) {
  const token = Cookies.get("token");
  if (!token) {
    toast.error("Please login to view cart");
    throw new Error("Authentication token not found");
  }
  const url = `${BASE_URL}/api/user-actions/cart?userId=${userId}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch cart items");
  }
  return res.json();
}

export async function removeFromCart({ userId, productId }: { userId: string; productId: string }) {
  const token = Cookies.get("token");
  if (!token) {
    toast.error("Please login to remove from cart");
    throw new Error("Authentication token not found");
  }
  const res = await fetch(`${BASE_URL}/api/user-actions`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      userId,
      productId,
      actionType: "CART",
    }),
  });
  if (!res.ok) {
    toast.error("Failed to remove from cart");
    throw new Error("Failed to remove from cart");
  }
  const data = await res.json();
  if (data?.message) {
    toast.success(data.message);
  }
  return data;
}

export async function getLikedProducts() {
  const token = Cookies.get("token");
  if (!token) {
    toast.error("Please login to view liked products");
    throw new Error("Authentication token not found");
  }
  const url = `${BASE_URL}/api/user-actions/liked-products`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch liked products");
  }
  return res.json();
}