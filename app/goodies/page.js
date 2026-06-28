import PageHeader from "@/components/PageHeader";
import GoodsShop from "@/components/GoodsShop";
import Link from "next/link";

export const metadata = {
  title: "Goodies",
  description:
    "Casquettes, t-shirts, accessoires et étiquettes personnalisées aux couleurs de la Brasserie Briéronne.",
};

export default function GoodiesPage() {
  return (
    <>
      <PageHeader
        eyebrow="La Boutique"
        title="Goodies & accessoires"
        subtitle="Aux couleurs de la Briéronne — à retirer à la brasserie ou à recevoir chez vous."
      />

      <section className="shop section-pad">
        <div className="wrap">
          <p className="goods-intro">
            Portez et faites vivre la brasserie. Le textile et les accessoires sont expédiables
            partout en France ; les bières, elles, restent à retirer sur place.
          </p>

          <GoodsShop />

          <div className="custom-band">
            <div className="ci">
              <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
                <path d="M6 14h23l13 10-13 10H6z" />
                <circle cx="13" cy="24" r="2.4" />
              </svg>
            </div>
            <div>
              <h3>Étiquettes de bière personnalisées</h3>
              <p>
                Mariage, anniversaire, fête d'entreprise ou cadeau : créez vos propres étiquettes
                sur-mesure pour nos bouteilles. On en discute ensemble pour le visuel, le texte et la
                quantité.
              </p>
            </div>
            <Link href="/contact" className="btn btn-or">
              Demander un devis
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
