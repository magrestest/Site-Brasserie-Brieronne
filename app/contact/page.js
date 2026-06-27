import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";
import Social from "@/components/Social";
import { site } from "@/lib/site";

export const metadata = {
  title: "Contact",
  description:
    "Contactez la Brasserie Briéronne à Saint-Joachim : adresse, téléphone, email et horaires d'ouverture.",
};

export default function ContactPage() {
  const { adresse, horaires, horairesNote } = site.contact;
  const hasSocial = site.reseaux.instagram || site.reseaux.facebook;

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Nous écrire, nous trouver"
        subtitle="Une question, une commande, un événement ? Nous vous répondons directement."
      />

      <section className="contact section-pad">
        <div className="wrap">
          <div className="contact-grid">
            {/* Coordonnées */}
            <div className="contact-info">
              <div className="ci-block">
                <h3>Adresse</h3>
                <p>
                  {adresse.rue}
                  <br />
                  {adresse.codePostal} {adresse.ville}
                  <br />
                  <span className="small">Brière, Loire-Atlantique</span>
                </p>
              </div>

              <div className="ci-block">
                <h3>Téléphone</h3>
                <a href={site.contact.telephoneLien}>{site.contact.telephone}</a>
              </div>

              <div className="ci-block">
                <h3>Email</h3>
                <a href={site.contact.emailLien}>{site.contact.email}</a>
              </div>

              {horaires?.length > 0 && (
                <div className="ci-block">
                  <h3>Horaires</h3>
                  <ul className="ci-hours">
                    {horaires.map((h, i) => (
                      <li key={i}>
                        <span>{h.jours}</span>
                        <span className="h">{h.heures}</span>
                      </li>
                    ))}
                  </ul>
                  {horairesNote && (
                    <p className="small" style={{ marginTop: "10px" }}>
                      {horairesNote}
                    </p>
                  )}
                </div>
              )}

              {hasSocial && (
                <div className="ci-block">
                  <h3>Suivez-nous</h3>
                  <Social variant="contact" />
                </div>
              )}
            </div>

            {/* Formulaire */}
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
