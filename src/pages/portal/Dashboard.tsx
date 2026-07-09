import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { usePortalAuth } from "@/portal/PortalAuthContext";
import { CheckSquare, Megaphone, FileText, AlertTriangle, Calendar, Pin } from "lucide-react";

interface Task { id: string; title: string; status: string; priority: string; due_date: string | null; }
interface Announcement { id: string; title: string; body: string; created_at: string; pinned: boolean; }
interface Doc { id: string; name: string; folder: string; created_at: string; }

const startOfToday = () => { const d = new Date(); d.setHours(0,0,0,0); return d.toISOString().slice(0,10); };

const Dashboard = () => {
  const { user } = usePortalAuth();
  const [dueToday, setDueToday] = useState<Task[]>([]);
  const [overdue, setOverdue] = useState<Task[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [docs, setDocs] = useState<Doc[]>([]);

  useEffect(() => {
    (async () => {
      const today = startOfToday();
      const [d, o, a, dc] = await Promise.all([
        supabase.from("tasks").select("id,title,status,priority,due_date").eq("assignee_id", user!.id).neq("status", "done").eq("due_date", today),
        supabase.from("tasks").select("id,title,status,priority,due_date").eq("assignee_id", user!.id).neq("status", "done").lt("due_date", today),
        supabase.from("announcements").select("id,title,body,created_at,pinned").order("pinned", { ascending: false }).order("created_at", { ascending: false }).limit(5),
        supabase.from("documents").select("id,name,folder,created_at").eq("is_current", true).order("created_at", { ascending: false }).limit(5),
      ]);
      setDueToday((d.data as Task[]) ?? []);
      setOverdue((o.data as Task[]) ?? []);
      setAnnouncements((a.data as Announcement[]) ?? []);
      setDocs((dc.data as Doc[]) ?? []);
    })();
  }, [user]);

  const priorityBadge = (p: string) =>
    p === "high" ? "bg-blaze/15 text-blaze border-blaze/30"
    : p === "low" ? "bg-foreground/5 text-muted-foreground border-foreground/10"
    : "bg-hydro/15 text-hydro border-hydro/30";

  return (
    <div>
      <h1 className="font-display text-3xl font-bold mb-2">Welcome back</h1>
      <p className="text-muted-foreground mb-8">Here's what needs your attention today.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="p-6 rounded-xl border border-foreground/10 bg-card/60">
          <div className="flex items-center justify-between mb-2"><span className="text-sm text-muted-foreground">Due today</span><Calendar className="w-5 h-5 text-hydro" /></div>
          <div className="text-3xl font-bold">{dueToday.length}</div>
        </div>
        <div className="p-6 rounded-xl border border-foreground/10 bg-card/60">
          <div className="flex items-center justify-between mb-2"><span className="text-sm text-muted-foreground">Overdue</span><AlertTriangle className="w-5 h-5 text-blaze" /></div>
          <div className="text-3xl font-bold">{overdue.length}</div>
        </div>
        <div className="p-6 rounded-xl border border-foreground/10 bg-card/60">
          <div className="flex items-center justify-between mb-2"><span className="text-sm text-muted-foreground">Recent announcements</span><Megaphone className="w-5 h-5 text-hydro" /></div>
          <div className="text-3xl font-bold">{announcements.length}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="p-5 rounded-xl border border-foreground/10 bg-card/60">
          <div className="flex items-center justify-between mb-3"><h2 className="font-semibold flex items-center gap-2"><CheckSquare className="w-4 h-4 text-hydro" /> Tasks due today</h2><Link to="/portal/tasks" className="text-xs text-hydro hover:underline">View all</Link></div>
          {dueToday.length === 0 ? <p className="text-sm text-muted-foreground">Nothing due today.</p> :
            <ul className="space-y-2">{dueToday.map(t => (
              <li key={t.id} className="flex items-center justify-between gap-2 text-sm">
                <span className="truncate">{t.title}</span>
                <span className={`text-[10px] uppercase px-2 py-0.5 rounded-full border ${priorityBadge(t.priority)}`}>{t.priority}</span>
              </li>))}</ul>}
        </section>

        <section className="p-5 rounded-xl border border-foreground/10 bg-card/60">
          <div className="flex items-center justify-between mb-3"><h2 className="font-semibold flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-blaze" /> Overdue tasks</h2><Link to="/portal/tasks" className="text-xs text-hydro hover:underline">View all</Link></div>
          {overdue.length === 0 ? <p className="text-sm text-muted-foreground">All caught up.</p> :
            <ul className="space-y-2">{overdue.map(t => (
              <li key={t.id} className="flex items-center justify-between gap-2 text-sm">
                <span className="truncate">{t.title}</span>
                <span className="text-xs text-blaze">{t.due_date}</span>
              </li>))}</ul>}
        </section>

        <section className="p-5 rounded-xl border border-foreground/10 bg-card/60">
          <div className="flex items-center justify-between mb-3"><h2 className="font-semibold flex items-center gap-2"><Megaphone className="w-4 h-4 text-hydro" /> Recent announcements</h2><Link to="/portal/announcements" className="text-xs text-hydro hover:underline">View all</Link></div>
          {announcements.length === 0 ? <p className="text-sm text-muted-foreground">No announcements yet.</p> :
            <ul className="space-y-3">{announcements.map(a => (
              <li key={a.id} className="text-sm">
                <div className="flex items-center gap-2 font-medium">{a.pinned && <Pin className="w-3 h-3 text-blaze" />}{a.title}</div>
                <div className="text-xs text-muted-foreground line-clamp-1">{a.body}</div>
              </li>))}</ul>}
        </section>

        <section className="p-5 rounded-xl border border-foreground/10 bg-card/60">
          <div className="flex items-center justify-between mb-3"><h2 className="font-semibold flex items-center gap-2"><FileText className="w-4 h-4 text-hydro" /> Recently uploaded documents</h2><Link to="/portal/documents" className="text-xs text-hydro hover:underline">View all</Link></div>
          {docs.length === 0 ? <p className="text-sm text-muted-foreground">No documents yet.</p> :
            <ul className="space-y-2">{docs.map(d => (
              <li key={d.id} className="flex items-center justify-between gap-2 text-sm">
                <span className="truncate">{d.name}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full border border-foreground/10 bg-foreground/5">{d.folder}</span>
              </li>))}</ul>}
        </section>
      </div>
    </div>
  );
};

export default Dashboard;