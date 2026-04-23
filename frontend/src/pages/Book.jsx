import { useState } from "react";
import { ArrowRight, Download, Quote } from "lucide-react";
import BookCover from "@/components/BookCover";
import ChapterDownloadModal from "@/components/ChapterDownloadModal";
import CTASection from "@/components/CTASection";
import useAmazonUrl from "@/lib/useAmazonUrl";
import { BOOK, AUTHOR, TESTIMONIALS } from "@/lib/constants";

const GAINS = [
  "a clearer understanding of who your clients really are",
  "a stronger awareness of the buying decisions in front of you",
  "better alignment between what you offer and who it is for",
  "more intentional communication with the people you want to reach",
];

export default function Book() {
  const [open, setOpen] = useState(false);
  const { primary: amazonUrl, alt: amazonAlt, altLabel } = useAmazonUrl();

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
                The book
              </span>
            </div>
            <h1
              data-testid="book-headline"
              className="hero-title font-display uppercase text-[44px] sm:text-6xl lg:text-7xl leading-[0.92] text-[var(--brand-ink)]"
            >
              The <span className="text-[var(--brand-blue)]">book</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-[var(--brand-dark)] mt-6 leading-relaxed max-w-lg">
              A practical starting point if you want to better understand your
              clients — before you build, pitch, or scale anything else.
            </p>
            <p className="text-sm text-[var(--brand-muted)] uppercase tracking-widest mt-4">
              By {AUTHOR.name}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-9">
              <a
                href={amazonUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="book-buy-btn"
                className="btn-primary inline-flex items-center justify-center h-14 px-7 rounded-full text-sm font-semibold uppercase tracking-wider"
              >
                Buy now <ArrowRight size={16} className="ml-2" />
              </a>
              <button
                type="button"
                onClick={() => setOpen(true)}
                data-testid="book-chapters-btn"
                className="btn-ghost-dark inline-flex items-center justify-center gap-2 h-14 px-7 rounded-full text-sm font-semibold uppercase tracking-wider"
              >
                <Download size={16} /> Get the first 3 chapters
              </button>
            </div>

            <a
              href={amazonAlt}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="book-buy-btn-alt"
              className="mt-4 inline-block text-[11px] uppercase tracking-widest text-[var(--brand-muted)] hover:text-[var(--brand-blue)] transition-colors"
            >
              Also on {altLabel} →
            </a>

            <dl className="mt-10 grid grid-cols-3 gap-4 sm:gap-6 border-t border-[var(--brand-border)] pt-6 text-sm">
              <div>
                <dt className="text-[10px] sm:text-[11px] uppercase tracking-widest text-[var(--brand-muted)]">Pages</dt>
                <dd className="font-display text-xl sm:text-2xl text-[var(--brand-ink)] mt-1">{BOOK.pages}</dd>
              </div>
              <div>
                <dt className="text-[10px] sm:text-[11px] uppercase tracking-widest text-[var(--brand-muted)]">Format</dt>
                <dd className="font-display text-sm sm:text-base text-[var(--brand-ink)] mt-1 leading-snug">{BOOK.format}</dd>
              </div>
              <div>
                <dt className="text-[10px] sm:text-[11px] uppercase tracking-widest text-[var(--brand-muted)]">Language</dt>
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
            Your business cannot exist without <span className="text-[var(--brand-blue)]">clients</span>
          </h2>
          <div className="space-y-5 text-[16px] sm:text-[17px] leading-[1.75] text-[var(--brand-dark)] max-w-2xl">
            <p>Your business moves forward when people see value in what you offer.</p>
            <p className="text-[var(--brand-muted)]">
              Not when your idea is good.<br />
              Not when your product is complete.<br />
              But when a real person recognizes a need and decides to act.
            </p>
            <p className="text-[var(--brand-ink)] font-medium">
              Understanding that person is not optional.
              It is central to everything that follows.
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
              Most entrepreneurs do not know their <span className="text-[var(--brand-blue)]">clients</span>
            </h2>
          </div>
          <div className="md:col-span-7 space-y-5 text-[16px] sm:text-[17px] leading-[1.75] text-[var(--brand-dark)]">
            <p>
              You may have become an expert in what you offer. But that expertise
              does not automatically extend to understanding the people you are
              trying to reach.
            </p>
            <p className="text-[var(--brand-ink)] font-medium">
              This book was written to close that gap.
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
            What you will <span className="text-[var(--brand-blue)]">gain</span>
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {GAINS.map((g, i) => (
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
              Read before you <span className="text-[var(--brand-blue)]">commit</span>
            </h2>
            <p className="text-[16px] sm:text-[17px] leading-[1.75] text-[var(--brand-dark)] mb-8 max-w-lg">
              Download the first 3 chapters and decide for yourself whether this
              approach resonates with how you want to build your business.
            </p>
            <button
              type="button"
              onClick={() => setOpen(true)}
              data-testid="sample-btn"
              className="btn-primary inline-flex items-center gap-2 h-14 px-7 rounded-full text-sm font-semibold uppercase tracking-wider"
            >
              <Download size={16} /> Download the first 3 chapters
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
            Early readers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {TESTIMONIALS.map((t, i) => (
              <figure
                key={i}
                data-testid={`book-testimonial-${i}`}
                className="bg-white border border-[var(--brand-border)] rounded-md p-7 sm:p-8 flex flex-col"
              >
                <Quote className="text-[var(--brand-blue)] mb-5" size={24} />
                <blockquote className="text-[16px] sm:text-[17px] leading-[1.7] text-[var(--brand-dark)] flex-1">
                  "{t.quote}"
                </blockquote>
                <figcaption className="mt-6 pt-5 border-t border-[var(--brand-border)]">
                  <div className="font-display uppercase text-sm text-[var(--brand-ink)]">
                    {t.author}
                  </div>
                  <div className="text-xs text-[var(--brand-muted)] mt-1">{t.role}</div>
                </figcaption>
              </figure>
            ))}
          </div>
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
            Formats
          </h2>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-10 text-[var(--brand-dark)]">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[var(--brand-blue)]" />
              <span className="font-display uppercase text-lg sm:text-xl">Print available</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[var(--brand-muted)]" />
              <span className="font-display uppercase text-lg sm:text-xl text-[var(--brand-muted)]">
                Other formats coming
              </span>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Read before you buy."
        subtitle="The first 3 chapters will tell you if this book belongs on your shelf."
      />

      <ChapterDownloadModal open={open} onOpenChange={setOpen} />
    </div>
  );
}
