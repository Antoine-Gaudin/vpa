import Icon from "./Icon";

const STEPS: { label: string; icon?: string; tone?: "primary" | "orange" | "green" }[] = [
  { label: "Vous", icon: "person" },
  { label: "Entrez votre plaque" },
  { label: "Indiquez la pièce recherchée", icon: "search" },
  { label: "Le site transmet la demande", icon: "send" },
  { label: "VPA cherche la bonne référence", icon: "engineering" },
  { label: "Réponse : prix, délai, disponibilité", icon: "receipt_long", tone: "orange" },
  { label: "Retrait au magasin ou commande", icon: "storefront", tone: "green" },
];

const MOBILE_STEPS: { title: string; text: string; icon: string; tone: "primary" | "orange" | "green" }[] = [
  { title: "Envoyez plaque + pièce", text: "Par le formulaire ou par téléphone", icon: "send", tone: "primary" },
  { title: "On trouve la bonne référence", text: "Un conseiller vérifie la compatibilité", icon: "engineering", tone: "orange" },
  { title: "Prix, délai, et c'est parti", text: "Retrait au magasin ou commande", icon: "storefront", tone: "green" },
];

const TONES = {
  primary: "bg-primary/10 text-primary",
  orange: "bg-orange/10 text-orange",
  green: "bg-express/10 text-express",
};

export default function Steps() {
  return (
    <section className="bg-surface py-10 border-b border-surface-container">
      <div className="max-w-[1320px] mx-auto px-4 md:px-8">
        <div className="bg-white rounded-lg p-5 lg:p-10 shadow-sm border border-surface-container">
          <div className="text-center max-w-3xl mx-auto mb-8 space-y-1">
            <h2 className="font-display font-bold text-h2-m md:text-h2 text-ink">
              Comment commander votre pièce simplement ?
            </h2>
            <p className="font-semibold text-lg text-primary">Un parcours clair, sans erreur de référence</p>
            <div className="w-16 h-1 bg-orange mx-auto rounded-full mt-2" />
          </div>

          {/* Mobile : version courte en 3 étapes */}
          <ol className="md:hidden space-y-2">
            {MOBILE_STEPS.map((step, i) => (
              <li key={step.title} className="flex items-center gap-3 bg-surface-low rounded-lg p-3">
                <span className={`w-11 h-11 shrink-0 rounded-full flex items-center justify-center ${TONES[step.tone]}`}>
                  <Icon name={step.icon} className="text-[24px]" />
                </span>
                <span>
                  <span className="block font-display font-semibold text-[15px] text-ink">
                    {i + 1}. {step.title}
                  </span>
                  <span className="block text-[13px] text-muted">{step.text}</span>
                </span>
              </li>
            ))}
          </ol>

          <ol className="hidden md:grid grid-cols-4 lg:grid-cols-7 gap-2">
            {STEPS.map((step, i) => (
              <li
                key={step.label}
                className={`bg-surface-low rounded-lg p-3 md:p-4 flex flex-col items-center text-center border border-transparent hover:border-primary transition-colors ${
                  i === STEPS.length - 1 ? "col-span-2 lg:col-span-1" : ""
                }`}
              >
                <span className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center font-display text-[13px] font-bold mb-2">
                  {i + 1}
                </span>
                {step.icon ? (
                  <span
                    className={`w-14 h-14 rounded-full flex items-center justify-center mb-2 ${TONES[step.tone ?? "primary"]}`}
                  >
                    <Icon name={step.icon} className="text-[30px]" />
                  </span>
                ) : (
                  <span className="h-14 flex items-center mb-2">
                    <span className="inline-flex items-center bg-white border border-outline px-1.5 py-0.5 rounded-sm font-mono text-[12px] font-bold tracking-wider text-ink">
                      <span className="bg-primary text-white px-1 rounded-sm text-[9px] mr-1">F</span>
                      AB-123-CD
                    </span>
                  </span>
                )}
                <span className="text-[15px] font-semibold text-ink leading-snug">{step.label}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
