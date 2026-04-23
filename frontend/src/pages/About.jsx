import CTASection from "@/components/CTASection";
import { AUTHOR } from "@/lib/constants";

export default function About() {
  return (
    <div data-testid="about-page">
      {/* HEADER */}
      <section className="pt-10 md:pt-20 pb-16">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-10">
          <span className="rule-accent mb-5 block" />
          <h1
            data-testid="about-headline"
            className="font-display uppercase text-5xl md:text-6xl lg:text-7xl leading-[0.92] text-[var(--brand-ink)] max-w-4xl"
          >
            About the author
          </h1>
        </div>
      </section>

      {/* BIO */}
      <section className="pb-24 md:pb-32">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-14 items-start">
          <div className="lg:col-span-5">
            <div className="relative">
              <img
                src="/assets/images/stock-street.jpg"
                alt={AUTHOR.name}
                className="w-full aspect-[4/5] object-cover rounded-sm"
              />
              <div className="absolute -bottom-4 -left-4 bg-[var(--brand-dark)] text-white px-5 py-4 rounded-sm">
                <p className="font-display uppercase text-sm tracking-wider">
                  {AUTHOR.name}
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <span className="rule-accent mb-5 block" />
            <h2 className="font-display uppercase text-3xl md:text-4xl leading-[1.05] text-[var(--brand-ink)] mb-6">
              {AUTHOR.name}
            </h2>
            <div className="space-y-5 text-[17px] leading-[1.75] text-[var(--brand-dark)]">
              <p>
                Antoine B. Carrière is an entrepreneur, coach, and facilitator
                who has spent over two decades helping individuals move forward
                with greater clarity in their work and decisions.
              </p>
              <p>
                His work focuses on helping people better understand themselves,
                the people they serve, and the choices they make in building
                their careers and businesses.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="One question. A whole book."
        subtitle="If this sounds like something you've been needing, start with the preview."
      />
    </div>
  );
}
