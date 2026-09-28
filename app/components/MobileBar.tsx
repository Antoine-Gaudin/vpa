import ActionLink from "./ActionLink";
import Icon from "./Icon";
import { PHONE_HREF } from "../lib/contact";

// Barre fixe en bas d'écran, mobile uniquement : les deux actions toujours à portée du pouce
export default function MobileBar() {
  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-surface-container shadow-[0_-4px_16px_rgba(11,17,30,0.08)] px-3 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] grid grid-cols-2 gap-2">
      <a
        href={PHONE_HREF}
        data-place="barre-mobile"
        className="min-h-12 inline-flex items-center justify-center gap-1.5 bg-orange text-white font-display font-semibold text-[15px] rounded"
      >
        <Icon name="call" className="text-[20px]" />
        Appeler
      </a>
      <ActionLink
        href="#recherche-rapide"
        trackAs="barre mobile"
        openDevis
        className="min-h-12 inline-flex items-center justify-center gap-1.5 bg-primary text-white font-display font-semibold text-[15px] rounded"
      >
        <Icon name="request_quote" className="text-[20px]" />
        Devis gratuit
      </ActionLink>
    </div>
  );
}
