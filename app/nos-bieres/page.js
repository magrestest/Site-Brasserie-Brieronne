import Link from "next/link";
import { products, formatPrix } from "@/lib/products";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";

export const metadata = {
  title: "Nos bières",
  description:
    "Découvrez les six bières artisanales de la Brasserie Briéronne, brassées à Saint-Joachim en Brière.",
};

export default function CataloguePage() {
  return (
    <>
      <PageHeader
        eyebrow="La gamme"
        title="Nos six bières"
        subtitle="Chaque référence porte le nom d'un fragment de la Brière. Une couleur de capsule, un caractère."
      />

      <section className="catalog section-pad">
        <div className="wrap">
          <div className="catalog-grid">
            {products.map((b, i) => (
              <Reveal key={b.slug} delay={(i % 3) * 80} as="div">
                <Link href={`/nos-bieres/${b.slug}`} className="cat-card">
                  <div className="cat-card-top">
                    <span className="cat-num">{b.numero}</span>
                    <span
                      className="cat-cap"
                      style={{
                        background: `radial-gradient(circle at 35% 30%, ${b.capsule[0]}, ${b.capsule[1]})`,
                      }}
                    />
                  </div>
                  <h2 className="cat-name">{b.nom}</h2>
                  <span className="cat-style">{b.style}</span>
                  <p className="cat-accroche">{b.accroche}</p>
                  <div className="cat-foot">
                    <span className="cat-price">
                      {formatPrix(b.prix)} <small>· {b.format}</small>
                    </span>
                    <span className="cat-more">Découvrir →</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
