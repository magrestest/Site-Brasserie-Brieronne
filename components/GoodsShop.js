"use client";

import { useState } from "react";
import { goodies, formatPrix } from "@/lib/goodies";
import { useCart } from "@/components/CartProvider";
import { GOOD_ICONS } from "@/components/GoodIcons";

export default function GoodsShop() {
  const { add } = useCart();
  const [picked, setPicked] = useState(() => {
    const o = {};
    goodies.forEach((g) => {
      if (g.sizes) o[g.id] = g.sizes[0];
    });
    return o;
  });

  const pickSize = (id, s) => setPicked((p) => ({ ...p, [id]: s }));

  const addGood = (g) => {
    const taille = g.sizes ? picked[g.id] : null;
    add({
      kind: "goodie",
      nom: g.nom,
      prixUnit: g.prix,
      qty: 1,
      meta: `${taille ? `Taille ${taille} · ` : ""}${formatPrix(g.prix)}/u`,
      thumb: { t: "icon", name: g.icon },
      taille,
      mergeId: `goodie:${g.id}:${taille || ""}`,
    });
  };

  return (
    <div className="goods-grid">
      {goodies.map((g) => (
        <div className="good-card" key={g.id}>
          <div className="good-visual">
            {GOOD_ICONS[g.icon]}
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
              <button className="good-add-btn" onClick={() => addGood(g)}>
                Ajouter
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
