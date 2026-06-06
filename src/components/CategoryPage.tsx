"use client";

import { useState, useMemo } from "react";
import { SlidersHorizontal, X, ChevronDown } from "lucide-react";
import ProductCard from "./ProductCard";
import type { Product } from "@/lib/products";

interface CategoryPageProps {
  category: "homme" | "femme";
  title: string;
  subtitle: string;
  subcategories: string[];
  products: Product[];
  heroImage: string;
}

const allSizes = ["S", "M", "L", "XL"];
const allColors = {
  homme: ["Blanc", "Noir", "Beige", "Gris", "Marine", "Kaki"],
  femme: ["Blanc", "Noir", "Beige", "Rose poudré", "Jaune", "Bleu ciel", "Terracotta", "Lavande"],
};

export default function CategoryPage({
  category,
  title,
  subtitle,
  subcategories,
  products,
  heroImage,
}: CategoryPageProps) {
  const [activeSubcategory, setActiveSubcategory] = useState<string>("all");
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [sortBy, setSortBy] = useState("default");
  const [filterOpen, setFilterOpen] = useState(false);

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const toggleColor = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const filtered = useMemo(() => {
    let result = products.filter((p) => {
      if (activeSubcategory !== "all" && p.subcategory !== activeSubcategory) return false;
      if (selectedSizes.length > 0 && !selectedSizes.some((s) => p.sizes.includes(s))) return false;
      if (selectedColors.length > 0 && !selectedColors.some((c) => p.colors.includes(c))) return false;
      if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
      return true;
    });

    if (sortBy === "price-asc") result = [...result].sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") result = [...result].sort((a, b) => b.price - a.price);
    if (sortBy === "new") result = [...result].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));

    return result;
  }, [products, activeSubcategory, selectedSizes, selectedColors, priceRange, sortBy]);

  const hasActiveFilters =
    selectedSizes.length > 0 || selectedColors.length > 0 || priceRange[1] < 200;

  const clearFilters = () => {
    setSelectedSizes([]);
    setSelectedColors([]);
    setPriceRange([0, 200]);
  };

  return (
    <>
      {/* Hero Banner */}
      <section className="relative h-64 sm:h-80 overflow-hidden">
        <img
          src={heroImage}
          alt={title}
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <p className="text-[#EED9C4] text-xs font-bold tracking-[0.4em] uppercase mb-3">
            Collection 2026
          </p>
          <h1 className="text-5xl sm:text-6xl font-black text-white">{title}</h1>
          <p className="text-white/70 mt-3 text-sm">{subtitle}</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Subcategory Tabs */}
        <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveSubcategory("all")}
            className={`whitespace-nowrap px-6 py-2.5 text-sm font-semibold tracking-wider rounded-full transition-all duration-200 ${
              activeSubcategory === "all"
                ? "bg-black text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Tout ({products.length})
          </button>
          {subcategories.map((sub) => {
            const count = products.filter((p) => p.subcategory === sub).length;
            return (
              <button
                key={sub}
                onClick={() => setActiveSubcategory(sub)}
                className={`whitespace-nowrap px-6 py-2.5 text-sm font-semibold tracking-wider rounded-full capitalize transition-all duration-200 ${
                  activeSubcategory === sub
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {sub} ({count})
              </button>
            );
          })}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Sidebar (Desktop) */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-base font-bold">Filtres</h2>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-xs text-gray-400 hover:text-black flex items-center gap-1"
                  >
                    <X size={12} /> Effacer
                  </button>
                )}
              </div>

              {/* Size Filter */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold mb-4 uppercase tracking-wider">
                  Taille
                </h3>
                <div className="flex flex-wrap gap-2">
                  {allSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => toggleSize(size)}
                      className={`w-12 h-12 text-sm font-medium border-2 transition-all duration-200 ${
                        selectedSizes.includes(size)
                          ? "border-black bg-black text-white"
                          : "border-gray-200 text-gray-700 hover:border-gray-400"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold mb-4 uppercase tracking-wider">
                  Prix
                </h3>
                <div className="px-1">
                  <input
                    type="range"
                    min={0}
                    max={200}
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                    className="w-full accent-black cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>0 DT</span>
                    <span className="font-semibold text-black">
                      {priceRange[1]} DT
                    </span>
                  </div>
                </div>
              </div>

              {/* Color Filter */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold mb-4 uppercase tracking-wider">
                  Couleur
                </h3>
                <div className="flex flex-col gap-2">
                  {allColors[category].map((color) => (
                    <label key={color} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedColors.includes(color)}
                        onChange={() => toggleColor(color)}
                        className="filter-checkbox w-4 h-4 rounded"
                      />
                      <span className="text-sm text-gray-600 group-hover:text-black transition-colors">
                        {color}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-500">
                <span className="font-bold text-black">{filtered.length}</span> produit{filtered.length !== 1 ? "s" : ""}
              </p>
              <div className="flex items-center gap-3">
                {/* Mobile Filter Button */}
                <button
                  className="lg:hidden flex items-center gap-2 border border-gray-300 px-4 py-2 text-sm font-medium rounded-full hover:bg-gray-50 transition-colors"
                  onClick={() => setFilterOpen(true)}
                >
                  <SlidersHorizontal size={16} />
                  Filtres
                  {hasActiveFilters && (
                    <span className="bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      !
                    </span>
                  )}
                </button>
                {/* Sort */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none border border-gray-300 px-4 py-2 pr-8 text-sm font-medium rounded-full hover:bg-gray-50 cursor-pointer focus:outline-none focus:border-black bg-white"
                  >
                    <option value="default">Trier par</option>
                    <option value="new">Nouveautés</option>
                    <option value="price-asc">Prix croissant</option>
                    <option value="price-desc">Prix décroissant</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500" />
                </div>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-400 text-lg mb-4">Aucun produit trouvé</p>
                <button onClick={clearFilters} className="text-sm underline text-gray-600 hover:text-black">
                  Effacer les filtres
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {filterOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-50"
            onClick={() => setFilterOpen(false)}
          />
          <div className="fixed bottom-0 left-0 right-0 bg-white z-50 rounded-t-3xl p-6 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold">Filtres</h2>
              <button onClick={() => setFilterOpen(false)}>
                <X size={22} />
              </button>
            </div>

            {/* Size */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold mb-4 uppercase tracking-wider">Taille</h3>
              <div className="flex flex-wrap gap-3">
                {allSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => toggleSize(size)}
                    className={`w-14 h-14 text-sm font-medium border-2 transition-all ${
                      selectedSizes.includes(size)
                        ? "border-black bg-black text-white"
                        : "border-gray-200 text-gray-700"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold mb-4 uppercase tracking-wider">Prix max: {priceRange[1]} DT</h3>
              <input
                type="range"
                min={0}
                max={200}
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                className="w-full accent-black"
              />
            </div>

            {/* Colors */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold mb-4 uppercase tracking-wider">Couleur</h3>
              <div className="grid grid-cols-2 gap-2">
                {allColors[category].map((color) => (
                  <label key={color} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedColors.includes(color)}
                      onChange={() => toggleColor(color)}
                      className="filter-checkbox w-4 h-4"
                    />
                    <span className="text-sm text-gray-600">{color}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={clearFilters}
                className="flex-1 border border-gray-300 py-4 text-sm font-semibold"
              >
                Effacer
              </button>
              <button
                onClick={() => setFilterOpen(false)}
                className="flex-1 bg-black text-white py-4 text-sm font-semibold"
              >
                Voir {filtered.length} résultat{filtered.length !== 1 ? "s" : ""}
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
