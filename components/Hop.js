// Symbole houblon (défini une fois, réutilisé via <use href="#hop">)
// À placer une seule fois dans le layout racine.
export function HopSymbol() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <symbol id="hop" viewBox="0 0 24 32">
        <path
          d="M12 2c2.4 1.4 3.6 3.3 3.6 5.6 2.6-1 4.4-.6 5.8.9-2 .6-3.1 1.7-3.4 3.4 2.4-.5 4 .2 5 2-2.2.2-3.6 1.1-4.2 2.8 2.2-.2 3.6.8 4.2 2.7-2.3-.2-3.9.6-4.8 2.4 1.8.3 2.9 1.3 3.2 3-2-.7-3.6-.4-4.8.9-.4 1.6-1.3 2.8-2.8 3.6-1.5-.8-2.4-2-2.8-3.6-1.2-1.3-2.8-1.6-4.8-.9.3-1.7 1.4-2.7 3.2-3-.9-1.8-2.5-2.6-4.8-2.4.6-1.9 2-2.9 4.2-2.7-.6-1.7-2-2.6-4.2-2.8 1-1.8 2.6-2.5 5-2-.3-1.7-1.4-2.8-3.4-3.4 1.4-1.5 3.2-1.9 5.8-.9C8.4 5.3 9.6 3.4 12 2z"
          fill="var(--ambre)"
        />
      </symbol>
    </svg>
  );
}

// Séparateur signature : trait — houblon — trait
export function HopSeparator({ className = "" }) {
  return (
    <span className={`hop-sep ${className}`}>
      <span className="line" />
      <svg>
        <use href="#hop" />
      </svg>
      <span className="line" />
    </span>
  );
}

export default HopSeparator;
