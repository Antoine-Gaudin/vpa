import Icon from "./Icon";
import { ADDRESS_STREET } from "../lib/contact";

const ITEMS = [
  { icon: "bolt", tone: "orange", title: "Préparé en demi-journée", text: "Pour la plupart des commandes" },
  { icon: "verified", tone: "primary", title: "Pièces neuves toutes marques", text: "Pour particuliers et professionnels" },
  { icon: "support_agent", tone: "orange", title: "Conseil personnalisé", text: "La bonne référence ou une alternative adaptée" },
  { icon: "storefront", tone: "primary", title: "Comptoir à Gisors (27140)", text: ADDRESS_STREET },
];

export default function Reassurance() {
  return (
    <section className="bg-white shadow-md">
      <div className="max-w-[1320px] mx-auto px-4 md:px-8 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ITEMS.map((item) => (
            <div key={item.title} className="flex items-center gap-3 p-1">
              <span
                className={`w-12 h-12 shrink-0 rounded-lg flex items-center justify-center ${
                  item.tone === "orange" ? "bg-orange/10 text-orange" : "bg-primary/10 text-primary"
                }`}
              >
                <Icon name={item.icon} className="text-[26px]" />
              </span>
              <div>
                <h2 className="font-display font-semibold text-[15px] text-ink">{item.title}</h2>
                <p className="text-[13px] text-muted">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
