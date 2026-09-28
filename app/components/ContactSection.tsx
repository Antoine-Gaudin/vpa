import Icon from "./Icon";
import OpenStatus from "./OpenStatus";
import QuoteForm from "./QuoteForm";
import {
  ADDRESS_CITY,
  ADDRESS_STREET,
  MAPS_EMBED,
  MAPS_URL,
  OPENING_HOURS,
  PHONE_DISPLAY,
  PHONE_HREF,
} from "../lib/contact";

export default function ContactSection() {
  return (
    <section className="bg-surface py-10 lg:py-16">
      <div className="max-w-[1320px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Demande de devis */}
          <div id="devis" className="lg:col-span-6 bg-white p-5 lg:p-10 rounded-lg shadow-md space-y-5">
            <div className="space-y-2">
              <span className="label-badge uppercase text-orange">Plusieurs pièces, un devis pro ?</span>
              <h2 className="font-display font-bold text-h2-m md:text-h2 text-primary">
                Demande détaillée ou professionnelle
              </h2>
              <p className="text-[15px] text-muted">
                Décrivez votre besoin en détail : un conseiller VPA vous confirme la disponibilité et le tarif. Pour une
                seule pièce, la{" "}
                <a href="#recherche-rapide" className="text-primary underline underline-offset-2">
                  demande en 3 infos
                </a>{" "}
                va plus vite.
              </p>
            </div>
            <QuoteForm />
          </div>

          {/* Comptoir */}
          <div id="comptoir" className="lg:col-span-6 bg-industrial text-white p-5 lg:p-10 rounded-lg shadow-md flex flex-col gap-5">
            <div className="space-y-2">
              <OpenStatus />
              <h2 className="font-display font-bold text-h2-m md:text-h2">Comptoir &amp; retrait des pièces</h2>
              <p className="text-[15px] text-outline-variant">
                Venez retirer vos commandes ou trouver vos pièces directement auprès de nos conseillers.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[13px]">
              <div className="bg-white/10 p-4 rounded">
                <div className="font-semibold text-[15px] text-orange-soft mb-1 flex items-center gap-1.5">
                  <Icon name="location_on" className="text-[18px]" />
                  Adresse
                </div>
                <p>
                  {ADDRESS_STREET}
                  <br />
                  {ADDRESS_CITY}
                </p>
              </div>
              <div className="bg-white/10 p-4 rounded">
                <div className="font-semibold text-[15px] text-orange-soft mb-1 flex items-center gap-1.5">
                  <Icon name="schedule" className="text-[18px]" />
                  Horaires
                </div>
                <dl className="space-y-0.5">
                  {OPENING_HOURS.map((h) => (
                    <div key={h.days} className="flex flex-wrap justify-between gap-x-2">
                      <dt className="text-outline-variant">{h.days}</dt>
                      <dd>{h.hours}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            <div className="rounded overflow-hidden h-56 bg-white/5">
              <iframe
                title="Vexin Pièces Autos sur Google Maps"
                src={MAPS_EMBED}
                className="w-full h-full border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="self-start inline-flex items-center gap-1 text-primary-fixed hover:text-white text-[13px]"
            >
              Ouvrir l&apos;itinéraire dans Google Maps
              <Icon name="open_in_new" className="text-[14px]" />
            </a>

            <a
              href={PHONE_HREF}
              data-place="comptoir"
              className="mt-auto bg-orange hover:bg-orange-dark rounded-lg py-4 px-5 flex items-center justify-between shadow transition-transform hover:-translate-y-0.5"
            >
              <span className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Icon name="call" className="text-[22px]" />
                </span>
                <span>
                  <span className="block label-badge uppercase text-orange-soft">Ligne directe comptoir</span>
                  <span className="block font-display font-bold text-[26px] leading-8 tracking-wide">{PHONE_DISPLAY}</span>
                </span>
              </span>
              <Icon name="chevron_right" className="text-[24px]" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
