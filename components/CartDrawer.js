"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { GOOD_ICONS } from "@/components/GoodIcons";
import { formatPrix } from "@/lib/products";
import { FRAIS_PORT } from "@/lib/goodies";

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
  const { items, setQty, remove, clear, subtotal, isOpen, close } = useCart();
  const [ful, setFul] = useState("retrait");
  const [placed, setPlaced] = useState(false);

  // Les bières ne s'expédient pas : retrait imposé dès qu'il y en a au panier.
  const hasBeer = items.some((l) => ["biere", "carton", "pack"].includes(l.kind));
  const effFul = hasBeer ? "retrait" : ful;
  const ship = effFul === "expedition" && items.length ? FRAIS_PORT : 0;
  const total = subtotal + ship;

  const onClose = () => {
    setPlaced(false);
    close();
  };

  return (
    <>
      <div className={`cart-overlay ${isOpen ? "open" : ""}`} onClick={onClose} />
      <aside className={`cart-drawer ${isOpen ? "open" : ""}`} aria-label="Panier">
        <div className="cart-h">
          <h2>Votre panier</h2>
          <button className="cart-close" onClick={onClose} aria-label="Fermer">
            ×
          </button>
        </div>

        {placed ? (
          <div className="cart-placed">
            <div className="placed-ic">✓</div>
            <h3>Votre commande est prête</h3>
            <p>
              Le paiement en ligne arrive très bientôt. En attendant, contactez-nous pour finaliser
              votre commande de {formatPrix(total)} (
              {effFul === "retrait" ? "retrait à la brasserie" : "expédition postale"}).
            </p>
            <Link href="/contact" className="btn btn-or">
              Nous contacter
            </Link>
            <button
              className="btn btn-ghost"
              onClick={() => {
                setPlaced(false);
              }}
            >
              Continuer mes achats
            </button>
          </div>
        ) : (
          <>
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
              <button className="btn btn-or" onClick={() => items.length && setPlaced(true)}>
                Commander
              </button>
              <p className="pay-note">Paiement en ligne (Stripe) bientôt disponible.</p>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
