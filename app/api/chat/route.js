import { products, formatPrix } from "@/lib/products";
import { site } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// --- Construit le "cerveau" du Sommelier à partir de tes fichiers (toujours à jour) ---
function buildSystem() {
  const bieres = products
    .map((p) => `- ${p.nom} — ${p.style}, ${formatPrix(p.prix)} (${p.format}) : ${p.accroche}`)
    .join("\n");
  const horaires = site.contact.horaires.map((h) => `${h.jours} : ${h.heures}`).join(" ; ");

  return `Tu es « Le Sommelier », le conseiller virtuel de la ${site.nom}, une microbrasserie artisanale à ${site.contact.adresse.ville}, au cœur de la Brière (Loire-Atlantique).

TON RÔLE
Aider chaleureusement les visiteurs à choisir une bière parmi notre gamme, proposer des accords mets & bières, et répondre aux questions pratiques sur la brasserie.

STYLE
- Vouvoie toujours le visiteur. Ton chaleureux, convivial et artisanal, jamais guindé.
- Réponses COURTES et naturelles (2 à 4 phrases). Évite les longues listes.
- Quand tu recommandes, cite nos bières par leur nom.

RÈGLES IMPORTANTES
- Parle UNIQUEMENT de la ${site.nom}, de ses bières, d'accords mets & bières et des infos pratiques ci-dessous. Pour toute question hors sujet (météo, actualité, informatique, autres marques, devoirs scolaires, etc.), décline poliment et ramène gentiment la conversation vers nos bières.
- N'invente JAMAIS d'information. Si tu ignores quelque chose (une disponibilité, un événement, un prix non listé, un degré d'alcool), invite à contacter la brasserie (${site.contact.telephone} / ${site.contact.email}).
- Tu peux orienter vers le Click & Collect pour commander, ou vers la page « Espace pro » pour les cafés, bars et restaurants (fûts 20 L sur devis).
- Rappelle la modération avec tact quand c'est pertinent : ${site.legal.avertissement} ${site.legal.majeurs}
- Ne donne aucun conseil médical et ne dénigre aucune autre marque.

NOTRE GAMME (toutes en 33 cl)
${bieres}

FORMATS
Bouteille 33 cl à l'unité, pack de 6, carton panaché de 12, et fût 20 L réservé aux professionnels (sur devis).

INFOS PRATIQUES
- Adresse : ${site.contact.adresse.rue}, ${site.contact.adresse.codePostal} ${site.contact.adresse.ville}
- Horaires : ${horaires}. ${site.contact.horairesNote}
- Téléphone : ${site.contact.telephone} — Email : ${site.contact.email}
- Vente : Click & Collect (retrait sur place) ; certaines commandes peuvent être expédiées.
- Réseaux : Instagram et Facebook (@brasserie_brieronne).`;
}

export async function POST(req) {
  try {
    const body = await req.json();
    const messages = body?.messages;

    if (!Array.isArray(messages) || messages.length === 0) {
      return Response.json({ reply: "Je n'ai pas bien reçu votre message, pouvez-vous réessayer ?" });
    }

    // Garde-fou anti-abus : on limite la longueur de l'échange
    if (messages.length > 24) {
      return Response.json({
        reply:
          "Notre échange est déjà bien nourri ! Pour repartir sur de bonnes bases, rechargez la page — ou contactez-nous directement, on adore parler bière. 🍺",
      });
    }

    // On ne garde que des messages valides, tronqués pour éviter les abus
    const clean = messages
      .filter(
        (m) =>
          m &&
          (m.role === "user" || m.role === "assistant") &&
          typeof m.content === "string" &&
          m.content.trim().length > 0
      )
      .map((m) => ({ role: m.role, content: m.content.slice(0, 1000) }));

    // L'API attend un premier message "user"
    while (clean.length && clean[0].role === "assistant") clean.shift();
    if (clean.length === 0) {
      return Response.json({ reply: "Posez-moi votre question, je suis tout ouïe !" });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return Response.json({
        reply:
          "Le Sommelier est en cours d'installation et reviendra très vite ! En attendant, n'hésitez pas à nous écrire à " +
          site.contact.email +
          ".",
      });
    }

    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 400,
        system: buildSystem(),
        messages: clean,
      }),
    });

    if (!res.ok) {
      return Response.json({
        reply:
          "Oups, je n'ai pas réussi à répondre à l'instant. Réessayez dans un moment, ou contactez-nous directement au " +
          site.contact.telephone +
          ".",
      });
    }

    const data = await res.json();
    const reply =
      (data?.content || [])
        .map((b) => (b.type === "text" ? b.text : ""))
        .join("")
        .trim() || "Je n'ai pas de réponse pour le moment, désolé !";

    return Response.json({ reply });
  } catch (e) {
    return Response.json({
      reply: "Une petite erreur est survenue de mon côté. Réessayez, ou écrivez-nous directement — on se fera un plaisir de vous répondre.",
    });
  }
}
