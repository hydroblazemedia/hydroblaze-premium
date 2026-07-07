import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { usePortalAuth } from "@/portal/PortalAuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus } from "lucide-react";

interface Task {
  id: string;
  title: string;
  description: string | null;
  status: string;
  priority: string;
  due_date: string | null;
  assignee_id: string | null;
}
interface Profile { id: string; email: string; full_name: string | null; }

const STATUSES = ["todo", "in_progress", "done"];
const PRIORITIES = ["low", "medium", "high"];

const Tasks = () => {
  const { user, isAdmin } = usePortalAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", priority: "medium", due_date: "", assignee_id: "" });

  const load = async () => {
    const { data } = await supabase.from("tasks").select("*").order("created_at", { ascending: false });
    setTasks((data as Task[]) ?? []);
    if (isAdmin) {
      const { data: p } = await supabase.from("profiles").select("id,email,full_name");
      setProfiles((p as Profile[]) ?? []);
    }
  };

  useEffect(() => { load(); }, [isAdmin]);

  const nameFor = (id: string | null) => {
    if (!id) return "Unassigned";
    const p = profiles.find((x) => x.id === id);
    return p?.full_name || p?.email || (id === user?.id ? "You" : "—");
  };

  const create = async () => {
    if (!form.title) return toast.error("Title required");
    const { error } = await supabase.from("tasks").insert({
      title: form.title,
      description: form.description || null,
      priority: form.priority,
      due_date: form.due_date || null,
      assignee_id: form.assignee_id || null,
      created_by: user!.id,
    });
    if (error) return toast.error(error.message);
    toast.success("Task created");
    setOpen(false);
    setForm({ title: "", description: "", priority: "medium", due_date: "", assignee_id: "" });
    load();
  };

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("tasks").update({ status }).eq("id", id);
    if (error) return toast.error(error.message);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete task?")) return;
    const { error } = await supabase.from("tasks").delete().eq("id", id);
    if (error) return toast.error(error.message);
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-3xl font-bold">Tasks</h1>
          <p className="text-muted-foreground text-sm">{isAdmin ? "All team tasks." : "Tasks assigned to you."}</p>
        </div>
        {isAdmin && (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button><Plus className="w-4 h-4 mr-2" /> New task</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Create task</DialogTitle></DialogHeader>
              <div className="space-y-4">
                <div><Label>Title</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
                <div><Label>Description</Label><Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Priority</Label>
                    <Select value={form.priority} onValueChange={(v) => setForm({ ...form, priority: v })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>{PRIORITIES.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div><Label>Due date</Label><Input type="date" value={form.due_date} onChange={(e) => setForm({ ...form, due_date: e.target.value })} /></div>
                </div>
                <div>
                  <Label>Assign to</Label>
                  <Select value={form.assignee_id} onValueChange={(v) => setForm({ ...form, assignee_id: v })}>
                    <SelectTrigger><SelectValue placeholder="Select employee" /></SelectTrigger>
                    <SelectContent>
                      {profiles.map((p) => <SelectItem key={p.id} value={p.id}>{p.full_name || p.email}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={create} className="w-full">Create</Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div className="space-y-3">
        {tasks.length === 0 && <p className="text-muted-foreground text-sm">No tasks yet.</p>}
        {tasks.map((t) => (
          <div key={t.id} className="p-4 rounded-xl border border-foreground/10 bg-card/60 flex items-start gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-medium">{t.title}</span>
                <span className={`text-[10px] uppercase px-2 py-0.5 rounded-full border ${
                  t.priority === "high" ? "bg-blaze/15 text-blaze border-blaze/30" :
                  t.priority === "low" ? "bg-foreground/5 text-muted-foreground border-foreground/10" :
                  "bg-hydro/15 text-hydro border-hydro/30"
                }`}>{t.priority}</span>
                {t.due_date && <span className="text-xs text-muted-foreground">Due {t.due_date}</span>}
              </div>
              {t.description && <p className="text-sm text-muted-foreground mt-1">{t.description}</p>}
              <p className="text-xs text-muted-foreground mt-2">Assignee: {nameFor(t.assignee_id)}</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <Select value={t.status} onValueChange={(v) => updateStatus(t.id, v)}>
                <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
                <SelectContent>{STATUSES.map((s) => <SelectItem key={s} value={s}>{s.replace("_", " ")}</SelectItem>)}</SelectContent>
              </Select>
              {isAdmin && <Button variant="ghost" size="sm" onClick={() => remove(t.id)}>Delete</Button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;