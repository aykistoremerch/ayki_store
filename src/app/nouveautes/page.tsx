import type { Metadata } from "next";
import CategoryPage from "@/components/CategoryPage";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Nouveautés – AYKI",
  description:
    "Découvrez les dernières nouveautés AYKI. Les nouvelles collections pour homme et femme, disponibles maintenant.",
};

export default function NouveautesPage() {
  return (
    <CategoryPage
      category="femme"
      title="NOUVEAUTÉS"
      subtitle="Les dernières tendances · Homme & Femme"
      subcategories={["t-shirts", "shorts", "robes", "pyjamas"]}
      products={products}
      heroImage="https://images.pexels.com/photos/9565839/pexels-photo-9565839.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=1400"
    />
  );
}
