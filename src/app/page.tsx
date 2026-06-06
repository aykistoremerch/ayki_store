"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Shield, Truck, CreditCard, Headphones, Star, ChevronDown } from "lucide-react";
import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";

const newProducts = products.filter((p) => p.isNew).slice(0, 8);

const features = [
  {
    icon: Shield,
    title: "Qualité Premium",
    desc: "Des matières soigneusement sélectionnées pour un confort et une durabilité exceptionnels.",
  },
  {
    icon: Truck,
    title: "Livraison Rapide",
    desc: "Livraison express partout en Tunisie sous 24 à 48h ouvrables.",
  },
  {
    icon: CreditCard,
    title: "Paiement Sécurisé",
    desc: "Transactions 100% sécurisées. Paiement à la livraison disponible.",
  },
  {
    icon: Headphones,
    title: "Service Client Réactif",
    desc: "Notre équipe est disponible 6j/7 pour répondre à toutes vos questions.",
  },
];

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setSubscribed(true);
    } catch {
      setSubscribed(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.pexels.com/photos/9565839/pexels-photo-9565839.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1080&w=1920"
            alt="AYKI Fashion Hero"
            fill
            className="object-cover object-top"
            priority
          />
          <div className="hero-gradient absolute inset-0" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <p className="text-[#EED9C4] text-sm font-medium tracking-[0.35em] uppercase mb-6 animate-fade-in">
              Nouvelle Collection 2026
            </p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-tight mb-6 animate-fade-in-up">
              Découvrez{" "}
              <span className="text-[#EED9C4]">l&apos;élégance</span>
              <br />
              au quotidien
            </h1>
            <p className="text-lg text-white/80 mb-10 leading-relaxed animate-fade-in-up font-light max-w-lg">
              Des vêtements modernes, confortables et tendance pour hommes et
              femmes. Le style au quotidien, pour elle et pour lui.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up">
              <Link
                href="/nouveautes"
                className="btn-primary bg-white text-black px-8 py-4 text-sm font-semibold tracking-widest hover:bg-[#EED9C4] transition-all duration-300 inline-flex items-center gap-3 group"
              >
                Découvrir la collection
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/a-propos"
                className="border border-white/50 text-white px-8 py-4 text-sm font-semibold tracking-widest hover:bg-white/10 transition-all duration-300 inline-flex items-center gap-3"
              >
                Notre histoire
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60 animate-bounce">
          <span className="text-xs tracking-widest">Défiler</span>
          <ChevronDown size={20} />
        </div>
      </section>

      {/* ─── COLLECTIONS ─── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold tracking-[0.3em] text-gray-500 uppercase mb-3">
            Explorer
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-black">
            Nos Collections
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* HOMME */}
          <div className="collection-card relative h-[500px] sm:h-[600px] rounded-3xl overflow-hidden group cursor-pointer">
            <Image
              src="https://images.pexels.com/photos/20440141/pexels-photo-20440141.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700"
              alt="Collection Homme AYKI"
              fill
              className="object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <p className="text-[#EED9C4] text-xs font-bold tracking-[0.3em] uppercase mb-2">
                Pour lui
              </p>
              <h3 className="text-4xl font-black text-white mb-2">HOMME</h3>
              <p className="text-white/70 text-sm mb-6">
                T-shirts · Shorts
              </p>
              <Link
                href="/homme"
                className="inline-flex items-center gap-3 bg-white text-black px-6 py-3 text-sm font-semibold tracking-widest hover:bg-[#EED9C4] transition-all duration-300 group-hover:gap-5"
              >
                Voir la collection
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          {/* FEMME */}
          <div className="collection-card relative h-[500px] sm:h-[600px] rounded-3xl overflow-hidden group cursor-pointer">
            <Image
              src="https://images.pexels.com/photos/29119306/pexels-photo-29119306.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700"
              alt="Collection Femme AYKI"
              fill
              className="object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <p className="text-[#EED9C4] text-xs font-bold tracking-[0.3em] uppercase mb-2">
                Pour elle
              </p>
              <h3 className="text-4xl font-black text-white mb-2">FEMME</h3>
              <p className="text-white/70 text-sm mb-6">
                Robes · Pyjamas
              </p>
              <Link
                href="/femme"
                className="inline-flex items-center gap-3 bg-white text-black px-6 py-3 text-sm font-semibold tracking-widest hover:bg-[#EED9C4] transition-all duration-300 group-hover:gap-5"
              >
                Voir la collection
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── NOUVEAUTÉS ─── */}
      <section className="py-20 bg-[#faf9f7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 gap-4">
            <div>
              <p className="text-xs font-semibold tracking-[0.3em] text-gray-500 uppercase mb-3">
                Tendances
              </p>
              <h2 className="text-4xl sm:text-5xl font-black text-black">
                Nouveautés
              </h2>
            </div>
            <Link
              href="/nouveautes"
              className="flex items-center gap-2 text-sm font-semibold text-black hover:text-gray-600 transition-colors group"
            >
              Tout voir
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {newProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── BANNER ─── */}
      <section className="relative py-0 overflow-hidden">
        <div className="relative h-[400px] sm:h-[500px]">
          <Image
            src="https://images.pexels.com/photos/9566258/pexels-photo-9566258.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=1400"
            alt="AYKI Style"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
            <p className="text-[#EED9C4] text-xs font-bold tracking-[0.4em] uppercase mb-4">
              Style & Élégance
            </p>
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-6 max-w-xl">
              &ldquo;Le style au quotidien, pour elle et pour lui&rdquo;
            </h2>
            <Link
              href="/nouveautes"
              className="btn-primary border-2 border-[#EED9C4] text-[#EED9C4] px-8 py-4 text-sm font-semibold tracking-widest hover:bg-[#EED9C4] hover:text-black transition-all duration-300"
            >
              Découvrir AYKI
            </Link>
          </div>
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold tracking-[0.3em] text-gray-500 uppercase mb-3">
              Nos engagements
            </p>
            <h2 className="text-4xl sm:text-5xl font-black text-black">
              Pourquoi choisir AYKI
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group text-center p-8 rounded-2xl hover:bg-[#EED9C4]/20 transition-all duration-300 border border-transparent hover:border-[#EED9C4]"
              >
                <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon size={28} className="text-[#EED9C4]" />
                </div>
                <h3 className="text-lg font-bold text-black mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-20 bg-[#faf9f7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold tracking-[0.3em] text-gray-500 uppercase mb-3">
              Avis clients
            </p>
            <h2 className="text-4xl font-black text-black">
              Ce que disent nos clients
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Sarra B.",
                text: "Qualité exceptionnelle ! La robe midi que j'ai commandée est encore plus belle en vrai. Livraison ultra rapide. Je recommande vivement AYKI.",
                rating: 5,
                city: "Tunis",
              },
              {
                name: "Ahmed K.",
                text: "Les t-shirts sont confortables et élégants. Le tissu est de très bonne qualité. Très satisfait de mon achat, je reviendrai certainement.",
                rating: 5,
                city: "Sfax",
              },
              {
                name: "Nour M.",
                text: "Le pyjama satin est magnifique et tellement doux. Le service client est très réactif. Une marque que je recommande à toutes mes amies !",
                rating: 5,
                city: "Sousse",
              },
            ].map((review) => (
              <div
                key={review.name}
                className="bg-white p-8 rounded-2xl border border-gray-100 hover:border-[#EED9C4] hover:shadow-lg transition-all duration-300"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} size={16} className="star-filled fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#EED9C4] rounded-full flex items-center justify-center font-bold text-sm text-gray-800">
                    {review.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-gray-900">{review.name}</p>
                    <p className="text-xs text-gray-400">{review.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── NEWSLETTER ─── */}
      <section className="py-20 bg-black">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#EED9C4] text-xs font-bold tracking-[0.4em] uppercase mb-4">
            Newsletter
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-5">
            Restez informé de nos nouveautés
          </h2>
          <p className="text-gray-400 mb-10 text-sm leading-relaxed">
            Inscrivez-vous à notre newsletter et soyez les premiers à découvrir
            nos nouvelles collections, offres exclusives et conseils style.
          </p>

          {subscribed ? (
            <div className="bg-[#EED9C4]/20 border border-[#EED9C4] rounded-xl p-6">
              <p className="text-[#EED9C4] font-semibold text-lg">
                ✓ Merci pour votre inscription !
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Vous recevrez nos meilleures offres en avant-première.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Votre adresse e-mail..."
                className="flex-1 bg-white/10 border border-white/20 text-white placeholder-gray-500 px-6 py-4 text-sm focus:border-[#EED9C4] focus:bg-white/15 transition-all outline-none rounded-none"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="btn-primary bg-[#EED9C4] text-black px-8 py-4 text-sm font-bold tracking-widest hover:bg-white transition-all duration-300 disabled:opacity-60 whitespace-nowrap"
              >
                {loading ? "..." : "S'ABONNER"}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
