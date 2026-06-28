import Stripe from "stripe";
import { NextResponse } from "next/server";

// Route serveur : crée une session de paiement Stripe Checkout.
// La clé secrète est lue dans les variables d'environnement Vercel,
// jamais dans le code (STRIPE_SECRET_KEY).

export async function POST(req) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    return NextResponse.json(
      { error: "Le paiement en ligne n'est pas encore activé." },
      { status: 503 }
    );
  }

  const stripe = new Stripe(key);

  try {
    const { items, fulfilment } = await req.json();
    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Panier vide." }, { status: 400 });
    }

    const line_items = items.map((l) => ({
      price_data: {
        currency: "eur",
        product_data: {
          name: String(l.nom || "Article"),
          ...(l.meta ? { description: String(l.meta) } : {}),
        },
        unit_amount: Math.round(Number(l.prixUnit) * 100),
      },
      quantity: Math.max(1, parseInt(l.qty, 10) || 1),
    }));

    // Frais d'expédition (forfait) si livraison postale
    if (fulfilment === "expedition") {
      line_items.push({
        price_data: {
          currency: "eur",
          product_data: { name: "Frais d'expédition" },
          unit_amount: 500,
        },
        quantity: 1,
      });
    }

    const origin = req.headers.get("origin") || new URL(req.url).origin;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      locale: "fr",
      phone_number_collection: { enabled: true },
      ...(fulfilment === "expedition"
        ? { shipping_address_collection: { allowed_countries: ["FR"] } }
        : {}),
      success_url: `${origin}/commande/succes`,
      cancel_url: `${origin}/click-and-collect`,
      metadata: { recuperation: fulfilment || "retrait" },
    });

    return NextResponse.json({ url: session.url });
  } catch (e) {
    return NextResponse.json(
      { error: e?.message || "Erreur lors de la création du paiement." },
      { status: 500 }
    );
  }
}
