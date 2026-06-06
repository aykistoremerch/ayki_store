"use client";

import { useState } from "react";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock, Send, Check } from "lucide-react";

const contactInfo = [
  {
    icon: Phone,
    label: "Téléphone",
    value: "+216 20 123 456",
    sub: "Du lundi au samedi, 9h – 18h",
  },
  {
    icon: Mail,
    label: "Email",
    value: "contact@ayki.tn",
    sub: "Réponse sous 24h",
  },
  {
    icon: MapPin,
    label: "Adresse",
    value: "Tunis, Tunisie",
    sub: "Livraison dans toute la Tunisie",
  },
  {
    icon: Clock,
    label: "Horaires",
    value: "Lun – Sam : 9h à 18h",
    sub: "Dimanche : Fermé",
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = "Le nom est requis";
    if (!form.email.trim()) newErrors.email = "L'email est requis";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Email invalide";
    if (!form.message.trim()) newErrors.message = "Le message est requis";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setSuccess(true);
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      setSuccess(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="relative h-64 sm:h-80 overflow-hidden">
        <Image
          src="https://images.pexels.com/photos/9198307/pexels-photo-9198307.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=1400"
          alt="Contact AYKI"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <p className="text-[#EED9C4] text-xs font-bold tracking-[0.4em] uppercase mb-3">
            Nous contacter
          </p>
          <h1 className="text-5xl sm:text-6xl font-black text-white">Contact</h1>
          <p className="text-white/70 mt-3 text-sm">
            Notre équipe est là pour vous aider
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-2">
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-gray-400 mb-3">
              Besoin d&apos;aide ?
            </p>
            <h2 className="text-3xl font-black text-black mb-6">
              Parlons ensemble
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-8">
              Vous avez une question sur nos produits, une commande ou un retour ?
              Notre équipe est disponible pour vous accompagner dans votre expérience AYKI.
            </p>

            <div className="space-y-6">
              {contactInfo.map((item) => (
                <div key={item.label} className="flex gap-4 group">
                  <div className="w-12 h-12 bg-[#EED9C4]/30 group-hover:bg-[#EED9C4] rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                    <item.icon size={20} className="text-gray-700" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-0.5">
                      {item.label}
                    </p>
                    <p className="font-semibold text-gray-900 text-sm">{item.value}</p>
                    <p className="text-xs text-gray-500">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="mt-10 pt-8 border-t border-gray-100">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">
                Suivez-nous
              </p>
              <div className="flex gap-3">
                {[
                  { name: "Instagram", bg: "bg-gradient-to-br from-purple-500 to-pink-500" },
                  { name: "Facebook", bg: "bg-blue-600" },
                  { name: "TikTok", bg: "bg-black" },
                ].map((s) => (
                  <a
                    key={s.name}
                    href="#"
                    className={`${s.bg} text-white text-xs font-semibold px-4 py-2 rounded-full hover:opacity-80 transition-opacity`}
                  >
                    {s.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-8 sm:p-10">
              {success ? (
                <div className="text-center py-10">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check size={32} className="text-green-600" strokeWidth={2.5} />
                  </div>
                  <h3 className="text-2xl font-black text-black mb-3">
                    Message envoyé !
                  </h3>
                  <p className="text-gray-500 text-sm mb-6">
                    Merci pour votre message. Notre équipe vous répondra dans les plus brefs délais.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="bg-black text-white px-6 py-3 text-sm font-semibold tracking-wider hover:bg-gray-800 transition-colors rounded-xl"
                  >
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-black text-black mb-8">
                    Envoyez-nous un message
                  </h3>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Name */}
                      <div>
                        <label className="block text-xs font-semibold tracking-wider uppercase text-gray-600 mb-2">
                          Nom *
                        </label>
                        <input
                          type="text"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder="Votre nom complet"
                          className={`w-full border ${errors.name ? "border-red-400" : "border-gray-200"} rounded-xl px-4 py-3.5 text-sm focus:border-black focus:ring-0 bg-gray-50 focus:bg-white transition-all`}
                        />
                        {errors.name && (
                          <p className="text-red-500 text-xs mt-1">{errors.name}</p>
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
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder="email@exemple.com"
                          className={`w-full border ${errors.email ? "border-red-400" : "border-gray-200"} rounded-xl px-4 py-3.5 text-sm focus:border-black focus:ring-0 bg-gray-50 focus:bg-white transition-all`}
                        />
                        {errors.email && (
                          <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                        )}
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-xs font-semibold tracking-wider uppercase text-gray-600 mb-2">
                        Téléphone
                      </label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="Ex: 20 123 456"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:border-black focus:ring-0 bg-gray-50 focus:bg-white transition-all"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs font-semibold tracking-wider uppercase text-gray-600 mb-2">
                        Message *
                      </label>
                      <textarea
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="Comment pouvons-nous vous aider ?"
                        rows={5}
                        className={`w-full border ${errors.message ? "border-red-400" : "border-gray-200"} rounded-xl px-4 py-3.5 text-sm focus:border-black focus:ring-0 bg-gray-50 focus:bg-white transition-all resize-none`}
                      />
                      {errors.message && (
                        <p className="text-red-500 text-xs mt-1">{errors.message}</p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-black text-white py-4 text-sm font-bold tracking-widest hover:bg-gray-800 transition-all duration-300 disabled:opacity-60 rounded-xl flex items-center justify-center gap-3 group"
                    >
                      {loading ? (
                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <Send size={16} className="group-hover:translate-x-0.5 transition-transform" />
                          ENVOYER LE MESSAGE
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
