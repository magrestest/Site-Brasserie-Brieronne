"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { site } from "@/lib/site";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
      <div className="wrap nav">
        <Link href="/" className="brand">
          {site.nom}
          <small>{site.baseline}</small>
        </Link>

        <button
          className="burger"
          aria-label="Ouvrir le menu"
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
        </nav>
      </div>
    </header>
  );
}
