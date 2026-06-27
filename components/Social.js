import { site } from "@/lib/site";

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z" />
  </svg>
);

// Liste des réseaux non vides
function links() {
  const out = [];
  if (site.reseaux.instagram)
    out.push({ key: "instagram", href: site.reseaux.instagram, label: "Instagram", Icon: InstagramIcon });
  if (site.reseaux.facebook)
    out.push({ key: "facebook", href: site.reseaux.facebook, label: "Facebook", Icon: FacebookIcon });
  return out;
}

// variant : "footer" | "contact"
export default function Social({ variant = "footer" }) {
  const list = links();
  if (list.length === 0) return null;
  const cls = variant === "contact" ? "ci-social" : "foot-social";
  return (
    <div className={cls}>
      {list.map(({ key, href, label, Icon }) => (
        <a key={key} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
          <Icon />
        </a>
      ))}
    </div>
  );
}
