"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react";
import { useCartStore } from "@/store/cart";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getTotalPrice } =
    useCartStore();

  // Lock body scroll when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const shipping = getTotalPrice() >= 150 ? 0 : 7;
  const total = getTotalPrice() + shipping;

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm"
          onClick={closeCart}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white z-50 flex flex-col transition-transform duration-400 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <ShoppingBag size={20} />
            <h2 className="text-lg font-semibold tracking-wide">Mon Panier</h2>
            {items.length > 0 && (
              <span className="bg-black text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {items.reduce((s, i) => s + i.quantity, 0)}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-gray-400">
              <ShoppingBag size={60} strokeWidth={1} />
              <p className="text-lg font-medium">Votre panier est vide</p>
              <p className="text-sm text-center">
                Découvrez nos collections et ajoutez vos articles préférés.
              </p>
              <Link
                href="/"
                onClick={closeCart}
                className="mt-4 bg-black text-white px-6 py-3 text-sm font-medium tracking-wider hover:bg-gray-800 transition-colors"
              >
                Continuer les achats
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {items.map((item) => (
                <div
                  key={`${item.id}-${item.size}`}
                  className="cart-item flex gap-4 pb-4 border-b border-gray-100 last:border-0"
                >
                  <div className="w-20 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      width={80}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-gray-900 truncate">
                      {item.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Taille: {item.size}
                    </p>
                    <p className="text-sm font-bold text-gray-900 mt-1">
                      {(item.price * item.quantity).toFixed(2)} DT
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2 border border-gray-200 rounded-full px-2 py-1">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.size, item.quantity - 1)
                          }
                          className="w-5 h-5 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-sm font-medium w-5 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.size, item.quantity + 1)
                          }
                          className="w-5 h-5 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id, item.size)}
                        className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-gray-100 bg-gray-50">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Sous-total</span>
                <span>{getTotalPrice().toFixed(2)} DT</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Livraison</span>
                <span className={shipping === 0 ? "text-green-600 font-medium" : ""}>
                  {shipping === 0 ? "Gratuite" : `${shipping.toFixed(2)} DT`}
                </span>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-gray-400">
                  Livraison gratuite dès 150 DT d&apos;achat
                </p>
              )}
              <div className="flex justify-between text-base font-bold text-gray-900 pt-2 border-t border-gray-200">
                <span>Total</span>
                <span>{total.toFixed(2)} DT</span>
              </div>
            </div>
            <Link
              href="/panier"
              onClick={closeCart}
              className="block w-full bg-black text-white text-center py-4 text-sm font-semibold tracking-widest hover:bg-gray-800 transition-colors mb-3"
            >
              VOIR MON PANIER
            </Link>
            <Link
              href="/commander"
              onClick={closeCart}
              className="block w-full bg-[#EED9C4] text-black text-center py-4 text-sm font-semibold tracking-widest hover:bg-[#e0c9b0] transition-colors"
            >
              COMMANDER
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
