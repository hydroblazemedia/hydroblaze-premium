import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { usePortalAuth } from "@/portal/PortalAuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Upload, Download, Trash2, FileText, History, FolderOpen } from "lucide-react";

interface Doc {
  id: string; name: string; description: string | null; storage_path: string;
  size_bytes: number | null; created_at: string;
  folder: string; version: number; parent_id: string | null; is_current: boolean;
}

const FOLDERS = ["SOPs", "Contracts", "Brand Assets", "HR", "Clients", "General"];

const Documents = () => {
  const { user, canManage, isAdmin } = usePortalAuth();
  const [docs, setDocs] = useState<Doc[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [folder, setFolder] = useState("SOPs");
  const [activeFolder, setActiveFolder] = useState<string>("SOPs");
  const [busy, setBusy] = useState(false);
  const [historyOf, setHistoryOf] = useState<Doc | null>(null);
  const [versions, setVersions] = useState<Doc[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);
  const versionRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    const { data } = await supabase.from("documents").select("*").eq("is_current", true).order("created_at", { ascending: false });
    setDocs((data as Doc[]) ?? []);
  };
  useEffect(() => { load(); }, []);

  const upload = async (e: React.FormEvent) => {
    e.preventDefault();
    const file = fileRef.current?.files?.[0];
    if (!file) return toast.error("Choose a file");
    setBusy(true);
    const path = `${folder}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
    const { error: upErr } = await supabase.storage.from("documents").upload(path, file);
    if (upErr) { setBusy(false); return toast.error(upErr.message); }
    const { error: insErr } = await supabase.from("documents").insert({
      name: name || file.name, description: description || null,
      storage_path: path, mime_type: file.type, size_bytes: file.size,
      uploaded_by: user!.id, folder, version: 1, is_current: true,
    });
    setBusy(false);
    if (insErr) return toast.error(insErr.message);
    toast.success("Uploaded");
    setName(""); setDescription("");
    if (fileRef.current) fileRef.current.value = "";
    load();
  };

  const uploadNewVersion = async (parent: Doc) => {
    const file = versionRef.current?.files?.[0];
    if (!file) return toast.error("Choose a file");
    setBusy(true);
    const path = `${parent.folder}/${Date.now()}-v${parent.version + 1}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
    const { error: upErr } = await supabase.storage.from("documents").upload(path, file);
    if (upErr) { setBusy(false); return toast.error(upErr.message); }
    // Mark parent chain as not current
    const rootId = parent.parent_id ?? parent.id;
    await supabase.from("documents").update({ is_current: false }).or(`id.eq.${rootId},parent_id.eq.${rootId}`);
    const { error: insErr } = await supabase.from("documents").insert({
      name: parent.name, description: parent.description,
      storage_path: path, mime_type: file.type, size_bytes: file.size,
      uploaded_by: user!.id, folder: parent.folder,
      version: parent.version + 1, parent_id: rootId, is_current: true,
    });
    setBusy(false);
    if (insErr) return toast.error(insErr.message);
    toast.success("New version uploaded");
    if (versionRef.current) versionRef.current.value = "";
    setHistoryOf(null);
    load();
  };

  const openHistory = async (d: Doc) => {
    setHistoryOf(d);
    const rootId = d.parent_id ?? d.id;
    const { data } = await supabase.from("documents").select("*")
      .or(`id.eq.${rootId},parent_id.eq.${rootId}`)
      .order("version", { ascending: false });
    setVersions((data as Doc[]) ?? []);
  };

  const download = async (d: Doc) => {
    const { data, error } = await supabase.storage.from("documents").createSignedUrl(d.storage_path, 60);
    if (error) return toast.error(error.message);
    window.open(data.signedUrl, "_blank");
  };

  const remove = async (d: Doc) => {
    if (!confirm("Delete this document (and all its versions)?")) return;
    const rootId = d.parent_id ?? d.id;
    const { data: all } = await supabase.from("documents").select("id,storage_path")
      .or(`id.eq.${rootId},parent_id.eq.${rootId}`);
    const paths = (all ?? []).map((x: any) => x.storage_path);
    if (paths.length) await supabase.storage.from("documents").remove(paths);
    const { error } = await supabase.from("documents").delete().or(`id.eq.${rootId},parent_id.eq.${rootId}`);
    if (error) return toast.error(error.message);
    load();
  };

  const filtered = docs.filter((d) => d.folder === activeFolder);

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-3xl font-bold">Documents</h1>
        <p className="text-muted-foreground text-sm">Shared company files, organized by folder.</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {FOLDERS.map((f) => {
          const count = docs.filter((d) => d.folder === f).length;
          const active = f === activeFolder;
          return (
            <button key={f} onClick={() => setActiveFolder(f)}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm border transition-colors ${
                active ? "bg-hydro/15 text-hydro border-hydro/40" : "bg-card/60 text-muted-foreground border-foreground/10 hover:text-foreground"
              }`}>
              <FolderOpen className="w-3.5 h-3.5" />{f}
              <span className="text-[10px] opacity-70">({count})</span>
            </button>
          );
        })}
      </div>

      {canManage && (
        <form onSubmit={upload} className="p-4 rounded-xl border border-foreground/10 bg-card/60 mb-6 grid gap-3 md:grid-cols-5">
          <div><Label>Display name</Label><Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Auto from file" /></div>
          <div className="md:col-span-2"><Label>Description</Label><Input value={description} onChange={(e) => setDescription(e.target.value)} /></div>
          <div>
            <Label>Folder</Label>
            <Select value={folder} onValueChange={setFolder}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>{FOLDERS.map((f) => <SelectItem key={f} value={f}>{f}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div><Label>File</Label><Input type="file" ref={fileRef} required /></div>
          <div className="md:col-span-5"><Button type="submit" disabled={busy}><Upload className="w-4 h-4 mr-2" />{busy ? "Uploading…" : "Upload"}</Button></div>
        </form>
      )}

      <div className="space-y-2">
        {filtered.length === 0 && <p className="text-muted-foreground text-sm">No documents in {activeFolder} yet.</p>}
        {filtered.map((d) => (
          <div key={d.id} className="p-4 rounded-xl border border-foreground/10 bg-card/60 flex items-center gap-4">
            <FileText className="w-5 h-5 text-hydro shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="font-medium truncate flex items-center gap-2">
                {d.name}
                <span className="text-[10px] px-1.5 py-0.5 rounded border border-foreground/10 bg-foreground/5">v{d.version}</span>
              </div>
              {d.description && <div className="text-xs text-muted-foreground">{d.description}</div>}
              <div className="text-xs text-muted-foreground">
                {d.size_bytes ? `${(d.size_bytes / 1024).toFixed(1)} KB` : ""} · {new Date(d.created_at).toLocaleDateString()}
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => download(d)}><Download className="w-4 h-4" /></Button>
            <Button variant="ghost" size="icon" onClick={() => openHistory(d)} title="Version history"><History className="w-4 h-4" /></Button>
            {isAdmin && <Button variant="ghost" size="icon" onClick={() => remove(d)}><Trash2 className="w-4 h-4" /></Button>}
          </div>
        ))}
      </div>

      <Dialog open={!!historyOf} onOpenChange={(o) => !o && setHistoryOf(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Version history — {historyOf?.name}</DialogTitle></DialogHeader>
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {versions.map((v) => (
              <div key={v.id} className="flex items-center gap-3 p-2 rounded-lg border border-foreground/10">
                <span className="text-xs font-mono px-1.5 py-0.5 rounded bg-foreground/5">v{v.version}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-muted-foreground">{new Date(v.created_at).toLocaleString()}</div>
                </div>
                {v.is_current && <span className="text-[10px] text-hydro">current</span>}
                <Button variant="ghost" size="icon" onClick={() => download(v)}><Download className="w-4 h-4" /></Button>
              </div>
            ))}
          </div>
          {canManage && historyOf && (
            <div className="pt-4 border-t border-foreground/10">
              <Label>Upload new version</Label>
              <div className="flex gap-2 mt-2">
                <Input type="file" ref={versionRef} />
                <Button onClick={() => uploadNewVersion(historyOf)} disabled={busy}>Upload</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Documents;