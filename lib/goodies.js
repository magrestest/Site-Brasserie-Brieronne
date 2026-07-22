// =====================================================================
//  GOODIES — source de vérité de la boutique d'accessoires.
//  Modifie ici les produits, prix, tailles. Les prix marqués
//  "provisoire: true" affichent une mention tant qu'ils ne sont pas figés.
// =====================================================================

export const goodies = [
  {
    id: "casquette",
    nom: "Casquette",
    desc: "Taille réglable, logo imprimé.",
    prix: 5,
    icon: "cap",
    image: "/goodies/casquette.jpg",
  },
  {
    id: "tshirt",
    nom: "T-shirt",
    desc: "Coton, logo imprimé sur la poitrine.",
    prix: 5,
    icon: "tshirt",
    image: "/goodies/tshirt.jpg",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "sweat",
    nom: "Sweat à capuche",
    desc: "Molletonné, logo imprimé.",
    prix: 20,
    icon: "hoodie",
    sizes: ["S", "M", "L", "XL"],
    provisoire: true,
  },
  {
    id: "decapsuleur",
    nom: "Décapsuleur",
    desc: "Ouvre-bouteille aux couleurs de la brasserie.",
    prix: 2,
    icon: "opener",
    image: "/goodies/decapsuleur.jpg",
  },
  {
    id: "verre",
    nom: "Verre sérigraphié",
    desc: "Le verre à l'effigie de la Briéronne.",
    prix: 4,
    icon: "glass",
    image: "/goodies/verre.jpg",
    provisoire: true,
  },
  {
    id: "sousbock",
    nom: "Dessous de verre",
    desc: "Sous-bock cartonné, vendu à l'unité.",
    prix: 2,
    icon: "coaster",
    image: "/goodies/sousbock.jpg",
  },
  {
    id: "tote",
    nom: "Tote bag",
    desc: "Sac en toile, logo imprimé.",
    prix: 6,
    icon: "tote",
    provisoire: true,
  },
];

// Frais d'expédition (forfait provisoire, à confirmer)
export const FRAIS_PORT = 5;

export const formatPrix = (n) =>
  n.toLocaleString("fr-FR", { style: "currency", currency: "EUR" });
