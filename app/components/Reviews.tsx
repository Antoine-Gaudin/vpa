import Icon from "./Icon";
import Stars from "./Stars";
import { MAPS_URL } from "../lib/contact";
import { GOOGLE_RATING, GOOGLE_REVIEW_COUNT, REVIEWS } from "../lib/reviews";

export default function Reviews() {
  return (
    <section id="avis" className="bg-surface-low py-10 lg:py-16">
      <div className="max-w-[1320px] mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div className="space-y-2">
            <span className="label-badge uppercase text-orange">Ils sont passés au comptoir</span>
            <h2 className="font-display font-bold text-h2-m md:text-h2 text-ink">Ce que disent nos clients</h2>
          </div>
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="self-start md:self-auto inline-flex items-center gap-3 bg-white rounded-lg px-4 py-3 shadow-sm border border-surface-container hover:border-primary transition-colors"
          >
            <span className="font-display font-extrabold text-3xl text-ink">{GOOGLE_RATING}</span>
            <span>
              <Stars className="text-[18px]" />
              <span className="block text-[13px] text-muted">
                {GOOGLE_REVIEW_COUNT} avis Google · tous 5/5
              </span>
            </span>
            <Icon name="open_in_new" className="text-[16px] text-outline" />
          </a>
        </div>

        {/* Mobile : carrousel horizontal ; ordinateur : grille */}
        <ul className="-mx-4 px-4 flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 md:mx-0 md:px-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible">
          {REVIEWS.map((r) => (
            <li
              key={r.author}
              className="snap-start shrink-0 w-[85%] md:w-auto bg-white rounded-lg p-5 shadow-sm flex flex-col gap-3"
            >
              <div className="flex items-center justify-between">
                <Stars className="text-[18px]" />
                <span className="label-badge text-primary bg-primary/10 px-2 py-0.5 rounded-sm">{r.tag}</span>
              </div>
              <p className="text-[15px] text-ink flex-1">« {r.text} »</p>
              <p className="text-[13px] text-muted">
                <span className="font-semibold text-ink">{r.author}</span> · avis Google
              </p>
            </li>
          ))}
        </ul>
        <p className="md:hidden text-center text-[13px] text-outline mt-2">Faites glisser pour lire les autres avis →</p>
      </div>
    </section>
  );
}
