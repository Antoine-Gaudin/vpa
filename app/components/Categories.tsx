import ActionLink from "./ActionLink";
import Icon from "./Icon";

const CATEGORIES = [
  {
    icon: "filter_alt",
    title: "Moteur & Filtration",
    text: "Filtres (air, huile, carburant), pièces moteur, courroies, distribution, alternateurs, démarreurs…",
  },
  {
    icon: "disc_full",
    title: "Freinage & Suspension",
    text: "Plaquettes, disques, tambours, kits de frein, étriers, capteurs ABS, amortisseurs, ressorts, bras de suspension, rotules, biellettes, silent-blocs…",
  },
  {
    icon: "airport_shuttle",
    title: "Carrosserie & Habitacle",
    text: "Rétroviseurs, poignées, pare-chocs, lève-vitres…",
  },
  {
    icon: "electrical_services",
    title: "Électricité & Électronique",
    text: "Batteries, capteurs, éclairage, faisceaux, démarreurs, alternateurs, relais…",
  },
  {
    icon: "settings_ethernet",
    title: "Suspension & Direction",
    text: "Amortisseurs, bras, rotules, silent-blocs, biellettes, colonne de direction…",
  },
  {
    icon: "sync_alt",
    title: "Transmission & Embrayage",
    text: "Cardans, kits d'embrayage, volants moteur, boîte, joints homocinétiques…",
  },
];

export default function Categories() {
  return (
    <section id="nos-univers" className="bg-surface-low py-10 lg:py-16">
      <div className="max-w-[1320px] mx-auto px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 text-primary font-display font-semibold text-[13px] uppercase tracking-wider">
            <Icon name="build_circle" className="text-[18px]" />
            Catalogue VPA
          </div>
          <h2 className="font-display font-bold text-h2-m md:text-h2 text-ink">Voici tout ce qu&apos;on propose</h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
          <p className="text-[15px] text-muted">
            Des pièces neuves pour toutes marques, disponibles au comptoir de Gisors ou livrées chez votre réparateur.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => (
            <article
              key={cat.title}
              className="group bg-white rounded-lg p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="space-y-3">
                <span className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <Icon name={cat.icon} className="text-[26px]" />
                </span>
                <h3 className="font-display font-semibold text-xl text-ink">{cat.title}</h3>
                <p className="text-[15px] text-muted">{cat.text}</p>
              </div>
              <div className="pt-4 mt-4 border-t border-surface-container flex justify-end">
                <ActionLink
                  href="#recherche-rapide"
                  prefill={cat.title}
                  trackAs={`rayon ${cat.title}`}
                  className="inline-flex items-center gap-1 text-primary group-hover:text-orange font-display font-semibold text-[13px] transition-colors"
                >
                  Demander une pièce de ce rayon
                  <Icon name="arrow_forward" className="text-[16px]" />
                </ActionLink>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
