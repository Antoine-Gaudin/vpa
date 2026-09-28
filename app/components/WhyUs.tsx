import Icon from "./Icon";

const REASONS = [
  {
    icon: "local_shipping",
    tone: "bg-primary/10 text-primary",
    title: "La réactivité ID Rechange",
    text: "La force du réseau ID Rechange : la plupart des commandes sont préparées ou livrées dans la demi-journée.",
  },
  {
    icon: "handshake",
    tone: "bg-orange/10 text-orange",
    title: "Particuliers comme professionnels",
    text: "Le même service pour le passionné qui entretient sa voiture et pour le garage qui a un véhicule sur le pont.",
  },
  {
    icon: "check_circle",
    tone: "bg-express/10 text-express",
    title: "La bonne référence",
    text: "L'équipe accompagne chaque client pour trouver la bonne pièce, ou une alternative adaptée quand elle n'est pas disponible.",
  },
];

export default function WhyUs() {
  return (
    <section className="bg-surface-low py-10 lg:py-16">
      <div className="max-w-[1320px] mx-auto px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <h2 className="font-display font-bold text-h2-m md:text-h2 text-ink">
            Pourquoi choisir Vexin Pièces Autos ?
          </h2>
          <div className="w-16 h-1 bg-orange mx-auto rounded-full" />
          <p className="text-[15px] text-muted">
            La force d&apos;un réseau national combinée à la proximité de votre magasin local.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REASONS.map((r) => (
            <div key={r.title} className="bg-white p-6 rounded-lg shadow-sm space-y-3">
              <span className={`w-12 h-12 rounded-lg flex items-center justify-center ${r.tone}`}>
                <Icon name={r.icon} className="text-[26px]" />
              </span>
              <h3 className="font-display font-semibold text-xl text-ink">{r.title}</h3>
              <p className="text-[15px] text-muted">{r.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
