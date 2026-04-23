import { Star, Quote as QuoteIcon } from "lucide-react";
import { TESTIMONIALS, AMAZON_REVIEWS_URL } from "@/lib/constants";
import { useLang } from "@/lib/LanguageContext";

function Stars({ count = 5 }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={14}
          className={
            i <= count
              ? "fill-[#FFB400] text-[#FFB400]"
              : "text-[var(--brand-border-strong)]"
          }
        />
      ))}
    </div>
  );
}

export default function TestimonialsGrid({ testPrefix = "testimonial" }) {
  const { t } = useLang();

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {TESTIMONIALS.map((item, i) => (
          <figure
            key={i}
            data-testid={`${testPrefix}-${i}`}
            className="bg-white border border-[var(--brand-border)] rounded-md p-6 sm:p-7 flex flex-col hover:border-[var(--brand-blue)] transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <Stars count={item.stars || 5} />
              <QuoteIcon className="text-[var(--brand-blue)]/70" size={18} />
            </div>
            {item.title && (
              <h4 className="font-display uppercase text-lg text-[var(--brand-ink)] leading-tight mb-3">
                {item.title}
              </h4>
            )}
            <blockquote className="text-[15px] leading-[1.7] text-[var(--brand-dark)] flex-1">
              "{item.quote}"
            </blockquote>
            <figcaption className="mt-5 pt-4 border-t border-[var(--brand-border)]">
              <div className="font-display uppercase text-sm text-[var(--brand-ink)]">
                {item.author}
              </div>
              <div className="text-xs text-[var(--brand-muted)] mt-1">{item.role}</div>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <a
          href={AMAZON_REVIEWS_URL}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="amazon-reviews-link"
          className="inline-flex items-center gap-2 text-[var(--brand-blue)] font-semibold uppercase tracking-widest text-xs link-underline"
        >
          {t.testimonials.readMore}
        </a>
      </div>
    </>
  );
}
