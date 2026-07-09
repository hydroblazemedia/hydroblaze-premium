import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { usePortalAuth } from "@/portal/PortalAuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Trash2, Pin, PinOff, Clock } from "lucide-react";

interface Announcement { id: string; title: string; body: string; created_at: string; created_by: string | null; pinned: boolean; scheduled_for: string | null; }

const Announcements = () => {
  const { user, canManage, isAdmin } = usePortalAuth();
  const [items, setItems] = useState<Announcement[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: "", body: "", pinned: false, scheduled_for: "" });

  const load = async () => {
    const { data } = await supabase
      .from("announcements").select("*")
      .order("pinned", { ascending: false })
      .order("created_at", { ascending: false });
    setItems((data as Announcement[]) ?? []);
  };
  useEffect(() => { load(); }, []);

  const create = async () => {
    if (!form.title || !form.body) return toast.error("Title and body required");
    const { error } = await supabase.from("announcements").insert({
      title: form.title, body: form.body, created_by: user!.id,
      pinned: form.pinned,
      scheduled_for: form.scheduled_for ? new Date(form.scheduled_for).toISOString() : null,
    });
    if (error) return toast.error(error.message);
    toast.success("Posted");
    setForm({ title: "", body: "", pinned: false, scheduled_for: "" });
    setOpen(false);
    load();
  };
  const togglePin = async (a: Announcement) => {
    const { error } = await supabase.from("announcements").update({ pinned: !a.pinned }).eq("id", a.id);
    if (error) return toast.error(error.message);
    load();
  };
  const remove = async (id: string) => {
    if (!confirm("Delete announcement?")) return;
    const { error } = await supabase.from("announcements").delete().eq("id", id);
    if (error) return toast.error(error.message);
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-3xl font-bold">Announcements</h1>
          <p className="text-muted-foreground text-sm">Company updates and news.</p>
        </div>
        {canManage && (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild><Button><Plus className="w-4 h-4 mr-2" /> New post</Button></DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>New announcement</DialogTitle></DialogHeader>
              <div className="space-y-4">
                <div><Label>Title</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
                <div><Label>Body</Label><Textarea rows={6} value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} /></div>
                <div className="flex items-center gap-3">
                  <Switch id="pin" checked={form.pinned} onCheckedChange={(v) => setForm({ ...form, pinned: v })} />
                  <Label htmlFor="pin" className="!m-0">Pin to top</Label>
                </div>
                <div>
                  <Label>Schedule for (optional)</Label>
                  <Input type="datetime-local" value={form.scheduled_for} onChange={(e) => setForm({ ...form, scheduled_for: e.target.value })} />
                  <p className="text-xs text-muted-foreground mt-1">Leave empty to publish immediately.</p>
                </div>
                <Button onClick={create} className="w-full">Post</Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
      <div className="space-y-4">
        {items.length === 0 && <p className="text-muted-foreground text-sm">No announcements yet.</p>}
        {items.map((a) => {
          const scheduled = a.scheduled_for && new Date(a.scheduled_for) > new Date();
          return (
            <article key={a.id} className={`p-5 rounded-xl border bg-card/60 ${a.pinned ? "border-blaze/40 ring-1 ring-blaze/20" : "border-foreground/10"}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    {a.pinned && <Pin className="w-4 h-4 text-blaze" />}
                    <h3 className="font-display text-xl font-semibold">{a.title}</h3>
                    {scheduled && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full border border-hydro/30 bg-hydro/10 text-hydro inline-flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Scheduled {new Date(a.scheduled_for!).toLocaleString()}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{new Date(a.created_at).toLocaleString()}</p>
                </div>
                {canManage && (
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" onClick={() => togglePin(a)} title={a.pinned ? "Unpin" : "Pin"}>
                      {a.pinned ? <PinOff className="w-4 h-4" /> : <Pin className="w-4 h-4" />}
                    </Button>
                    {isAdmin && (
                      <Button variant="ghost" size="icon" onClick={() => remove(a.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                )}
              </div>
              <p className="mt-3 text-sm whitespace-pre-wrap">{a.body}</p>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default Announcements;