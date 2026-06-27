// =============================================================
//  CATALOGUE DES BIÈRES — source de vérité unique
//  Toutes les pages (home, catalogue, fiche, panier) lisent ici.
//  Pour ajouter/modifier une bière : éditer ce fichier uniquement.
//
//  Champs :
//    slug        identifiant URL (/nos-bieres/[slug])
//    numero      chiffre romain de la cuvée (I à VI)
//    nom         nom commercial
//    style       style brassicole (affiché en sous-titre)
//    capsule     dégradé de la capsule réelle [clair, foncé]
//    abv         degré d'alcool en % (à compléter)
//    format      contenance
//    prix        prix unitaire en euros
//    accroche    phrase courte officielle (cartes, home, exergue fiche)
//    description texte de la fiche produit
//    image       photo de la bouteille dans /public
// =============================================================

export const products = [
  {
    slug: "la-cabane-bleue",
    numero: "I",
    nom: "La Cabane Bleue",
    style: "Blonde",
    capsule: ["#5b8fd6", "#1f4f9c"],
    abv: null,
    format: "33 cl",
    prix: 3.0,
    accroche: "Blonde et équilibrée, aux notes de malt caramélisé et de biscuits.",
    description:
      "Notre blonde de tous les jours, équilibrée et maltée, sur des notes de biscuit. " +
      "La bière qui met tout le monde d'accord.",
    image: "/bieres/la-cabane-bleue.jpg",
  },
  {
    slug: "la-chaumiere",
    numero: "II",
    nom: "La Chaumière",
    style: "Blanche",
    capsule: ["#ffffff", "#d8d2c4"],
    abv: null,
    format: "33 cl",
    prix: 3.0,
    accroche: "Fraîche et légère, aux arômes d'agrumes et d'épices.",
    description:
      "Une blanche sur le froment, légèrement voilée. Fraîche et légère, sur l'agrume " +
      "et une pointe d'épices, parfaite aux beaux jours.",
    image: "/bieres/la-chaumiere.jpg",
  },
  {
    slug: "la-morta",
    numero: "III",
    nom: "La Morta",
    style: "Brune",
    capsule: ["#4a4a4a", "#161616"],
    abv: null,
    format: "33 cl",
    prix: 3.0,
    accroche: "Riche et gourmande, aux notes de caramel, de chocolat et de café.",
    description:
      "Notre brune de caractère, baptisée d'après le chêne fossile des tourbières de " +
      "Brière. Riche et gourmande, sur le caramel, le chocolat et le café.",
    image: "/bieres/la-morta.jpg",
  },
  {
    slug: "la-chalandiere",
    numero: "IV",
    nom: "La Chalandière",
    style: "Blé noir",
    capsule: ["#d2554f", "#9c1f1f"],
    abv: null,
    format: "33 cl",
    prix: 3.0,
    accroche: "Légère et désaltérante, avec un goût subtil de sarrasin.",
    description:
      "Un clin d'œil au pays : le blé noir breton invité dans la cuve. Légère et " +
      "désaltérante, avec un goût subtil de sarrasin.",
    image: "/bieres/la-chalandiere.jpg",
  },
  {
    slug: "la-tourbiere",
    numero: "V",
    nom: "La Tourbière",
    style: "IPA",
    capsule: ["#f2cf52", "#c69a1f"],
    abv: null,
    format: "33 cl",
    prix: 3.5,
    accroche: "Intense et houblonnée, aux arômes fruités et floraux.",
    description:
      "Notre IPA, généreusement houblonnée. Intense et aromatique, sur des notes " +
      "fruitées et florales, avec une amertume franche.",
    image: "/bieres/la-tourbiere.jpg",
  },
  {
    slug: "la-chanvriere",
    numero: "VI",
    nom: "La Chanvrière",
    style: "Au CBD",
    capsule: ["#6db35a", "#2f7d2f"],
    abv: null,
    format: "33 cl",
    prix: 3.5,
    accroche: "Douce et relaxante, au chanvre naturel.",
    description:
      "La singulière de la gamme, infusée au chanvre (CBD). Douce et relaxante, au " +
      "chanvre naturel, sans psychotropie. Une curiosité à découvrir.",
    image: "/bieres/la-chanvriere.jpg",
  },
];

// Helpers
export const getProductBySlug = (slug) =>
  products.find((p) => p.slug === slug);

export const formatPrix = (prix) =>
  prix.toLocaleString("fr-FR", { style: "currency", currency: "EUR" });

export default products;
