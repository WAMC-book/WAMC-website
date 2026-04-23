import { NavLink, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import useAmazonUrl from "@/lib/useAmazonUrl";
import LanguageToggle from "@/components/LanguageToggle";
import { useLang } from "@/lib/LanguageContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { primary: amazonUrl } = useAmazonUrl();
  const { t } = useLang();

  const NAV = [
    { to: "/", label: t.nav.home, key: "home" },
    { to: "/book", label: t.nav.book, key: "book" },
    { to: "/resources", label: t.nav.resources, key: "resources" },
    { to: "/tools", label: t.nav.tools, key: "tools" },
    { to: "/about", label: t.nav.about, key: "about" },
    { to: "/contact", label: t.nav.contact, key: "contact" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-testid="site-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur border-b border-[var(--brand-border)]"
          : "bg-white border-b border-transparent"
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-6 lg:px-10 h-20 flex items-center justify-between gap-4">
        <Link
          to="/"
          data-testid="nav-logo"
          className="flex items-center gap-3 group shrink-0"
          onClick={() => setOpen(false)}
        >
          <span className="w-9 h-9 rounded-sm overflow-hidden grid place-items-center bg-[var(--brand-dark)]">
            <img src="/assets/images/favicon.jpg" alt="Who Are My Clients" className="w-full h-full object-cover" />
          </span>
          <span className="font-display uppercase tracking-wide text-[16px] leading-none text-[var(--brand-ink)] hidden md:inline">
            Who <span className="text-[var(--brand-blue)]">Are</span> My Clients
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-6">
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.to === "/"}
              data-testid={`nav-link-${n.key}`}
              className={({ isActive }) =>
                `text-[14px] link-underline font-medium ${
                  isActive ? "text-[var(--brand-blue)]" : "text-[var(--brand-dark)]"
                } hover:text-[var(--brand-blue)]`
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageToggle />
          <a
            href={amazonUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="nav-buy-book-btn"
            className="hidden sm:inline-flex btn-primary items-center px-4 sm:px-5 h-10 sm:h-11 rounded-full text-[12px] sm:text-sm font-semibold uppercase tracking-wider"
          >
            {t.cta.buy}
          </a>
          <button
            type="button"
            data-testid="nav-mobile-toggle"
            className="lg:hidden w-10 h-10 grid place-items-center text-[var(--brand-dark)]"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-[var(--brand-border)] bg-white" data-testid="nav-mobile-menu">
          <div className="px-6 py-6 flex flex-col gap-4">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.to === "/"}
                onClick={() => setOpen(false)}
                data-testid={`nav-mobile-link-${n.key}`}
                className={({ isActive }) =>
                  `text-lg font-medium ${
                    isActive ? "text-[var(--brand-blue)]" : "text-[var(--brand-dark)]"
                  }`
                }
              >
                {n.label}
              </NavLink>
            ))}
            <a
              href={amazonUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="nav-mobile-buy-btn"
              className="btn-primary mt-2 inline-flex items-center justify-center px-5 h-11 rounded-full text-sm font-semibold uppercase tracking-wider"
            >
              {t.cta.buy}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
