import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-[#EED9C4] text-8xl font-black mb-4">404</p>
        <h1 className="text-3xl font-black text-black mb-4">
          Page introuvable
        </h1>
        <p className="text-gray-500 mb-8 max-w-sm mx-auto text-sm leading-relaxed">
          La page que vous recherchez n&apos;existe pas ou a été déplacée.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-3 bg-black text-white px-8 py-4 text-sm font-bold tracking-widest hover:bg-gray-800 transition-colors"
        >
          <ArrowLeft size={16} />
          Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  );
}
