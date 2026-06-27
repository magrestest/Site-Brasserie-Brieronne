import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { HopSeparator } from "@/components/Hop";
import { events } from "@/lib/events";

export const metadata = {
  title: "Événements",
  description:
    "Retrouvez la Brasserie Briéronne sur les marchés et événements de la Brière et alentour.",
};

export default function EvenementsPage() {
  const aVenir = events.length > 0;

  return (
    <>
      <PageHeader
        eyebrow="Agenda"
        title="Où nous trouver"
        subtitle="Retrouvez la Brasserie Briéronne sur les marchés et les rendez-vous de la Brière et alentour."
      />

      <section className="events section-pad">
        <div className="wrap">
          {aVenir ? (
            <>
              <p className="events-intro">
                Pas de boutique fixe : nous venons à vous. Voici les prochaines dates où
                retrouver nos six bières.
              </p>
              <div className="events-list">
                {events.map((e, i) => (
                  <div className="event-card" key={i}>
                    <div className="event-date">
                      <div className="event-day">{e.jour}</div>
                      <div className="event-month">{e.mois}</div>
                    </div>
                    <div className="event-body">
                      <h3>{e.titre}</h3>
                      <div className="event-meta">{e.lieu}</div>
                    </div>
                    <span className={`event-tag ${e.type === "Festival" ? "fest" : ""}`}>
                      {e.type}
                    </span>
                  </div>
                ))}
              </div>
              <p className="events-note">
                Vous organisez un événement, un marché ou tenez un bar&nbsp;?{" "}
                <Link href="/contact">Écrivez-nous</Link>.
              </p>
            </>
          ) : (
            <div className="events-empty">
              <HopSeparator />
              <h2>Notre agenda arrive bientôt.</h2>
              <p>
                Les prochaines dates de marchés et d'événements seront publiées ici très
                vite. En attendant, suivez-nous sur les réseaux ou contactez-nous
                directement pour savoir où nous trouver.
              </p>
              <div className="hero-cta">
                <Link href="/contact" className="btn btn-or">Nous contacter</Link>
                <Link href="/nos-bieres" className="btn btn-ghost-dark">Voir nos bières</Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
