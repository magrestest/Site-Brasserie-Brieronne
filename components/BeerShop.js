"use client";

import { useState } from "react";
import { products, formatPrix } from "@/lib/products";
import { useCart } from "@/components/CartProvider";
import { FORMAT_ICONS } from "@/components/GoodIcons";

const CARTON_PRIX = 30;
const CARTON_N = 12;
const PACK_PRIX = 18;

// --- Grand format 75 cl (modifiable ici : prix, consigne, recettes disponibles) ---
const GF_PRIX = 7; // prix TTC, consigne incluse
const GF_CONSIGNE = 1; // dont X € de consigne (affiché à titre indicatif)
const GF_SLUGS = ["la-cabane-bleue", "la-chaumiere"]; // recettes proposées en 75 cl

export default function BeerShop() {
  const { add } = useCart();
  const [qtys, setQtys] = useState(() => Object.fromEntries(products.map((p) => [p.slug, 1])));
  const [modal, setModal] = useState(false);
  const [compo, setCompo] = useState(() => Object.fromEntries(products.map((p) => [p.slug, 0])));
  const [gf, setGf] = useState(GF_SLUGS[0]);
  const [gfQty, setGfQty] = useState(1);

  const addGrand = () => {
    const p = products.find((x) => x.slug === gf);
    if (!p) return;
    add({
      kind: "biere",
      nom: `${p.nom} — 75 cl`,
      prixUnit: GF_PRIX,
      qty: gfQty,
      meta: `Grand format 75 cl · dont ${formatPrix(GF_CONSIGNE)} de consigne`,
      thumb: { t: "img", src: "/formats/bouteille-75cl.jpg" },
      mergeId: `biere75:${p.slug}`,
    });
    setGfQty(1);
  };

  const stepU = (slug, d) =>
    setQtys((q) => ({ ...q, [slug]: Math.max(1, (q[slug] || 1) + d) }));

  const addUnit = (p) => {
    add({
      kind: "biere",
      nom: p.nom,
      prixUnit: p.prix,
      qty: qtys[p.slug] || 1,
      meta: `${p.style} · ${formatPrix(p.prix)}/u`,
      thumb: { t: "img", src: p.image },
      mergeId: `biere:${p.slug}`,
    });
    setQtys((q) => ({ ...q, [p.slug]: 1 }));
  };

  const compoCount = Object.values(compo).reduce((a, b) => a + b, 0);
  const stepC = (slug, d) => {
    if (d > 0 && compoCount >= CARTON_N) return;
    setCompo((c) => ({ ...c, [slug]: Math.max(0, c[slug] + d) }));
  };
  const addCarton = () => {
    if (compoCount !== CARTON_N) return;
    const label = products
      .filter((p) => compo[p.slug] > 0)
      .map((p) => `${compo[p.slug]}× ${p.style}`)
      .join(", ");
    add({
      kind: "carton",
      nom: "Carton panaché",
      prixUnit: CARTON_PRIX,
      qty: 1,
      meta: label,
      thumb: { t: "badge", label: "12", bg: "var(--sapin)" },
      mergeId: null,
    });
    setCompo(Object.fromEntries(products.map((p) => [p.slug, 0])));
    setModal(false);
  };

  const addPack = () => {
    add({
      kind: "pack",
      nom: "Pack découverte",
      prixUnit: PACK_PRIX,
      qty: 1,
      meta: "Une de chaque recette",
      thumb: { t: "badge", label: "6", bg: "var(--sapin-2)" },
      mergeId: "pack",
    });
  };

  return (
    <>
      {/* À l'unité */}
      <div className="sec">
        <div className="sec-title">
          <h2>À l'unité</h2>
          <span className="rule" />
          <span className="hint">33 cl</span>
        </div>
        <div className="unit-grid">
          {products.map((p) => (
            <div className="unit-card" key={p.slug}>
              <div className="unit-photo">
                <img src={p.image} alt={p.nom} />
              </div>
              <div className="unit-body">
                <h3>{p.nom}</h3>
                <div className="unit-row">
                  <span className="st">{p.style}</span>
                  <span className="pr">{formatPrix(p.prix)}</span>
                </div>
                <div className="unit-actions">
                  <div className="qty">
                    <button onClick={() => stepU(p.slug, -1)}>−</button>
                    <input value={qtys[p.slug]} readOnly />
                    <button onClick={() => stepU(p.slug, 1)}>+</button>
                  </div>
                  <button className="btn-add" onClick={() => addUnit(p)}>
                    Ajouter
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Grand format 75 cl */}
      <div className="sec">
        <div className="sec-title">
          <h2>Grand format</h2>
          <span className="rule" />
          <span className="hint">75 cl</span>
        </div>
        <div className="gf-card">
          <div className="gf-photo">
            <img src="/formats/bouteille-75cl.jpg" alt="Nos bières en bouteille 75 cl" />
          </div>
          <div className="gf-body">
            <h3>La bouteille 75 cl</h3>
            <p className="gf-desc">
              Le grand format à partager, disponible sur deux de nos recettes.
            </p>
            <div className="gf-choice">
              {GF_SLUGS.map((slug) => {
                const p = products.find((x) => x.slug === slug);
                return (
                  <button
                    key={slug}
                    className={`gf-btn ${gf === slug ? "active" : ""}`}
                    onClick={() => setGf(slug)}
                  >
                    {p.nom}
                  </button>
                );
              })}
            </div>
            <div className="gf-foot">
              <div className="gf-price">
                {formatPrix(GF_PRIX)}
                <small>dont {formatPrix(GF_CONSIGNE)} de consigne</small>
              </div>
              <div className="unit-actions">
                <div className="qty">
                  <button onClick={() => setGfQty((q) => Math.max(1, q - 1))}>−</button>
                  <input value={gfQty} readOnly />
                  <button onClick={() => setGfQty((q) => q + 1)}>+</button>
                </div>
                <button className="btn-add" onClick={addGrand}>
                  Ajouter
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Formats & offres */}
      <div className="sec">
        <div className="sec-title">
          <h2>Formats &amp; offres</h2>
          <span className="rule" />
          <span className="hint">Le bon plan</span>
        </div>
        <div className="offer-grid">
          <div className="offer-card feature">
            <div className="offer-ic"><img src="/formats/carton-12.jpg" alt="Carton panaché de 12 bouteilles" /></div>
            <h3>Carton panaché</h3>
            <div className="ol">12 bouteilles</div>
            <p>Composez librement vos 12 bouteilles parmi les six recettes.</p>
            <div className="offer-price">{formatPrix(CARTON_PRIX)}</div>
            <button className="btn-add" onClick={() => setModal(true)}>
              Composer mon carton
            </button>
          </div>
          <div className="offer-card">
            <div className="offer-ic"><img src="/formats/pack-6.jpg" alt="Pack découverte de 6 bières" /></div>
            <h3>Pack découverte</h3>
            <div className="ol">6 bières</div>
            <p>Une bouteille de chacune de nos six recettes. Idéal pour goûter ou offrir.</p>
            <div className="offer-price">{formatPrix(PACK_PRIX)}</div>
            <button className="btn-add" onClick={addPack}>
              Ajouter le pack
            </button>
          </div>
          <div className="offer-card soon">
            <span className="offer-badge">Bientôt</span>
            <div className="offer-ic">{FORMAT_ICONS.fut}</div>
            <h3>Fût 20 L</h3>
            <div className="ol">Pression</div>
            <p>Pour les bars, restaurants et grandes tablées. Disponible très prochainement.</p>
            <div className="offer-price">{formatPrix(70)}</div>
            <button className="btn-soon" disabled>
              Arrivée prochaine
            </button>
          </div>
        </div>
      </div>

      {/* Modale compositeur de carton */}
      <div className={`modal-ov ${modal ? "open" : ""}`} onClick={(e) => e.target === e.currentTarget && setModal(false)}>
        <div className="modal">
          <div className="modal-h">
            <div>
              <h3>Composez votre carton</h3>
              <div className="ms">12 bouteilles au choix · {formatPrix(CARTON_PRIX)}</div>
            </div>
            <button className="modal-close" onClick={() => setModal(false)} aria-label="Fermer">
              ×
            </button>
          </div>
          <div className="modal-rows">
            {products.map((p) => (
              <div className="mrow" key={p.slug}>
                <span
                  className="cap"
                  style={{ background: `radial-gradient(circle at 35% 30%, ${p.capsule[0]}, ${p.capsule[1]})` }}
                />
                <span className="mn">
                  <b>{p.nom}</b>
                  <span>{p.style}</span>
                </span>
                <div className="qty">
                  <button onClick={() => stepC(p.slug, -1)}>−</button>
                  <input value={compo[p.slug]} readOnly />
                  <button onClick={() => stepC(p.slug, 1)}>+</button>
                </div>
              </div>
            ))}
          </div>
          <div className="modal-f">
            <div className={`modal-count ${compoCount === CARTON_N ? "full" : ""}`}>
              Sélection : <b>{compoCount}</b> / {CARTON_N}
            </div>
            <button className="btn-add" disabled={compoCount !== CARTON_N} onClick={addCarton}>
              Ajouter au panier
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
