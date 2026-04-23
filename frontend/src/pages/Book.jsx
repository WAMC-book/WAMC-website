import { useState } from "react";
import { ArrowRight, Download } from "lucide-react";
import BookCover from "@/components/BookCover";
import ChapterDownloadModal from "@/components/ChapterDownloadModal";
import CTASection from "@/components/CTASection";
import TestimonialsGrid from "@/components/TestimonialsGrid";
import useAmazonUrl from "@/lib/useAmazonUrl";
import { BOOK, AUTHOR } from "@/lib/constants";
import { useLang } from "@/lib/LanguageContext";

export default function Book() {
  const [open, setOpen] = useState(false);
  const { primary: amazonUrl, alt: amazonAlt, altLabel } = useAmazonUrl();
  const { t, lang } = useLang();

  const formatLabel = lang === "fr"
    ? "Imprimé · Autres formats à venir"
    : BOOK.format;

  return (
    <div data-testid="book-page" className="bg-white">
      {/* HERO */}
      <section className="py-12 sm:py-16 md:py-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-6 flex justify-center lg:justify-start order-2 lg:order-1">
            <div className="relative">
              <BookCover size="xl" />
              <div className="absolute -z-10 -top-4 -left-4 sm:-top-6 sm:-left-6 w-20 h-20 sm:w-24 sm:h-24 bg-[var(--brand-blue)]/12 rounded-sm" />
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="flex items-center gap-3 mb-5">
              <span className="rule-accent" />
              <span className="uppercase text-[11px] tracking-[0.22em] text-[var(--brand-muted)]">
                {t.book.eyebrow}
              </span>
            </div>
            <h1
              data-testid="book-headline"
              className="hero-title font-display uppercase text-[44px] sm:text-6xl lg:text-7xl leading-[0.92] text-[var(--brand-ink)]"
            >
              {t.book.title1} <span className="text-[var(--brand-blue)]">{t.book.title_blue}</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-[var(--brand-dark)] mt-6 leading-relaxed max-w-lg">
              {t.book.subtitle}
            </p>
            <p className="text-sm text-[var(--brand-muted)] uppercase tracking-widest mt-4">
              {t.hero.eyebrow.replace(/^By /, lang === "fr" ? "Par " : "By ")}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-9">
              <a
                href={amazonUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="book-buy-btn"
                className="btn-primary inline-flex items-center justify-center h-14 px-7 rounded-full text-sm font-semibold uppercase tracking-wider"
              >
                {t.cta.buyNow} <ArrowRight size={16} className="ml-2" />
              </a>
              <button
                type="button"
                onClick={() => setOpen(true)}
                data-testid="book-chapters-btn"
                className="btn-ghost-dark inline-flex items-center justify-center gap-2 h-14 px-7 rounded-full text-sm font-semibold uppercase tracking-wider"
              >
                <Download size={16} /> {t.cta.getChapters}
              </button>
            </div>

            <a
              href={amazonAlt}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="book-buy-btn-alt"
              className="mt-4 inline-block text-[11px] uppercase tracking-widest text-[var(--brand-muted)] hover:text-[var(--brand-blue)] transition-colors"
            >
              {t.cta.alsoOn} {altLabel} →
            </a>

            <dl className="mt-10 grid grid-cols-3 gap-4 sm:gap-6 border-t border-[var(--brand-border)] pt-6 text-sm">
              <div>
                <dt className="text-[10px] sm:text-[11px] uppercase tracking-widest text-[var(--brand-muted)]">{t.book.pages}</dt>
                <dd className="font-display text-xl sm:text-2xl text-[var(--brand-ink)] mt-1">{BOOK.pages}</dd>
              </div>
              <div>
                <dt className="text-[10px] sm:text-[11px] uppercase tracking-widest text-[var(--brand-muted)]">{t.book.format}</dt>
                <dd className="font-display text-sm sm:text-base text-[var(--brand-ink)] mt-1 leading-snug">{formatLabel}</dd>
              </div>
              <div>
                <dt className="text-[10px] sm:text-[11px] uppercase tracking-widest text-[var(--brand-muted)]">{t.book.language}</dt>
                <dd className="font-display text-xl sm:text-2xl text-[var(--brand-ink)] mt-1">{BOOK.language}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* SECTION 1 — CORE IDEA */}
      <section
        className="bg-white border-t border-[var(--brand-border)] py-20 md:py-28"
        data-testid="core-idea-section"
      >
        <div className="max-w-[960px] mx-auto px-6 lg:px-10">
          <span className="rule-accent mb-5 block" />
          <h2 className="font-display uppercase text-[36px] sm:text-5xl lg:text-6xl leading-[0.95] text-[var(--brand-ink)] mb-8">
            {t.book.coreIdea.title1}{" "}
            <span className="text-[var(--brand-blue)]">{t.book.coreIdea.title_blue}</span>
          </h2>
          <div className="space-y-5 text-[16px] sm:text-[17px] leading-[1.75] text-[var(--brand-dark)] max-w-2xl">
            <p>{t.book.coreIdea.p1}</p>
            <p className="text-[var(--brand-muted)]">
              {t.book.coreIdea.p2a}<br />
              {t.book.coreIdea.p2b}<br />
              {t.book.coreIdea.p2c}
            </p>
            <p className="text-[var(--brand-ink)] font-medium">
              {t.book.coreIdea.p3a} {t.book.coreIdea.p3b}
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2 — THE GAP */}
      <section
        className="py-20 md:py-28 bg-white border-t border-[var(--brand-border)]"
        data-testid="gap-section"
      >
        <div className="max-w-[1100px] mx-auto px-6 lg:px-10 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-start">
          <div className="md:col-span-5">
            <span className="rule-accent mb-5 block" />
            <h2 className="font-display uppercase text-[36px] sm:text-5xl leading-[0.95] text-[var(--brand-ink)]">
              {t.book.gap.title1}{" "}
              <span className="text-[var(--brand-blue)]">{t.book.gap.title_blue}</span>
            </h2>
          </div>
          <div className="md:col-span-7 space-y-5 text-[16px] sm:text-[17px] leading-[1.75] text-[var(--brand-dark)]">
            <p>{t.book.gap.p1}</p>
            <p className="text-[var(--brand-ink)] font-medium">
              {t.book.gap.p2}
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3 — WHAT YOU WILL GAIN */}
      <section
        className="py-20 md:py-28 bg-[var(--brand-dark)] text-white"
        data-testid="gains-section"
      >
        <div className="max-w-[1100px] mx-auto px-6 lg:px-10">
          <span className="rule-accent mb-5 block" />
          <h2 className="font-display uppercase text-[36px] sm:text-5xl leading-[0.95] mb-10 md:mb-12 max-w-2xl">
            {t.book.gains.title1}{" "}
            <span className="text-[var(--brand-blue)]">{t.book.gains.title_blue}</span>
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {t.book.gains.items.map((g, i) => (
              <li
                key={i}
                data-testid={`gain-${i}`}
                className="group border border-white/10 rounded-sm p-6 sm:p-7 hover:border-[var(--brand-blue)] hover:bg-white/5 transition-all flex gap-4 items-start"
              >
                <span className="font-display text-2xl text-[var(--brand-blue)] shrink-0">
                  0{i + 1}
                </span>
                <p className="text-[16px] sm:text-[17px] leading-relaxed">{g}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SECTION 4 — SAMPLE */}
      <section
        className="py-20 md:py-28 bg-white border-t border-[var(--brand-border)]"
        data-testid="sample-section"
      >
        <div className="max-w-[1100px] mx-auto px-6 lg:px-10 grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7">
            <span className="rule-accent mb-5 block" />
            <h2 className="font-display uppercase text-[36px] sm:text-5xl leading-[0.95] text-[var(--brand-ink)] mb-6">
              {t.book.sample.title1}{" "}
              <span className="text-[var(--brand-blue)]">{t.book.sample.title_blue}</span>
            </h2>
            <p className="text-[16px] sm:text-[17px] leading-[1.75] text-[var(--brand-dark)] mb-8 max-w-lg">
              {t.book.sample.body}
            </p>
            <button
              type="button"
              onClick={() => setOpen(true)}
              data-testid="sample-btn"
              className="btn-primary inline-flex items-center gap-2 h-14 px-7 rounded-full text-sm font-semibold uppercase tracking-wider"
            >
              <Download size={16} /> {t.cta.downloadChapters}
            </button>
          </div>
          <div className="md:col-span-5 flex justify-center md:justify-end">
            <BookCover size="md" />
          </div>
        </div>
      </section>

      {/* SECTION 5 — TESTIMONIALS */}
      <section
        className="py-20 md:py-28 bg-white border-t border-[var(--brand-border)]"
        data-testid="book-testimonials"
      >
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <span className="rule-accent mb-5 block" />
          <h2 className="font-display uppercase text-[36px] sm:text-5xl leading-[0.95] text-[var(--brand-ink)] mb-12 md:mb-14 max-w-3xl">
            {t.book.testimonialsTitle}
          </h2>
          <TestimonialsGrid testPrefix="book-testimonial" />
        </div>
      </section>

      {/* SECTION 6 — FORMATS */}
      <section
        className="py-16 md:py-20 bg-white border-t border-[var(--brand-border)]"
        data-testid="formats-section"
      >
        <div className="max-w-[900px] mx-auto px-6 lg:px-10 text-center">
          <span className="rule-accent mb-5 inline-block" />
          <h2 className="font-display uppercase text-[36px] sm:text-5xl leading-[0.95] text-[var(--brand-ink)] mb-8">
            {t.book.formats.title}
          </h2>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-10 text-[var(--brand-dark)]">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[var(--brand-blue)]" />
              <span className="font-display uppercase text-lg sm:text-xl">{t.book.formats.printAvailable}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[var(--brand-muted)]" />
              <span className="font-display uppercase text-lg sm:text-xl text-[var(--brand-muted)]">
                {t.book.formats.otherComing}
              </span>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title={t.book.ctaTitle}
        subtitle={t.book.ctaSubtitle}
      />

      <ChapterDownloadModal open={open} onOpenChange={setOpen} />
    </div>
  );
}
