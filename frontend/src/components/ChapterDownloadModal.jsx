import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { submitLead } from "@/lib/api";
import { CHAPTERS_PDF_URL, ROLE_OPTIONS_EN, ROLE_OPTIONS_FR } from "@/lib/constants";
import { useLang } from "@/lib/LanguageContext";
import { Download, CheckCircle2 } from "lucide-react";

export default function ChapterDownloadModal({ open, onOpenChange, trigger }) {
  const { lang } = useLang();
  const ROLE_OPTIONS = lang === "fr" ? ROLE_OPTIONS_FR : ROLE_OPTIONS_EN;
  const copy = lang === "fr"
    ? {
        eyebrow: "Extrait gratuit",
        titleA: "Obtenez les",
        titleBlue: "3 premiers chapitres",
        description: "Parlez-nous brièvement de vous. Nous vous enverrons l'extrait et lancerons le téléchargement.",
        first: "Prénom",
        last: "Nom",
        email: "Courriel",
        role: "Où en êtes-vous?",
        rolePh: "Sélectionnez votre étape",
        submit: "Envoyez-moi les chapitres",
        preparing: "Préparation en cours…",
        nospam: "Pas de pourriel. Désabonnement en tout temps.",
        successTitle: "Votre téléchargement commence",
        successBody: "Vérifiez votre courriel pour recevoir l'extrait. S'il ne s'y trouve pas dans quelques minutes, regardez dans vos pourriels.",
        close: "Fermer",
        validation: "Merci de remplir tous les champs.",
        success: "Vos chapitres sont prêts.",
        error: "Une erreur est survenue. Réessayez.",
      }
    : {
        eyebrow: "Free preview",
        titleA: "Get the first",
        titleBlue: "3 chapters",
        description: "Tell us a little about you. We'll send the preview to your inbox and start the download.",
        first: "First name",
        last: "Last name",
        email: "Email",
        role: "Where are you in your journey?",
        rolePh: "Select your current stage",
        submit: "Send me the chapters",
        preparing: "Preparing your download…",
        nospam: "No spam. Unsubscribe anytime.",
        successTitle: "Your download is starting",
        successBody: "Check your email for a copy of the first three chapters. If it doesn't arrive in a few minutes, look in your spam folder.",
        close: "Close",
        validation: "Please fill in all fields.",
        success: "Your free chapters are ready.",
        error: "Something went wrong. Please try again.",
      };

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    role: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const update = (k) => (e) =>
    setForm((f) => ({ ...f, [k]: e.target ? e.target.value : e }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.first_name || !form.last_name || !form.email || !form.role) {
      toast.error(copy.validation);
      return;
    }
    setLoading(true);
    try {
      await submitLead({ ...form, source: "chapter_download", locale: lang });
      setSuccess(true);
      toast.success(copy.success);
      // Trigger download
      setTimeout(() => {
        const a = document.createElement("a");
        a.href = CHAPTERS_PDF_URL;
        a.download = "who-are-my-clients-first-3-chapters.pdf";
        a.rel = "noopener noreferrer";
        a.click();
      }, 400);
    } catch (err) {
      const msg =
        err?.response?.data?.detail?.[0]?.msg ||
        err?.response?.data?.detail ||
        copy.error;
      toast.error(typeof msg === "string" ? msg : copy.error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = (v) => {
    onOpenChange(v);
    if (!v) {
      setTimeout(() => {
        setSuccess(false);
        setForm({ first_name: "", last_name: "", email: "", role: "" });
      }, 200);
    }
  };

  return (
    <>
      {trigger}
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent
          data-testid="chapter-download-modal"
          className="sm:max-w-[520px] p-0 overflow-hidden border-[var(--brand-border)]"
        >
          {!success ? (
            <div className="p-8">
              <DialogHeader className="text-left mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="rule-accent" />
                  <span className="uppercase text-[11px] tracking-[0.2em] text-[var(--brand-muted)]">
                    {copy.eyebrow}
                  </span>
                </div>
                <DialogTitle className="font-display uppercase text-3xl md:text-4xl leading-[0.95] text-[var(--brand-ink)]">
                  {copy.titleA} <span className="text-[var(--brand-blue)]">{copy.titleBlue}</span>
                </DialogTitle>
                <DialogDescription className="text-[var(--brand-muted)] text-[15px] leading-relaxed mt-3">
                  {copy.description}
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-4" data-testid="chapter-form">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="first_name" className="text-xs uppercase tracking-wider text-[var(--brand-dark)]">
                      {copy.first}
                    </Label>
                    <Input
                      id="first_name"
                      data-testid="chapter-input-first-name"
                      value={form.first_name}
                      onChange={update("first_name")}
                      placeholder="Jane"
                      className="mt-1.5 h-11 rounded-md border-[var(--brand-border)] focus-visible:ring-[var(--brand-blue)]"
                    />
                  </div>
                  <div>
                    <Label htmlFor="last_name" className="text-xs uppercase tracking-wider text-[var(--brand-dark)]">
                      {copy.last}
                    </Label>
                    <Input
                      id="last_name"
                      data-testid="chapter-input-last-name"
                      value={form.last_name}
                      onChange={update("last_name")}
                      placeholder="Doe"
                      className="mt-1.5 h-11 rounded-md border-[var(--brand-border)] focus-visible:ring-[var(--brand-blue)]"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" className="text-xs uppercase tracking-wider text-[var(--brand-dark)]">
                    {copy.email}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    data-testid="chapter-input-email"
                    value={form.email}
                    onChange={update("email")}
                    placeholder="you@example.com"
                    className="mt-1.5 h-11 rounded-md border-[var(--brand-border)] focus-visible:ring-[var(--brand-blue)]"
                  />
                </div>

                <div>
                  <Label htmlFor="role" className="text-xs uppercase tracking-wider text-[var(--brand-dark)]">
                    {copy.role}
                  </Label>
                  <Select value={form.role} onValueChange={(v) => setForm((f) => ({ ...f, role: v }))}>
                    <SelectTrigger
                      id="role"
                      data-testid="chapter-input-role"
                      className="mt-1.5 h-11 rounded-md border-[var(--brand-border)] focus:ring-[var(--brand-blue)]"
                    >
                      <SelectValue placeholder={copy.rolePh} />
                    </SelectTrigger>
                    <SelectContent>
                      {ROLE_OPTIONS.map((r) => (
                        <SelectItem key={r.value} value={r.value}>
                          {r.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  data-testid="chapter-submit-btn"
                  className="w-full h-12 rounded-full btn-primary font-semibold uppercase tracking-wider text-sm mt-2 disabled:opacity-70"
                >
                  {loading ? (
                    copy.preparing
                  ) : (
                    <span className="inline-flex items-center gap-2">
                      <Download size={16} /> {copy.submit}
                    </span>
                  )}
                </Button>

                <p className="text-[11px] text-[var(--brand-muted)] text-center mt-2">
                  {copy.nospam}
                </p>
              </form>
            </div>
          ) : (
            <div className="p-10 text-center" data-testid="chapter-success-state">
              <div className="w-14 h-14 rounded-full bg-[var(--brand-blue)]/10 text-[var(--brand-blue)] grid place-items-center mx-auto mb-5">
                <CheckCircle2 size={28} />
              </div>
              <h3 className="font-display uppercase text-3xl text-[var(--brand-ink)] leading-tight">
                {copy.successTitle}
              </h3>
              <p className="text-[var(--brand-muted)] mt-3 leading-relaxed">
                {copy.successBody}
              </p>
              <Button
                onClick={() => handleClose(false)}
                className="mt-6 h-11 px-8 rounded-full btn-primary uppercase tracking-wider text-sm font-semibold"
                data-testid="chapter-close-btn"
              >
                {copy.close}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
