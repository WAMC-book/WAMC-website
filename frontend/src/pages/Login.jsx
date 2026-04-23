import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { adminLogin } from "@/lib/api";
import { useLang } from "@/lib/LanguageContext";

export default function Login() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useLang();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password) return;
    setLoading(true);
    try {
      await adminLogin(password);
      toast.success(t.login.success);
      navigate("/admin");
    } catch (err) {
      toast.error(t.login.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      data-testid="login-page"
      className="min-h-screen bg-white grid place-items-center px-6 py-20"
    >
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center justify-center gap-3 mb-10">
          <span className="w-10 h-10 rounded-sm overflow-hidden bg-[var(--brand-dark)]">
            <img src="/assets/images/favicon.jpg" alt="" className="w-full h-full object-cover" />
          </span>
          <span className="font-display uppercase tracking-wide text-[18px] text-[var(--brand-ink)]">
            Who <span className="text-[var(--brand-blue)]">Are</span> My Clients
          </span>
        </Link>

        <div className="border border-[var(--brand-border)] rounded-md p-8 bg-white">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-10 h-10 rounded-full bg-[var(--brand-blue)]/10 text-[var(--brand-blue)] grid place-items-center">
              <Lock size={18} />
            </span>
            <div>
              <h1 className="font-display uppercase text-2xl text-[var(--brand-ink)] leading-tight">
                {t.login.title}
              </h1>
              <p className="text-sm text-[var(--brand-muted)]">{t.login.subtitle}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 mt-6" data-testid="login-form">
            <div>
              <Label htmlFor="password" className="text-xs uppercase tracking-wider text-[var(--brand-dark)]">
                {t.login.passwordLabel}
              </Label>
              <Input
                id="password"
                type="password"
                data-testid="login-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
                className="mt-1.5 h-12 rounded-md border-[var(--brand-border)] focus-visible:ring-[var(--brand-blue)]"
              />
            </div>
            <Button
              type="submit"
              disabled={loading || !password}
              data-testid="login-submit"
              className="w-full h-12 rounded-full btn-primary font-semibold uppercase tracking-wider text-sm disabled:opacity-70"
            >
              {loading ? "…" : t.login.submit}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
