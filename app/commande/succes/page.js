"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";

export default function CommandeSuccesPage() {
  const { clear } = useCart();

  // Le paiement a réussi : on vide le panier.
  useEffect(() => {
    clear();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="order-done section-pad">
      <div className="wrap">
        <div className="order-done-ic">✓</div>
        <h1>Merci pour votre commande !</h1>
        <p>
          Votre paiement a bien été reçu et un e-mail de confirmation vous a été envoyé. Nous
          préparons votre commande — vous serez prévenu dès qu'elle sera prête à être retirée (ou
          expédiée).
        </p>
        <Link href="/" className="btn btn-or">
          Retour à l'accueil
        </Link>
      </div>
    </section>
  );
}
