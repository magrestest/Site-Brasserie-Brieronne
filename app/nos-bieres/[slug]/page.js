import Link from "next/link";
import { notFound } from "next/navigation";
import { products, getProductBySlug, formatPrix } from "@/lib/products";
import { site } from "@/lib/site";
import { HopSeparator } from "@/components/Hop";

// Pré-génère les 6 fiches au build (SSG)
export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

// SEO par bière
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const b = getProductBySlug(slug);
  if (!b) return {};
  return {
    title: b.nom,
    description: `${b.nom} — ${b.style}. ${b.accroche}`,
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const b = getProductBySlug(slug);
  if (!b) notFound();

  // Navigation circulaire entre bières
  const idx = products.findIndex((p) => p.slug === b.slug);
  const prev = products[(idx - 1 + products.length) % products.length];
  const next = products[(idx + 1) % products.length];

  return (
    <article className="product">
      <div className="wrap">
        <Link href="/nos-bieres" className="product-back">
          ← Toutes nos bières
        </Link>

        <div className="product-grid">
          {/* Photo de la bouteille (repli : vignette de cuvée) */}
          <div className={`product-visual ${b.image ? "has-photo" : ""}`}>
            {b.image ? (
              <img className="product-photo" src={b.image} alt={`Bouteille de ${b.nom}`} />
            ) : (
              <>
                <span className="product-figure">{b.numero}</span>
                <span
                  className="product-cap"
                  style={{
                    background: `radial-gradient(circle at 35% 30%, ${b.capsule[0]}, ${b.capsule[1]})`,
                  }}
                />
                <span className="product-visual-name">{b.nom}</span>
              </>
            )}
          </div>

          {/* Informations */}
          <div className="product-info">
            <span className="eyebrow on-dark">
              Cuvée {b.numero} · {b.style}
            </span>
            <h1>{b.nom}</h1>
            <p className="product-accroche">{b.accroche}</p>
            <p className="product-desc">{b.description}</p>

            <dl className="product-specs">
              <div>
                <dt>Style</dt>
                <dd>{b.style}</dd>
              </div>
              <div>
                <dt>Format</dt>
                <dd>{b.format}</dd>
              </div>
              {b.abv != null && (
                <div>
                  <dt>Alcool</dt>
                  <dd>{b.abv} % vol.</dd>
                </div>
              )}
              <div>
                <dt>Prix</dt>
                <dd>{formatPrix(b.prix)}</dd>
              </div>
            </dl>

            <div className="product-cta">
              {site.features.boutiqueEnLigne ? (
                // Activé à l'étape D (panier + Stripe)
                <button className="btn btn-or" type="button">
                  Ajouter au panier
                </button>
              ) : (
                <Link href="/click-and-collect" className="btn btn-or">
                  Commander en Click &amp; Collect
                </Link>
              )}
              <a href={site.contact.telephoneLien} className="btn btn-ghost">
                {site.contact.telephone}
              </a>
            </div>
          </div>
        </div>

        <div className="product-sep">
          <HopSeparator />
        </div>

        {/* Navigation entre bières */}
        <nav className="product-nav">
          <Link href={`/nos-bieres/${prev.slug}`} className="product-nav-link">
            <span className="dir">← Précédente</span>
            <span className="pn">{prev.nom}</span>
          </Link>
          <Link href={`/nos-bieres/${next.slug}`} className="product-nav-link right">
            <span className="dir">Suivante →</span>
            <span className="pn">{next.nom}</span>
          </Link>
        </nav>
      </div>
    </article>
  );
}
