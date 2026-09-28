import ActionLink from "./ActionLink";
import Icon from "./Icon";
import QuickRequestForm from "./QuickRequestForm";
import Stars from "./Stars";
import { PHONE_DISPLAY, PHONE_HREF } from "../lib/contact";
import { GOOGLE_RATING, GOOGLE_REVIEW_COUNT } from "../lib/reviews";

export default function Hero() {
  return (
    <section className="relative bg-industrial text-white py-10 lg:py-16 overflow-hidden">
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#0a4db8_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="relative max-w-[1320px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-1.5 bg-white/10 text-primary-fixed px-4 py-1 rounded-full">
              <Icon name="verified" className="text-[16px] text-orange" />
              <span className="label-badge uppercase">Franchisé ID Rechange • Particuliers &amp; pros</span>
            </div>
            <h1 className="font-display font-extrabold text-hero-m lg:text-hero">
              La bonne pièce auto, <span className="text-orange">trouvée pour vous à Gisors.</span>
            </h1>
            <p className="text-body-lg text-outline-variant max-w-2xl">
              Vexin Pièces Autos vend des pièces automobiles neuves toutes marques, aux particuliers comme aux
              professionnels. La plupart des commandes sont préparées ou livrées dans la demi-journée.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-1">
              <a
                href={PHONE_HREF}
                data-place="accueil"
                className="inline-flex items-center justify-center gap-2 bg-orange hover:bg-orange-dark text-white font-display font-semibold text-body-lg px-6 py-4 rounded-lg shadow-lg transition-transform hover:-translate-y-0.5"
              >
                <Icon name="call" className="text-[24px]" />
                {PHONE_DISPLAY}
              </a>
              <ActionLink
                href="#recherche-rapide"
                openDevis
                trackAs="accueil devis"
                className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-container text-white font-display font-semibold text-[15px] px-6 py-4 rounded-lg transition-colors"
              >
                <Icon name="request_quote" className="text-[20px]" />
                Demander un devis
              </ActionLink>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-5 text-[13px] text-surface-high">
              <a href="#avis" className="inline-flex items-center gap-2 hover:text-white">
                <Stars className="text-[18px]" />
                <span>
                  <strong className="text-white">{GOOGLE_RATING}/5</strong> · {GOOGLE_REVIEW_COUNT} avis Google
                </span>
              </a>
              <span className="inline-flex items-center gap-2">
                <Icon name="check_circle" className="text-express text-[18px]" />
                Référence vérifiée à partir de votre plaque
              </span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <QuickRequestForm />
          </div>
        </div>
      </div>
    </section>
  );
}
