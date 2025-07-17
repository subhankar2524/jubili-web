"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/NavBar";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products/${id}`)
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to fetch product");
        return res.json();
      })
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;
  return (
    <>
    <Navbar />
    <div>
      <h1>Product Detail</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>Not Loading</div>
      )}
    </div>
    </>
  );
} 