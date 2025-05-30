import React from "react";

interface ProductCardProps {
    product: {
        productId: string;
        productName: string;
        productDescription: string;
        productCategory: String,
        imageUrls: string[];
        price: string;
        size: string;
        brand?: string;
        likeCount: number;
        reviews?: number;
    };
}

const ProductCard: React.FC<{ product: ProductCardProps["product"] }> = ({ product }) => (
    <div className="bg-white overflow-hidden flex flex-col">
        {/* Top Row: Name, Price, Menu */}
        <div className="flex items-start justify-between mb-1 w-full md:w-2/3 lg:w-1/2 px-4">
            <div>
                <div className="text-xl font-semibold">{product.productName}</div>
                <div className="text-sm text-gray-500">{product.brand || "SUTA"}</div>
            </div>
            <div className="w-15"/>
            <div className="flex items-center gap-15">
                <div className="text-green-600 text-lg font-bold">₹{product.price}</div>
                <button className="text-2xl px-2"><b>⋮</b></button>
            </div>
            </div>

            {/* Images */}
            <div className="flex overflow-x-auto gap-4 mb-2" style={{ height: 320 }}>
                <div
                    style={{ height: 300, width: 0 }}
                />
                {product.imageUrls.map((url, idx) => (
                    <img
                        key={idx}
                        src={url}
                        alt={product.productName}
                        style={{ height: 300, width: "auto" }}
                        className="object-cover rounded-xl"
                    />
                ))}
            </div>

            {/* Actions Row */}
            <div className="w-full md:w-2/3 lg:w-1/2 flex items-center gap-6 mb-2 px-4">
                <div className="flex items-center gap-1 text-gray-700">
                    <img src="/icons/like_outlined.svg" alt="Favourites" width={24} height={24} />
                </div>
                {product.likeCount ?? 0}
                <div className="flex-2" />
                <button className="flex items-center gap-1 text-gray-700">
                    <img src="/icons/share.svg" alt="share-product" width={24} height={24} />
                </button>
                <button className="bg-black text-white rounded px-4 py-1 text-sm">{product.reviews ?? 0} reviews</button>

                <div className="flex-1" />
            </div>

            {/* Description */}
            <div className="text-base text-justify font-medium mb-2 w-full md:w-2/3 lg:w-1/2 px-4">{product.productDescription}</div>

            {/* Buy Row */}
            <div className="flex items-center gap-3 mt-2 w-full md:w-2/3 lg:w-1/2 px-4">
                <button className="bg-gray-900 text-white rounded-full px-10 py-2 text-lg font-semibold">Swipe to buy</button>
                <button className="bg-gray-100 rounded-full p-3">
                    <img src="/icons/cart-bag.svg" alt="Favourites" width={24} height={24} />
                </button>
                <div className="flex-1" />
            </div>
        </div>
        );

        export default ProductCard;