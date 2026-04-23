import { NavLink, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { AMAZON_BOOK_URL } from "@/lib/constants";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/book", label: "Book" },
  { to: "/resources", label: "Resources" },
  { to: "/tools", label: "Tools" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        <Link
          to="/"
          data-testid="nav-logo"
          className="flex items-center gap-3 group"
          onClick={() => setOpen(false)}
        >
          <span className="w-9 h-9 rounded-sm overflow-hidden grid place-items-center bg-[var(--brand-dark)]">
            <img
              src="/assets/images/favicon.jpg"
              alt="Who Are My Clients"
              className="w-full h-full object-cover"
            />
          </span>
          <span className="font-display uppercase tracking-wide text-[17px] leading-none text-[var(--brand-ink)] hidden sm:inline">
            Who <span className="text-[var(--brand-blue)]">Are</span> My Clients
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.to === "/"}
              data-testid={`nav-link-${n.label.toLowerCase()}`}
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

        <div className="flex items-center gap-3">
          <a
            href={AMAZON_BOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="nav-buy-book-btn"
            className="hidden sm:inline-flex btn-primary items-center px-5 h-11 rounded-full text-sm font-semibold uppercase tracking-wider"
          >
            Buy the book
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
        <div
          className="lg:hidden border-t border-[var(--brand-border)] bg-white"
          data-testid="nav-mobile-menu"
        >
          <div className="px-6 py-6 flex flex-col gap-4">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.to === "/"}
                onClick={() => setOpen(false)}
                data-testid={`nav-mobile-link-${n.label.toLowerCase()}`}
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
              href={AMAZON_BOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="nav-mobile-buy-btn"
              className="btn-primary mt-2 inline-flex items-center justify-center px-5 h-11 rounded-full text-sm font-semibold uppercase tracking-wider"
            >
              Buy the book
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
