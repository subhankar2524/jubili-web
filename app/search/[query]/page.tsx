"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { searchProducts } from "@/lib/api/products";
import Navbar from "@/components/NavBar";
import ProductCard from "@/components/ProductCard";

export default function SearchPage() {
    const params = useParams();
    const productName = params.query as string || "";
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
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
                <div>
                    <div className="text-center w-full">
                        <h1>
                            Found {results.length} results for <b>{productName}</b>
                        </h1>
                        <h1>
                            {loading && <p>Loading...</p>}
                        </h1>
                        {error && <p style={{ color: "red" }}>{error}</p>}
                    </div>
                    <div className="flex flex-col mt-6">
                        {results.map((product) => (
                            <ProductCard key={product.productId} product={product} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}