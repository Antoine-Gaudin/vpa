"use client";

import { useEffect } from "react";
import { track } from "../lib/track";

// Compte chaque clic sur un numéro de téléphone, où qu'il soit sur la page
export default function CallTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="tel:"]');
      if (!link) return;
      track("Appel", { emplacement: link.dataset.place ?? "inconnu" });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
