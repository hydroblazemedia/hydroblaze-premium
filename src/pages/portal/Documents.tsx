import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { usePortalAuth } from "@/portal/PortalAuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Upload, Download, Trash2, FileText } from "lucide-react";

interface Doc { id: string; name: string; description: string | null; storage_path: string; size_bytes: number | null; created_at: string; }

const Documents = () => {
  const { user, isAdmin } = usePortalAuth();
  const [docs, setDocs] = useState<Doc[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [busy, setBusy] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    const { data } = await supabase.from("documents").select("*").order("created_at", { ascending: false });
    setDocs((data as Doc[]) ?? []);
  };
  useEffect(() => { load(); }, []);

  const upload = async (e: React.FormEvent) => {
    e.preventDefault();
    const file = fileRef.current?.files?.[0];
    if (!file) return toast.error("Choose a file");
    setBusy(true);
    const path = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
    const { error: upErr } = await supabase.storage.from("documents").upload(path, file);
    if (upErr) { setBusy(false); return toast.error(upErr.message); }
    const { error: insErr } = await supabase.from("documents").insert({
      name: name || file.name,
      description: description || null,
      storage_path: path,
      mime_type: file.type,
      size_bytes: file.size,
      uploaded_by: user!.id,
    });
    setBusy(false);
    if (insErr) return toast.error(insErr.message);
    toast.success("Uploaded");
    setName(""); setDescription("");
    if (fileRef.current) fileRef.current.value = "";
    load();
  };

  const download = async (d: Doc) => {
    const { data, error } = await supabase.storage.from("documents").createSignedUrl(d.storage_path, 60);
    if (error) return toast.error(error.message);
    window.open(data.signedUrl, "_blank");
  };

  const remove = async (d: Doc) => {
    if (!confirm("Delete document?")) return;
    await supabase.storage.from("documents").remove([d.storage_path]);
    const { error } = await supabase.from("documents").delete().eq("id", d.id);
    if (error) return toast.error(error.message);
    load();
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-3xl font-bold">Documents</h1>
        <p className="text-muted-foreground text-sm">Shared company files.</p>
      </div>

      {isAdmin && (
        <form onSubmit={upload} className="p-4 rounded-xl border border-foreground/10 bg-card/60 mb-6 grid gap-3 md:grid-cols-4">
          <div className="md:col-span-1"><Label>Display name</Label><Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Auto from file" /></div>
          <div className="md:col-span-2"><Label>Description</Label><Input value={description} onChange={(e) => setDescription(e.target.value)} /></div>
          <div className="md:col-span-1"><Label>File</Label><Input type="file" ref={fileRef} required /></div>
          <div className="md:col-span-4"><Button type="submit" disabled={busy}><Upload className="w-4 h-4 mr-2" />{busy ? "Uploading…" : "Upload"}</Button></div>
        </form>
      )}

      <div className="space-y-2">
        {docs.length === 0 && <p className="text-muted-foreground text-sm">No documents yet.</p>}
        {docs.map((d) => (
          <div key={d.id} className="p-4 rounded-xl border border-foreground/10 bg-card/60 flex items-center gap-4">
            <FileText className="w-5 h-5 text-hydro shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="font-medium truncate">{d.name}</div>
              {d.description && <div className="text-xs text-muted-foreground">{d.description}</div>}
              <div className="text-xs text-muted-foreground">
                {d.size_bytes ? `${(d.size_bytes / 1024).toFixed(1)} KB` : ""} · {new Date(d.created_at).toLocaleDateString()}
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => download(d)}><Download className="w-4 h-4" /></Button>
            {isAdmin && <Button variant="ghost" size="icon" onClick={() => remove(d)}><Trash2 className="w-4 h-4" /></Button>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Documents;