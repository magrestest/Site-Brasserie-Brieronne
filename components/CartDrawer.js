"use client";

import { useState } from "react";
import { useCart } from "@/components/CartProvider";
import { GOOD_ICONS } from "@/components/GoodIcons";
import { formatPrix } from "@/lib/products";
import { FRAIS_PORT } from "@/lib/goodies";
import { site } from "@/lib/site";

function Thumb({ thumb }) {
  if (!thumb) return null;
  if (thumb.t === "img") return <img src={thumb.src} alt="" />;
  if (thumb.t === "icon") return GOOD_ICONS[thumb.name] || null;
  return (
    <span className="thumb-badge" style={{ background: thumb.bg }}>
      {thumb.label}
    </span>
  );
}

export default function CartDrawer() {
  const { items, setQty, remove, subtotal, isOpen, close } = useCart();
  const [ful, setFul] = useState("retrait");
  const [loading, setLoading] = useState(false);

  // Les bières ne s'expédient pas : retrait imposé dès qu'il y en a au panier.
  const hasBeer = items.some((l) => ["biere", "carton", "pack"].includes(l.kind));
  const effFul = hasBeer ? "retrait" : ful;
  const ship = effFul === "expedition" && items.length ? FRAIS_PORT : 0;
  const total = subtotal + ship;

  const payOnline = async () => {
    if (!items.length || loading) return;
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((l) => ({ nom: l.nom, meta: l.meta, prixUnit: l.prixUnit, qty: l.qty })),
          fulfilment: effFul,
        }),
      });
      const data = await res.json();
      if (res.ok && data.url) {
        window.location.href = data.url;
        return;
      }
      alert(data.error || "Le paiement en ligne n'est pas disponible pour le moment.");
    } catch {
      alert("Connexion impossible. Merci de réessayer.");
    }
    setLoading(false);
  };

  const orderByEmail = () => {
    if (!items.length) return;
    const lignes = items
      .map((l) => `- ${l.qty}x ${l.nom}${l.meta ? ` (${l.meta})` : ""}`)
      .join("\n");
    const body =
      `Bonjour,\n\nJe souhaite passer la commande suivante (retrait à la brasserie) :\n${lignes}\n\n` +
      `Total : ${formatPrix(total)}\n\nMon nom :\nMon téléphone :\nDate de retrait souhaitée :\n\nMerci !`;
    window.location.href = `mailto:${site.contact.email}?subject=${encodeURIComponent(
      "Commande Click & Collect"
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <>
      <div className={`cart-overlay ${isOpen ? "open" : ""}`} onClick={close} />
      <aside className={`cart-drawer ${isOpen ? "open" : ""}`} aria-label="Panier">
        <div className="cart-h">
          <h2>Votre panier</h2>
          <button className="cart-close" onClick={close} aria-label="Fermer">
            ×
          </button>
        </div>

        <div className="cart-items">
          {items.length === 0 ? (
            <div className="cart-empty">Votre panier est vide.</div>
          ) : (
            items.map((l) => (
              <div className="citem" key={l.key}>
                <div className="citem-thumb">
                  <Thumb thumb={l.thumb} />
                </div>
                <div className="citem-main">
                  <h4>{l.nom}</h4>
                  <div className="meta">{l.meta}</div>
                  <div className="citem-bottom">
                    {l.kind === "carton" ? (
                      <span />
                    ) : (
                      <div className="qty">
                        <button onClick={() => setQty(l.key, -1)}>−</button>
                        <input value={l.qty} readOnly />
                        <button onClick={() => setQty(l.key, 1)}>+</button>
                      </div>
                    )}
                    <span className="citem-price">{formatPrix(l.prixUnit * l.qty)}</span>
                  </div>
                  <button className="citem-remove" onClick={() => remove(l.key)}>
                    Retirer
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="cart-foot">
          {items.length > 0 && (
            <div className="fulfil">
              <div className="fulfil-t">Récupération</div>
              <label>
                <input
                  type="radio"
                  checked={effFul === "retrait"}
                  onChange={() => setFul("retrait")}
                />
                Retrait à la brasserie <span className="det">Gratuit</span>
              </label>
              <label className={hasBeer ? "is-disabled" : ""}>
                <input
                  type="radio"
                  checked={effFul === "expedition"}
                  disabled={hasBeer}
                  onChange={() => setFul("expedition")}
                />
                Expédition postale{" "}
                <span className="det">
                  {hasBeer ? "bières : retrait uniquement" : `${formatPrix(FRAIS_PORT)} · à confirmer`}
                </span>
              </label>
            </div>
          )}
          <div className="cart-total">
            <span>Total</span>
            <b>{formatPrix(total)}</b>
          </div>
          <div className="cart-actions">
            <button className="btn btn-or" onClick={payOnline} disabled={!items.length || loading}>
              {loading ? "Redirection…" : "Payer en ligne"}
            </button>
            {effFul === "retrait" && (
              <button className="btn btn-ghost" onClick={orderByEmail} disabled={!items.length}>
                Commander, payer au retrait
              </button>
            )}
          </div>
          <p className="pay-note">Paiement sécurisé par Stripe.</p>
        </div>
      </aside>
    </>
  );
}
