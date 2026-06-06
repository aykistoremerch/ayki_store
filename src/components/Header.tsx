"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingBag, User, Menu, X, Search } from "lucide-react";
import { useCartStore } from "@/store/cart";
import CartDrawer from "./CartDrawer";

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/homme", label: "Homme" },
  { href: "/femme", label: "Femme" },
  { href: "/nouveautes", label: "Nouveautés" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { getTotalItems, openCart } = useCartStore();
  const totalItems = getTotalItems();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white shadow-md py-3"
            : "bg-white/95 backdrop-blur-sm py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="text-2xl font-black tracking-[0.2em] text-black hover:opacity-80 transition-opacity"
            >
              AYKI
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-gray-700 hover:text-black tracking-wider uppercase transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </nav>

            {/* Icons */}
            <div className="flex items-center gap-4">
              <button className="hidden md:flex p-2 text-gray-700 hover:text-black transition-colors">
                <Search size={20} />
              </button>
              <button className="p-2 text-gray-700 hover:text-black transition-colors">
                <User size={20} />
              </button>
              <button
                onClick={openCart}
                className="relative p-2 text-gray-700 hover:text-black transition-colors"
                aria-label="Panier"
              >
                <ShoppingBag size={20} />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-black text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {totalItems > 9 ? "9+" : totalItems}
                  </span>
                )}
              </button>
              <button
                className="lg:hidden p-2 text-gray-700 hover:text-black transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Menu"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileOpen && (
            <div className="mobile-menu lg:hidden mt-4 pb-4 border-t border-gray-100">
              <nav className="flex flex-col gap-1 pt-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm font-medium text-gray-700 hover:text-black hover:bg-[#EED9C4]/30 px-4 py-3 rounded-lg tracking-wider uppercase transition-all"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>

      <CartDrawer />
    </>
  );
}
