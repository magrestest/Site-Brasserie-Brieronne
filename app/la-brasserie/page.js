import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { HopSeparator } from "@/components/Hop";
import Reveal from "@/components/Reveal";

export const metadata = {
  title: "La brasserie",
  description:
    "L'histoire, le territoire et le geste de la Brasserie Briéronne, microbrasserie artisanale née en Brière, à Saint-Joachim.",
};

export default function BrasseriePage() {
  return (
    <>
      <PageHeader
        eyebrow="La maison"
        title="La brasserie"
        subtitle="Une microbrasserie née en Brière, où chaque bouteille passe entre les mains d'un seul homme."
      />

      {/* Histoire */}
      <section className="editorial">
        <div className="wrap">
          <Reveal as="div" className="ed-text">
            <span className="eyebrow">L'histoire</span>
            <h2>Tout a commencé par une envie de faire les choses bien.</h2>
            <p>
              La Brasserie Briéronne est née fin 2023 à Saint-Joachim, au cœur du Parc
              naturel régional de Brière. D'une cuve, d'une recette, et de la conviction
              qu'une bière de territoire pouvait se faire sans rien céder à la facilité.
            </p>
            <p>
              Aujourd'hui, six recettes composent la gamme. Toutes brassées, embouteillées et
              étiquetées ici, en petits volumes, pour garder la main sur chaque détail.
            </p>
          </Reveal>
          <Reveal as="div" delay={120}>
            <div className="ed-visual">
              <img src="/histoire.jpg" alt="La Cabane Bleue, notre blonde, entourée de malt et de houblon" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Territoire */}
      <section className="territoire">
        <div className="wrap">
          <Reveal as="div" className="territoire-text">
            <span className="eyebrow">Le territoire</span>
            <h2>La Brière n'est pas un décor. C'est la matière.</h2>
            <p>
              Deuxième plus grande zone humide de France, la Brière impose son rythme : une
              eau particulière, une lumière basse sur les roseaux, et le silence d'un
              territoire qui ne se presse jamais.
            </p>
            <p>
              Chaque bière emprunte son nom à un fragment de ce paysage — une cabane, une
              chaumière, une tourbière. Une manière de garder le marais dans chaque bouteille.
            </p>
          </Reveal>
          <Reveal as="div" className="territoire-photo" delay={120}>
            <img
              src="/marais-briere.jpg"
              alt="Les marais de la Brière au coucher du soleil"
            />
          </Reveal>
        </div>
      </section>

      {/* Procédé */}
      <section className="process">
        <div className="wrap">
          <HopSeparator />
          <h2>Du grain à la bouteille, à la main.</h2>
          <p className="process-sub">
            Des brassins de 100 à 130 litres, soit environ 300 bouteilles. Rien n'est
            automatisé : tout se compte en gestes.
          </p>
          <div className="process-steps">
            {[
              ["I", "Empâtage", "Concassage des malts et infusion, pour libérer les sucres."],
              ["II", "Fermentation", "Le moût et les levures travaillent, plusieurs semaines durant."],
              ["III", "Embouteillage", "Refermentation en bouteille pour une effervescence naturelle."],
              ["IV", "Étiquetage", "Habillage et capsulage, une à une, avant la mise en vente."],
            ].map(([n, t, d]) => (
              <div className="step" key={n}>
                <div className="step-num">{n}</div>
                <div className="step-line" />
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-band">
        <div className="wrap">
          <h2>Envie de goûter la Brière&nbsp;?</h2>
          <div className="hero-cta">
            <Link href="/nos-bieres" className="btn btn-or">Découvrir nos bières</Link>
            <Link href="/contact" className="btn btn-ghost">Nous rendre visite</Link>
          </div>
        </div>
      </section>
    </>
  );
}
