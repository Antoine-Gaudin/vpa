// Mesure des conversions : n'envoie rien tant qu'aucun outil (Plausible ou GA4) n'est branché
type Props = Record<string, string>;

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Props }) => void;
    gtag?: (command: "event", event: string, params?: Props) => void;
  }
}

export function track(event: string, props: Props = {}) {
  if (typeof window === "undefined") return;
  window.plausible?.(event, { props });
  window.gtag?.("event", event, props);
  if (process.env.NODE_ENV === "development") console.info("[track]", event, props);
}

// Événement interne : un bouton demande au formulaire court de se pré-remplir
export const PREFILL_EVENT = "vpa:prefill";
// Événement interne : un bouton demande au formulaire détaillé de passer en mode pro
export const PRO_EVENT = "vpa:pro";
// Événement interne : un bouton ouvre la fenêtre de demande de devis
export const OPEN_DEVIS_EVENT = "vpa:devis";
