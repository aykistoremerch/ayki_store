import type { Metadata } from "next";
import CategoryPage from "@/components/CategoryPage";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Collection Femme – AYKI",
  description:
    "Découvrez la collection femme AYKI : robes élégantes, pyjamas luxueux et bien plus. Mode féminine moderne et raffinée.",
};

const femmeProducts = products.filter((p) => p.category === "femme");

export default function FemmePage() {
  return (
    <CategoryPage
      category="femme"
      title="FEMME"
      subtitle="Robes · Pyjamas · Élégance au quotidien"
      subcategories={["robes", "pyjamas"]}
      products={femmeProducts}
      heroImage="https://images.pexels.com/photos/19619169/pexels-photo-19619169.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=1400"
    />
  );
}
