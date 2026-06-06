import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "À propos d'AYKI – Notre histoire",
  description:
    "Découvrez l'histoire de la marque AYKI, dédiée à la mode moderne et élégante pour hommes et femmes en Tunisie.",
};

const values = [
  {
    emoji: "✨",
    title: "Élégance",
    desc: "Chaque pièce est conçue avec un souci du détail et une esthétique raffinée pour sublimer votre quotidien.",
  },
  {
    emoji: "🌿",
    title: "Qualité",
    desc: "Nous sélectionnons des matières premium, durables et respectueuses pour garantir votre confort.",
  },
  {
    emoji: "🤝",
    title: "Accessibilité",
    desc: "Le luxe ne devrait pas être réservé à quelques-uns. Chez AYKI, le style premium est accessible à tous.",
  },
  {
    emoji: "💚",
    title: "Engagement",
    desc: "Nous nous engageons à offrir une expérience d'achat irréprochable, du choix jusqu'à la livraison.",
  },
];

const team = [
  {
    name: "Karim Ayadi",
    role: "Fondateur & Directeur Créatif",
    image: "https://images.pexels.com/photos/15870282/pexels-photo-15870282.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=400",
  },
  {
    name: "Yasmine Ben Salem",
    role: "Directrice de la Mode",
    image: "https://images.pexels.com/photos/29119306/pexels-photo-29119306.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=400",
  },
  {
    name: "Sofiane Mhiri",
    role: "Responsable Qualité",
    image: "https://images.pexels.com/photos/14668123/pexels-photo-14668123.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=400",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-72 sm:h-96 overflow-hidden">
        <Image
          src="https://images.pexels.com/photos/9565839/pexels-photo-9565839.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=1400"
          alt="À propos d'AYKI"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <p className="text-[#EED9C4] text-xs font-bold tracking-[0.4em] uppercase mb-3">
            Notre histoire
          </p>
          <h1 className="text-5xl sm:text-6xl font-black text-white">À propos</h1>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-bold tracking-[0.3em] uppercase text-gray-400 mb-4">
                Notre Mission
              </p>
              <h2 className="text-4xl sm:text-5xl font-black text-black mb-6 leading-tight">
                À propos<br />
                <span className="text-[#b09a82]">d&apos;AYKI</span>
              </h2>
              <p className="text-gray-600 text-base leading-relaxed mb-6">
                <strong>AYKI</strong> est une marque dédiée à la mode moderne, proposant des vêtements élégants
                et confortables pour hommes et femmes. Née d&apos;une passion pour le style et l&apos;élégance,
                AYKI s&apos;inspire des plus grandes maisons de mode internationale pour créer des collections
                accessibles et tendance.
              </p>
              <p className="text-gray-600 text-base leading-relaxed mb-6">
                Fondée avec la conviction que chaque personne mérite de se sentir belle et confiante au
                quotidien, notre marque propose une sélection soigneuse de vêtements de qualité premium,
                alliant esthétique moderne et confort exceptionnel.
              </p>
              <p className="text-gray-600 text-base leading-relaxed mb-8">
                Le style au quotidien, pour elle et pour lui — c&apos;est bien plus qu&apos;un slogan,
                c&apos;est notre promesse.
              </p>
              <Link
                href="/nouveautes"
                className="inline-flex items-center gap-3 bg-black text-white px-8 py-4 text-sm font-bold tracking-widest hover:bg-gray-800 transition-colors group"
              >
                Découvrir nos collections
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden">
                <Image
                  src="https://images.pexels.com/photos/9198314/pexels-photo-9198314.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=640"
                  alt="AYKI Story"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-[#EED9C4] rounded-2xl p-6 shadow-xl">
                <p className="text-3xl font-black text-black">2026</p>
                <p className="text-sm text-gray-600 font-medium">Fondée en</p>
              </div>
              <div className="absolute -top-4 -right-4 bg-black rounded-2xl p-4 shadow-xl">
                <p className="text-2xl font-black text-white">500+</p>
                <p className="text-xs text-gray-300">clients satisfaits</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-[#faf9f7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-gray-400 mb-3">
              Ce qui nous définit
            </p>
            <h2 className="text-4xl sm:text-5xl font-black text-black">
              Nos valeurs
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div
                key={v.title}
                className="bg-white rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-transparent hover:border-[#EED9C4]"
              >
                <div className="text-5xl mb-5">{v.emoji}</div>
                <h3 className="text-lg font-black text-black mb-3">{v.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-gray-400 mb-3">
              Les personnes derrière AYKI
            </p>
            <h2 className="text-4xl sm:text-5xl font-black text-black">
              Notre équipe
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map((member) => (
              <div key={member.name} className="text-center group">
                <div className="relative w-48 h-56 mx-auto mb-5 rounded-2xl overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-lg font-black text-black">{member.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "500+", label: "Clients satisfaits" },
              { number: "12+", label: "Produits premium" },
              { number: "4", label: "Catégories" },
              { number: "24h", label: "Livraison rapide" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-4xl sm:text-5xl font-black text-[#EED9C4] mb-2">
                  {stat.number}
                </p>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#EED9C4]/20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-black text-black mb-5">
            Prêt à découvrir AYKI ?
          </h2>
          <p className="text-gray-600 mb-8 text-base">
            Explorez nos collections et trouvez les pièces qui vous correspondent.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/homme"
              className="bg-black text-white px-8 py-4 text-sm font-bold tracking-widest hover:bg-gray-800 transition-colors"
            >
              Collection Homme
            </Link>
            <Link
              href="/femme"
              className="bg-white border-2 border-black text-black px-8 py-4 text-sm font-bold tracking-widest hover:bg-gray-50 transition-colors"
            >
              Collection Femme
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
