import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { usePortalAuth } from "@/portal/PortalAuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Paperclip, MessageSquare, Download, Trash2, Send } from "lucide-react";
import { logActivity } from "@/portal/lib/activity";

interface Task {
  id: string; title: string; description: string | null;
  status: string; priority: string; due_date: string | null;
  assignee_id: string | null; created_by: string | null;
}
interface Profile { id: string; email: string; full_name: string | null; }
interface Attachment { id: string; task_id: string; storage_path: string; file_name: string; size_bytes: number | null; uploaded_by: string | null; created_at: string; }
interface Comment { id: string; task_id: string; author_id: string; body: string; created_at: string; }

const STATUSES = ["todo", "in_progress", "review", "done"];
const PRIORITIES = ["low", "medium", "high"];

const Tasks = () => {
  const { user, canManage, isAdmin } = usePortalAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", priority: "medium", due_date: "", assignee_id: "" });
  const [detail, setDetail] = useState<Task | null>(null);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    const { data } = await supabase.from("tasks").select("*").order("created_at", { ascending: false });
    setTasks((data as Task[]) ?? []);
    const { data: p } = await supabase.from("profiles").select("id,email,full_name");
    setProfiles((p as Profile[]) ?? []);
  };

  useEffect(() => { load(); }, []);

  const nameFor = (id: string | null) => {
    if (!id) return "Unassigned";
    const p = profiles.find((x) => x.id === id);
    return p?.full_name || p?.email || (id === user?.id ? "You" : "—");
  };

  const create = async () => {
    if (!form.title) return toast.error("Title required");
    const { data, error } = await supabase.from("tasks").insert({
      title: form.title, description: form.description || null,
      priority: form.priority, due_date: form.due_date || null,
      assignee_id: form.assignee_id || null, created_by: user!.id,
    }).select("id,title").single();
    if (error) return toast.error(error.message);
    if (data) await logActivity({ action: "task_created", entityType: "task", entityId: data.id, summary: `Created task “${data.title}”` });
    toast.success("Task created");
    setOpen(false);
    setForm({ title: "", description: "", priority: "medium", due_date: "", assignee_id: "" });
    load();
  };

  const updateStatus = async (id: string, status: string) => {
    const { data, error } = await supabase.from("tasks").update({ status }).eq("id", id).select("id,title").single();
    if (error) return toast.error(error.message);
    if (data && status === "done") await logActivity({ action: "task_completed", entityType: "task", entityId: data.id, summary: `Completed task “${data.title}”` });
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete task?")) return;
    const { error } = await supabase.from("tasks").delete().eq("id", id);
    if (error) return toast.error(error.message);
    load();
  };

  const openDetail = async (t: Task) => {
    setDetail(t);
    const [a, c] = await Promise.all([
      supabase.from("task_attachments").select("*").eq("task_id", t.id).order("created_at", { ascending: false }),
      supabase.from("task_comments").select("*").eq("task_id", t.id).order("created_at", { ascending: true }),
    ]);
    setAttachments((a.data as Attachment[]) ?? []);
    setComments((c.data as Comment[]) ?? []);
  };

  const uploadAttachment = async () => {
    if (!detail) return;
    const file = fileRef.current?.files?.[0];
    if (!file) return toast.error("Choose a file");
    const path = `task-attachments/${detail.id}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
    const { error: upErr } = await supabase.storage.from("documents").upload(path, file);
    if (upErr) return toast.error(upErr.message);
    const { error } = await supabase.from("task_attachments").insert({
      task_id: detail.id, storage_path: path, file_name: file.name,
      mime_type: file.type, size_bytes: file.size, uploaded_by: user!.id,
    });
    if (error) return toast.error(error.message);
    if (fileRef.current) fileRef.current.value = "";
    openDetail(detail);
  };

  const downloadAttachment = async (a: Attachment) => {
    const { data, error } = await supabase.storage.from("documents").createSignedUrl(a.storage_path, 60);
    if (error) return toast.error(error.message);
    window.open(data.signedUrl, "_blank");
  };

  const deleteAttachment = async (a: Attachment) => {
    await supabase.storage.from("documents").remove([a.storage_path]);
    await supabase.from("task_attachments").delete().eq("id", a.id);
    if (detail) openDetail(detail);
  };

  const postComment = async () => {
    if (!detail || !newComment.trim()) return;
    const { error } = await supabase.from("task_comments").insert({
      task_id: detail.id, author_id: user!.id, body: newComment.trim(),
    });
    if (error) return toast.error(error.message);
    setNewComment("");
    openDetail(detail);
  };

  const statusColor = (s: string) =>
    s === "done" ? "bg-hydro/15 text-hydro border-hydro/30"
    : s === "review" ? "bg-blaze/15 text-blaze border-blaze/30"
    : s === "in_progress" ? "bg-foreground/10 border-foreground/20"
    : "bg-foreground/5 text-muted-foreground border-foreground/10";

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-3xl font-bold">Tasks</h1>
          <p className="text-muted-foreground text-sm">{isAdmin ? "All team tasks." : canManage ? "Team tasks you manage." : "Tasks assigned to you."}</p>
        </div>
        {canManage && (
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
        {tasks.map((t) => {
          const overdue = t.due_date && new Date(t.due_date) < new Date(new Date().toDateString()) && t.status !== "done";
          return (
            <div key={t.id} className="p-4 rounded-xl border border-foreground/10 bg-card/60 flex items-start gap-4">
              <div className="flex-1 min-w-0 cursor-pointer" onClick={() => openDetail(t)}>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-medium hover:text-hydro transition-colors">{t.title}</span>
                  <span className={`text-[10px] uppercase px-2 py-0.5 rounded-full border ${
                    t.priority === "high" ? "bg-blaze/15 text-blaze border-blaze/30" :
                    t.priority === "low" ? "bg-foreground/5 text-muted-foreground border-foreground/10" :
                    "bg-hydro/15 text-hydro border-hydro/30"
                  }`}>{t.priority}</span>
                  <span className={`text-[10px] uppercase px-2 py-0.5 rounded-full border ${statusColor(t.status)}`}>{t.status.replace("_", " ")}</span>
                  {t.due_date && <span className={`text-xs ${overdue ? "text-blaze font-medium" : "text-muted-foreground"}`}>Due {t.due_date}{overdue ? " · overdue" : ""}</span>}
                </div>
                {t.description && <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{t.description}</p>}
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
          );
        })}
      </div>

      <Dialog open={!!detail} onOpenChange={(o) => !o && setDetail(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          {detail && (
            <>
              <DialogHeader><DialogTitle>{detail.title}</DialogTitle></DialogHeader>
              {detail.description && <p className="text-sm text-muted-foreground whitespace-pre-wrap">{detail.description}</p>}

              <section className="pt-4 border-t border-foreground/10">
                <h4 className="font-semibold text-sm flex items-center gap-2 mb-3"><Paperclip className="w-4 h-4" /> Attachments</h4>
                <div className="space-y-2 mb-3">
                  {attachments.length === 0 && <p className="text-xs text-muted-foreground">No attachments.</p>}
                  {attachments.map((a) => (
                    <div key={a.id} className="flex items-center gap-2 p-2 rounded-lg border border-foreground/10 text-sm">
                      <span className="flex-1 truncate">{a.file_name}</span>
                      <span className="text-xs text-muted-foreground">{a.size_bytes ? `${(a.size_bytes/1024).toFixed(1)} KB` : ""}</span>
                      <Button variant="ghost" size="icon" onClick={() => downloadAttachment(a)}><Download className="w-4 h-4" /></Button>
                      {(a.uploaded_by === user?.id || isAdmin) && (
                        <Button variant="ghost" size="icon" onClick={() => deleteAttachment(a)}><Trash2 className="w-4 h-4" /></Button>
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input type="file" ref={fileRef} />
                  <Button onClick={uploadAttachment} variant="outline"><Paperclip className="w-4 h-4 mr-1" />Attach</Button>
                </div>
              </section>

              <section className="pt-4 border-t border-foreground/10">
                <h4 className="font-semibold text-sm flex items-center gap-2 mb-3"><MessageSquare className="w-4 h-4" /> Comments</h4>
                <div className="space-y-3 mb-3 max-h-60 overflow-y-auto">
                  {comments.length === 0 && <p className="text-xs text-muted-foreground">No comments yet.</p>}
                  {comments.map((c) => (
                    <div key={c.id} className="text-sm p-3 rounded-lg bg-foreground/5">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-xs">{nameFor(c.author_id)}</span>
                        <span className="text-[10px] text-muted-foreground">{new Date(c.created_at).toLocaleString()}</span>
                      </div>
                      <p className="whitespace-pre-wrap">{c.body}</p>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Textarea rows={2} value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Write a comment…" />
                  <Button onClick={postComment}><Send className="w-4 h-4" /></Button>
                </div>
              </section>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Tasks;