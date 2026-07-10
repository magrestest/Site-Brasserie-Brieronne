"use client";

import { useState, useRef, useEffect } from "react";

const HELLO =
  "Bonjour et bienvenue à la Brasserie Briéronne ! Je suis Le Sommelier. Dites-moi une envie, une occasion ou un plat à accompagner, et je vous trouve la bière idéale. 🍺";
const SUGGESTIONS = [
  "Quelle bière pour moi ?",
  "Un accord mets & bière",
  "Où vous trouver ?",
];

function Hop() {
  return (
    <svg viewBox="0 0 24 32" aria-hidden="true">
      <path
        d="M12 2c2.4 1.4 3.6 3.3 3.6 5.6 2.6-1 4.4-.6 5.8.9-2 .6-3.1 1.7-3.4 3.4 2.4-.5 4 .2 5 2-2.2.2-3.6 1.1-4.2 2.8 2.2-.2 3.6.8 4.2 2.7-2.3-.2-3.9.6-4.8 2.4 1.8.3 2.9 1.3 3.2 3-2-.7-3.6-.4-4.8.9-.4 1.6-1.3 2.8-2.8 3.6-1.5-.8-2.4-2-2.8-3.6-1.2-1.3-2.8-1.6-4.8-.9.3-1.7 1.4-2.7 3.2-3-.9-1.8-2.5-2.6-4.8-2.4.6-1.9 2-2.9 4.2-2.7-.6-1.7-2-2.6-4.2-2.8 1-1.8 2.6-2.5 5-2-.3-1.7-1.4-2.8-3.4-3.4 1.4-1.5 3.2-1.9 5.8-.9C8.4 5.3 9.6 3.4 12 2z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: "assistant", content: HELLO }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bodyRef = useRef(null);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages, loading, open]);

  const send = async (text) => {
    const content = (text ?? input).trim();
    if (!content || loading) return;
    const next = [...messages, { role: "user", content }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      // On n'envoie pas le message d'accueil (l'API doit commencer par un message visiteur)
      const history = next[0]?.role === "assistant" ? next.slice(1) : next;
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });
      const data = await res.json();
      setMessages((m) => [...m, { role: "assistant", content: data.reply || "…" }]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Oups, connexion difficile. Réessayez dans un instant !" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const onKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <>
      {open && (
        <div className="chat-win" role="dialog" aria-label="Le Sommelier">
          <div className="chat-head">
            <span className="ava">
              <Hop />
            </span>
            <div>
              <h4>Le Sommelier</h4>
              <p>Brasserie Briéronne</p>
            </div>
            <button className="x" aria-label="Fermer" onClick={() => setOpen(false)}>
              ×
            </button>
          </div>

          <div className="chat-body" ref={bodyRef}>
            {messages.map((m, i) => (
              <div key={i} className={`row ${m.role === "user" ? "user" : "bot"}`}>
                {m.role !== "user" && (
                  <span className="mini">
                    <Hop />
                  </span>
                )}
                <div className="bubble">{m.content}</div>
              </div>
            ))}
            {loading && (
              <div className="row bot">
                <span className="mini">
                  <Hop />
                </span>
                <div className="bubble typing">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
          </div>

          {messages.length <= 1 && (
            <div className="chat-suggest">
              {SUGGESTIONS.map((s) => (
                <button key={s} className="chip" onClick={() => send(s)}>
                  {s}
                </button>
              ))}
            </div>
          )}

          <div className="legal">L'abus d'alcool est dangereux pour la santé.</div>

          <div className="chat-input">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKey}
              placeholder="Écrivez votre message..."
              aria-label="Votre message"
              maxLength={1000}
            />
            <button className="send" aria-label="Envoyer" onClick={() => send()} disabled={loading}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <button
        className="chat-fab"
        aria-label={open ? "Fermer le Sommelier" : "Ouvrir le Sommelier"}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <span className="fab-x">×</span> : <Hop />}
        {!open && <span className="dot"></span>}
      </button>
    </>
  );
}
