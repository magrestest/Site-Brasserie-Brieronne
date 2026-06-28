// Icônes partagées entre la page Goodies et le panier global.
export const GOOD_ICONS = {
  cap: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
      <path d="M11 27a13 13 0 0 1 26 0" />
      <path d="M37 27c4 0 6 2 6 5H24V14" />
      <path d="M24 14c-2 0-3 1-3 3" />
    </svg>
  ),
  tshirt: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
      <path d="M18 9 8 15l4 6 4-2v20h16V19l4 2 4-6-10-6a6 6 0 0 1-12 0z" />
    </svg>
  ),
  hoodie: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
      <path d="M18 9 8 15l4 6 4-2v20h16V19l4 2 4-6-10-6" />
      <path d="M18 9a6 6 0 0 0 12 0" />
      <path d="M21 30h6v9" />
    </svg>
  ),
  opener: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="9" y="20" width="30" height="8" rx="4" />
      <circle cx="32" cy="24" r="2.4" />
    </svg>
  ),
  glass: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
      <path d="M16 11h15l-2 28H18z" />
      <path d="M31 17h6v15h-6" />
      <path d="M16.5 19h14" />
    </svg>
  ),
  coaster: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="24" cy="24" r="15" />
      <circle cx="24" cy="24" r="8.5" />
    </svg>
  ),
  tote: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
      <path d="M13 16h22l-2 24H15z" />
      <path d="M19 16v-2a5 5 0 0 1 10 0v2" />
    </svg>
  ),
};

export const CART_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M3 3h2l2.4 12.3a1 1 0 0 0 1 .7h9.7a1 1 0 0 0 1-.8L21 7H6" />
    <circle cx="9" cy="20" r="1.4" />
    <circle cx="18" cy="20" r="1.4" />
  </svg>
);

// Icônes des formats (carton, pack, fût)
export const FORMAT_ICONS = {
  carton: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
      <path d="M6 15 24 7l18 8-18 8z" />
      <path d="M6 15v18l18 8 18-8V15" />
      <path d="M24 23v18" />
    </svg>
  ),
  pack: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
      <rect x="9" y="12" width="9" height="28" rx="2" />
      <rect x="20" y="12" width="8" height="28" rx="2" />
      <rect x="30" y="12" width="9" height="28" rx="2" />
      <path d="M11 12v-3h5v3M22 12v-3h4v3M32 12v-3h5v3" />
    </svg>
  ),
  fut: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
      <ellipse cx="24" cy="9" rx="11" ry="3.5" />
      <path d="M13 9v30c0 1.9 4.9 3.5 11 3.5s11-1.6 11-3.5V9" />
      <path d="M11.5 19h25M11.5 29h25" />
    </svg>
  ),
};
