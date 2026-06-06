"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, ArrowRight } from "lucide-react";
import { useCartStore } from "@/store/cart";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCartStore();

  const subtotal = getTotalPrice();
  const shipping = subtotal >= 150 ? 0 : subtotal === 0 ? 0 : 7;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-4xl font-black text-black">Mon Panier</h1>
            {items.length > 0 && (
              <p className="text-gray-500 mt-1 text-sm">
                {items.reduce((s, i) => s + i.quantity, 0)} article{items.reduce((s, i) => s + i.quantity, 0) !== 1 ? "s" : ""}
              </p>
            )}
          </div>
          <Link
            href="/nouveautes"
            className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-black transition-colors"
          >
            <ArrowLeft size={16} />
            Continuer mes achats
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-24 h-24 bg-[#EED9C4]/30 rounded-full flex items-center justify-center mb-6">
              <ShoppingBag size={40} strokeWidth={1.5} className="text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-700 mb-3">
              Votre panier est vide
            </h2>
            <p className="text-gray-500 mb-8 max-w-sm">
              Découvrez nos collections et trouvez les pièces qui vous correspondent.
            </p>
            <Link
              href="/"
              className="bg-black text-white px-8 py-4 text-sm font-semibold tracking-widest hover:bg-gray-800 transition-colors"
            >
              Découvrir la collection
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              {/* Table Header */}
              <div className="hidden sm:grid grid-cols-12 gap-4 pb-3 border-b border-gray-200 text-xs font-semibold tracking-widest text-gray-400 uppercase">
                <div className="col-span-6">Produit</div>
                <div className="col-span-2 text-center">Prix</div>
                <div className="col-span-2 text-center">Quantité</div>
                <div className="col-span-2 text-right">Total</div>
              </div>

              {/* Items */}
              <div className="divide-y divide-gray-100">
                {items.map((item) => (
                  <div
                    key={`${item.id}-${item.size}`}
                    className="cart-item py-6 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center"
                  >
                    {/* Product */}
                    <div className="sm:col-span-6 flex gap-4">
                      <Link href={`/produit/${item.id}`}>
                        <div className="w-24 h-28 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                          <Image
                            src={item.imageUrl}
                            alt={item.name}
                            width={96}
                            height={112}
                            className="w-full h-full object-cover hover:scale-105 transition-transform"
                          />
                        </div>
                      </Link>
                      <div className="flex flex-col justify-center min-w-0">
                        <Link
                          href={`/produit/${item.id}`}
                          className="font-semibold text-gray-900 hover:text-gray-600 transition-colors text-sm"
                        >
                          {item.name}
                        </Link>
                        <p className="text-xs text-gray-500 mt-1">Taille: {item.size}</p>
                        <p className="text-sm font-bold text-black mt-2 sm:hidden">
                          {(item.price * item.quantity).toFixed(2)} DT
                        </p>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="hidden sm:flex sm:col-span-2 justify-center">
                      <span className="text-sm font-medium text-gray-700">
                        {item.price.toFixed(2)} DT
                      </span>
                    </div>

                    {/* Quantity */}
                    <div className="sm:col-span-2 flex items-center justify-start sm:justify-center gap-2">
                      <div className="flex items-center border border-gray-200 rounded-full overflow-hidden">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.size, item.quantity - 1)
                          }
                          className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-600"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="w-8 text-center text-sm font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.size, item.quantity + 1)
                          }
                          className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-600"
                        >
                          <Plus size={13} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id, item.size)}
                        className="ml-2 p-2 text-gray-300 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    {/* Total */}
                    <div className="hidden sm:flex sm:col-span-2 justify-end">
                      <span className="text-sm font-bold text-gray-900">
                        {(item.price * item.quantity).toFixed(2)} DT
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cart Actions */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                <button
                  onClick={clearCart}
                  className="text-sm text-gray-400 hover:text-red-500 transition-colors flex items-center gap-2"
                >
                  <Trash2 size={15} />
                  Vider le panier
                </button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-[#faf9f7] rounded-2xl p-6 sticky top-24">
                <h2 className="text-xl font-black mb-6">Récapitulatif</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Sous-total</span>
                    <span className="font-medium">{subtotal.toFixed(2)} DT</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Livraison</span>
                    <span className={`font-medium ${shipping === 0 && subtotal > 0 ? "text-green-600" : ""}`}>
                      {subtotal === 0
                        ? "–"
                        : shipping === 0
                        ? "Gratuite"
                        : `${shipping.toFixed(2)} DT`}
                    </span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-xs text-gray-400 bg-white rounded-lg p-3">
                      💡 Plus que{" "}
                      <span className="font-bold text-gray-700">
                        {(150 - subtotal).toFixed(2)} DT
                      </span>{" "}
                      pour bénéficier de la livraison gratuite !
                    </p>
                  )}
                  <div className="border-t border-gray-200 pt-3 flex justify-between font-black text-lg">
                    <span>Total</span>
                    <span>{total.toFixed(2)} DT</span>
                  </div>
                </div>

                <Link
                  href="/commander"
                  className="flex items-center justify-center gap-3 w-full bg-black text-white py-4 text-sm font-bold tracking-widest hover:bg-gray-800 transition-colors mb-3 group"
                >
                  COMMANDER
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>

                <div className="text-center text-xs text-gray-400 mt-4">
                  <p>🔒 Paiement 100% sécurisé</p>
                  <p className="mt-1">Visa · Mastercard · Paiement à la livraison</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
