import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { usePortalAuth } from "@/portal/PortalAuthContext";
import { CheckSquare, Megaphone, FileText } from "lucide-react";

const Dashboard = () => {
  const { user } = usePortalAuth();
  const [counts, setCounts] = useState({ tasks: 0, announcements: 0, docs: 0 });

  useEffect(() => {
    (async () => {
      const [t, a, d] = await Promise.all([
        supabase.from("tasks").select("id", { count: "exact", head: true }).eq("assignee_id", user!.id).neq("status", "done"),
        supabase.from("announcements").select("id", { count: "exact", head: true }),
        supabase.from("documents").select("id", { count: "exact", head: true }),
      ]);
      setCounts({ tasks: t.count ?? 0, announcements: a.count ?? 0, docs: d.count ?? 0 });
    })();
  }, [user]);

  const cards = [
    { label: "Open tasks", value: counts.tasks, icon: CheckSquare },
    { label: "Announcements", value: counts.announcements, icon: Megaphone },
    { label: "Documents", value: counts.docs, icon: FileText },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl font-bold mb-2">Welcome back</h1>
      <p className="text-muted-foreground mb-8">Here's an overview of your workspace.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cards.map((c) => (
          <div key={c.label} className="p-6 rounded-xl border border-foreground/10 bg-card/60">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-muted-foreground">{c.label}</span>
              <c.icon className="w-5 h-5 text-hydro" />
            </div>
            <div className="text-3xl font-bold">{c.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;