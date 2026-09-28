"use client";

import { OPEN_DEVIS_EVENT, PREFILL_EVENT, PRO_EVENT, track } from "../lib/track";

// Lien d'action : peut ouvrir la fenêtre de devis, pré-remplir le formulaire court
// ou basculer le formulaire détaillé en mode pro
export default function ActionLink({
  href,
  prefill,
  pro = false,
  openDevis = false,
  trackAs,
  className,
  children,
}: {
  href: string;
  prefill?: string;
  pro?: boolean;
  openDevis?: boolean;
  trackAs: string;
  className?: string;
  children: React.ReactNode;
}) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    track("Clic CTA", { cta: trackAs });
    if (openDevis) {
      // Le lien reste un vrai lien (#…) si le script n'est pas chargé ; sinon on ouvre la fenêtre
      e.preventDefault();
      window.dispatchEvent(new CustomEvent(OPEN_DEVIS_EVENT, { detail: prefill ?? "" }));
      return;
    }
    if (prefill) window.dispatchEvent(new CustomEvent(PREFILL_EVENT, { detail: prefill }));
    if (pro) window.dispatchEvent(new CustomEvent(PRO_EVENT));
  };

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
