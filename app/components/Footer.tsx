import Icon from "./Icon";
import { ADDRESS_CITY, ADDRESS_STREET, MAPS_URL, OPENING_HOURS, PHONE_DISPLAY, PHONE_HREF } from "../lib/contact";

export default function Footer() {
  return (
    <footer className="bg-industrial text-white pt-10 pb-24 md:pb-6">
      <div className="max-w-[1320px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Icon name="directions_car" className="text-orange text-[28px]" />
              <span className="font-display font-semibold text-xl">Vexin Pièces Autos</span>
            </div>
            <p className="text-[13px] text-slate-soft">
              Franchisé ID Rechange à Gisors (27). Pièces automobiles neuves toutes marques, outillage, matériel
              d&apos;atelier et pare-brise, pour les particuliers et les professionnels.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="font-semibold text-lg uppercase tracking-wide">Magasin &amp; comptoir</h2>
            <p className="text-[13px] text-slate-soft">
              {ADDRESS_STREET}
              <br />
              {ADDRESS_CITY}
            </p>
            <dl className="text-[13px] text-slate-soft space-y-0.5">
              {OPENING_HOURS.map((h) => (
                <div key={h.days}>
                  <dt className="inline">{h.days} : </dt>
                  <dd className="inline">{h.hours}</dd>
                </div>
              ))}
            </dl>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-primary-fixed hover:text-white text-[13px]"
            >
              <Icon name="location_on" className="text-[16px]" />
              Voir sur Google Maps
            </a>
          </div>

          <div className="space-y-2">
            <h2 className="font-semibold text-lg uppercase tracking-wide">Nous joindre</h2>
            <a href={PHONE_HREF} data-place="pied-de-page" className="flex items-center gap-1.5 hover:text-orange-soft transition-colors">
              <Icon name="call" className="text-orange text-[18px]" />
              <span className="font-mono font-bold text-[15px]">{PHONE_DISPLAY}</span>
            </a>
            <a href="#recherche-rapide" className="flex items-center gap-1.5 text-slate-soft hover:text-white text-[13px]">
              <Icon name="mail" className="text-[18px]" />
              Envoyer une demande écrite
            </a>
          </div>
        </div>

        <div className="border-t border-outline/30 pt-4 text-[13px] text-slate-soft">
          © {new Date().getFullYear()} Vexin Pièces Autos – Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}
