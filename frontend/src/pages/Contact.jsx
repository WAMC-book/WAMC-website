import { useState } from "react";
import { Mail, Phone, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { submitContact } from "@/lib/api";
import { CONTACT } from "@/lib/constants";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all fields.");
      return;
    }
    setLoading(true);
    try {
      await submitContact(form);
      setSent(true);
      toast.success("Message sent. Thank you.");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div data-testid="contact-page">
      <section className="pt-10 md:pt-20 pb-16">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-10">
          <span className="rule-accent mb-5 block" />
          <h1
            data-testid="contact-headline"
            className="font-display uppercase text-5xl md:text-6xl lg:text-7xl leading-[0.92] text-[var(--brand-ink)]"
          >
            Contact
          </h1>
          <p className="text-lg md:text-xl text-[var(--brand-dark)] mt-6 max-w-xl leading-relaxed">
            A short note is enough. Say hello, ask a question, or share what
            the book brought up for you.
          </p>
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-14">
          {/* Side info */}
          <div className="lg:col-span-5 space-y-6">
            <a
              href={`mailto:${CONTACT.email}`}
              data-testid="contact-email-card"
              className="block border border-[var(--brand-border)] rounded-md p-7 bg-[var(--brand-bg-soft)] hover:border-[var(--brand-blue)] transition-colors"
            >
              <div className="flex items-center gap-3 mb-3">
                <Mail className="text-[var(--brand-blue)]" size={20} />
                <h3 className="font-display uppercase text-lg text-[var(--brand-ink)]">
                  Email
                </h3>
              </div>
              <p className="text-[var(--brand-dark)] text-[16px] font-medium">
                {CONTACT.email}
              </p>
            </a>

            <a
              href={`tel:${CONTACT.phone.replace(/[^+\d]/g, "")}`}
              data-testid="contact-phone-card"
              className="block border border-[var(--brand-border)] rounded-md p-7 bg-[var(--brand-bg-soft)] hover:border-[var(--brand-blue)] transition-colors"
            >
              <div className="flex items-center gap-3 mb-3">
                <Phone className="text-[var(--brand-blue)]" size={20} />
                <h3 className="font-display uppercase text-lg text-[var(--brand-ink)]">
                  Phone
                </h3>
              </div>
              <p className="text-[var(--brand-dark)] text-[16px] font-medium">
                {CONTACT.phone}
              </p>
            </a>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            {sent ? (
              <div
                data-testid="contact-success"
                className="border border-[var(--brand-border)] rounded-md p-10 text-center bg-white"
              >
                <div className="w-14 h-14 rounded-full bg-[var(--brand-blue)]/10 text-[var(--brand-blue)] grid place-items-center mx-auto mb-5">
                  <CheckCircle2 size={28} />
                </div>
                <h3 className="font-display uppercase text-3xl text-[var(--brand-ink)] leading-tight">
                  Thank you for writing.
                </h3>
                <p className="text-[var(--brand-muted)] mt-3">
                  Your message was received.
                </p>
                <Button
                  onClick={() => setSent(false)}
                  className="mt-6 h-11 px-8 rounded-full btn-primary uppercase tracking-wider text-sm font-semibold"
                  data-testid="contact-reset-btn"
                >
                  Send another
                </Button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="border border-[var(--brand-border)] rounded-md p-8 space-y-5 bg-white"
                data-testid="contact-form"
              >
                <div>
                  <Label htmlFor="name" className="text-xs uppercase tracking-wider text-[var(--brand-dark)]">
                    Your name
                  </Label>
                  <Input
                    id="name"
                    data-testid="contact-input-name"
                    value={form.name}
                    onChange={update("name")}
                    placeholder="Jane Doe"
                    className="mt-1.5 h-12 rounded-md border-[var(--brand-border)] focus-visible:ring-[var(--brand-blue)]"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-xs uppercase tracking-wider text-[var(--brand-dark)]">
                    Email
                  </Label>
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
                  <Label htmlFor="message" className="text-xs uppercase tracking-wider text-[var(--brand-dark)]">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    data-testid="contact-input-message"
                    value={form.message}
                    onChange={update("message")}
                    placeholder="What's on your mind?"
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
                  {loading ? "Sending…" : "Send message"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
