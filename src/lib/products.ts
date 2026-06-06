export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: "homme" | "femme";
  subcategory: string;
  imageUrl: string;
  images: string[];
  sizes: string[];
  colors: string[];
  isNew: boolean;
  inStock: boolean;
}

export const products: Product[] = [
  // HOMME - T-Shirts
   {
    id: 13,
    name: "Robe Blanche Fleuri",
    description:
      "Robe blanche fleurie au style délicat et élégant. Tissu léger et fluide, parfaite pour les journées ensoleillées et les sorties. Coupe flatteuse et finitions soignées.",
    price: 74.9,
    category: "femme",
    subcategory: "robes",
    imageUrl: "/images/ChatGPT Image 6 juin 2026, 19_19_06.png",
    images: [
      "/images/ChatGPT Image 6 juin 2026, 19_19_06.png",
      "/images/ChatGPT Image 6 juin 2026, 19_19_14.png",
      "/images/ChatGPT Image 6 juin 2026, 19_21_59.png",
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Blanc"],
    isNew: true,
    inStock: true,
  },
  {
    id: 1,
    name: "T-Shirt Essentiel Blanc",
    description: "Un t-shirt intemporel en coton premium 100%. Coupe moderne et confortable, parfait pour toutes les occasions. Tissu respirant et durable qui garde sa forme après de nombreux lavages.",
    price: 39.90,
    category: "homme",
    subcategory: "t-shirts",
    imageUrl: "https://images.pexels.com/photos/6311251/pexels-photo-6311251.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    images: [
      "https://images.pexels.com/photos/6311251/pexels-photo-6311251.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
      "https://images.pexels.com/photos/15870282/pexels-photo-15870282.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Blanc", "Noir", "Beige"],
    isNew: true,
    inStock: true,
  },
  {
    id: 2,
    name: "T-Shirt Premium Col V",
    description: "T-shirt col V en coton pima de qualité supérieure. Coupe ajustée pour une silhouette élégante. Idéal pour une tenue décontractée chic.",
    price: 44.90,
    category: "homme",
    subcategory: "t-shirts",
    imageUrl: "https://images.pexels.com/photos/15870282/pexels-photo-15870282.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    images: [
      "https://images.pexels.com/photos/15870282/pexels-photo-15870282.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
      "https://images.pexels.com/photos/6311251/pexels-photo-6311251.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Blanc", "Gris", "Marine"],
    isNew: true,
    inStock: true,
  },
  {
    id: 3,
    name: "T-Shirt Oversize Minimal",
    description: "T-shirt oversize tendance en jersey doux. Coupe décontractée pour un style urbain moderne. Parfait avec un jean slim ou un short.",
    price: 49.90,
    category: "homme",
    subcategory: "t-shirts",
    imageUrl: "https://images.pexels.com/photos/14668123/pexels-photo-14668123.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    images: [
      "https://images.pexels.com/photos/14668123/pexels-photo-14668123.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Beige", "Blanc", "Noir"],
    isNew: false,
    inStock: true,
  },
  // HOMME - Shorts
  {
    id: 4,
    name: "Short Cargo Élite",
    description: "Short cargo moderne en coton sergé résistant. Multiples poches fonctionnelles avec fermetures à glissière. Style militaire revisité pour un look tendance.",
    price: 59.90,
    category: "homme",
    subcategory: "shorts",
    imageUrl: "https://images.pexels.com/photos/20440141/pexels-photo-20440141.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    images: [
      "https://images.pexels.com/photos/20440141/pexels-photo-20440141.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Kaki", "Noir", "Beige"],
    isNew: true,
    inStock: true,
  },
  {
    id: 5,
    name: "Short Chino Premium",
    description: "Short chino en coton stretch confortable. Coupe droite classique avec ceinture élastiquée. Parfait pour les journées chaudes en ville ou à la plage.",
    price: 54.90,
    category: "homme",
    subcategory: "shorts",
    imageUrl: "https://images.pexels.com/photos/15766142/pexels-photo-15766142.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    images: [
      "https://images.pexels.com/photos/15766142/pexels-photo-15766142.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Beige", "Blanc", "Marine"],
    isNew: false,
    inStock: true,
  },
  {
    id: 6,
    name: "Short Sport Tech",
    description: "Short sportswear en tissu technique respirant. Idéal pour le sport et les activités en plein air. Séchage rapide et grande liberté de mouvement.",
    price: 49.90,
    category: "homme",
    subcategory: "shorts",
    imageUrl: "https://images.pexels.com/photos/15870230/pexels-photo-15870230.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    images: [
      "https://images.pexels.com/photos/15870230/pexels-photo-15870230.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Noir", "Gris", "Marine"],
    isNew: false,
    inStock: true,
  },
  // FEMME - Robes
  {
    id: 7,
    name: "Robe Midi Élégante",
    description: "Robe midi en viscose fluide de qualité supérieure. Coupe en A flatteuse pour toutes les morphologies. Parfaite pour le bureau comme pour les sorties.",
    price: 79.90,
    category: "femme",
    subcategory: "robes",
    imageUrl: "https://images.pexels.com/photos/17071184/pexels-photo-17071184.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    images: [
      "https://images.pexels.com/photos/17071184/pexels-photo-17071184.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
      "https://images.pexels.com/photos/17071210/pexels-photo-17071210.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Jaune", "Beige", "Blanc"],
    isNew: true,
    inStock: true,
  },
  {
    id: 8,
    name: "Robe Wrap Chic",
    description: "Robe wrap en crêpe légère avec ceinture assortie. Style intemporel et sophistiqué. Le nœud ajustable permet de moduler la silhouette à votre guise.",
    price: 89.90,
    category: "femme",
    subcategory: "robes",
    imageUrl: "https://images.pexels.com/photos/17071210/pexels-photo-17071210.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    images: [
      "https://images.pexels.com/photos/17071210/pexels-photo-17071210.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
      "https://images.pexels.com/photos/17071184/pexels-photo-17071184.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Beige", "Noir", "Terracotta"],
    isNew: true,
    inStock: true,
  },
 
  {
    id: 9,
    name: "Robe Maxi Bohème",
    description: "Robe maxi longue en coton léger imprimé. Style bohème chic pour l'été. Bretelles fines réglables pour un confort optimal.",
    price: 94.90,
    category: "femme",
    subcategory: "robes",
    imageUrl: "https://images.pexels.com/photos/29119306/pexels-photo-29119306.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    images: [
      "https://images.pexels.com/photos/29119306/pexels-photo-29119306.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Multicolore", "Blanc", "Beige"],
    isNew: false,
    inStock: true,
  },
  // FEMME - Pyjamas
  {
    id: 10,
    name: "Pyjama Satin Luxe",
    description: "Ensemble pyjama en satin de soie douce et luxueuse. Haut avec boutons nacrés et pantalon ample. Le confort du luxe pour vos nuits.",
    price: 99.90,
    category: "femme",
    subcategory: "pyjamas",
    imageUrl: "https://images.pexels.com/photos/30590661/pexels-photo-30590661.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    images: [
      "https://images.pexels.com/photos/30590661/pexels-photo-30590661.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Blanc", "Rose poudré", "Beige"],
    isNew: true,
    inStock: true,
  },
  {
    id: 11,
    name: "Pyjama Coton Doux",
    description: "Ensemble pyjama en coton 100% biologique. Confort naturel pour un sommeil réparateur. Coupe ample et décontractée avec élastique à la taille.",
    price: 74.90,
    category: "femme",
    subcategory: "pyjamas",
    imageUrl: "https://images.pexels.com/photos/28698706/pexels-photo-28698706.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    images: [
      "https://images.pexels.com/photos/28698706/pexels-photo-28698706.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Bleu ciel", "Blanc", "Lavande"],
    isNew: false,
    inStock: true,
  },
  {
    id: 12,
    name: "Pyjama Chemise Élégant",
    description: "Pyjama style chemise en viscose premium. Tissu fluide et doux contre la peau. Parfait pour le confort à la maison avec style.",
    price: 84.90,
    category: "femme",
    subcategory: "pyjamas",
    imageUrl: "https://images.pexels.com/photos/19619169/pexels-photo-19619169.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    images: [
      "https://images.pexels.com/photos/19619169/pexels-photo-19619169.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Beige", "Blanc cassé", "Moka"],
    isNew: true,
    inStock: true,
  },
];

export const getProductById = (id: number) =>
  products.find((p) => p.id === id);

export const getProductsByCategory = (category: "homme" | "femme") =>
  products.filter((p) => p.category === category);

export const getProductsBySubcategory = (
  category: "homme" | "femme",
  subcategory: string
) => products.filter((p) => p.category === category && p.subcategory === subcategory);

export const getNewProducts = () => products.filter((p) => p.isNew);
