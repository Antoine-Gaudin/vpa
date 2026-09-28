import ActionLink from "./ActionLink";
import Icon from "./Icon";
import { PHONE_DISPLAY, PHONE_HREF } from "../lib/contact";

// Arguments limités à ce que le site affirmait déjà ; tarifs / compte pro à confirmer avec le magasin
const POINTS = [
  { icon: "bolt", text: "La plupart des commandes préparées ou livrées dans la demi-journée" },
  { icon: "directions_car", text: "Pièces neuves pour toutes marques, outillage et matériel d'atelier" },
  { icon: "support_agent", text: "Un interlocuteur au comptoir pour trouver la référence ou une alternative" },
];

export default function ProSection() {
  return (
    <section id="pros" className="bg-surface py-10 lg:py-16">
      <div className="max-w-[1320px] mx-auto px-4 md:px-8">
        <div className="bg-industrial text-white rounded-lg p-6 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="inline-flex items-center gap-1.5 bg-white/10 text-primary-fixed px-3 py-1 rounded-full label-badge uppercase">
              <Icon name="garage" className="text-[16px] text-orange" />
              Espace professionnels
            </span>
            <h2 className="font-display font-bold text-h2-m md:text-h2">
              Garagiste, carrossier, gestionnaire de flotte ?
            </h2>
            <p className="text-body-lg text-outline-variant">
              Vexin Pièces Autos travaille avec les professionnels de l&apos;automobile comme avec les particuliers. Envoyez
              vos besoins, on s&apos;occupe de trouver les pièces.
            </p>
            <ul className="space-y-2">
              {POINTS.map((p) => (
                <li key={p.text} className="flex items-start gap-2 text-[15px]">
                  <Icon name={p.icon} className="text-express text-[20px] mt-px" />
                  {p.text}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-5 flex flex-col gap-3">
            <ActionLink
              href="#devis"
              pro
              trackAs="section pro"
              className="inline-flex items-center justify-center gap-2 bg-orange hover:bg-orange-dark text-white font-display font-semibold text-body-lg px-6 py-4 rounded-lg transition-transform hover:-translate-y-0.5"
            >
              <Icon name="business_center" className="text-[22px]" />
              Faire une demande pro
            </ActionLink>
            <a
              href={PHONE_HREF}
              data-place="section-pro"
              className="inline-flex items-center justify-center gap-2 border-[1.5px] border-white/30 hover:border-white text-white font-display font-semibold text-[15px] px-6 py-3 rounded-lg transition-colors"
            >
              <Icon name="call" className="text-[20px]" />
              Appeler le comptoir · {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
