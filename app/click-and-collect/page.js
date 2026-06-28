import PageHeader from "@/components/PageHeader";
import BeerShop from "@/components/BeerShop";

export const metadata = {
  title: "Click & Collect",
  description:
    "Commandez les bières de la Brasserie Briéronne à l'unité, en carton panaché ou en pack découverte, et retirez votre commande à la brasserie.",
};

export default function ClickAndCollectPage() {
  return (
    <>
      <PageHeader
        eyebrow="Boutique"
        title="Click & Collect"
        subtitle="Composez votre commande, payez en ligne ou au retrait, et venez la chercher à la brasserie."
      />

      <section className="shop section-pad">
        <div className="wrap">
          <p className="shop-intro">
            Toutes nos bières sont en 33 cl. Achetez à l'unité, composez un carton de 12 panaché, ou
            offrez-vous le pack découverte des six recettes.
          </p>
          <BeerShop />
        </div>
      </section>
    </>
  );
}
