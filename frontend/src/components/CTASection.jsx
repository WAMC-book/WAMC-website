import { useState } from "react";
import { AMAZON_BOOK_URL } from "@/lib/constants";
import ChapterDownloadModal from "@/components/ChapterDownloadModal";
import { Download } from "lucide-react";

export default function CTASection({
  title = "Start with the first 3 chapters.",
  subtitle = "If the book resonates, you'll know by page 30.",
  variant = "light",
}) {
  const [open, setOpen] = useState(false);
  const dark = variant === "dark";
  return (
    <section
      data-testid="cta-section"
      className={`py-24 md:py-32 ${dark ? "bg-[var(--brand-dark)]" : "bg-[var(--brand-bg-soft)]"}`}
    >
      <div className="max-w-[960px] mx-auto px-6 lg:px-10 text-center">
        <span className="rule-accent mb-5 mx-auto block" />
        <h2
          className={`font-display uppercase text-4xl md:text-5xl lg:text-6xl leading-[0.95] mb-5 ${
            dark ? "text-white" : "text-[var(--brand-ink)]"
          }`}
        >
          {title.split(" ").map((word, i, arr) => {
            const isAccent =
              word.toLowerCase().replace(/[^a-z]/g, "") === "3" ||
              word.toLowerCase().includes("chapters");
            return (
              <span key={i} className={isAccent ? "text-[var(--brand-blue)]" : ""}>
                {word}
                {i < arr.length - 1 ? " " : ""}
              </span>
            );
          })}
        </h2>
        <p
          className={`text-base md:text-lg mb-10 max-w-xl mx-auto ${
            dark ? "text-white/70" : "text-[var(--brand-muted)]"
          }`}
        >
          {subtitle}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={AMAZON_BOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="cta-buy-book-btn"
            className="btn-primary inline-flex items-center justify-center h-14 px-8 rounded-full text-sm font-semibold uppercase tracking-wider"
          >
            Buy the book
          </a>
          <button
            type="button"
            onClick={() => setOpen(true)}
            data-testid="cta-get-chapters-btn"
            className={`inline-flex items-center justify-center gap-2 h-14 px-8 rounded-full text-sm font-semibold uppercase tracking-wider border transition-colors ${
              dark
                ? "border-white/30 text-white hover:bg-white hover:text-[var(--brand-dark)]"
                : "border-[var(--brand-dark)] text-[var(--brand-dark)] hover:bg-[var(--brand-dark)] hover:text-white"
            }`}
          >
            <Download size={16} /> Get the first 3 chapters
          </button>
        </div>
      </div>
      <ChapterDownloadModal open={open} onOpenChange={setOpen} />
    </section>
  );
}
