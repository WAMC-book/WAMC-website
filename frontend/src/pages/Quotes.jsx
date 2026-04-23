import { useEffect, useMemo, useState } from "react";
import { Quote as QuoteIcon, Download, Share2, Shuffle, Sparkles } from "lucide-react";
import { QUOTES, FEATURED_QUOTES, AUTHOR_ATTRIBUTION } from "@/lib/quotes";
import CTASection from "@/components/CTASection";
import { useLang } from "@/lib/LanguageContext";
import { toast } from "sonner";

// Fisher-Yates shuffle
function shuffle(arr, seed) {
  const a = [...arr];
  let rand = mulberry32(seed);
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Seeded PRNG so a given seed produces a stable order
function mulberry32(a) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Pick a visually varied tile size for each quote based on index/seed
const TEXT_TONES = [
  "bg-white text-[var(--brand-dark)] border-[var(--brand-border)]",
  "bg-[var(--brand-dark)] text-white border-transparent",
  "bg-[var(--brand-blue)] text-white border-transparent",
  "bg-white text-[var(--brand-dark)] border-[var(--brand-border)]",
  "bg-white text-[var(--brand-dark)] border-[var(--brand-border)]",
];

export default function Quotes() {
  const { lang } = useLang();
  const [seed, setSeed] = useState(() => Math.floor(Math.random() * 100000));

  const copy = lang === "fr"
    ? {
        title: "Citations",
        eyebrow: "Du livre",
        subtitle: "Des phrases à relire, à souligner, à porter dans votre semaine. L'ordre change à chaque visite.",
        shuffle: "Mélanger",
        download: "Télécharger",
        share: "Partager",
        copied: "Citation copiée.",
        count: (n) => `${n} citations`,
        illustrated: "Illustrées",
      }
    : {
        title: "Quotes",
        eyebrow: "From the book",
        subtitle: "Lines to re-read, underline, or carry into your week. The order shifts each time you visit.",
        shuffle: "Shuffle",
        download: "Download",
        share: "Share",
        copied: "Quote copied.",
        count: (n) => `${n} quotes`,
        illustrated: "Illustrated",
      };

  // Build the shuffled mosaic. We shuffle ONCE per seed for stable mount order.
  const tiles = useMemo(() => {
    const shuffled = shuffle(QUOTES, seed);
    const rand = mulberry32(seed + 7);
    return shuffled.map((q, idx) => {
      // Size logic: featured images always span 2 cols and 2 rows.
      // Text quotes vary between 1x1 and 1x2 or 2x1 occasionally.
      if (q.featured) {
        return { ...q, tile: "col-span-2 row-span-2" };
      }
      const r = rand();
      const tone = TEXT_TONES[Math.floor(r * TEXT_TONES.length)];
      // Make about 1 in 5 text cards span 2 columns, a few span 2 rows for rhythm
      let tile = "col-span-1 row-span-1";
      if (idx % 7 === 3) tile = "col-span-2 row-span-1";
      else if (idx % 9 === 2) tile = "col-span-1 row-span-2";
      return { ...q, tile, tone, rotate: (r - 0.5) * 0.6 };
    });
  }, [seed]);

  const reshuffle = () => {
    setSeed(Math.floor(Math.random() * 100000));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    // Reshuffle on every page mount to feel dynamic between visits
    setSeed(Math.floor(Math.random() * 100000));
  }, []);

  const copyQuote = (text) => {
    try {
      navigator.clipboard.writeText(`"${text}" — ${AUTHOR_ATTRIBUTION}`);
      toast.success(copy.copied);
    } catch {
      // noop
    }
  };

  return (
    <div data-testid="quotes-page" className="bg-white">
      {/* HERO */}
      <section className="pt-10 md:pt-20 pb-6 md:pb-10">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="rule-accent" />
            <span className="uppercase text-[11px] tracking-[0.22em] text-[var(--brand-muted)]">
              {copy.eyebrow} · {AUTHOR_ATTRIBUTION}
            </span>
          </div>
          <div className="flex items-end justify-between flex-wrap gap-6">
            <h1
              data-testid="quotes-headline"
              className="font-display uppercase text-5xl sm:text-6xl lg:text-8xl leading-[0.9] text-[var(--brand-ink)]"
            >
              {copy.title}
            </h1>
            <div className="flex items-center gap-3">
              <span className="text-xs uppercase tracking-widest text-[var(--brand-muted)]">
                {copy.count(QUOTES.length)} · {FEATURED_QUOTES.length} {copy.illustrated}
              </span>
              <button
                type="button"
                onClick={reshuffle}
                data-testid="shuffle-btn"
                className="inline-flex items-center gap-2 h-10 px-4 rounded-full bg-[var(--brand-dark)] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[var(--brand-blue)] transition-colors"
              >
                <Shuffle size={14} /> {copy.shuffle}
              </button>
            </div>
          </div>
          <p className="text-base sm:text-lg text-[var(--brand-dark)] mt-6 max-w-2xl leading-relaxed">
            {copy.subtitle}
          </p>
        </div>
      </section>

      {/* BENTO MOSAIC */}
      <section className="pb-20 md:pb-28" data-testid="quotes-mosaic">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-10">
          <div
            className="grid gap-3 sm:gap-4"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
              gridAutoRows: "200px",
              gridAutoFlow: "dense",
            }}
          >
            {tiles.map((q) => {
              if (q.featured) {
                // Illustrated tile — image-first
                return (
                  <figure
                    key={q.id}
                    data-testid={`quote-tile-${q.id}`}
                    className={`${q.tile} group relative overflow-hidden rounded-md border border-[var(--brand-border)] bg-white`}
                  >
                    <img
                      src={q.image}
                      alt={q.text}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <figcaption className="absolute inset-x-0 bottom-0 p-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-[10px] uppercase tracking-widest text-white font-semibold">
                        #{String(q.number).padStart(2, "0")}
                      </span>
                      <a
                        href={q.image}
                        download
                        data-testid={`download-quote-${q.number}`}
                        className="inline-flex items-center gap-1 h-8 px-3 rounded-full bg-white/90 hover:bg-white text-[10px] uppercase tracking-widest text-[var(--brand-dark)] font-semibold"
                      >
                        <Download size={12} /> {copy.download}
                      </a>
                    </figcaption>
                  </figure>
                );
              }

              // Text tile — typographic
              const tone = q.tone || TEXT_TONES[0];
              const isDark = tone.includes("brand-dark") || tone.includes("brand-blue");
              return (
                <figure
                  key={q.id}
                  data-testid={`quote-tile-${q.id}`}
                  className={`${q.tile} group relative overflow-hidden rounded-md border p-5 sm:p-6 flex flex-col ${tone} transition-all hover:-translate-y-1 hover:shadow-[0_14px_30px_-18px_rgba(0,0,0,0.25)]`}
                  style={{ transform: `rotate(${q.rotate || 0}deg)` }}
                >
                  <QuoteIcon
                    size={18}
                    className={isDark ? "text-white/60 mb-2" : "text-[var(--brand-blue)] mb-2"}
                  />
                  <blockquote
                    className={`text-[14px] sm:text-[15px] leading-[1.55] flex-1 ${
                      isDark ? "text-white" : "text-[var(--brand-dark)]"
                    }`}
                  >
                    {q.text}
                  </blockquote>
                  <figcaption
                    className={`mt-3 pt-3 flex items-center justify-between gap-2 text-[10px] uppercase tracking-widest border-t ${
                      isDark ? "border-white/20 text-white/80" : "border-[var(--brand-border)] text-[var(--brand-muted)]"
                    }`}
                  >
                    <span>— {AUTHOR_ATTRIBUTION}</span>
                    <button
                      type="button"
                      onClick={() => copyQuote(q.text)}
                      data-testid={`share-quote-${q.id}`}
                      className={`inline-flex items-center gap-1 transition-colors ${
                        isDark ? "hover:text-white" : "hover:text-[var(--brand-blue)]"
                      }`}
                      aria-label={copy.share}
                    >
                      <Share2 size={11} /> {copy.share}
                    </button>
                  </figcaption>
                </figure>
              );
            })}
          </div>

          <div className="mt-12 flex items-center justify-center gap-3">
            <Sparkles className="text-[var(--brand-blue)]" size={16} />
            <span className="text-xs uppercase tracking-widest text-[var(--brand-muted)]">
              {copy.shuffle} →
            </span>
            <button
              type="button"
              onClick={reshuffle}
              data-testid="shuffle-bottom-btn"
              className="inline-flex items-center gap-2 h-10 px-5 rounded-full bg-[var(--brand-dark)] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[var(--brand-blue)] transition-colors"
            >
              <Shuffle size={14} /> {copy.shuffle}
            </button>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
