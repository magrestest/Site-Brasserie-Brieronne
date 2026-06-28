"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { goodies, FRAIS_PORT, formatPrix } from "@/lib/goodies";

// Jeu d'icônes (visuels provisoires en attendant les photos produits)
const ICONS = {
  cap: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
      <path d="M11 27a13 13 0 0 1 26 0" />
      <path d="M37 27c4 0 6 2 6 5H24V14" />
      <path d="M24 14c-2 0-3 1-3 3" />
    </svg>
  ),
  tshirt: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
      <path d="M18 9 8 15l4 6 4-2v20h16V19l4 2 4-6-10-6a6 6 0 0 1-12 0z" />
    </svg>
  ),
  hoodie: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
      <path d="M18 9 8 15l4 6 4-2v20h16V19l4 2 4-6-10-6" />
      <path d="M18 9a6 6 0 0 0 12 0" />
      <path d="M21 30h6v9" />
    </svg>
  ),
  opener: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="9" y="20" width="30" height="8" rx="4" />
      <circle cx="32" cy="24" r="2.4" />
    </svg>
  ),
  glass: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
      <path d="M16 11h15l-2 28H18z" />
      <path d="M31 17h6v15h-6" />
      <path d="M16.5 19h14" />
    </svg>
  ),
  coaster: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="24" cy="24" r="15" />
      <circle cx="24" cy="24" r="8.5" />
    </svg>
  ),
  tote: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
      <path d="M13 16h22l-2 24H15z" />
      <path d="M19 16v-2a5 5 0 0 1 10 0v2" />
    </svg>
  ),
  cart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M3 3h2l2.4 12.3a1 1 0 0 0 1 .7h9.7a1 1 0 0 0 1-.8L21 7H6" />
      <circle cx="9" cy="20" r="1.4" />
      <circle cx="18" cy="20" r="1.4" />
    </svg>
  ),
};

export default function GoodsShop() {
  const [cart, setCart] = useState([]);
  const [picked, setPicked] = useState(() => {
    const o = {};
    goodies.forEach((g) => {
      if (g.sizes) o[g.id] = g.sizes[0];
    });
    return o;
  });
  const [open, setOpen] = useState(false);
  const [ful, setFul] = useState("retrait");
  const [placed, setPlaced] = useState(false);
  const uid = useRef(1);

  const pickSize = (id, s) => setPicked((p) => ({ ...p, [id]: s }));

  const add = (g) => {
    const taille = g.sizes ? picked[g.id] : null;
    setCart((c) => {
      const ex = c.find((l) => l.id === g.id && l.taille === taille);
      if (ex) return c.map((l) => (l === ex ? { ...l, qty: l.qty + 1 } : l));
      return [
        ...c,
        { key: uid.current++, id: g.id, nom: g.nom, prix: g.prix, icon: g.icon, taille, qty: 1 },
      ];
    });
    setPlaced(false);
    setOpen(true);
  };

  const setQty = (key, d) =>
    setCart((c) => c.map((l) => (l.key === key ? { ...l, qty: Math.max(1, l.qty + d) } : l)));
  const remove = (key) => setCart((c) => c.filter((l) => l.key !== key));

  const subtotal = cart.reduce((s, l) => s + l.prix * l.qty, 0);
  const ship = ful === "expedition" && cart.length ? FRAIS_PORT : 0;
  const total = subtotal + ship;
  const count = cart.reduce((s, l) => s + l.qty, 0);

  return (
    <>
      <div className="goods-grid">
        {goodies.map((g) => (
          <div className="good-card" key={g.id}>
            <div className="good-visual">
              {ICONS[g.icon]}
              <span className="good-ph">Visuel à venir</span>
            </div>
            <div className="good-body">
              <h3>{g.nom}</h3>
              <p className="good-desc">{g.desc}</p>
              {g.sizes && (
                <div className="good-sizes">
                  {g.sizes.map((s) => (
                    <button
                      key={s}
                      className={`size-btn ${picked[g.id] === s ? "active" : ""}`}
                      onClick={() => pickSize(g.id, s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
              <div className="good-foot">
                <div className="good-price">
                  {formatPrix(g.prix)}
                  {g.provisoire && <small>prix provisoire</small>}
                </div>
                <button className="good-add-btn" onClick={() => add(g)}>
                  Ajouter
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {count > 0 && (
        <button className="cart-fab" onClick={() => setOpen(true)} aria-label="Voir le panier">
          {ICONS.cart}
          <span className="fab-count">{count}</span>
          {formatPrix(total)}
        </button>
      )}

      <div className={`cart-overlay ${open ? "open" : ""}`} onClick={() => setOpen(false)} />
      <aside className={`cart-drawer ${open ? "open" : ""}`} aria-label="Panier">
        <div className="cart-h">
          <h2>Votre panier</h2>
          <button className="cart-close" onClick={() => setOpen(false)} aria-label="Fermer">
            ×
          </button>
        </div>

        {placed ? (
          <div className="cart-placed">
            <div className="placed-ic">✓</div>
            <h3>Votre sélection est prête</h3>
            <p>
              Le paiement en ligne arrive très bientôt. En attendant, contactez-nous pour finaliser
              votre commande de {formatPrix(total)} (
              {ful === "retrait" ? "retrait à la brasserie" : "expédition postale"}).
            </p>
            <Link href="/contact" className="btn btn-or">
              Nous contacter
            </Link>
            <button className="btn btn-ghost" onClick={() => setPlaced(false)}>
              Continuer mes achats
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.length === 0 ? (
                <div className="cart-empty">Votre panier est vide.</div>
              ) : (
                cart.map((l) => (
                  <div className="citem" key={l.key}>
                    <div className="citem-thumb">{ICONS[l.icon]}</div>
                    <div className="citem-main">
                      <h4>{l.nom}</h4>
                      <div className="meta">
                        {l.taille ? `Taille ${l.taille} · ` : ""}
                        {formatPrix(l.prix)}/u
                      </div>
                      <div className="citem-bottom">
                        <div className="qty">
                          <button onClick={() => setQty(l.key, -1)}>−</button>
                          <input value={l.qty} readOnly />
                          <button onClick={() => setQty(l.key, 1)}>+</button>
                        </div>
                        <span className="citem-price">{formatPrix(l.prix * l.qty)}</span>
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
              <div className="fulfil">
                <div className="fulfil-t">Récupération</div>
                <label>
                  <input
                    type="radio"
                    name="ful"
                    checked={ful === "retrait"}
                    onChange={() => setFul("retrait")}
                  />
                  Retrait à la brasserie <span className="det">Gratuit</span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="ful"
                    checked={ful === "expedition"}
                    onChange={() => setFul("expedition")}
                  />
                  Expédition postale <span className="det">{formatPrix(FRAIS_PORT)} · à confirmer</span>
                </label>
              </div>
              <div className="cart-total">
                <span>Total</span>
                <b>{formatPrix(total)}</b>
              </div>
              <button className="btn btn-or" onClick={() => cart.length && setPlaced(true)}>
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
