"use client";

import { useState } from "react";
import { site } from "@/lib/site";

export default function ProForm() {
  const [etab, setEtab] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [projet, setProjet] = useState("");

  const envoyer = () => {
    const sujet = encodeURIComponent(`Demande de devis pro — ${etab || "établissement"}`);
    const corps = encodeURIComponent(
      `Établissement : ${etab}\n` +
        `Contact : ${nom}\n` +
        `E-mail : ${email}\n` +
        `Téléphone : ${tel}\n\n` +
        `Projet :\n${projet}`
    );
    window.location.href = `${site.contact.emailLien}?subject=${sujet}&body=${corps}`;
  };

  return (
    <div className="pro-form">
      <div className="pf-row">
        <div className="field">
          <label htmlFor="pf-etab">Établissement</label>
          <input
            id="pf-etab"
            type="text"
            placeholder="Nom de votre bar / restaurant"
            value={etab}
            onChange={(e) => setEtab(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="pf-nom">Votre nom</label>
          <input
            id="pf-nom"
            type="text"
            placeholder="Prénom Nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
          />
        </div>
      </div>
      <div className="pf-row">
        <div className="field">
          <label htmlFor="pf-email">E-mail</label>
          <input
            id="pf-email"
            type="email"
            placeholder="vous@etablissement.fr"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="pf-tel">Téléphone</label>
          <input
            id="pf-tel"
            type="tel"
            placeholder="06 ..."
            value={tel}
            onChange={(e) => setTel(e.target.value)}
          />
        </div>
      </div>
      <div className="field">
        <label htmlFor="pf-projet">Votre projet</label>
        <textarea
          id="pf-projet"
          placeholder="Volumes envisagés, recettes qui vous intéressent, matériel de tirage en place..."
          value={projet}
          onChange={(e) => setProjet(e.target.value)}
        />
      </div>
      <button className="btn btn-or" type="button" onClick={envoyer}>
        Envoyer ma demande
      </button>
      <p className="form-note">
        Votre logiciel de messagerie s'ouvrira pour finaliser l'envoi.
      </p>
    </div>
  );
}
