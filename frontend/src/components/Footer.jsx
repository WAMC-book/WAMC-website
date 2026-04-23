import { Link } from "react-router-dom";
import useAmazonUrl from "@/lib/useAmazonUrl";
import { useLang } from "@/lib/LanguageContext";
import { BOOK, BOOK_FR } from "@/lib/constants";

export default function Footer() {
  const { primary: amazonUrl, alt: amazonAlt, altLabel } = useAmazonUrl();
  const { lang, t } = useLang();
  const book = lang === "fr" ? BOOK_FR : BOOK;

  return (
    <footer data-testid="site-footer" className="border-t border-[var(--brand-border)] bg-white">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-14 md:py-16 grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-5">
          <Link to="/" className="flex items-center gap-3 mb-5">
            <span className="w-10 h-10 rounded-sm overflow-hidden bg-[var(--brand-dark)]">
              <img src="/assets/images/favicon.jpg" alt="" className="w-full h-full object-cover" />
            </span>
            <span className="font-display uppercase tracking-wide text-[18px] text-[var(--brand-ink)]">
              Who <span className="text-[var(--brand-blue)]">Are</span> My Clients
            </span>
          </Link>
          <p className="font-display uppercase text-lg text-[var(--brand-ink)] leading-tight mb-2">
            {book.question}
          </p>
          <p className="text-[var(--brand-muted)] text-sm max-w-md leading-relaxed">
            {book.tagline}
          </p>
        </div>

        <div className="md:col-span-3">
          <h4 className="font-display uppercase text-sm tracking-widest text-[var(--brand-dark)] mb-4">
            {t.footer.explore}
          </h4>
          <ul className="space-y-3 text-sm">
            {[
              { to: "/book", label: t.nav.book },
              { to: "/resources", label: t.nav.resources },
              { to: "/tools", label: t.nav.tools },
              { to: "/about", label: t.nav.about },
              { to: "/contact", label: t.nav.contact },
            ].map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  data-testid={`footer-link-${l.to.replace("/", "") || "home"}`}
                  className="text-[var(--brand-dark)] hover:text-[var(--brand-blue)] transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <h4 className="font-display uppercase text-sm tracking-widest text-[var(--brand-dark)] mb-4">
            {t.footer.startHere}
          </h4>
          <p className="text-sm text-[var(--brand-muted)] leading-relaxed mb-4">
            {t.footer.startHereBody}
          </p>
          <a
            href={amazonUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="footer-buy-book-btn"
            className="btn-primary inline-flex items-center px-5 h-11 rounded-full text-sm font-semibold uppercase tracking-wider"
          >
            {t.cta.buy}
          </a>
          <a
            href={amazonAlt}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="footer-buy-book-alt"
            className="block mt-3 text-xs uppercase tracking-widest text-[var(--brand-muted)] hover:text-[var(--brand-blue)] transition-colors"
          >
            {t.cta.alsoOn} {altLabel} →
          </a>
        </div>
      </div>

      <div className="border-t border-[var(--brand-border)]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[var(--brand-muted)]">
            © {new Date().getFullYear()} Who Are My Clients. {t.footer.copyright}
          </p>
          <p className="text-xs text-[var(--brand-muted)]">
            By Antoine B. Carrière
          </p>
        </div>
      </div>
    </footer>
  );
}
