import { HopSeparator } from "@/components/Hop";

// Bandeau d'en-tête sombre pour les pages intérieures.
// Assure la lisibilité du header fixe (texte clair) et l'unité visuelle.
export default function PageHeader({ eyebrow, title, subtitle }) {
  return (
    <section className="page-header">
      <div className="wrap">
        {eyebrow && <span className="eyebrow on-dark">{eyebrow}</span>}
        <h1>{title}</h1>
        {subtitle && <p className="page-header-sub">{subtitle}</p>}
        <div className="page-header-sep">
          <HopSeparator />
        </div>
      </div>
    </section>
  );
}
