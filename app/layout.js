import { Cormorant_Garamond, Marcellus, Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { HopSymbol } from "@/components/Hop";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const titre = Marcellus({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-titre",
  display: "swap",
});

const corps = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-corps",
  display: "swap",
});

export const metadata = {
  title: {
    default: `${site.nom} — Bières artisanales de Brière`,
    template: `%s — ${site.nom}`,
  },
  description: site.description,
  openGraph: {
    title: `${site.nom} — Bières artisanales de Brière`,
    description: site.description,
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${serif.variable} ${titre.variable} ${corps.variable}`}>
      <body>
        <HopSymbol />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
