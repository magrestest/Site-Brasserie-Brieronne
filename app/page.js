import Link from "next/link";
import { site } from "@/lib/site";
import { products } from "@/lib/products";
import { HopSeparator } from "@/components/Hop";
import Reveal from "@/components/Reveal";

export default function Home() {
  return (
    <>
      {/* ===================== HERO ===================== */}
      <section className="hero">
        <h1 className="sr">
          {site.nom} — bières artisanales brassées à {site.contact.adresse.ville}, en Brière
        </h1>
        <div className="hero-stage">
          {/* Image dans /public/hero-atelier.jpg */}
          <img
            className="hero-img"
            src="/hero-atelier.jpg"
            alt={`La gamme des six bières de la ${site.nom}, brassées à ${site.contact.adresse.ville}`}
          />
          <div className="hero-veil" />
        </div>
        <div className="hero-foot">
          <div className="hero-sep">
            <HopSeparator />
          </div>
          <p className="tagline">{site.slogan}</p>
          <div className="hero-cta">
            <Link href="/nos-bieres" className="btn btn-or">
              Découvrir nos bières
            </Link>
            <Link href="/click-and-collect" className="btn btn-ghost">
              Commander &amp; retirer
            </Link>
          </div>
        </div>
      </section>

      {/* ===================== INTRO ===================== */}
      <section className="intro section-pad" id="brasserie">
        <div className="wrap intro-grid">
          <Reveal>
            <span className="eyebrow">Le lieu &amp; le geste</span>
            <h2>
              À {site.contact.adresse.ville},
              <br />
              tout se fait à la main.
            </h2>
            <p>
              La Brière n'est pas qu'un décor : c'est notre territoire. Une eau, une
              lumière basse sur les marais, et le temps qu'il faut. Nos brassins de 100 à
              130 litres se comptent en gestes, pas en cadences.
            </p>
            <p>
              Empâtage, fermentation, embouteillage, étiquetage : tout se fait ici, dans le
              même atelier. Six recettes, six capsules de couleur, une seule signature.
            </p>
            <span className="signature-name">Guillaume, brasseur</span>
          </Reveal>
          <Reveal delay={120}>
            <div className="intro-visual">
              <div className="ph">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <path d="M3 21h18M5 21V9l7-5 7 5v12M9 21v-6h6v6" />
                </svg>
                Photo de l'atelier
                <br />à venir
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================== TICKER ===================== */}
      <div className="ticker">
        <Reveal><div className="n">VI</div><div className="l">Recettes maison</div></Reveal>
        <Reveal delay={70}><div className="n">33<span style={{ fontSize: "1.2rem" }}>cl</span></div><div className="l">Format signature</div></Reveal>
        <Reveal delay={140}><div className="n">100%</div><div className="l">Brassé sur place</div></Reveal>
        <Reveal delay={210}><div className="n">1</div><div className="l">Brasseur, de A à Z</div></Reveal>
      </div>

      {/* ===================== BIÈRES ===================== */}
      <section className="bieres section-pad" id="bieres">
        <div className="wrap">
          <Reveal className="bieres-head">
            <HopSeparator />
            <h2>
              Six bières,
              <br />
              six couleurs de capsule.
            </h2>
            <p>
              Chaque référence porte le nom d'un fragment de la Brière. Survolez une bière
              pour découvrir son caractère.
            </p>
          </Reveal>

          <div className="grid-bieres">
            {products.map((b, i) => (
              <Reveal key={b.slug} delay={(i % 3) * 70} as="div">
                <Link href={`/nos-bieres/${b.slug}`} className="biere">
                  <div
                    className="cap"
                    style={{
                      background: `radial-gradient(circle at 35% 30%, ${b.capsule[0]}, ${b.capsule[1]})`,
                    }}
                  />
                  <div className="num">{b.numero}</div>
                  <h3>{b.nom}</h3>
                  <div className="style">{b.style}</div>
                  <p className="desc">{b.accroche}</p>
                  <span className="more">Voir la bière →</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== DUO CTA ===================== */}
      <div className="duo">
        <div className="duo-collect" id="collect">
          <span className="eyebrow on-dark">Boutique</span>
          <h3>Click &amp; Collect</h3>
          <p>
            Composez votre commande en ligne — à l'unité, en pack ou en carton — et venez la
            retirer à la brasserie. Paiement en ligne ou sur place.
          </p>
          <Link href="/click-and-collect" className="btn btn-or">
            Commander maintenant
          </Link>
        </div>
        <div className="duo-events" id="events">
          <span className="eyebrow">Agenda</span>
          <h3>Marchés &amp; événements</h3>
          <p>
            Retrouvez la Brasserie Briéronne sur les marchés et rendez-vous de l'été en Brière. Dates,
            lieux et fermetures exceptionnelles.
          </p>
          <Link href="/evenements" className="btn btn-ghost">
            Voir l'agenda
          </Link>
        </div>
      </div>
    </>
  );
}
