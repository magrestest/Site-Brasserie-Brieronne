"use client";

import { useState } from "react";
import { site } from "@/lib/site";

export default function ContactForm() {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const envoyer = () => {
    const sujet = encodeURIComponent(`Contact site — ${nom || "sans nom"}`);
    const corps = encodeURIComponent(
      `${message}\n\n— ${nom}${email ? ` (${email})` : ""}`
    );
    window.location.href = `${site.contact.emailLien}?subject=${sujet}&body=${corps}`;
  };

  return (
    <div className="contact-form">
      <h3>Nous écrire</h3>
      <p className="fsub">Remplissez ce formulaire, nous revenons vers vous rapidement.</p>

      <div className="field">
        <label htmlFor="cf-nom">Nom</label>
        <input id="cf-nom" type="text" placeholder="Votre nom" value={nom} onChange={(e) => setNom(e.target.value)} />
      </div>
      <div className="field">
        <label htmlFor="cf-email">Email</label>
        <input id="cf-email" type="email" placeholder="vous@exemple.fr" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="field">
        <label htmlFor="cf-msg">Message</label>
        <textarea id="cf-msg" placeholder="Votre message…" value={message} onChange={(e) => setMessage(e.target.value)} />
      </div>

      <button className="btn btn-or" type="button" onClick={envoyer}>
        Envoyer
      </button>
      <p className="form-note">
        Votre logiciel de messagerie s'ouvrira pour finaliser l'envoi. Un formulaire intégré
        prendra le relais prochainement.
      </p>
    </div>
  );
}
