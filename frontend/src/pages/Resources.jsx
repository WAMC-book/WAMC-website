import { Link } from "react-router-dom";
import { ArrowRight, Wrench, FileText, Quote } from "lucide-react";
import CTASection from "@/components/CTASection";

const SECTIONS = [
  {
    icon: Wrench,
    title: "Tools",
    body: "Practical frameworks to define and understand your clients. Built to be used, not just read.",
    to: "/tools",
    cta: "Access tools",
    testid: "resources-tools",
  },
  {
    icon: FileText,
    title: "Articles",
    body: "Short reflections on the ideas that shape the book — written to be useful in a single sitting.",
    to: "#",
    cta: "Read articles",
    testid: "resources-articles",
    placeholder: true,
  },
  {
    icon: Quote,
    title: "Quotes",
    body: "Lines from the book to carry into your week, share with a co-founder, or sit with on your own.",
    to: "/quotes",
    cta: "View quotes",
    testid: "resources-quotes",
  },
];

export default function Resources() {
  return (
    <div data-testid="resources-page">
      {/* HEADER */}
      <section className="pt-10 md:pt-20 pb-16">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <span className="rule-accent mb-5 block" />
          <h1
            data-testid="resources-headline"
            className="font-display uppercase text-5xl md:text-6xl lg:text-7xl leading-[0.92] text-[var(--brand-ink)] max-w-4xl"
          >
            Resources
          </h1>
          <p className="text-lg md:text-xl text-[var(--brand-dark)] mt-6 max-w-2xl leading-relaxed">
            Tools and material to help you better define and understand your clients.
          </p>
        </div>
      </section>

      {/* INTRO */}
      <section className="pb-10">
        <div className="max-w-[900px] mx-auto px-6 lg:px-10">
          <p className="text-[17px] leading-[1.75] text-[var(--brand-muted)] border-l-2 border-[var(--brand-blue)] pl-6">
            Everything here is an extension of the book. Choose what is useful
            to you right now, and leave the rest for later.
          </p>
        </div>
      </section>

      {/* CARDS */}
      <section className="py-20 md:py-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SECTIONS.map((s, i) => {
              const CardBody = (
                <div
                  className={`group h-full bg-white border border-[var(--brand-border)] rounded-md p-8 transition-all duration-300 flex flex-col ${
                    s.placeholder
                      ? "opacity-90"
                      : "hover:border-[var(--brand-blue)] hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_rgba(0,173,255,0.3)]"
                  }`}
                >
                  <div className="w-12 h-12 rounded-sm bg-[var(--brand-dark)] text-white grid place-items-center mb-6 group-hover:bg-[var(--brand-blue)] transition-colors">
                    <s.icon size={22} />
                  </div>
                  <h3 className="font-display uppercase text-2xl text-[var(--brand-ink)] leading-tight mb-3">
                    {s.title}
                  </h3>
                  <p className="text-[var(--brand-muted)] text-[15px] leading-relaxed mb-6 flex-1">
                    {s.body}
                  </p>
                  <div className="pt-5 border-t border-[var(--brand-border)] flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 text-[var(--brand-blue)] font-semibold uppercase tracking-wider text-xs">
                      {s.cta}{" "}
                      <ArrowRight
                        size={14}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </span>
                    {s.placeholder && (
                      <span className="text-[10px] uppercase tracking-widest text-[var(--brand-muted)]">
                        Coming soon
                      </span>
                    )}
                  </div>
                </div>
              );
              return s.placeholder ? (
                <div key={i} data-testid={s.testid}>{CardBody}</div>
              ) : (
                <Link key={i} to={s.to} data-testid={s.testid} className="block h-full">
                  {CardBody}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection
        title="The best resource is still the book."
        subtitle="Everything here is built to be used alongside it."
      />
    </div>
  );
}
