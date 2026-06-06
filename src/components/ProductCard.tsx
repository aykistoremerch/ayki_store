"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Heart } from "lucide-react";
import { useCartStore } from "@/store/cart";
import type { Product } from "@/lib/products";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem, openCart } = useCartStore();
  const [added, setAdded] = useState(false);
  const [liked, setLiked] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      size: "M",
      quantity: 1,
    });
    setAdded(true);
    openCart();
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="product-card group bg-white rounded-2xl overflow-hidden">
      <Link href={`/produit/${product.id}`}>
        {/* Image */}
        <div className="product-image-wrapper relative aspect-[3/4] bg-[#f7f4f0] overflow-hidden rounded-xl">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && (
              <span className="bg-black text-white text-xs font-bold px-3 py-1 rounded-full tracking-wider">
                NOUVEAU
              </span>
            )}
          </div>
          {/* Wishlist */}
          <button
            onClick={(e) => {
              e.preventDefault();
              setLiked(!liked);
            }}
            className="absolute top-3 right-3 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
          >
            <Heart
              size={16}
              className={liked ? "fill-red-500 text-red-500" : "text-gray-600"}
            />
          </button>
          {/* Quick add button */}
          <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button
              onClick={handleAddToCart}
              className={`w-full py-3.5 text-sm font-semibold tracking-widest flex items-center justify-center gap-2 transition-all duration-200 ${
                added
                  ? "bg-green-600 text-white"
                  : "bg-black text-white hover:bg-gray-800"
              }`}
            >
              <ShoppingBag size={16} />
              {added ? "AJOUTÉ ✓" : "AJOUTER AU PANIER"}
            </button>
          </div>
        </div>
      </Link>

      {/* Info */}
      <div className="pt-4 pb-2 px-1">
        <Link href={`/produit/${product.id}`}>
          <h3 className="text-sm font-semibold text-gray-900 hover:text-gray-600 transition-colors truncate">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-gray-500 mt-0.5 capitalize">{product.subcategory}</p>
        <div className="flex items-center justify-between mt-2">
          <p className="text-base font-bold text-gray-900">
            {product.price.toFixed(2)} <span className="text-sm font-medium">DT</span>
          </p>
          {/* Size dots */}
          <div className="flex gap-1">
            {product.sizes.slice(0, 3).map((size) => (
              <span key={size} className="text-xs text-gray-400 border border-gray-200 px-1.5 py-0.5 rounded">
                {size}
              </span>
            ))}
            {product.sizes.length > 3 && (
              <span className="text-xs text-gray-400">+{product.sizes.length - 3}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
