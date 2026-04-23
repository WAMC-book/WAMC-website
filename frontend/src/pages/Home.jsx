import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Download, Wrench, FileText, Quote } from "lucide-react";
import BookCover from "@/components/BookCover";
import ChapterDownloadModal from "@/components/ChapterDownloadModal";
import CTASection from "@/components/CTASection";
import { AMAZON_BOOK_URL, TESTIMONIALS } from "@/lib/constants";

const EXPLORE = [
  "why many entrepreneurs struggle to clearly define their clients",
  "what is missing in how client understanding is approached",
  "how to recognize the factors behind real buying decisions",
  "how to integrate this thinking into your business",
];

const RESOURCE_CARDS = [
  {
    icon: Wrench,
    title: "Tools",
    body: "Practical frameworks to define and understand your clients.",
    to: "/tools",
    cta: "Access tools",
  },
  {
    icon: FileText,
    title: "Articles",
    body: "Short reflections on the ideas that shape the book.",
    to: "/resources",
    cta: "Read articles",
  },
  {
    icon: Quote,
    title: "Quotes",
    body: "Lines from the book you can sit with, share, or carry into your week.",
    to: "/resources",
    cta: "View quotes",
  },
];

export default function Home() {
  const [open, setOpen] = useState(false);

  return (
    <div data-testid="home-page">
      {/* ABOVE THE FOLD */}
      <section className="relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 pt-10 md:pt-20 pb-24 md:pb-28 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="flex items-center gap-3 mb-6 fade-up fade-up-1">
              <span className="rule-accent" />
              <span className="uppercase text-[11px] tracking-[0.22em] text-[var(--brand-muted)]">
                A new book by Antoine B. Carrière
              </span>
            </div>
            <h1
              data-testid="hero-headline"
              className="font-display uppercase text-[44px] sm:text-[60px] lg:text-[76px] leading-[0.95] text-[var(--brand-ink)] tracking-tight fade-up fade-up-2"
            >
              Most entrepreneurs know their <span className="text-[var(--brand-blue)]">offer</span> better than they know their <span className="text-[var(--brand-blue)]">clients</span>.
            </h1>
            <p className="text-lg md:text-xl text-[var(--brand-dark)] mt-6 max-w-xl leading-relaxed fade-up fade-up-3">
              This book helps you understand the people behind the buying
              decision so you can build, communicate, and grow with greater
              clarity.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-10 fade-up fade-up-4">
              <a
                href={AMAZON_BOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="hero-buy-book-btn"
                className="btn-primary inline-flex items-center justify-center h-14 px-8 rounded-full text-sm font-semibold uppercase tracking-wider"
              >
                Buy the book <ArrowRight size={16} className="ml-2" />
              </a>
              <button
                type="button"
                onClick={() => setOpen(true)}
                data-testid="hero-get-chapters-btn"
                className="btn-ghost-dark inline-flex items-center justify-center gap-2 h-14 px-8 rounded-full text-sm font-semibold uppercase tracking-wider"
              >
                <Download size={16} /> Download the first 3 chapters
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center lg:justify-end fade-up fade-up-3">
            <div className="relative">
              <BookCover size="xl" />
              <div className="absolute -z-10 -top-6 -left-6 w-28 h-28 bg-[var(--brand-blue)]/12 rounded-sm" />
              <div className="absolute -z-10 -bottom-6 -right-6 w-24 h-24 border-2 border-[var(--brand-dark)] rounded-sm" />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1 — THE PROBLEM */}
      <section className="bg-[var(--brand-bg-soft)] py-24 md:py-32" data-testid="problem-section">
        <div className="max-w-[960px] mx-auto px-6 lg:px-10">
          <span className="rule-accent mb-5 block" />
          <h2 className="font-display uppercase text-4xl md:text-5xl lg:text-6xl leading-[0.95] text-[var(--brand-ink)] mb-8">
            Do you really know who your <span className="text-[var(--brand-blue)]">clients</span> are?
          </h2>
          <div className="space-y-5 text-[17px] md:text-lg leading-[1.75] text-[var(--brand-dark)] max-w-2xl">
            <p>
              Many entrepreneurs can describe their product or service in detail.
              <br />
              Fewer can clearly describe the person who decides to buy it.
            </p>
            <p>
              We have access to more data than ever before.
              <br />
              But access to data is not the same as understanding people.
            </p>
            <p className="text-[var(--brand-ink)] font-medium">
              And without that understanding, decisions become assumptions.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2 — WHY THIS MATTERS */}
      <section className="py-24 md:py-32" data-testid="why-matters-section">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <span className="rule-accent mb-5 block" />
            <h2 className="font-display uppercase text-4xl md:text-5xl leading-[0.95] text-[var(--brand-ink)] mb-8">
              Business cannot exist <br />without <span className="text-[var(--brand-blue)]">clients</span>
            </h2>
            <div className="space-y-5 text-[17px] leading-[1.75] text-[var(--brand-dark)]">
              <p>A business moves forward when people see value in what it offers.</p>
              <p className="text-[var(--brand-muted)]">
                Not when the idea is good.<br />
                Not when the product is complete.<br />
                But when a real person recognizes a need and decides to act.
              </p>
              <p className="text-[var(--brand-ink)] font-medium">
                Understanding that person is not optional.
                It is central to everything that follows.
              </p>
            </div>
          </div>
          <div className="relative">
            <img
              src="/assets/images/stock-crosswalk.jpg"
              alt="People in motion — the real market"
              className="w-full aspect-[4/5] object-cover rounded-sm"
            />
            <div className="absolute -bottom-6 -right-6 bg-[var(--brand-blue)] text-white p-6 rounded-sm max-w-[240px]">
              <p className="font-display uppercase text-lg leading-tight">
                Real people. Real decisions. Real businesses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — WHAT THIS BOOK HELPS YOU DO */}
      <section className="py-24 md:py-32 bg-[var(--brand-dark)] text-white" data-testid="what-book-helps-section">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-10">
          <span className="rule-accent mb-5 block" />
          <h2 className="font-display uppercase text-4xl md:text-5xl lg:text-6xl leading-[0.95] mb-6">
            A different <span className="text-[var(--brand-blue)]">starting point</span>
          </h2>
          <p className="text-lg text-white/75 max-w-xl leading-relaxed mb-14">
            This book helps you step back and rethink how you define your clients.
            You will explore:
          </p>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {EXPLORE.map((t, i) => (
              <li
                key={i}
                data-testid={`explore-item-${i}`}
                className="group border border-white/10 rounded-sm p-6 hover:border-[var(--brand-blue)] hover:bg-white/5 transition-all"
              >
                <div className="flex gap-4 items-start">
                  <span className="font-display text-2xl text-[var(--brand-blue)] shrink-0">
                    0{i + 1}
                  </span>
                  <p className="text-[17px] leading-relaxed text-white/90">{t}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SECTION 4 — FREE CHAPTER CTA */}
      <section className="py-24 md:py-32" data-testid="free-chapters-section">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-10 grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7">
            <span className="rule-accent mb-5 block" />
            <h2 className="font-display uppercase text-4xl md:text-5xl leading-[0.95] text-[var(--brand-ink)] mb-6">
              Start with the first <span className="text-[var(--brand-blue)]">3 chapters</span>
            </h2>
            <p className="text-[17px] leading-[1.75] text-[var(--brand-dark)] mb-8 max-w-lg">
              If you are not fully clear on who your clients are, this is a
              practical place to begin. Download the first chapters and start
              reflecting on how you define and understand the people you are
              trying to serve.
            </p>
            <button
              type="button"
              onClick={() => setOpen(true)}
              data-testid="section-get-chapters-btn"
              className="btn-primary inline-flex items-center gap-2 h-14 px-8 rounded-full text-sm font-semibold uppercase tracking-wider"
            >
              <Download size={16} /> Get the first 3 chapters
            </button>
          </div>
          <div className="md:col-span-5 flex justify-center md:justify-end">
            <BookCover size="md" />
          </div>
        </div>
      </section>

      {/* SECTION 5 — TESTIMONIALS */}
      <section className="py-24 md:py-32 bg-[var(--brand-bg-soft)]" data-testid="testimonials-section">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <span className="rule-accent mb-5 block" />
          <h2 className="font-display uppercase text-4xl md:text-5xl leading-[0.95] text-[var(--brand-ink)] mb-14 max-w-3xl">
            What early readers are <span className="text-[var(--brand-blue)]">saying</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <figure
                key={i}
                data-testid={`testimonial-${i}`}
                className="bg-white border border-[var(--brand-border)] rounded-md p-8 flex flex-col"
              >
                <Quote className="text-[var(--brand-blue)] mb-5" size={24} />
                <blockquote className="text-[17px] leading-[1.7] text-[var(--brand-dark)] flex-1">
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

      {/* SECTION 6 — ABOUT (SHORT) */}
      <section className="py-24 md:py-32" data-testid="about-short-section">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-10 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-5">
            <div className="relative">
              <img
                src="/assets/images/stock-street.jpg"
                alt="Antoine B. Carrière"
                className="w-full aspect-[4/5] object-cover rounded-sm"
              />
              <div className="absolute -bottom-4 -left-4 bg-[var(--brand-dark)] text-white px-5 py-3 rounded-sm">
                <p className="font-display uppercase text-sm tracking-wider">
                  The author
                </p>
              </div>
            </div>
          </div>
          <div className="md:col-span-7">
            <span className="rule-accent mb-5 block" />
            <h2 className="font-display uppercase text-4xl md:text-5xl leading-[0.95] text-[var(--brand-ink)] mb-6">
              About the author
            </h2>
            <div className="space-y-5 text-[17px] leading-[1.75] text-[var(--brand-dark)]">
              <p>
                <strong className="text-[var(--brand-ink)]">Antoine B. Carrière</strong>{" "}
                is an entrepreneur, coach, and facilitator who has spent over two
                decades helping individuals move forward with greater clarity in
                their work and decisions.
              </p>
              <p>
                His work focuses on helping people better understand themselves,
                the people they serve, and the choices they make in building
                their careers and businesses.
              </p>
            </div>
            <Link
              to="/about"
              data-testid="home-learn-more-link"
              className="mt-8 inline-flex items-center gap-2 text-[var(--brand-blue)] font-semibold uppercase tracking-wider text-xs link-underline"
            >
              Learn more <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 7 — RESOURCES PREVIEW */}
      <section className="py-24 md:py-32 bg-[var(--brand-bg-soft)]" data-testid="resources-preview-section">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="max-w-2xl mb-14">
            <span className="rule-accent mb-5 block" />
            <h2 className="font-display uppercase text-4xl md:text-5xl leading-[0.95] text-[var(--brand-ink)] mb-5">
              Go further with practical <span className="text-[var(--brand-blue)]">resources</span>
            </h2>
            <p className="text-[var(--brand-muted)] text-base md:text-lg leading-relaxed">
              The book is supported by tools, articles, and reflection material
              designed to help you apply the ideas in real situations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {RESOURCE_CARDS.map((c, i) => (
              <Link
                key={i}
                to={c.to}
                data-testid={`resource-preview-${c.title.toLowerCase()}`}
                className="group bg-white border border-[var(--brand-border)] rounded-md p-8 transition-all duration-300 hover:border-[var(--brand-blue)] hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_rgba(0,173,255,0.3)] flex flex-col"
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

          <div className="mt-14 flex justify-center">
            <Link
              to="/resources"
              data-testid="explore-resources-link"
              className="btn-ghost-dark inline-flex items-center justify-center h-12 px-7 rounded-full text-sm font-semibold uppercase tracking-wider"
            >
              Explore resources <ArrowRight size={14} className="ml-2" />
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
