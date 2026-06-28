// =============================================================
//  CONFIG CENTRALISÉE DU SITE — source de vérité unique
//  Modifie ici : coordonnées, navigation, textes globaux, toggles.
//  Aucune autre page ne doit coder ces valeurs en dur.
// =============================================================

export const site = {
  nom: "Brasserie Briéronne",
  baseline: "Saint-Joachim · Brière",
  slogan: "Six bières brassées avec passion, au cœur des marais de Brière.",
  description:
    "Microbrasserie artisanale au cœur du Parc naturel régional de Brière. " +
    "Bières brassées, embouteillées et étiquetées sur place, à Saint-Joachim.",

  // --- Coordonnées ---
  contact: {
    telephone: "06 78 10 68 77",
    telephoneLien: "tel:0678106877",
    email: "brasserie.brieronne@gmail.com",
    emailLien: "mailto:brasserie.brieronne@gmail.com",
    adresse: {
      rue: "138 rue Joliot Curie",
      codePostal: "44720",
      ville: "Saint-Joachim",
      pays: "France",
    },
    // Horaires d'ouverture (modifier librement)
    horaires: [
      { jours: "Mercredi – Samedi", heures: "10h – 12h" },
      { jours: "Mercredi – Vendredi", heures: "15h30 – 19h" },
    ],
    horairesNote:
      "Horaires d'été élargis de juin à mi-septembre (voir nos réseaux). " +
      "Retrait possible sur rendez-vous en dehors de ces créneaux.",
  },

  // --- Réseaux sociaux (laisser vide pour masquer le lien) ---
  reseaux: {
    instagram: "https://www.instagram.com/brasserie_brieronne",
    facebook: "https://www.facebook.com/BrasserieBrieronne",
  },

  // --- Navigation principale ---
  nav: [
    { label: "Nos bières", href: "/nos-bieres" },
    { label: "La brasserie", href: "/la-brasserie" },
    { label: "Click & Collect", href: "/click-and-collect" },
    { label: "Goodies", href: "/goodies" },
    { label: "Événements", href: "/evenements" },
    { label: "Contact", href: "/contact" },
  ],

  // --- Interrupteurs de fonctionnalités ---
  features: {
    boutiqueEnLigne: false,   // panier + Stripe (étape D)
    messagerieClient: false,  // messagerie persistante (étape E)
    assistantIA: false,       // assistant bière / SAV (étape E)
  },

  // --- Mentions légales ---
  legal: {
    avertissement:
      "L'abus d'alcool est dangereux pour la santé. À consommer avec modération.",
    majeurs: "Vente réservée aux personnes majeures.",
    annee: 2026,
  },
};

// Helpers pratiques
export const adresseLigne = `${site.contact.adresse.rue}, ${site.contact.adresse.codePostal} ${site.contact.adresse.ville}`;

export default site;
