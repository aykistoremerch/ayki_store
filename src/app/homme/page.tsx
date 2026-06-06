import type { Metadata } from "next";
import CategoryPage from "@/components/CategoryPage";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Collection Homme – AYKI",
  description:
    "Découvrez la collection homme AYKI : t-shirts premium, shorts modernes et bien plus. Style, confort et élégance au quotidien.",
};

const hommeProducts = products.filter((p) => p.category === "homme");

export default function HommePage() {
  return (
    <CategoryPage
      category="homme"
      title="HOMME"
      subtitle="T-shirts · Shorts · Style contemporain"
      subcategories={["t-shirts", "shorts"]}
      products={hommeProducts}
      heroImage="https://images.pexels.com/photos/14668123/pexels-photo-14668123.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=1400"
    />
  );
}
