import PageHeader from "@/components/PageHeader";
import { HopSeparator } from "@/components/Hop";
import ProForm from "@/components/ProForm";

export const metadata = {
  title: "Espace pro — Brasserie Briéronne",
  description:
    "Cafés, bars, restaurants : proposez la Briéronne à la pression, en fût 20 L. Une bière artisanale brassée à Saint-Joachim, au cœur de la Brière.",
};

const IcLocal = () => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
    <path d="M24 43s14-11 14-23a14 14 0 0 0-28 0c0 12 14 23 14 23z" />
    <circle cx="24" cy="20" r="5" />
  </svg>
);
const IcArtisan = () => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
    <path d="M14 6h20l-2 12a10 10 0 0 1-16 0z" />
    <path d="M16 30h16v10H16z" />
    <path d="M12 42h24" />
  </svg>
);
const IcRecettes = () => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
    <rect x="10" y="14" width="7" height="26" rx="2" />
    <rect x="20" y="10" width="7" height="30" rx="2" />
    <rect x="30" y="16" width="7" height="24" rx="2" />
    <path d="M11 10h5M21 6h5M31 12h5" />
  </svg>
);
const IcCourt = () => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
    <path d="M4 14h22v18H4zM26 20h10l6 6v6H26z" />
    <circle cx="13" cy="36" r="3" />
    <circle cx="33" cy="36" r="3" />
  </svg>
);
const IcFut = () => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4">
    <ellipse cx="24" cy="8" rx="12" ry="4" />
    <path d="M12 8v32c0 2.2 5.4 4 12 4s12-1.8 12-4V8" />
    <path d="M10 18h28M10 30h28" />
  </svg>
);

export default function ProfessionnelsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Espace professionnels"
        title="La Briéronne à la pression"
        subtitle="Cafés, bars, restaurants : proposez à vos clients une bière artisanale brassée à quelques kilomètres, en fût 20 L."
      />

      <section className="section-pad" style={{ background: "var(--noir)" }}>
        <div className="wrap">
          <p className="pro-intro">
            Une bière locale, c'est un argument qui parle à vos clients — et une histoire à
            raconter. La Briéronne, brassée à Saint-Joachim, vous distingue des standards
            industriels avec six recettes de caractère, en circuit court et en relation directe
            avec le brasseur.
          </p>
          <div className="pro-args">
            <div className="pro-arg">
              <div className="ic"><IcLocal /></div>
              <h3>100 % locale</h3>
              <p>Brassée au cœur de la Brière, à Saint-Joachim. Le produit du territoire, pour de vrai.</p>
            </div>
            <div className="pro-arg">
              <div className="ic"><IcArtisan /></div>
              <h3>Artisanale</h3>
              <p>Brassins en petites quantités, recettes maison, fraîcheur garantie.</p>
            </div>
            <div className="pro-arg">
              <div className="ic"><IcRecettes /></div>
              <h3>Six recettes</h3>
              <p>De la blonde accessible à l'IPA de caractère : de quoi plaire à toute votre clientèle.</p>
            </div>
            <div className="pro-arg">
              <div className="ic"><IcCourt /></div>
              <h3>Circuit court</h3>
              <p>Livraison locale, réassort rapide, et un interlocuteur unique : le brasseur.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="pro-steps">
        <div className="wrap">
          <div className="head">
            <HopSeparator />
            <h2>Comment ça se passe</h2>
          </div>
          <div className="steps-grid">
            <div className="pstep">
              <div className="n">1</div>
              <div className="l"></div>
              <h3>On échange</h3>
              <p>Vos volumes, vos recettes préférées, votre matériel de tirage.</p>
            </div>
            <div className="pstep">
              <div className="n">2</div>
              <div className="l"></div>
              <h3>Dégustation</h3>
              <p>On goûte ensemble la gamme pour choisir ce qui colle à votre carte.</p>
            </div>
            <div className="pstep">
              <div className="n">3</div>
              <div className="l"></div>
              <h3>Mise en place</h3>
              <p>Livraison des fûts, conseils de tirage et gestion des consignes.</p>
            </div>
            <div className="pstep">
              <div className="n">4</div>
              <div className="l"></div>
              <h3>Réassort</h3>
              <p>Vous commandez selon vos besoins, on vous suit au fil de la saison.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad" style={{ background: "var(--noir)" }}>
        <div className="wrap">
          <div className="pro-fut">
            <div className="pro-fut-visual">
              <IcFut />
              <span className="cap">Fût 20 L</span>
            </div>
            <div>
              <span className="eyebrow">Le format</span>
              <h2>Un fût, six recettes possibles</h2>
              <p>
                Le fût de 20 litres s'adapte à la plupart des installations de tirage. Choisissez
                la ou les recettes qui correspondent à votre établissement, du quotidien à
                l'édition de saison.
              </p>
              <ul className="fut-specs">
                <li><b>20 L</b><span>≈ 40 pintes ou 80 demis par fût</span></li>
                <li><b>6 recettes</b><span>Blonde, blanche, brune, blé noir, IPA, CBD</span></li>
                <li><b>Local</b><span>Brassé et conditionné à Saint-Joachim</span></li>
                <li><b>Tarif</b><span>Sur devis, selon volumes et recettes</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="pro-form-band">
        <div className="wrap">
          <div className="head">
            <h2>Demander un devis</h2>
            <p>Parlez-nous de votre établissement, on revient vers vous rapidement.</p>
          </div>
          <ProForm />
        </div>
      </section>
    </>
  );
}
