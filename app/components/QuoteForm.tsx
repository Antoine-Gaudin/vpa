"use client";

import { FormEvent, useEffect, useState } from "react";
import Icon from "./Icon";
import { SendStatus, sendRequest } from "../lib/email";
import { PRO_EVENT, track } from "../lib/track";

const inputClass =
  "w-full min-h-11 bg-subtle text-ink border-[1.5px] border-transparent rounded px-4 py-2 text-[15px] placeholder:text-outline focus:outline-none focus:border-primary-container";

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

export default function QuoteForm() {
  const [status, setStatus] = useState<SendStatus>("idle");
  const [isPro, setIsPro] = useState(false);

  // Le bouton « Faire une demande pro » bascule le formulaire en mode professionnel
  useEffect(() => {
    const onPro = () => setIsPro(true);
    window.addEventListener(PRO_EVENT, onPro);
    return () => window.removeEventListener(PRO_EVENT, onPro);
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const get = (key: string) => String(data.get(key) ?? "");

    setStatus("sending");
    sendRequest(isPro ? "pro" : "contact", get("name"), [
      ["👤 Client", isPro ? "Professionnel" : "Particulier"],
      ["🏢 Entreprise", get("company")],
      ["📋 SIRET", get("siret")],
      ["📞 Téléphone", get("phone")],
      ["📧 Email", get("email")],
      ["🚗 Véhicule", get("vehicle").toUpperCase()],
      ["💬 Besoin", get("message")],
    ], { website: get("website") })
      .then(() => {
        setStatus("success");
        track("Demande envoyée", { formulaire: isPro ? "detaille-pro" : "detaille" });
        form.reset();
        setIsPro(false);
      })
      .catch((error) => {
        console.error("Envoi de la demande :", error);
        setStatus("error");
      });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field label="Vous êtes" htmlFor="q-type">
          <select
            id="q-type"
            name="type"
            className={inputClass}
            value={isPro ? "pro" : "particulier"}
            onChange={(e) => setIsPro(e.target.value === "pro")}
          >
            <option value="particulier">Particulier</option>
            <option value="pro">Professionnel (garage, flotte…)</option>
          </select>
        </Field>
        <Field label="Nom *" htmlFor="q-name">
          <input id="q-name" name="name" required autoComplete="name" placeholder="Jean Dupont" className={inputClass} />
        </Field>
      </div>

      {isPro && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Entreprise *" htmlFor="q-company">
            <input id="q-company" name="company" required autoComplete="organization" placeholder="Garage du Vexin" className={inputClass} />
          </Field>
          <Field label="SIRET" htmlFor="q-siret">
            <input id="q-siret" name="siret" inputMode="numeric" placeholder="123 456 789 00012" className={inputClass} />
          </Field>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field label="Téléphone *" htmlFor="q-phone">
          <input id="q-phone" name="phone" type="tel" required autoComplete="tel" pattern="[0-9 +.\-]{10,}" title="Un numéro de téléphone, par exemple 06 12 34 56 78" placeholder="06 00 00 00 00" className={inputClass} />
        </Field>
        <Field label="Email" htmlFor="q-email">
          <input id="q-email" name="email" type="email" autoComplete="email" placeholder="vous@exemple.fr" className={inputClass} />
        </Field>
      </div>

      <Field label="Immatriculation ou modèle" htmlFor="q-vehicle">
        <input id="q-vehicle" name="vehicle" placeholder="AB-123-CD ou Clio 4 1.5 dCi" className={`${inputClass} uppercase placeholder:normal-case`} />
      </Field>

      <Field label="Pièces recherchées ou travaux prévus *" htmlFor="q-message">
        <textarea
          id="q-message"
          name="message"
          required
          rows={3}
          placeholder="Ex : disques avant + plaquettes, kit distribution…"
          className={inputClass}
        />
      </Field>

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full min-h-12 bg-orange hover:bg-orange-dark text-white font-display font-semibold text-body-lg rounded flex items-center justify-center gap-1.5 shadow transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <Icon name="send" className="text-[20px]" />
        {status === "sending" ? "Envoi en cours…" : "Envoyer ma demande"}
      </button>

      {status === "success" && (
        <p className="p-2 rounded bg-express/10 text-express text-center font-semibold text-[15px]">
          Demande envoyée ! Notre comptoir vous recontacte au plus vite.
        </p>
      )}
      {status === "error" && (
        <p className="p-2 rounded bg-red-50 text-red-700 text-center font-semibold text-[15px]">
          L&apos;envoi a échoué. Réessayez ou appelez-nous directement.
        </p>
      )}
    </form>
  );
}
