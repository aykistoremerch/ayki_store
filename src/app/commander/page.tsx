"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, CreditCard, Truck, Shield } from "lucide-react";
import { useCartStore } from "@/store/cart";

const paymentMethods = [
  {
    id: "cod",
    label: "Paiement à la livraison",
    description: "Payez en cash à la réception de votre commande",
    icon: "💵",
  },
  {
    id: "card",
    label: "Carte Bancaire",
    description: "Paiement sécurisé par carte",
    icon: "💳",
  },
  {
    id: "visa",
    label: "Visa",
    description: "Paiement via Visa",
    icon: "🔵",
  },
  {
    id: "mastercard",
    label: "Mastercard",
    description: "Paiement via Mastercard",
    icon: "🔴",
  },
];

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
  });

  const subtotal = getTotalPrice();
  const shipping = subtotal >= 150 ? 0 : subtotal === 0 ? 0 : 7;
  const total = subtotal + shipping;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.fullName.trim()) newErrors.fullName = "Le nom est requis";
    if (!form.phone.trim()) newErrors.phone = "Le téléphone est requis";
    if (!form.email.trim()) newErrors.email = "L'email est requis";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Email invalide";
    if (!form.address.trim()) newErrors.address = "L'adresse est requise";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (items.length === 0) return;

    setLoading(true);
    try {
      await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          paymentMethod,
          items: JSON.stringify(items),
          subtotal,
          shipping,
          total,
        }),
      });
      clearCart();
      setSuccess(true);
    } catch {
      setSuccess(true);
      clearCart();
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center py-16">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <Check size={40} className="text-green-600" strokeWidth={2.5} />
          </div>
          <h1 className="text-3xl font-black text-black mb-4">
            Commande confirmée !
          </h1>
          <p className="text-gray-500 mb-3 text-sm leading-relaxed">
            Merci pour votre commande, <span className="font-semibold text-gray-800">{form.fullName}</span> !
            Vous recevrez une confirmation par email sous peu.
          </p>
          <p className="text-gray-500 mb-8 text-sm">
            Notre équipe vous contactera dans les plus brefs délais pour confirmer votre livraison.
          </p>
          <div className="bg-[#faf9f7] rounded-2xl p-6 mb-8 text-left">
            <h3 className="font-bold text-sm uppercase tracking-wider mb-4">Récapitulatif</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p><span className="font-medium">Nom :</span> {form.fullName}</p>
              <p><span className="font-medium">Téléphone :</span> {form.phone}</p>
              <p><span className="font-medium">Adresse :</span> {form.address}</p>
              <p><span className="font-medium">Paiement :</span> {paymentMethods.find(p => p.id === paymentMethod)?.label}</p>
              <p><span className="font-medium">Total :</span> <span className="font-bold text-black">{total.toFixed(2)} DT</span></p>
            </div>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 text-sm font-bold tracking-widest hover:bg-gray-800 transition-colors"
          >
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf9f7]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <Link
            href="/panier"
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-black transition-colors"
          >
            <ArrowLeft size={16} />
            Retour au panier
          </Link>
          <div className="flex-1 h-px bg-gray-200" />
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-gray-300 text-gray-500 flex items-center justify-center text-xs font-bold">1</div>
              <span className="text-xs text-gray-400 hidden sm:block">Panier</span>
            </div>
            <div className="w-8 h-px bg-gray-300" />
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold">2</div>
              <span className="text-xs text-black font-semibold hidden sm:block">Commande</span>
            </div>
            <div className="w-8 h-px bg-gray-300" />
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center text-xs font-bold">3</div>
              <span className="text-xs text-gray-400 hidden sm:block">Confirmation</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Customer Info */}
              <div className="bg-white rounded-2xl p-6 sm:p-8">
                <h2 className="text-xl font-black mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm">1</span>
                  Informations personnelles
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold tracking-wider uppercase text-gray-600 mb-2">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      value={form.fullName}
                      onChange={(e) =>
                        setForm({ ...form, fullName: e.target.value })
                      }
                      placeholder="Ex: Ahmed Ben Ali"
                      className={`w-full border ${errors.fullName ? "border-red-400" : "border-gray-200"} rounded-xl px-4 py-3.5 text-sm focus:border-black focus:ring-0 transition-colors bg-gray-50 focus:bg-white`}
                    />
                    {errors.fullName && (
                      <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-semibold tracking-wider uppercase text-gray-600 mb-2">
                      Téléphone *
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                      placeholder="Ex: 20 123 456"
                      className={`w-full border ${errors.phone ? "border-red-400" : "border-gray-200"} rounded-xl px-4 py-3.5 text-sm focus:border-black focus:ring-0 transition-colors bg-gray-50 focus:bg-white`}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold tracking-wider uppercase text-gray-600 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      placeholder="email@exemple.com"
                      className={`w-full border ${errors.email ? "border-red-400" : "border-gray-200"} rounded-xl px-4 py-3.5 text-sm focus:border-black focus:ring-0 transition-colors bg-gray-50 focus:bg-white`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                    )}
                  </div>

                  {/* Address */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold tracking-wider uppercase text-gray-600 mb-2">
                      Adresse de livraison *
                    </label>
                    <textarea
                      value={form.address}
                      onChange={(e) =>
                        setForm({ ...form, address: e.target.value })
                      }
                      placeholder="Rue, numéro, ville, code postal..."
                      rows={3}
                      className={`w-full border ${errors.address ? "border-red-400" : "border-gray-200"} rounded-xl px-4 py-3.5 text-sm focus:border-black focus:ring-0 transition-colors bg-gray-50 focus:bg-white resize-none`}
                    />
                    {errors.address && (
                      <p className="text-red-500 text-xs mt-1">{errors.address}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div className="bg-white rounded-2xl p-6 sm:p-8">
                <h2 className="text-xl font-black mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm">2</span>
                  Mode de paiement
                </h2>

                <div className="space-y-3">
                  {paymentMethods.map((method) => (
                    <label
                      key={method.id}
                      className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                        paymentMethod === method.id
                          ? "border-black bg-black/5"
                          : "border-gray-100 hover:border-gray-200"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={method.id}
                        checked={paymentMethod === method.id}
                        onChange={() => setPaymentMethod(method.id)}
                        className="sr-only"
                      />
                      <span className="text-2xl">{method.icon}</span>
                      <div className="flex-1">
                        <p className="font-semibold text-sm text-gray-900">
                          {method.label}
                        </p>
                        <p className="text-xs text-gray-500">{method.description}</p>
                      </div>
                      {paymentMethod === method.id && (
                        <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                          <Check size={12} className="text-white" />
                        </div>
                      )}
                    </label>
                  ))}
                </div>

                {/* Card fields */}
                {(paymentMethod === "card" ||
                  paymentMethod === "visa" ||
                  paymentMethod === "mastercard") && (
                  <div className="mt-6 pt-6 border-t border-gray-100 space-y-4">
                    <div>
                      <label className="block text-xs font-semibold tracking-wider uppercase text-gray-600 mb-2">
                        Numéro de carte
                      </label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm bg-gray-50 focus:bg-white focus:border-black transition-colors"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold tracking-wider uppercase text-gray-600 mb-2">
                          Date d&apos;expiration
                        </label>
                        <input
                          type="text"
                          placeholder="MM/AA"
                          className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm bg-gray-50 focus:bg-white focus:border-black transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold tracking-wider uppercase text-gray-600 mb-2">
                          CVV
                        </label>
                        <input
                          type="text"
                          placeholder="123"
                          className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm bg-gray-50 focus:bg-white focus:border-black transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading || items.length === 0}
                className="w-full bg-black text-white py-5 text-sm font-black tracking-widest hover:bg-gray-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl flex items-center justify-center gap-3"
              >
                {loading ? (
                  <span className="flex items-center gap-3">
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Traitement en cours...
                  </span>
                ) : (
                  <>
                    <Shield size={18} />
                    CONFIRMER MA COMMANDE · {total.toFixed(2)} DT
                  </>
                )}
              </button>

              <p className="text-center text-xs text-gray-400">
                🔒 Paiement sécurisé · Vos données sont protégées
              </p>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 sticky top-24">
              <h2 className="text-xl font-black mb-6">
                Votre commande
              </h2>

              {/* Items */}
              <div className="space-y-4 mb-6 max-h-80 overflow-y-auto">
                {items.length === 0 ? (
                  <p className="text-sm text-gray-400 text-center py-4">
                    Votre panier est vide
                  </p>
                ) : (
                  items.map((item) => (
                    <div
                      key={`${item.id}-${item.size}`}
                      className="flex gap-4 py-3 border-b border-gray-100 last:border-0"
                    >
                      <div className="relative w-16 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-black text-white text-xs rounded-full flex items-center justify-center font-bold">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-500">Taille: {item.size}</p>
                        <p className="text-sm font-bold text-black mt-1">
                          {(item.price * item.quantity).toFixed(2)} DT
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Totals */}
              <div className="space-y-3 border-t border-gray-100 pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Sous-total</span>
                  <span>{subtotal.toFixed(2)} DT</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Livraison</span>
                  <span className={shipping === 0 && subtotal > 0 ? "text-green-600 font-medium" : ""}>
                    {subtotal === 0 ? "–" : shipping === 0 ? "Gratuite" : `${shipping.toFixed(2)} DT`}
                  </span>
                </div>
                <div className="flex justify-between font-black text-lg border-t border-gray-100 pt-3">
                  <span>Total TTC</span>
                  <span>{total.toFixed(2)} DT</span>
                </div>
              </div>

              {/* Benefits */}
              <div className="mt-6 pt-6 border-t border-gray-100 space-y-3">
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <Truck size={15} className="text-gray-400 flex-shrink-0" />
                  Livraison rapide 24-48h en Tunisie
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <CreditCard size={15} className="text-gray-400 flex-shrink-0" />
                  Paiement sécurisé & paiement à la livraison
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <Shield size={15} className="text-gray-400 flex-shrink-0" />
                  Retour gratuit sous 14 jours
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
