"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Icon from "./Icon";
import { SendStatus, sendRequest } from "../lib/email";
import { PREFILL_EVENT, track } from "../lib/track";
import { useStoreStatus } from "../lib/useStoreStatus";

function StepLabel({ n, children, htmlFor }: { n: number; children: React.ReactNode; htmlFor: string }) {
  return (
    <label htmlFor={htmlFor} className="label-badge text-ink flex items-center gap-1.5">
      <span className="w-5 h-5 rounded-full bg-primary text-white text-[11px] font-bold inline-flex items-center justify-center">
        {n}
      </span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full min-h-11 bg-subtle text-ink border-[1.5px] border-surface-high rounded px-4 py-2 text-[15px] placeholder:text-outline focus:outline-none focus:border-primary-container";

export default function QuickRequestForm() {
  const [status, setStatus] = useState<SendStatus>("idle");
  const [highlight, setHighlight] = useState(false);
  const partRef = useRef<HTMLInputElement>(null);
  const store = useStoreStatus();

  // Un bouton « Demander cette pièce » pré-remplit le champ pièce
  useEffect(() => {
    const onPrefill = (e: Event) => {
      const value = (e as CustomEvent<string>).detail;
      if (partRef.current) partRef.current.value = value;
      setHighlight(true);
      setTimeout(() => setHighlight(false), 1500);
    };
    window.addEventListener(PREFILL_EVENT, onPrefill);
    return () => window.removeEventListener(PREFILL_EVENT, onPrefill);
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const get = (key: string) => String(data.get(key) ?? "");

    setStatus("sending");
    sendRequest("contact", "Demande rapide (plaque)", [
      ["🚗 Immatriculation", get("plate").toUpperCase()],
      ["🔧 Pièce recherchée", get("part")],
      ["📞 Téléphone", get("phone")],
    ], { website: get("website") })
      .then(() => {
        setStatus("success");
        track("Demande envoyée", { formulaire: "rapide" });
        form.reset();
      })
      .catch((error) => {
        console.error("Envoi de la demande :", error);
        setStatus("error");
      });
  };

  const callbackNote =
    store && !store.open && store.nextOpening
      ? `Comptoir fermé : on vous rappelle dès la réouverture, ${store.nextOpening}.`
      : "Un conseiller vous rappelle avec le prix, le délai et la disponibilité.";

  return (
    <div
      id="recherche-rapide"
      className={`bg-white text-ink rounded-lg p-5 md:p-6 shadow-2xl transition-shadow ${
        highlight ? "ring-4 ring-orange/60" : ""
      }`}
    >
      <div className="flex items-center justify-between gap-2 pb-3 border-b border-subtle">
        <div className="flex items-center gap-1.5">
          <Icon name="manage_search" className="text-orange text-[22px]" />
          <span className="font-semibold text-lg text-primary">Votre pièce en 3 infos</span>
        </div>
        <span className="label-badge text-express bg-express/10 px-2 py-0.5 rounded-sm whitespace-nowrap">Gratuit</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 pt-4">
        <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
        <div className="space-y-1.5">
          <StepLabel n={1} htmlFor="plate">Votre plaque d&apos;immatriculation</StepLabel>
          <div className="flex items-stretch bg-white rounded overflow-hidden border-[1.5px] border-surface-high focus-within:border-primary-container">
            <div className="bg-primary text-white w-10 flex items-center justify-center text-[11px] font-bold">F</div>
            <input
              id="plate"
              name="plate"
              required
              maxLength={10}
              autoComplete="off"
              placeholder="AB-123-CD"
              className="w-full min-w-0 text-center font-mono text-plate font-bold uppercase tracking-[0.15em] text-ink py-2 pr-10 focus:outline-none placeholder:text-outline-variant"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <StepLabel n={2} htmlFor="part">La pièce ou le besoin</StepLabel>
          <input
            ref={partRef}
            id="part"
            name="part"
            required
            placeholder="Ex : plaquettes avant, kit distribution…"
            className={inputClass}
          />
        </div>

        <div className="space-y-1.5">
          <StepLabel n={3} htmlFor="quick-phone">Votre téléphone pour vous rappeler</StepLabel>
          <input
            id="quick-phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            pattern="[0-9 +.\-]{10,}"
            title="Un numéro de téléphone, par exemple 06 12 34 56 78"
            placeholder="06 00 00 00 00"
            className={inputClass}
          />
        </div>

        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full min-h-12 bg-orange hover:bg-orange-dark text-white font-display font-semibold text-[15px] rounded flex items-center justify-center gap-1.5 shadow transition-transform hover:translate-y-px disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <Icon name="send" className="text-[20px]" />
          {status === "sending" ? "Envoi en cours…" : "Recevoir prix et délai"}
        </button>

        {status === "success" && (
          <p className="p-2 rounded bg-express/10 text-express text-center text-[13px] font-semibold">
            Demande reçue ! {callbackNote}
          </p>
        )}
        {status === "error" && (
          <p className="p-2 rounded bg-red-50 text-red-700 text-center text-[13px] font-semibold">
            L&apos;envoi a échoué. Réessayez ou appelez-nous directement.
          </p>
        )}
        {status !== "success" && (
          <p className="flex items-start justify-center gap-1 text-center text-[13px] text-outline">
            <Icon name="schedule" className="text-[16px] text-express mt-px" />
            {callbackNote}
          </p>
        )}
      </form>
    </div>
  );
}
