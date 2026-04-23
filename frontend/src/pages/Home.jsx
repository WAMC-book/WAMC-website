import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Download, Wrench, FileText, Quote } from "lucide-react";
import BookCover from "@/components/BookCover";
import ChapterDownloadModal from "@/components/ChapterDownloadModal";
import CTASection from "@/components/CTASection";
import TestimonialsGrid from "@/components/TestimonialsGrid";
import useAmazonUrl from "@/lib/useAmazonUrl";
import { useLang } from "@/lib/LanguageContext";

export default function Home() {
  const [open, setOpen] = useState(false);
  const { primary: amazonUrl, alt: amazonAlt, altLabel } = useAmazonUrl();
  const { t } = useLang();

  const RESOURCE_CARDS = [
    { icon: Wrench, ...t.home.resourcesPreview.cards.tools, to: "/tools", key: "tools" },
    { icon: FileText, ...t.home.resourcesPreview.cards.articles, to: "/resources", key: "articles" },
    { icon: Quote, ...t.home.resourcesPreview.cards.quotes, to: "/quotes", key: "quotes" },
  ];

  return (
    <div data-testid="home-page" className="bg-white">
      {/* ABOVE THE FOLD */}
      <section className="relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 pt-8 sm:pt-12 lg:pt-20 pb-20 md:pb-28 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="flex items-center gap-3 mb-5 fade-up fade-up-1">
              <span className="rule-accent" />
              <span className="uppercase text-[11px] tracking-[0.22em] text-[var(--brand-muted)]">
                {t.hero.eyebrow}
              </span>
            </div>
            <h1
              data-testid="hero-headline"
              className="hero-title font-display uppercase text-[44px] sm:text-[56px] lg:text-[76px] leading-[0.95] text-[var(--brand-ink)] tracking-tight fade-up fade-up-2"
            >
              {t.hero.title1}{" "}
              <span className="text-[var(--brand-blue)]">{t.hero.title_offer}</span>{" "}
              {t.hero.title2}{" "}
              <span className="text-[var(--brand-blue)]">{t.hero.title_clients}</span>.
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-[var(--brand-dark)] mt-6 max-w-xl leading-relaxed fade-up fade-up-3">
              {t.hero.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mt-9 fade-up fade-up-4">
              <a
                href={amazonUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="hero-buy-book-btn"
                className="btn-primary inline-flex items-center justify-center h-14 px-7 rounded-full text-sm font-semibold uppercase tracking-wider"
              >
                {t.cta.buy} <ArrowRight size={16} className="ml-2" />
              </a>
              <button
                type="button"
                onClick={() => setOpen(true)}
                data-testid="hero-get-chapters-btn"
                className="btn-ghost-dark inline-flex items-center justify-center gap-2 h-14 px-7 rounded-full text-sm font-semibold uppercase tracking-wider"
              >
                <Download size={16} /> {t.cta.downloadChapters}
              </button>
            </div>

            <a
              href={amazonAlt}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="hero-buy-book-alt"
              className="mt-4 inline-block text-[11px] uppercase tracking-widest text-[var(--brand-muted)] hover:text-[var(--brand-blue)] transition-colors fade-up fade-up-5"
            >
              {t.cta.alsoOn} {altLabel} →
            </a>
          </div>

          <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center lg:justify-end fade-up fade-up-3">
            <div className="relative">
              <BookCover size="xl" />
              <div className="absolute -z-10 -top-4 -left-4 sm:-top-6 sm:-left-6 w-20 h-20 sm:w-28 sm:h-28 bg-[var(--brand-blue)]/10 rounded-sm" />
              <div className="absolute -z-10 -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 w-20 h-20 sm:w-24 sm:h-24 border-2 border-[var(--brand-dark)] rounded-sm" />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1 — THE PROBLEM */}
      <section
        className="bg-white border-t border-[var(--brand-border)] py-20 md:py-28"
        data-testid="problem-section"
      >
        <div className="max-w-[960px] mx-auto px-6 lg:px-10">
          <span className="rule-accent mb-5 block" />
          <h2 className="font-display uppercase text-[36px] sm:text-5xl lg:text-6xl leading-[0.95] text-[var(--brand-ink)] mb-8">
            {t.home.problem.title1}{" "}
            <span className="text-[var(--brand-blue)]">{t.home.problem.title_blue}</span>{" "}
            {t.home.problem.title2}
          </h2>
          <div className="space-y-5 text-[17px] md:text-lg leading-[1.75] text-[var(--brand-dark)] max-w-2xl">
            <p>
              {t.home.problem.p1a}
              <br className="hidden sm:block" />
              {t.home.problem.p1b}
            </p>
            <p>
              {t.home.problem.p2a}
              <br className="hidden sm:block" />
              {t.home.problem.p2b}
            </p>
            <p className="text-[var(--brand-ink)] font-medium">
              {t.home.problem.p3}
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2 — WHY THIS MATTERS */}
      <section
        className="py-20 md:py-28 border-t border-[var(--brand-border)] bg-white"
        data-testid="why-matters-section"
      >
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 lg:gap-20 items-center">
          <div>
            <span className="rule-accent mb-5 block" />
            <h2 className="font-display uppercase text-[36px] sm:text-5xl leading-[0.95] text-[var(--brand-ink)] mb-8">
              {t.home.why.title1}{" "}
              <span className="text-[var(--brand-blue)]">{t.home.why.title_blue}</span>
            </h2>
            <div className="space-y-5 text-[16px] sm:text-[17px] leading-[1.75] text-[var(--brand-dark)]">
              <p>{t.home.why.p1}</p>
              <p className="text-[var(--brand-muted)]">
                {t.home.why.p2a}<br />
                {t.home.why.p2b}<br />
                {t.home.why.p2c}
              </p>
              <p className="text-[var(--brand-ink)] font-medium">
                {t.home.why.p3a} {t.home.why.p3b}
              </p>
            </div>
          </div>
          <div className="relative order-first md:order-last">
            <img
              src="/assets/images/stock-crosswalk.jpg"
              alt=""
              className="w-full aspect-[4/5] object-cover rounded-sm"
            />
            <div className="absolute -bottom-5 -right-3 sm:-bottom-6 sm:-right-6 bg-[var(--brand-blue)] text-white p-5 sm:p-6 rounded-sm max-w-[240px]">
              <p className="font-display uppercase text-base sm:text-lg leading-tight">
                {t.home.why.imgCaption}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — WHAT THIS BOOK HELPS YOU DO */}
      <section
        className="py-20 md:py-28 bg-[var(--brand-dark)] text-white"
        data-testid="what-book-helps-section"
      >
        <div className="max-w-[1100px] mx-auto px-6 lg:px-10">
          <span className="rule-accent mb-5 block" />
          <h2 className="font-display uppercase text-[36px] sm:text-5xl lg:text-6xl leading-[0.95] mb-6">
            {t.home.explore.title1}{" "}
            <span className="text-[var(--brand-blue)]">{t.home.explore.title_blue}</span>
          </h2>
          <p className="text-base sm:text-lg text-white/75 max-w-xl leading-relaxed mb-12 md:mb-14">
            {t.home.explore.subtitle}
          </p>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {t.home.explore.items.map((item, i) => (
              <li
                key={i}
                data-testid={`explore-item-${i}`}
                className="group border border-white/10 rounded-sm p-5 sm:p-6 hover:border-[var(--brand-blue)] hover:bg-white/5 transition-all"
              >
                <div className="flex gap-4 items-start">
                  <span className="font-display text-2xl text-[var(--brand-blue)] shrink-0">
                    0{i + 1}
                  </span>
                  <p className="text-[16px] sm:text-[17px] leading-relaxed text-white/90">{item}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SECTION 4 — FREE CHAPTER CTA */}
      <section
        className="py-20 md:py-28 bg-white border-t border-[var(--brand-border)]"
        data-testid="free-chapters-section"
      >
        <div className="max-w-[1100px] mx-auto px-6 lg:px-10 grid grid-cols-1 md:grid-cols-12 gap-10 md:items-center">
          <div className="md:col-span-7">
            <span className="rule-accent mb-5 block" />
            <h2 className="font-display uppercase text-[36px] sm:text-5xl leading-[0.95] text-[var(--brand-ink)] mb-6">
              {t.home.sample.title1}{" "}
              <span className="text-[var(--brand-blue)]">{t.home.sample.title_blue}</span>
            </h2>
            <p className="text-[16px] sm:text-[17px] leading-[1.75] text-[var(--brand-dark)] mb-8 max-w-lg">
              {t.home.sample.body}
            </p>
            <button
              type="button"
              onClick={() => setOpen(true)}
              data-testid="section-get-chapters-btn"
              className="btn-primary inline-flex items-center gap-2 h-14 px-7 rounded-full text-sm font-semibold uppercase tracking-wider"
            >
              <Download size={16} /> {t.cta.getChapters}
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
        data-testid="testimonials-section"
      >
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <span className="rule-accent mb-5 block" />
          <h2 className="font-display uppercase text-[36px] sm:text-5xl leading-[0.95] text-[var(--brand-ink)] mb-12 md:mb-14 max-w-3xl">
            {t.home.testimonialsTitle} <span className="text-[var(--brand-blue)]">{t.home.testimonialsTitleBlue}</span>
          </h2>
          <TestimonialsGrid testPrefix="testimonial" />
        </div>
      </section>

      {/* SECTION 6 — ABOUT (SHORT) */}
      <section
        className="py-20 md:py-28 bg-white border-t border-[var(--brand-border)]"
        data-testid="about-short-section"
      >
        <div className="max-w-[1100px] mx-auto px-6 lg:px-10 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-center">
          <div className="md:col-span-5">
            <div className="relative">
              <img
                src="/assets/images/stock-street.jpg"
                alt="Antoine B. Carrière"
                className="w-full aspect-[4/5] object-cover rounded-sm"
              />
              <div className="absolute -bottom-4 -left-4 bg-[var(--brand-dark)] text-white px-5 py-3 rounded-sm">
                <p className="font-display uppercase text-sm tracking-wider">
                  {t.home.aboutShort.badge}
                </p>
              </div>
            </div>
          </div>
          <div className="md:col-span-7">
            <span className="rule-accent mb-5 block" />
            <h2 className="font-display uppercase text-[36px] sm:text-5xl leading-[0.95] text-[var(--brand-ink)] mb-6">
              {t.home.aboutShort.title}
            </h2>
            <div className="space-y-5 text-[16px] sm:text-[17px] leading-[1.75] text-[var(--brand-dark)]">
              <p>
                <strong className="text-[var(--brand-ink)]">{t.home.aboutShort.p1a}</strong>
                {t.home.aboutShort.p1b}
              </p>
              <p>
                {t.home.aboutShort.p2}
              </p>
            </div>
            <Link
              to="/about"
              data-testid="home-learn-more-link"
              className="mt-8 inline-flex items-center gap-2 text-[var(--brand-blue)] font-semibold uppercase tracking-wider text-xs link-underline"
            >
              {t.cta.learnMore} <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 7 — RESOURCES PREVIEW */}
      <section
        className="py-20 md:py-28 bg-white border-t border-[var(--brand-border)]"
        data-testid="resources-preview-section"
      >
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="max-w-2xl mb-12 md:mb-14">
            <span className="rule-accent mb-5 block" />
            <h2 className="font-display uppercase text-[36px] sm:text-5xl leading-[0.95] text-[var(--brand-ink)] mb-5">
              {t.home.resourcesPreview.title1}{" "}
              <span className="text-[var(--brand-blue)]">{t.home.resourcesPreview.title_blue}</span>
            </h2>
            <p className="text-[var(--brand-muted)] text-base md:text-lg leading-relaxed">
              {t.home.resourcesPreview.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {RESOURCE_CARDS.map((c) => (
              <Link
                key={c.key}
                to={c.to}
                data-testid={`resource-preview-${c.key}`}
                className="group bg-white border border-[var(--brand-border)] rounded-md p-7 sm:p-8 transition-all duration-300 hover:border-[var(--brand-blue)] hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_rgba(0,173,255,0.25)] flex flex-col"
              >
                <div className="w-12 h-12 rounded-sm bg-[var(--brand-dark)] text-white grid place-items-center mb-6 group-hover:bg-[var(--brand-blue)] transition-colors">
                  <c.icon size={22} />
                </div>
                <h3 className="font-display uppercase text-2xl text-[var(--brand-ink)] leading-tight mb-3">
                  {c.title}
                </h3>
                <p className="text-[var(--brand-muted)] text-[15px] leading-relaxed mb-6 flex-1">
                  {c.body}
                </p>
                <span className="inline-flex items-center gap-2 text-[var(--brand-blue)] font-semibold uppercase tracking-wider text-xs">
                  {c.cta} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <Link
              to="/resources"
              data-testid="explore-resources-link"
              className="btn-ghost-dark inline-flex items-center justify-center h-12 px-7 rounded-full text-sm font-semibold uppercase tracking-wider"
            >
              {t.cta.exploreResources} <ArrowRight size={14} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <CTASection />

      <ChapterDownloadModal open={open} onOpenChange={setOpen} />
    </div>
  );
}
