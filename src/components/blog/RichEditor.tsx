import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import Youtube from "@tiptap/extension-youtube";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import { useCallback, useEffect, useRef } from "react";
import {
  Bold, Italic, Underline as UnderlineIcon, List, ListOrdered, Quote, Code, Minus,
  Link as LinkIcon, Image as ImageIcon, Youtube as YoutubeIcon, Table as TableIcon,
  Heading1, Heading2, Heading3, Heading4, Info, Undo, Redo,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Props {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

const uploadImage = async (file: File): Promise<string | null> => {
  const ext = file.name.split(".").pop() || "jpg";
  const path = `content/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await supabase.storage.from("blog-images").upload(path, file, { cacheControl: "31536000", upsert: false });
  if (error) { toast.error(error.message); return null; }
  const { data } = supabase.storage.from("blog-images").getPublicUrl(path);
  return data.publicUrl;
};

const ToolbarBtn = ({ onClick, active, disabled, children, title }: { onClick: () => void; active?: boolean; disabled?: boolean; children: React.ReactNode; title: string }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    title={title}
    className={`p-2 rounded hover:bg-foreground/10 transition-colors ${active ? "bg-foreground/10 text-hydro" : "text-muted-foreground"} disabled:opacity-40`}
  >
    {children}
  </button>
);

const Toolbar = ({ editor }: { editor: Editor }) => {
  const fileRef = useRef<HTMLInputElement>(null);

  const addLink = useCallback(() => {
    const prev = editor.getAttributes("link").href;
    const url = window.prompt("URL", prev || "https://");
    if (url === null) return;
    if (url === "") { editor.chain().focus().extendMarkRange("link").unsetLink().run(); return; }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url, target: "_blank" }).run();
  }, [editor]);

  const addYoutube = useCallback(() => {
    const url = window.prompt("YouTube URL");
    if (!url) return;
    editor.chain().focus().setYoutubeVideo({ src: url, width: 640, height: 360 }).run();
  }, [editor]);

  const addImage = () => fileRef.current?.click();

  const addCallout = () => {
    editor.chain().focus().insertContent('<div class="callout">💡 Add your callout text here…</div><p></p>').run();
  };

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; e.target.value = "";
    if (!file) return;
    const url = await uploadImage(file);
    if (url) {
      const alt = window.prompt("Image alt / caption (optional)") ?? "";
      editor.chain().focus().setImage({ src: url, alt }).run();
    }
  };

  const btn = (fn: () => boolean, active: string | { [k: string]: unknown } | null, icon: React.ReactNode, title: string) => (
    <ToolbarBtn onClick={() => fn()} active={active ? editor.isActive(active as never) : false} title={title}>{icon}</ToolbarBtn>
  );

  return (
    <div className="flex flex-wrap items-center gap-1 p-2 border-b border-foreground/10 sticky top-0 bg-card/90 backdrop-blur-md z-10 rounded-t-lg">
      <ToolbarBtn onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive("heading", { level: 1 })} title="Heading 1"><Heading1 className="w-4 h-4" /></ToolbarBtn>
      <ToolbarBtn onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })} title="Heading 2"><Heading2 className="w-4 h-4" /></ToolbarBtn>
      <ToolbarBtn onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive("heading", { level: 3 })} title="Heading 3"><Heading3 className="w-4 h-4" /></ToolbarBtn>
      <ToolbarBtn onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()} active={editor.isActive("heading", { level: 4 })} title="Heading 4"><Heading4 className="w-4 h-4" /></ToolbarBtn>
      <div className="w-px h-6 bg-foreground/10 mx-1" />
      {btn(() => editor.chain().focus().toggleBold().run(), "bold", <Bold className="w-4 h-4" />, "Bold")}
      {btn(() => editor.chain().focus().toggleItalic().run(), "italic", <Italic className="w-4 h-4" />, "Italic")}
      {btn(() => editor.chain().focus().toggleUnderline().run(), "underline", <UnderlineIcon className="w-4 h-4" />, "Underline")}
      <div className="w-px h-6 bg-foreground/10 mx-1" />
      {btn(() => editor.chain().focus().toggleBulletList().run(), "bulletList", <List className="w-4 h-4" />, "Bullet list")}
      {btn(() => editor.chain().focus().toggleOrderedList().run(), "orderedList", <ListOrdered className="w-4 h-4" />, "Numbered list")}
      {btn(() => editor.chain().focus().toggleBlockquote().run(), "blockquote", <Quote className="w-4 h-4" />, "Blockquote")}
      {btn(() => editor.chain().focus().toggleCodeBlock().run(), "codeBlock", <Code className="w-4 h-4" />, "Code block")}
      <ToolbarBtn onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Divider"><Minus className="w-4 h-4" /></ToolbarBtn>
      <div className="w-px h-6 bg-foreground/10 mx-1" />
      <ToolbarBtn onClick={addLink} active={editor.isActive("link")} title="Link"><LinkIcon className="w-4 h-4" /></ToolbarBtn>
      <ToolbarBtn onClick={addImage} title="Image"><ImageIcon className="w-4 h-4" /></ToolbarBtn>
      <ToolbarBtn onClick={addYoutube} title="YouTube embed"><YoutubeIcon className="w-4 h-4" /></ToolbarBtn>
      <ToolbarBtn onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()} title="Table"><TableIcon className="w-4 h-4" /></ToolbarBtn>
      <ToolbarBtn onClick={addCallout} title="Callout"><Info className="w-4 h-4" /></ToolbarBtn>
      <div className="w-px h-6 bg-foreground/10 mx-1" />
      <ToolbarBtn onClick={() => editor.chain().focus().undo().run()} title="Undo"><Undo className="w-4 h-4" /></ToolbarBtn>
      <ToolbarBtn onClick={() => editor.chain().focus().redo().run()} title="Redo"><Redo className="w-4 h-4" /></ToolbarBtn>
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
    </div>
  );
};

const RichEditor = ({ value, onChange, placeholder }: Props) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3, 4] } }),
      Underline,
      Link.configure({ openOnClick: false, HTMLAttributes: { class: "text-hydro underline underline-offset-2" } }),
      Image.configure({ HTMLAttributes: { class: "rounded-xl my-4" } }),
      Placeholder.configure({ placeholder: placeholder || "Start writing your post…" }),
      Youtube.configure({ HTMLAttributes: { class: "rounded-xl my-4 mx-auto" }, width: 640, height: 360 }),
      Table.configure({ resizable: true }),
      TableRow, TableHeader, TableCell,
    ],
    content: value || "",
    editorProps: {
      attributes: {
        class: "prose prose-invert dark:prose-invert max-w-none focus:outline-none min-h-[400px] p-6 blog-editor",
      },
      handleDrop: (view, event) => {
        const files = Array.from(event.dataTransfer?.files || []).filter((f) => f.type.startsWith("image/"));
        if (files.length === 0) return false;
        event.preventDefault();
        (async () => {
          for (const f of files) {
            const url = await uploadImage(f);
            if (url) view.dispatch(view.state.tr.replaceSelectionWith(view.state.schema.nodes.image.create({ src: url })));
          }
        })();
        return true;
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "", { emitUpdate: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value === "" ? "" : "loaded"]);

  if (!editor) return <div className="h-96 rounded-lg border border-foreground/10 bg-card/40 animate-pulse" />;

  return (
    <div className="rounded-lg border border-foreground/10 bg-card/40 overflow-hidden">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default RichEditor;