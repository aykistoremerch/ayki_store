import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "AYKI – Le style au quotidien, pour elle et pour lui",
  description:
    "AYKI est une marque de mode premium proposant des vêtements élégants et modernes pour hommes et femmes. Découvrez nos collections de t-shirts, shorts, robes et pyjamas.",
  keywords: "AYKI, mode, vêtements, homme, femme, fashion, tunisie, élégance",
  openGraph: {
    title: "AYKI – Le style au quotidien",
    description: "Mode premium pour elle et pour lui",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body className="bg-white text-gray-900 antialiased font-sans">
        <Header />
        <main className="pt-[72px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
