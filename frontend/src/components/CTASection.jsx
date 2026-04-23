import { useState } from "react";
import useAmazonUrl from "@/lib/useAmazonUrl";
import ChapterDownloadModal from "@/components/ChapterDownloadModal";
import { Download } from "lucide-react";
import { useLang } from "@/lib/LanguageContext";

export default function CTASection({
  title,
  subtitle,
  variant = "light",
}) {
  const [open, setOpen] = useState(false);
  const { primary: amazonUrl, alt: amazonAlt, altLabel } = useAmazonUrl();
  const { t } = useLang();
  const dark = variant === "dark";

  const finalTitle = title || t.ctaSection.defaultTitle;
  const finalSubtitle = subtitle || t.ctaSection.defaultSubtitle;

  return (
    <section
      data-testid="cta-section"
      className={`py-20 sm:py-24 md:py-32 border-t border-[var(--brand-border)] ${
        dark ? "bg-[var(--brand-dark)] border-transparent" : "bg-white"
      }`}
    >
      <div className="max-w-[960px] mx-auto px-6 lg:px-10 text-center">
        <span className="rule-accent mb-5 mx-auto block" />
        <h2
          className={`font-display uppercase text-[36px] sm:text-5xl lg:text-6xl leading-[0.95] mb-5 ${
            dark ? "text-white" : "text-[var(--brand-ink)]"
          }`}
        >
          {finalTitle.split(" ").map((word, i, arr) => {
            const plain = word.toLowerCase().replace(/[^a-zà-ÿ]/g, "");
            const isAccent =
              plain === "3" ||
              plain.includes("chapter") ||
              plain.includes("chapitre");
            return (
              <span key={i} className={isAccent ? "text-[var(--brand-blue)]" : ""}>
                {word}
                {i < arr.length - 1 ? " " : ""}
              </span>
            );
          })}
        </h2>
        <p
          className={`text-base md:text-lg mb-10 max-w-xl mx-auto leading-relaxed ${
            dark ? "text-white/70" : "text-[var(--brand-muted)]"
          }`}
        >
          {finalSubtitle}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <a
            href={amazonUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="cta-buy-book-btn"
            className="btn-primary w-full sm:w-auto inline-flex items-center justify-center h-14 px-8 rounded-full text-sm font-semibold uppercase tracking-wider"
          >
            {t.cta.buy}
          </a>
          <button
            type="button"
            onClick={() => setOpen(true)}
            data-testid="cta-get-chapters-btn"
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 h-14 px-8 rounded-full text-sm font-semibold uppercase tracking-wider border transition-colors ${
              dark
                ? "border-white/30 text-white hover:bg-white hover:text-[var(--brand-dark)]"
                : "border-[var(--brand-dark)] text-[var(--brand-dark)] hover:bg-[var(--brand-dark)] hover:text-white"
            }`}
          >
            <Download size={16} /> {t.cta.getChapters}
          </button>
        </div>

        <a
          href={amazonAlt}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="cta-buy-book-alt"
          className={`mt-5 inline-block text-[11px] uppercase tracking-widest transition-colors ${
            dark
              ? "text-white/50 hover:text-white"
              : "text-[var(--brand-muted)] hover:text-[var(--brand-blue)]"
          }`}
        >
          {t.cta.alsoOn} {altLabel} →
        </a>
      </div>
      <ChapterDownloadModal open={open} onOpenChange={setOpen} />
    </section>
  );
}
