import { TOOLS } from "@/lib/constants";
import CTASection from "@/components/CTASection";

export default function Tools() {
  return (
    <div data-testid="tools-page">
      {/* HEADER */}
      <section className="pt-10 md:pt-20 pb-16">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <span className="rule-accent mb-5 block" />
          <h1
            data-testid="tools-headline"
            className="font-display uppercase text-5xl md:text-6xl lg:text-7xl leading-[0.92] text-[var(--brand-ink)]"
          >
            Tools
          </h1>
          <p className="text-lg md:text-xl text-[var(--brand-dark)] mt-6 max-w-2xl leading-relaxed">
            Practical resources to help define your ideal client.
          </p>
        </div>
      </section>

      {/* LIST */}
      <section className="pb-24 md:pb-32">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-10">
          <ol className="divide-y divide-[var(--brand-border)] border-y border-[var(--brand-border)]">
            {TOOLS.map((t, i) => (
              <li
                key={t.id}
                data-testid={`tool-${t.id}`}
                className="py-7 grid grid-cols-12 gap-4 items-baseline group hover:bg-[var(--brand-bg-soft)] -mx-3 px-3 rounded transition-colors"
              >
                <span className="col-span-2 md:col-span-1 font-display text-xl text-[var(--brand-blue)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="col-span-10 md:col-span-11">
                  <h3 className="font-display uppercase text-2xl md:text-3xl text-[var(--brand-ink)] leading-tight">
                    {t.name}
                  </h3>
                  <p className="text-[var(--brand-muted)] text-[15px] md:text-base mt-2 leading-relaxed max-w-2xl">
                    {t.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <p className="mt-12 text-sm text-[var(--brand-muted)] italic max-w-2xl">
            Each tool is designed to be used alongside the book. Full, downloadable versions are being prepared.
          </p>
        </div>
      </section>

      <CTASection
        title="Tools work better with the book."
        subtitle="Start by reading the first 3 chapters."
      />
    </div>
  );
}
