import { useLang } from "@/lib/LanguageContext";
import { LANGS } from "@/lib/i18n";

export default function LanguageToggle({ className = "" }) {
  const { lang, setLang } = useLang();
  return (
    <div
      data-testid="language-toggle"
      className={`inline-flex items-center rounded-full border border-[var(--brand-border)] p-0.5 ${className}`}
      role="radiogroup"
      aria-label="Language"
    >
      {LANGS.map((l) => {
        const active = lang === l.code;
        return (
          <button
            key={l.code}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => setLang(l.code)}
            data-testid={`lang-btn-${l.code}`}
            className={`px-3 h-8 rounded-full text-[11px] font-semibold uppercase tracking-widest transition-all ${
              active
                ? "bg-[var(--brand-dark)] text-white"
                : "text-[var(--brand-dark)] hover:text-[var(--brand-blue)]"
            }`}
          >
            {l.label}
          </button>
        );
      })}
    </div>
  );
}
