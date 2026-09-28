import Icon from "./Icon";

const CHIPS = [
  { icon: "thumb_up", label: "Particuliers & ateliers" },
  { icon: "directions_car", label: "Toutes marques" },
  { icon: "support", label: "Accompagnement sur la référence" },
];

export default function About() {
  return (
    <section className="bg-surface py-10">
      <div className="max-w-[1320px] mx-auto px-4 md:px-8">
        <div className="bg-white rounded-lg p-5 lg:p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-1.5 text-orange font-display font-semibold text-[13px] uppercase tracking-wider">
                <Icon name="verified" className="text-[18px]" />
                Franchisé ID Rechange à Gisors
              </div>
              <h2 className="font-display font-bold text-h2-m md:text-h2 text-primary">
                Un service local, simple et efficace pour tous vos besoins en pièces auto
              </h2>
              <p className="text-body-lg text-muted">
                Vexin Pièces Autos, franchisé <strong className="text-ink font-semibold">ID Rechange</strong>, est une
                entreprise basée à Gisors spécialisée dans la vente de pièces automobiles neuves pour toutes marques.
                Nous travaillons avec les particuliers comme avec les professionnels, en proposant des pièces fiables et
                rapidement disponibles.
              </p>
              <p className="text-[15px] text-muted">
                Notre réactivité fait la différence : la plupart des commandes sont préparées ou livrées dans la
                demi-journée, et l&apos;équipe accompagne chaque client pour trouver la bonne référence ou une
                alternative adaptée.
              </p>
              <div className="pt-1 flex flex-wrap gap-3">
                {CHIPS.map((chip) => (
                  <span
                    key={chip.label}
                    className="inline-flex items-center gap-1.5 bg-surface-container px-4 py-1.5 rounded text-primary font-display font-semibold text-[13px]"
                  >
                    <Icon name={chip.icon} className="text-[18px]" />
                    {chip.label}
                  </span>
                ))}
              </div>
            </div>

            <figure className="lg:col-span-5 rounded-lg overflow-hidden bg-surface-low">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/photo/header.png"
                alt="La façade et le comptoir du magasin Vexin Pièces Autos à Gisors"
                className="w-full h-56 md:h-72 object-cover"
              />
              <figcaption className="flex items-center justify-between gap-3 px-4 py-3 text-[13px]">
                <span className="font-semibold text-ink">Notre magasin, avenue de Verdun</span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/marques/idrechangehd.png" alt="ID Rechange" className="h-7 w-auto" />
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
