import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader2, LogOut, Download, FileText, Mic, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { toast } from "sonner";
import {
  adminMe,
  adminLeads,
  adminContacts,
  adminStats,
  adminLogout,
} from "@/lib/api";
import { useLang } from "@/lib/LanguageContext";

function toCsv(rows, columns) {
  const header = columns.join(",");
  const body = rows
    .map((r) =>
      columns
        .map((c) => {
          const v = (r[c] ?? "").toString().replace(/"/g, '""');
          return `"${v}"`;
        })
        .join(",")
    )
    .join("\n");
  return `${header}\n${body}`;
}

function downloadCsv(filename, content) {
  const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export default function Admin() {
  const navigate = useNavigate();
  const { t } = useLang();
  const [authed, setAuthed] = useState(null);
  const [leads, setLeads] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        await adminMe();
        if (!mounted) return;
        setAuthed(true);
        const [l, c, s] = await Promise.all([
          adminLeads().catch(() => []),
          adminContacts().catch(() => []),
          adminStats().catch(() => null),
        ]);
        if (!mounted) return;
        setLeads(l);
        setContacts(c);
        setStats(s);
      } catch {
        navigate("/login", { replace: true });
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [navigate]);

  const handleLogout = async () => {
    await adminLogout();
    toast.success("Signed out.");
    navigate("/login", { replace: true });
  };

  const exportLeads = () => {
    const cols = ["created_at", "first_name", "last_name", "email", "role", "source", "locale"];
    downloadCsv(`leads-${Date.now()}.csv`, toCsv(leads, cols));
  };
  const exportContacts = () => {
    const cols = ["created_at", "name", "email", "locale", "message"];
    downloadCsv(`contacts-${Date.now()}.csv`, toCsv(contacts, cols));
  };

  if (loading || !authed) {
    return (
      <div className="min-h-screen grid place-items-center bg-white">
        <Loader2 className="animate-spin text-[var(--brand-muted)]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white" data-testid="admin-page">
      <header className="border-b border-[var(--brand-border)]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-sm overflow-hidden bg-[var(--brand-dark)]">
              <img src="/assets/images/favicon.jpg" alt="" className="w-full h-full object-cover" />
            </span>
            <span className="font-display uppercase tracking-wide text-[15px] text-[var(--brand-ink)]">
              WAMC Admin
            </span>
          </Link>
          <Button
            variant="ghost"
            onClick={handleLogout}
            data-testid="admin-logout-btn"
            className="text-sm uppercase tracking-wider"
          >
            <LogOut size={14} className="mr-2" /> {t.admin.logout}
          </Button>
        </div>
      </header>

      <main className="max-w-[1280px] mx-auto px-6 lg:px-10 py-10">
        <div className="mb-10">
          <h1 className="font-display uppercase text-4xl md:text-5xl leading-[0.95] text-[var(--brand-ink)]">
            {t.admin.title}
          </h1>
          <p className="text-[var(--brand-muted)] mt-2">{t.admin.welcome}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          <div className="border border-[var(--brand-border)] rounded-md p-6" data-testid="stats-leads">
            <div className="text-xs uppercase tracking-widest text-[var(--brand-muted)]">
              {t.admin.stats.leads}
            </div>
            <div className="font-display text-5xl text-[var(--brand-ink)] mt-2">
              {stats?.leads_total ?? leads.length}
            </div>
            <div className="text-xs text-[var(--brand-muted)] mt-2">
              EN: {stats?.leads_by_locale?.en ?? 0} · FR: {stats?.leads_by_locale?.fr ?? 0}
            </div>
          </div>
          <div className="border border-[var(--brand-border)] rounded-md p-6" data-testid="stats-contacts">
            <div className="text-xs uppercase tracking-widest text-[var(--brand-muted)]">
              {t.admin.stats.contacts}
            </div>
            <div className="font-display text-5xl text-[var(--brand-ink)] mt-2">
              {stats?.contacts_total ?? contacts.length}
            </div>
          </div>
          <div className="border border-[var(--brand-border)] rounded-md p-6 bg-[var(--brand-dark)] text-white">
            <div className="text-xs uppercase tracking-widest text-white/60">Version</div>
            <div className="font-display text-xl mt-2">1.0 · Feb 2026</div>
            <div className="text-xs text-white/60 mt-2">Supabase · SQLAlchemy</div>
          </div>
        </div>

        <Tabs defaultValue="leads" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="leads" data-testid="tab-leads">{t.admin.tabs.leads}</TabsTrigger>
            <TabsTrigger value="contacts" data-testid="tab-contacts">{t.admin.tabs.contacts}</TabsTrigger>
            <TabsTrigger value="content" data-testid="tab-content">{t.admin.tabs.content}</TabsTrigger>
          </TabsList>

          <TabsContent value="leads">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display uppercase text-2xl text-[var(--brand-ink)]">
                {t.admin.tabs.leads}
              </h2>
              <Button
                onClick={exportLeads}
                disabled={leads.length === 0}
                data-testid="export-leads-btn"
                className="btn-primary h-10 px-4 rounded-full text-xs uppercase tracking-wider font-semibold"
              >
                <Download size={14} className="mr-2" /> {t.admin.exportCsv}
              </Button>
            </div>
            {leads.length === 0 ? (
              <p className="text-[var(--brand-muted)] py-8 text-center">{t.admin.noLeads}</p>
            ) : (
              <div className="border border-[var(--brand-border)] rounded-md overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Locale</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leads.map((l) => (
                      <TableRow key={l.id} data-testid={`lead-row-${l.id}`}>
                        <TableCell className="text-xs text-[var(--brand-muted)]">
                          {new Date(l.created_at).toLocaleString()}
                        </TableCell>
                        <TableCell>{l.first_name} {l.last_name}</TableCell>
                        <TableCell>{l.email}</TableCell>
                        <TableCell className="text-xs">{l.role}</TableCell>
                        <TableCell className="text-xs uppercase">{l.locale || "en"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>

          <TabsContent value="contacts">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display uppercase text-2xl text-[var(--brand-ink)]">
                {t.admin.tabs.contacts}
              </h2>
              <Button
                onClick={exportContacts}
                disabled={contacts.length === 0}
                data-testid="export-contacts-btn"
                className="btn-primary h-10 px-4 rounded-full text-xs uppercase tracking-wider font-semibold"
              >
                <Download size={14} className="mr-2" /> {t.admin.exportCsv}
              </Button>
            </div>
            {contacts.length === 0 ? (
              <p className="text-[var(--brand-muted)] py-8 text-center">{t.admin.noContacts}</p>
            ) : (
              <div className="border border-[var(--brand-border)] rounded-md overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Message</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contacts.map((c) => (
                      <TableRow key={c.id} data-testid={`contact-row-${c.id}`}>
                        <TableCell className="text-xs text-[var(--brand-muted)]">
                          {new Date(c.created_at).toLocaleString()}
                        </TableCell>
                        <TableCell>{c.name}</TableCell>
                        <TableCell>{c.email}</TableCell>
                        <TableCell className="max-w-md text-xs text-[var(--brand-dark)]">
                          {c.message}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>

          <TabsContent value="content">
            <h2 className="font-display uppercase text-2xl text-[var(--brand-ink)] mb-6">
              {t.admin.tabs.content}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { icon: FileText, key: "posts" },
                { icon: Mic, key: "podcasts" },
                { icon: Briefcase, key: "services" },
              ].map(({ icon: Icon, key }) => (
                <div
                  key={key}
                  data-testid={`content-card-${key}`}
                  className="border border-[var(--brand-border)] rounded-md p-6 bg-white opacity-90"
                >
                  <div className="w-10 h-10 rounded-sm bg-[var(--brand-dark)] text-white grid place-items-center mb-4">
                    <Icon size={18} />
                  </div>
                  <h3 className="font-display uppercase text-lg text-[var(--brand-ink)]">
                    {t.admin.contentCards[key].title}
                  </h3>
                  <p className="text-sm text-[var(--brand-muted)] mt-2 leading-relaxed">
                    {t.admin.contentCards[key].body}
                  </p>
                  <div className="mt-4 text-[10px] uppercase tracking-widest text-[var(--brand-blue)]">
                    {t.admin.comingSoon}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
