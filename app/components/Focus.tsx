import ActionLink from "./ActionLink";
import Icon from "./Icon";

type Variant = "blue" | "white" | "tint";

const BLOCKS: {
  variant: Variant;
  badgeIcon: string;
  badge: string;
  title: string;
  lead: string;
  text: string;
  cta: string;
  ctaIcon: string;
  image: string;
  imageAlt: string;
  imageFirst?: boolean;
}[] = [
  {
    variant: "blue",
    badgeIcon: "precision_manufacturing",
    badge: "Équipement professionnel",
    title: "Matériel d'atelier",
    lead: "Nous proposons une large gamme d'équipements pour ateliers et garages : servantes, machines de vidange, démonte-pneus, compresseurs, appareils de géométrie, presses, équilibreuses et bien plus encore.",
    text: "Du petit équipement aux machines professionnelles, nous fournissons du matériel robuste, fiable et adapté à tous les besoins.",
    cta: "Équiper mon garage",
    ctaIcon: "build",
    image: "/categorie/maquette-atelier.jpg",
    imageAlt: "Atelier équipé : servantes, pont élévateur, compresseur",
  },
  {
    variant: "white",
    badgeIcon: "handyman",
    badge: "Clés, coffrets & diagnostic",
    title: "L'outillage",
    lead: "Nous proposons un large choix d'outillage pour les particuliers et les professionnels : clés, douilles, coffrets complets, outils de diagnostic, outils de carrosserie et matériel spécialisé pour toutes les interventions mécaniques.",
    text: "Que ce soit pour un simple entretien ou pour des travaux techniques, nous fournissons des outils fiables, durables et adaptés à tous les besoins.",
    cta: "Demander un outillage",
    ctaIcon: "shopping_bag",
    image: "/categorie/maquette-outillage.jpg",
    imageAlt: "Servante garnie de clés, douilles et outils de diagnostic",
    imageFirst: true,
  },
  {
    variant: "tint",
    badgeIcon: "visibility",
    badge: "Vitrage",
    title: "Pare-brise & vitrage",
    lead: "Nous proposons des pare-brise et vitrages pour tous types de véhicules : citadines, utilitaires, SUV et modèles spécialisés.",
    text: "Que ce soit pour un remplacement complet ou un besoin spécifique, nous fournissons des vitrages fiables, adaptés et prêts à être installés.",
    cta: "Commander un pare-brise",
    ctaIcon: "directions_car",
    image: "/categorie/maquette-pare-brise.jpg",
    imageAlt: "Pare-brise sur chevalet en réserve",
  },
];

const STYLES: Record<Variant, { box: string; badge: string; title: string; lead: string; text: string; cta: string }> = {
  blue: {
    box: "bg-primary text-white shadow-lg",
    badge: "bg-white/15 text-white",
    title: "text-white",
    lead: "text-primary-fixed",
    text: "text-outline-variant",
    cta: "bg-orange hover:bg-orange-dark",
  },
  white: {
    box: "bg-white shadow-sm",
    badge: "bg-primary/10 text-primary",
    title: "text-ink",
    lead: "text-muted",
    text: "text-muted",
    cta: "bg-primary hover:bg-primary-container",
  },
  tint: {
    box: "bg-surface-highest shadow-sm",
    badge: "bg-primary text-white",
    title: "text-ink",
    lead: "text-muted",
    text: "text-muted",
    cta: "bg-orange hover:bg-orange-dark",
  },
};

export default function Focus() {
  return (
    <section className="bg-surface py-10 lg:py-16">
      <div className="max-w-[1320px] mx-auto px-4 md:px-8 space-y-10">
        {BLOCKS.map((b) => {
          const s = STYLES[b.variant];
          return (
            <div key={b.title} className={`rounded-lg overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-center ${s.box}`}>
              <div className={`lg:col-span-7 p-6 lg:p-10 space-y-4 ${b.imageFirst ? "lg:order-2" : ""}`}>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full label-badge uppercase ${s.badge}`}>
                  <Icon name={b.badgeIcon} className="text-[16px]" />
                  {b.badge}
                </span>
                <h2 className={`font-display font-bold text-h2-m md:text-h2 ${s.title}`}>{b.title}</h2>
                <p className={`text-body-lg ${s.lead}`}>{b.lead}</p>
                <p className={`text-[15px] ${s.text}`}>{b.text}</p>
                <ActionLink
                  href="#recherche-rapide"
                  prefill={b.title}
                  trackAs={b.title}
                  className={`inline-flex items-center gap-1.5 text-white font-display font-semibold text-[15px] px-6 py-3 rounded transition-transform hover:-translate-y-0.5 ${s.cta}`}
                >
                  <Icon name={b.ctaIcon} className="text-[18px]" />
                  {b.cta}
                </ActionLink>
              </div>
              <div className={`lg:col-span-5 p-4 lg:p-6 ${b.imageFirst ? "lg:order-1" : ""}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={b.image} alt={b.imageAlt} className="w-full h-60 lg:h-80 object-cover rounded-lg shadow-inner" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
