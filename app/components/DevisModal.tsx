"use client";

import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import Icon from "./Icon";
import { SendStatus, sendRequest } from "../lib/email";
import { OPEN_DEVIS_EVENT, track } from "../lib/track";
import { useStoreStatus } from "../lib/useStoreStatus";
import { PHONE_DISPLAY, PHONE_HREF } from "../lib/contact";

const inputClass =
  "w-full min-h-11 bg-subtle text-ink border-[1.5px] border-surface-high rounded px-4 py-2 text-[15px] placeholder:text-outline focus:outline-none focus:border-primary-container";

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block label-badge text-ink mb-1">
        {label}
      </label>
      {children}
    </div>
  );
}

// Fenêtre de demande de devis : s'ouvre depuis les boutons « Demander un devis ».
// Plein écran sur mobile, fenêtre centrée sur ordinateur.
export default function DevisModal() {
  const [open, setOpen] = useState(false);
  const [isPro, setIsPro] = useState(false);
  const [status, setStatus] = useState<SendStatus>("idle");
  const [prefill, setPrefill] = useState("");
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const lastFocusRef = useRef<HTMLElement | null>(null);
  const store = useStoreStatus();

  const close = useCallback(() => {
    setOpen(false);
    lastFocusRef.current?.focus();
  }, []);

  useEffect(() => {
    const onOpen = (e: Event) => {
      lastFocusRef.current = document.activeElement as HTMLElement | null;
      setPrefill((e as CustomEvent<string>).detail || "");
      setStatus("idle");
      setOpen(true);
    };
    window.addEventListener(OPEN_DEVIS_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_DEVIS_EVENT, onOpen);
  }, []);

  // Pendant l'ouverture : page figée, focus sur le premier champ, Échap pour fermer
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const id = requestAnimationFrame(() => firstFieldRef.current?.focus());
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      cancelAnimationFrame(id);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const get = (key: string) => String(data.get(key) ?? "");

    setStatus("sending");
    sendRequest(
      isPro ? "pro" : "contact",
      get("name"),
      [
        ["👤 Client", isPro ? "Professionnel" : "Particulier"],
        ["🏢 Entreprise", get("company")],
        ["📞 Téléphone", get("phone")],
        ["🚗 Immatriculation", get("plate").toUpperCase()],
        ["🔧 Pièce recherchée", get("part")],
      ],
      { website: get("website") }
    )
      .then(() => {
        setStatus("success");
        track("Demande envoyée", { formulaire: isPro ? "popup-pro" : "popup" });
        form.reset();
      })
      .catch((error) => {
        console.error("Envoi de la demande :", error);
        setStatus("error");
      });
  };

  if (!open) return null;

  const callbackNote =
    store && !store.open && store.nextOpening
      ? `Le comptoir est fermé : on vous rappelle dès la réouverture, ${store.nextOpening}.`
      : "Un conseiller vous rappelle avec le prix, le délai et la disponibilité.";

  return (
    <div className="fixed inset-0 z-[60] flex items-end md:items-center justify-center md:p-6">
      <div className="absolute inset-0 bg-industrial/70 backdrop-blur-sm" onClick={close} aria-hidden="true" />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="devis-title"
        className="relative bg-white w-full h-full md:h-auto md:max-h-[90vh] md:max-w-xl md:rounded-lg shadow-2xl flex flex-col"
      >
        {/* En-tête */}
        <div className="flex items-start justify-between gap-4 px-5 py-4 border-b border-surface-container">
          <div>
            <h2 id="devis-title" className="font-display font-bold text-2xl text-primary">
              Demander un devis
            </h2>
            <p className="text-[13px] text-muted mt-0.5">Gratuit, sans engagement. On vous rappelle avec le prix et le délai.</p>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Fermer"
            className="w-10 h-10 shrink-0 rounded-full flex items-center justify-center text-muted hover:bg-subtle"
          >
            <Icon name="close" className="text-[24px]" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          {status === "success" ? (
            <div className="text-center py-8 space-y-4">
              <span className="w-16 h-16 mx-auto rounded-full bg-express/10 text-express flex items-center justify-center">
                <Icon name="check_circle" className="text-[40px]" />
              </span>
              <h3 className="font-display font-bold text-xl text-ink">Demande envoyée !</h3>
              <p className="text-[15px] text-muted">{callbackNote}</p>
              <button
                type="button"
                onClick={close}
                className="inline-flex items-center justify-center min-h-11 px-6 rounded bg-primary text-white font-display font-semibold"
              >
                Fermer
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

              {/* Particulier / Professionnel */}
              <div role="radiogroup" aria-label="Vous êtes" className="grid grid-cols-2 gap-1 bg-subtle rounded p-1">
                {[
                  { pro: false, label: "Particulier", icon: "person" },
                  { pro: true, label: "Professionnel", icon: "business_center" },
                ].map((o) => (
                  <button
                    key={o.label}
                    type="button"
                    role="radio"
                    aria-checked={isPro === o.pro}
                    onClick={() => setIsPro(o.pro)}
                    className={`min-h-10 rounded inline-flex items-center justify-center gap-1.5 text-[15px] font-semibold transition-colors ${
                      isPro === o.pro ? "bg-primary text-white shadow-sm" : "text-muted hover:text-ink"
                    }`}
                  >
                    <Icon name={o.icon} className="text-[18px]" />
                    {o.label}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Votre nom *" htmlFor="d-name">
                  <input ref={firstFieldRef} id="d-name" name="name" required autoComplete="name" placeholder="Jean Dupont" className={inputClass} />
                </Field>
                <Field label="Téléphone *" htmlFor="d-phone">
                  <input
                    id="d-phone"
                    name="phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    pattern="[0-9 +.\-]{10,}"
                    title="Un numéro de téléphone, par exemple 06 12 34 56 78"
                    placeholder="06 00 00 00 00"
                    className={inputClass}
                  />
                </Field>
              </div>

              {isPro && (
                <Field label="Entreprise *" htmlFor="d-company">
                  <input id="d-company" name="company" required autoComplete="organization" placeholder="Garage du Vexin" className={inputClass} />
                </Field>
              )}

              <Field label="Plaque d'immatriculation" htmlFor="d-plate">
                <div className="flex items-stretch bg-white rounded overflow-hidden border-[1.5px] border-surface-high focus-within:border-primary-container">
                  <div className="bg-primary text-white w-10 flex items-center justify-center text-[11px] font-bold">F</div>
                  <input
                    id="d-plate"
                    name="plate"
                    maxLength={10}
                    autoComplete="off"
                    placeholder="AB-123-CD"
                    className="w-full min-w-0 text-center font-mono text-plate font-bold uppercase tracking-[0.15em] text-ink py-2 pr-10 focus:outline-none placeholder:text-outline-variant"
                  />
                </div>
                <p className="text-[12px] text-outline mt-1">Facultatif, mais c&apos;est le plus sûr pour trouver la bonne référence.</p>
              </Field>

              <Field label="Pièce ou besoin *" htmlFor="d-part">
                <textarea
                  id="d-part"
                  name="part"
                  required
                  rows={3}
                  defaultValue={prefill}
                  placeholder="Ex : plaquettes et disques avant, kit distribution…"
                  className={inputClass}
                />
              </Field>

              {status === "error" && (
                <p className="p-2 rounded bg-red-50 text-red-700 text-center text-[13px] font-semibold">
                  L&apos;envoi a échoué. Réessayez ou appelez-nous au {PHONE_DISPLAY}.
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full min-h-12 bg-orange hover:bg-orange-dark text-white font-display font-semibold text-body-lg rounded flex items-center justify-center gap-1.5 shadow transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <Icon name="send" className="text-[20px]" />
                {status === "sending" ? "Envoi en cours…" : "Envoyer ma demande"}
              </button>

              <p className="flex items-start justify-center gap-1 text-center text-[13px] text-outline">
                <Icon name="schedule" className="text-[16px] text-express mt-px" />
                {callbackNote}
              </p>
              <p className="text-center text-[13px] text-muted">
                Plus pressé ?{" "}
                <a href={PHONE_HREF} data-place="popup-devis" className="font-semibold text-primary underline underline-offset-2">
                  Appelez le {PHONE_DISPLAY}
                </a>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
