import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { usePortalAuth } from "@/portal/PortalAuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";

interface Announcement { id: string; title: string; body: string; created_at: string; created_by: string | null; }

const Announcements = () => {
  const { user, isAdmin } = usePortalAuth();
  const [items, setItems] = useState<Announcement[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: "", body: "" });

  const load = async () => {
    const { data } = await supabase.from("announcements").select("*").order("created_at", { ascending: false });
    setItems((data as Announcement[]) ?? []);
  };
  useEffect(() => { load(); }, []);

  const create = async () => {
    if (!form.title || !form.body) return toast.error("Title and body required");
    const { error } = await supabase.from("announcements").insert({ ...form, created_by: user!.id });
    if (error) return toast.error(error.message);
    toast.success("Posted");
    setForm({ title: "", body: "" });
    setOpen(false);
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
        {isAdmin && (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild><Button><Plus className="w-4 h-4 mr-2" /> New post</Button></DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>New announcement</DialogTitle></DialogHeader>
              <div className="space-y-4">
                <div><Label>Title</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
                <div><Label>Body</Label><Textarea rows={6} value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} /></div>
                <Button onClick={create} className="w-full">Post</Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
      <div className="space-y-4">
        {items.length === 0 && <p className="text-muted-foreground text-sm">No announcements yet.</p>}
        {items.map((a) => (
          <article key={a.id} className="p-5 rounded-xl border border-foreground/10 bg-card/60">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-display text-xl font-semibold">{a.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{new Date(a.created_at).toLocaleString()}</p>
              </div>
              {isAdmin && (
                <Button variant="ghost" size="icon" onClick={() => remove(a.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
            <p className="mt-3 text-sm whitespace-pre-wrap">{a.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Announcements;