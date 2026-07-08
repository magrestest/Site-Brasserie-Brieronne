"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { site } from "@/lib/site";
import { useCart } from "@/components/CartProvider";
import { CART_ICON } from "@/components/GoodIcons";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { count, open: openCart } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
      <div className="wrap nav">
        <Link href="/" className="brand">
          {site.nom}
          <small>{site.baseline}</small>
        </Link>

        <button
          className={`burger ${open ? "is-open" : ""}`}
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>

        <nav className={`menu ${open ? "open" : ""}`}>
          {site.nav.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
          <a href={site.contact.telephoneLien} className="tel">
            {site.contact.telephone}
          </a>
          <button className="header-cart" onClick={openCart} aria-label="Voir le panier">
            {CART_ICON}
            {count > 0 && <span className="header-cart-badge">{count}</span>}
          </button>
        </nav>
      </div>
    </header>
  );
}
