import ActionLink from "./ActionLink";
import Icon from "./Icon";
import OpenStatus from "./OpenStatus";
import { ADDRESS_CITY, ADDRESS_STREET, PHONE_DISPLAY, PHONE_HREF } from "../lib/contact";

const NAV = [
  { href: "#recherche-rapide", label: "Devis rapide" },
  { href: "#nos-univers", label: "Nos univers" },
  { href: "#comptoir", label: "Le comptoir" },
];

export default function Header() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 shadow-[0_1px_8px_rgba(0,0,0,0.06)]">
      {/* Bandeau statut + ligne directe */}
      <div className="bg-industrial text-white h-9 px-4 md:px-8">
        <div className="max-w-[1320px] h-full mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <OpenStatus />
            <span className="hidden sm:inline text-outline-variant text-[13px] truncate">
              • {ADDRESS_STREET}, {ADDRESS_CITY}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden md:inline-flex items-center gap-1 text-slate-soft">
              <Icon name="verified" className="text-express text-[14px]" />
              <span className="label-badge uppercase">Franchisé ID Rechange</span>
            </span>
            <a
              href={PHONE_HREF}
              data-place="bandeau"
              className="inline-flex items-center gap-1 font-mono text-[13px] font-bold text-orange-soft hover:text-white transition-colors whitespace-nowrap"
            >
              <Icon name="call" className="text-[16px] text-orange" />
              {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </div>

      {/* Barre principale */}
      <div className="h-16 md:h-20 bg-white/95 backdrop-blur-md px-4 md:px-8 flex items-center">
        <div className="max-w-[1320px] w-full mx-auto flex items-center justify-between gap-4">
          <a href="#top" className="flex items-center gap-3 shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/photo/logo.png" alt="Vexin Pièces Autos" className="h-10 md:h-12 w-auto" />
            <span className="hidden sm:inline font-display font-semibold text-xl text-primary tracking-tight">
              Vexin Pièces Autos
            </span>
          </a>

          <nav className="hidden xl:flex items-center gap-6">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[15px] text-muted hover:text-primary transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <ActionLink
            href="#recherche-rapide"
            trackAs="en-tete"
            openDevis
            className="inline-flex items-center gap-1.5 bg-orange hover:bg-orange-dark text-white font-display font-semibold text-[15px] px-3 sm:px-4 py-2 rounded shadow-sm transition-transform hover:translate-y-px whitespace-nowrap"
          >
            <Icon name="request_quote" className="text-[18px]" />
            <span className="sm:hidden">Devis</span>
            <span className="hidden sm:inline">Demander un devis</span>
          </ActionLink>
        </div>
      </div>
    </header>
  );
}
