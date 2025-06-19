"use client";
import Cookies from "js-cookie";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { searchProducts } from "@/lib/api/products";
import Navbar from "@/components/NavBar";
import ProductCard from "@/components/ProductCard";
// import { cookies } from "next/headers";

export default function SearchPage() {
    const params = useParams();
    const productName = params.query as string || "";
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        console.log(Cookies.get('token'));
        
        if (productName) {
            setLoading(true);
            setError(null);
            searchProducts(productName)
                .then(data => {
                    setResults(data);
                    console.log(data);
                    
                })
                .catch(err => setError(err.message))
                .finally(() => setLoading(false));
        } else {
            setResults([]);
        }
    }, [productName]);

    return (
        <>
            <Navbar />
            <div className="flex">
                <div className="w-full">
                    {loading ? (
                        <div className="fixed inset-50 flex items-center justify-center bg-white bg-opacity-80 z-50">
                            <p className="text-xl font-semibold">Loading...</p>
                        </div>
                    ) : (
                        <>
                            <div className="text-center w-full">
                                <h1>
                                    Found {results.length} results for <b>{productName}</b>
                                </h1>
                                {error && <p style={{ color: "red" }}>{error}</p>}
                            </div>
                            <div className="flex flex-col mt-6">
                                {results.map((product) => (
                                    <ProductCard key={product.productId} product={product} />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}