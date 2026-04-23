import { useState } from "react";
import { Mail, Phone, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { submitContact } from "@/lib/api";
import { CONTACT } from "@/lib/constants";
import { useLang } from "@/lib/LanguageContext";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { lang } = useLang();

  const copy = lang === "fr"
    ? {
        title: "Contact",
        subtitle: "Un court message suffit. Écrivez-nous pour toute question ou simplement pour nous faire signe.",
        local: "Local",
        toll: "Sans frais",
        email: "Courriel",
        name: "Votre nom",
        emailLabel: "Courriel",
        message: "Message",
        placeholderName: "Jeanne Tremblay",
        placeholderMsg: "Qu'avez-vous en tête?",
        send: "Envoyer le message",
        sending: "Envoi…",
        success: "Merci pour votre message.",
        successBody: "Votre message a bien été reçu.",
        another: "Écrire à nouveau",
        validation: "Merci de remplir tous les champs.",
        errorToast: "Une erreur est survenue. Réessayez.",
      }
    : {
        title: "Contact",
        subtitle: "A short note is enough. Say hello, ask a question, or share what the book brought up for you.",
        local: "Local",
        toll: "Toll-free",
        email: "Email",
        name: "Your name",
        emailLabel: "Email",
        message: "Message",
        placeholderName: "Jane Doe",
        placeholderMsg: "What's on your mind?",
        send: "Send message",
        sending: "Sending…",
        success: "Thank you for writing.",
        successBody: "Your message was received.",
        another: "Send another",
        validation: "Please fill in all fields.",
        errorToast: "Something went wrong. Please try again.",
      };

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error(copy.validation);
      return;
    }
    setLoading(true);
    try {
      await submitContact({ ...form, locale: lang });
      setSent(true);
      toast.success(copy.success);
      setForm({ name: "", email: "", message: "" });
    } catch {
      toast.error(copy.errorToast);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div data-testid="contact-page" className="bg-white">
      <section className="pt-10 md:pt-20 pb-12 md:pb-16">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-10">
          <span className="rule-accent mb-5 block" />
          <h1
            data-testid="contact-headline"
            className="font-display uppercase text-[44px] sm:text-6xl lg:text-7xl leading-[0.92] text-[var(--brand-ink)]"
          >
            {copy.title}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-[var(--brand-dark)] mt-6 max-w-xl leading-relaxed">
            {copy.subtitle}
          </p>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          <div className="lg:col-span-5 space-y-4">
            <a
              href={`tel:${CONTACT.phoneLocalDial}`}
              data-testid="contact-phone-local"
              className="block border border-[var(--brand-border)] rounded-md p-6 bg-white hover:border-[var(--brand-blue)] transition-colors"
            >
              <div className="flex items-center gap-3 mb-2">
                <Phone className="text-[var(--brand-blue)]" size={18} />
                <h3 className="font-display uppercase text-sm tracking-widest text-[var(--brand-muted)]">
                  {copy.local}
                </h3>
              </div>
              <p className="text-[var(--brand-ink)] font-display text-xl sm:text-2xl">{CONTACT.phoneLocal}</p>
            </a>

            <a
              href={`tel:${CONTACT.phoneTollDial}`}
              data-testid="contact-phone-toll"
              className="block border border-[var(--brand-border)] rounded-md p-6 bg-white hover:border-[var(--brand-blue)] transition-colors"
            >
              <div className="flex items-center gap-3 mb-2">
                <Phone className="text-[var(--brand-blue)]" size={18} />
                <h3 className="font-display uppercase text-sm tracking-widest text-[var(--brand-muted)]">
                  {copy.toll}
                </h3>
              </div>
              <p className="text-[var(--brand-ink)] font-display text-xl sm:text-2xl">{CONTACT.phoneToll}</p>
            </a>

            <a
              href={`mailto:${CONTACT.email}`}
              data-testid="contact-email-card"
              className="block border border-[var(--brand-border)] rounded-md p-6 bg-white hover:border-[var(--brand-blue)] transition-colors"
            >
              <div className="flex items-center gap-3 mb-2">
                <Mail className="text-[var(--brand-blue)]" size={18} />
                <h3 className="font-display uppercase text-sm tracking-widest text-[var(--brand-muted)]">
                  {copy.email}
                </h3>
              </div>
              <p className="text-[var(--brand-ink)] font-display text-base sm:text-lg break-all">
                {CONTACT.email}
              </p>
            </a>
          </div>

          <div className="lg:col-span-7">
            {sent ? (
              <div data-testid="contact-success" className="border border-[var(--brand-border)] rounded-md p-10 text-center bg-white">
                <div className="w-14 h-14 rounded-full bg-[var(--brand-blue)]/10 text-[var(--brand-blue)] grid place-items-center mx-auto mb-5">
                  <CheckCircle2 size={28} />
                </div>
                <h3 className="font-display uppercase text-3xl text-[var(--brand-ink)] leading-tight">{copy.success}</h3>
                <p className="text-[var(--brand-muted)] mt-3">{copy.successBody}</p>
                <Button
                  onClick={() => setSent(false)}
                  className="mt-6 h-11 px-8 rounded-full btn-primary uppercase tracking-wider text-sm font-semibold"
                  data-testid="contact-reset-btn"
                >
                  {copy.another}
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="border border-[var(--brand-border)] rounded-md p-7 sm:p-8 space-y-5 bg-white" data-testid="contact-form">
                <div>
                  <Label htmlFor="name" className="text-xs uppercase tracking-wider text-[var(--brand-dark)]">{copy.name}</Label>
                  <Input
                    id="name"
                    data-testid="contact-input-name"
                    value={form.name}
                    onChange={update("name")}
                    placeholder={copy.placeholderName}
                    className="mt-1.5 h-12 rounded-md border-[var(--brand-border)] focus-visible:ring-[var(--brand-blue)]"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-xs uppercase tracking-wider text-[var(--brand-dark)]">{copy.emailLabel}</Label>
                  <Input
                    id="email"
                    type="email"
                    data-testid="contact-input-email"
                    value={form.email}
                    onChange={update("email")}
                    placeholder="you@example.com"
                    className="mt-1.5 h-12 rounded-md border-[var(--brand-border)] focus-visible:ring-[var(--brand-blue)]"
                  />
                </div>
                <div>
                  <Label htmlFor="message" className="text-xs uppercase tracking-wider text-[var(--brand-dark)]">{copy.message}</Label>
                  <Textarea
                    id="message"
                    data-testid="contact-input-message"
                    value={form.message}
                    onChange={update("message")}
                    placeholder={copy.placeholderMsg}
                    rows={6}
                    className="mt-1.5 rounded-md border-[var(--brand-border)] focus-visible:ring-[var(--brand-blue)]"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={loading}
                  data-testid="contact-submit-btn"
                  className="w-full h-12 rounded-full btn-primary font-semibold uppercase tracking-wider text-sm disabled:opacity-70"
                >
                  {loading ? copy.sending : copy.send}
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
