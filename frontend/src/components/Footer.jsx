import { Link } from "react-router-dom";
import { AMAZON_BOOK_URL } from "@/lib/constants";

export default function Footer() {
  return (
    <footer
      data-testid="site-footer"
      className="border-t border-[var(--brand-border)] bg-[var(--brand-bg-soft)]"
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-16 grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-5">
          <Link to="/" className="flex items-center gap-3 mb-5">
            <span className="w-10 h-10 rounded-sm overflow-hidden bg-[var(--brand-dark)]">
              <img
                src="/assets/images/favicon.jpg"
                alt=""
                className="w-full h-full object-cover"
              />
            </span>
            <span className="font-display uppercase tracking-wide text-[18px] text-[var(--brand-ink)]">
              Who <span className="text-[var(--brand-blue)]">Are</span> My Clients
            </span>
          </Link>
          <p className="text-[var(--brand-muted)] text-sm max-w-md leading-relaxed">
            A practical book for entrepreneurs who want to understand — honestly —
            who they are building for.
          </p>
        </div>

        <div className="md:col-span-3">
          <h4 className="font-display uppercase text-sm tracking-widest text-[var(--brand-dark)] mb-4">
            Explore
          </h4>
          <ul className="space-y-3 text-sm">
            {[
              { to: "/book", label: "The Book" },
              { to: "/resources", label: "Resources" },
              { to: "/tools", label: "Tools" },
              { to: "/about", label: "About" },
              { to: "/contact", label: "Contact" },
            ].map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  data-testid={`footer-link-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
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
            Start Here
          </h4>
          <p className="text-sm text-[var(--brand-muted)] leading-relaxed mb-4">
            The fastest way to find out if this book is for you is to read
            the first three chapters.
          </p>
          <a
            href={AMAZON_BOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="footer-buy-book-btn"
            className="btn-primary inline-flex items-center px-5 h-11 rounded-full text-sm font-semibold uppercase tracking-wider"
          >
            Buy the book
          </a>
        </div>
      </div>

      <div className="border-t border-[var(--brand-border)]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[var(--brand-muted)]">
            © {new Date().getFullYear()} Who Are My Clients. All rights reserved.
          </p>
          <p className="text-xs text-[var(--brand-muted)]">
            Made with care · Book-first platform
          </p>
        </div>
      </div>
    </footer>
  );
}
