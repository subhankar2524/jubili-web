import Cookies from "js-cookie";
import { json } from "stream/consumers";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function searchProducts(productName: string) {
  const token = Cookies.get("token"); 
  const res = await fetch(
    `${BASE_URL}/api/products/search-products?productName=${encodeURIComponent(productName)}`,
    {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    }
  );
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}