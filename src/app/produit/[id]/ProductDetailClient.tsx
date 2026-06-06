"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Heart, Star, ChevronRight, Minus, Plus, Package, RefreshCw, Shield } from "lucide-react";
import { useCartStore } from "@/store/cart";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/products";

const reviews = [
  {
    id: 1,
    author: "Sarra B.",
    rating: 5,
    date: "15 Janvier 2026",
    comment: "Superbe qualité, coupe parfaite ! Je suis très satisfaite de mon achat. La livraison était rapide et le service client excellent.",
    city: "Tunis",
  },
  {
    id: 2,
    author: "Ahmed K.",
    rating: 5,
    date: "8 Janvier 2026",
    comment: "Excellent produit, conforme à la description. Le tissu est confortable et de bonne qualité. Je recommande vivement.",
    city: "Sfax",
  },
  {
    id: 3,
    author: "Nour M.",
    rating: 4,
    date: "2 Janvier 2026",
    comment: "Très beau produit, j'adore le style. Juste un peu grand pour ma taille habituelle, pensez à prendre une taille en dessous.",
    city: "Sousse",
  },
];

interface Props {
  product: Product;
  related: Product[];
}

export default function ProductDetailClient({ product, related }: Props) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [liked, setLiked] = useState(false);
  const [added, setAdded] = useState(false);
  const [sizeError, setSizeError] = useState(false);
  const { addItem, openCart } = useCartStore();

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      setTimeout(() => setSizeError(false), 2000);
      return;
    }
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      size: selectedSize,
      quantity,
    });
    setAdded(true);
    openCart();
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      setSizeError(true);
      setTimeout(() => setSizeError(false), 2000);
      return;
    }
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      size: selectedSize,
      quantity,
    });
    window.location.href = "/commander";
  };

  const avgRating =
    reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;

  const images =
    product.images.length > 0 ? product.images : [product.imageUrl];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-8">
        <Link href="/" className="hover:text-black transition-colors">Accueil</Link>
        <ChevronRight size={14} />
        <Link
          href={`/${product.category}`}
          className="hover:text-black transition-colors capitalize"
        >
          {product.category}
        </Link>
        <ChevronRight size={14} />
        <span className="text-gray-700 capitalize">{product.subcategory}</span>
        <ChevronRight size={14} />
        <span className="text-gray-900 font-medium">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-20">
        {/* Gallery */}
        <div className="flex flex-col-reverse sm:flex-row gap-4">
        {/* Thumbnails (3 images visible, with arrows to switch) */}
        {images.length > 1 && (
          <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`flex-shrink-0 w-20 h-24 rounded-xl overflow-hidden border-2 transition-all ${
                  selectedImage === i ? "border-black" : "border-transparent"
                }`}
              >
                <Image
                  src={img}
                  alt={`${product.name} ${i + 1}`}
                  width={80}
                  height={96}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}

        {/* Main Image with left/right arrows */}
        <div className="flex-1 relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#f7f4f0]">
          <Image
            src={images[selectedImage]}
            alt={product.name}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />

          {product.isNew && (
            <span className="absolute top-4 left-4 bg-black text-white text-xs font-bold px-3 py-1.5 rounded-full tracking-wider">
              NOUVEAU
            </span>
          )}

          <button
            aria-label="image précédente"
            onClick={() =>
              setSelectedImage((prev) => (prev - 1 + images.length) % images.length)
            }
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-md hover:bg-white transition-colors"
          >
            ‹
          </button>

          <button
            aria-label="image suivante"
            onClick={() => setSelectedImage((prev) => (prev + 1) % images.length)}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-md hover:bg-white transition-colors"
          >
            ›
          </button>

          <button
            onClick={() => setLiked(!liked)}
            className="absolute top-4 right-4 w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
          >
            <Heart
              size={18}
              className={liked ? "fill-red-500 text-red-500" : "text-gray-600"}
            />
          </button>
        </div>
      </div>

        {/* Product Info */}
        <div className="flex flex-col">
          {/* Category */}
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-gray-400 mb-2 capitalize">
            {product.category} · {product.subcategory}
          </p>

          {/* Name */}
          <h1 className="text-3xl sm:text-4xl font-black text-black leading-tight mb-4">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={
                    i < Math.round(avgRating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-200 fill-gray-200"
                  }
                />
              ))}
            </div>
            <span className="text-sm font-medium text-gray-600">
              {avgRating.toFixed(1)} · {reviews.length} avis
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-6">
            <p className="text-4xl font-black text-black">
              {product.price.toFixed(2)}
              <span className="text-2xl font-bold ml-1">DT</span>
            </p>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm leading-relaxed mb-8 border-t border-b border-gray-100 py-6">
            {product.description}
          </p>

          {/* Colors */}
          {product.colors.length > 0 && (
            <div className="mb-6">
              <p className="text-sm font-semibold uppercase tracking-wider text-gray-700 mb-3">
                Couleurs disponibles
              </p>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <span
                    key={color}
                    className="px-3 py-1.5 text-xs font-medium border border-gray-200 rounded-full text-gray-600"
                  >
                    {color}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Size Selector */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold uppercase tracking-wider text-gray-700">
                Taille
              </p>
              <button className="text-xs text-gray-400 underline hover:text-black">
                Guide des tailles
              </button>
            </div>
            {sizeError && (
              <p className="text-red-500 text-xs mb-2 animate-fade-in">
                ⚠ Veuillez sélectionner une taille
              </p>
            )}
            <div className="flex gap-3 flex-wrap">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => {
                    setSelectedSize(size);
                    setSizeError(false);
                  }}
                  className={`w-14 h-14 text-sm font-semibold border-2 transition-all duration-200 rounded-lg ${
                    selectedSize === size
                      ? "border-black bg-black text-white"
                      : sizeError
                      ? "border-red-300 text-gray-600 hover:border-gray-400"
                      : "border-gray-200 text-gray-600 hover:border-gray-400"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-wider text-gray-700 mb-3">
              Quantité
            </p>
            <div className="inline-flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-12 h-12 flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                <Minus size={16} />
              </button>
              <span className="w-14 text-center font-semibold text-gray-900">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-12 h-12 flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <button
              onClick={handleAddToCart}
              className={`flex-1 flex items-center justify-center gap-3 py-4 text-sm font-bold tracking-widest transition-all duration-300 ${
                added
                  ? "bg-green-600 text-white"
                  : "bg-black text-white hover:bg-gray-800"
              }`}
            >
              <ShoppingBag size={18} />
              {added ? "AJOUTÉ AU PANIER ✓" : "AJOUTER AU PANIER"}
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 bg-[#EED9C4] text-black py-4 text-sm font-bold tracking-widest hover:bg-[#e0c9b0] transition-all duration-300"
            >
              ACHETER MAINTENANT
            </button>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-xl">
            <div className="flex flex-col items-center gap-1 text-center">
              <Truck size={20} className="text-gray-600" />
              <span className="text-xs text-gray-500 font-medium">Livraison 24-48h</span>
            </div>
            <div className="flex flex-col items-center gap-1 text-center">
              <RefreshCw size={20} className="text-gray-600" />
              <span className="text-xs text-gray-500 font-medium">Retour 14 jours</span>
            </div>
            <div className="flex flex-col items-center gap-1 text-center">
              <Shield size={20} className="text-gray-600" />
              <span className="text-xs text-gray-500 font-medium">Paiement sécurisé</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="mb-16">
        <h2 className="text-2xl font-black mb-6">Détails du produit</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-[#faf9f7] p-8 rounded-2xl">
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider">Caractéristiques</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex gap-2"><span className="text-black">✓</span> Matière premium de haute qualité</li>
              <li className="flex gap-2"><span className="text-black">✓</span> Coupe moderne et confortable</li>
              <li className="flex gap-2"><span className="text-black">✓</span> Tailles disponibles : S, M, L, XL</li>
              <li className="flex gap-2"><span className="text-black">✓</span> Lavable en machine à 30°C</li>
              <li className="flex gap-2"><span className="text-black">✓</span> Fabriqué avec soin et précision</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider">Livraison & Retours</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <Package size={16} className="mt-0.5 flex-shrink-0" />
                Livraison standard : 7 DT (gratuite dès 150 DT)
              </li>
              <li className="flex items-start gap-2">
                <RefreshCw size={16} className="mt-0.5 flex-shrink-0" />
                Retour gratuit sous 14 jours
              </li>
              <li className="flex items-start gap-2">
                <Shield size={16} className="mt-0.5 flex-shrink-0" />
                Paiement à la livraison disponible
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-black">
            Avis clients
            <span className="text-base font-normal text-gray-500 ml-3">
              ({reviews.length} avis)
            </span>
          </h2>
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className={
                    i < Math.round(avgRating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-200 fill-gray-200"
                  }
                />
              ))}
            </div>
            <span className="font-bold text-gray-900">{avgRating.toFixed(1)}/5</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white border border-gray-100 rounded-2xl p-6 hover:border-[#EED9C4] transition-colors"
            >
              <div className="flex gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={
                      i < review.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-200 fill-gray-200"
                    }
                  />
                ))}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-4 italic">
                &ldquo;{review.comment}&rdquo;
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-[#EED9C4] rounded-full flex items-center justify-center text-xs font-bold text-gray-800">
                    {review.author[0]}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-900">{review.author}</p>
                    <p className="text-xs text-gray-400">{review.city}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-400">{review.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <div>
          <h2 className="text-2xl font-black mb-8">Vous aimerez aussi</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Missing import fix
function Truck({ size, className }: { size: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h11a2 2 0 012 2v3m0 0h4l3 3v4h-3M5 17a2 2 0 100 4 2 2 0 000-4zm12 0a2 2 0 100 4 2 2 0 000-4z"/>
    </svg>
  );
}
