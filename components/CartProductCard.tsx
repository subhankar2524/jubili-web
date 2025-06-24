import React from "react";

export interface CartProductCardProps {
  item: {
    productId: string;
    productName: string;
    imageUrl: string;
    color?: string;
    size?: string;
    brand?: string;
    price: number;
    discountOnProduct?: number;
    discountAmount?: number;
    quantity: number;
    totalDiscountedPrice: number;
    productCategory?: string;
    description?: string;
  };
}

const CartProductCard: React.FC<CartProductCardProps> = ({ item }) => {
  return (
    <div className="flex gap-4 bg-white rounded-lg shadow p-4 mb-4 items-center">
      <img
        src={item.imageUrl}
        alt={item.productName}
        className="w-24 h-24 object-cover rounded-lg border"
      />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-lg font-semibold">{item.productName}</div>
            {item.brand && <div className="text-sm text-gray-500">{item.brand}</div>}
          </div>
          <div className="text-right">
            <div className="text-green-700 font-bold text-lg">₹{item.totalDiscountedPrice.toFixed(2)}</div>
            {item.discountOnProduct && item.discountOnProduct > 0 && (
              <div className="text-xs text-gray-400 line-through">₹{item.price.toFixed(2)}</div>
            )}
            {item.discountOnProduct && item.discountOnProduct > 0 && (
              <div className="text-xs text-red-500">-{item.discountOnProduct}%</div>
            )}
          </div>
        </div>
        <div className="flex gap-4 mt-2 text-sm text-gray-600 items-center">
          {item.size && <div>Size: <span className="font-medium">{item.size}</span></div>}
          {item.color && <div>Color: <span className="font-medium">{item.color}</span></div>}
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-lg font-bold transition">-</button>
            <span className="font-medium w-6 text-center">{item.quantity}</span>
            <button className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-lg font-bold transition">+</button>
          </div>
        </div>
        {item.description && (
          <div className="mt-2 text-xs text-gray-500 line-clamp-2">{item.description}</div>
        )}
      </div>
    </div>
  );
};

export default CartProductCard;
