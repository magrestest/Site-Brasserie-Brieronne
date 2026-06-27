import Link from "next/link";
import { HopSeparator } from "@/components/Hop";

export const metadata = { title: "Page introuvable" };

export default function NotFound() {
  return (
    <section className="notfound">
      <div className="wrap">
        <span className="notfound-code">404</span>
        <h1>Cette page s'est perdue dans les marais.</h1>
        <p>La page que vous cherchez n'existe pas, ou plus.</p>
        <div className="notfound-sep">
          <HopSeparator />
        </div>
        <Link href="/" className="btn btn-or">
          Retour à l'accueil
        </Link>
      </div>
    </section>
  );
}
