import Link from "next/link";
import { site } from "@/lib/site";
import Social from "@/components/Social";

export default function Footer() {
  const { adresse } = site.contact;
  return (
    <footer className="site-footer" id="footer">
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <div className="brand">
              {site.nom}
              <small style={{ color: "var(--ambre-clair)" }}>{site.baseline}</small>
            </div>
            <p>{site.description}</p>
            <Social variant="footer" />
          </div>

          <div className="foot-col">
            <h4>Nous trouver</h4>
            <p>
              {adresse.rue}
              <br />
              {adresse.codePostal} {adresse.ville}
            </p>
            <a href={site.contact.telephoneLien}>{site.contact.telephone}</a>
            {site.contact.email && (
              <a href={site.contact.emailLien}>{site.contact.email}</a>
            )}
          </div>

          <div className="foot-col">
            <h4>Explorer</h4>
            {site.nav.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="foot-bottom">
          <span>
            © {site.legal.annee} {site.nom} — {site.legal.avertissement}
          </span>
          <span>{site.legal.majeurs}</span>
        </div>
      </div>
    </footer>
  );
}
