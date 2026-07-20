// Blog AI Assistant — helps writers with outlines, rewrites, SEO, meta, internal links, excerpts.
// Uses the Lovable AI Gateway (LOVABLE_API_KEY).
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { createClient } from "npm:@supabase/supabase-js@2";

const GATEWAY_URL = "https://ai.gateway.lovable.dev/v1/chat/completions";
const MODEL = "google/gemini-3-flash-preview";

type Action =
  | "outline" | "improve" | "rewrite" | "seo"
  | "meta" | "internal_links" | "excerpt";

const stripHtml = (html: string) =>
  (html || "").replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const systemPrompt = `You are the HydroBlaze Media blog assistant. HydroBlaze is a premium marketing + creative studio.
You help writers plan, refine, and optimize blog posts.
You NEVER publish content — you only suggest, draft, or refine.
Voice: confident, human, action-oriented, no fluff, no emojis.
When asked for SEO, prioritize clarity, search intent, and useful specifics over keyword stuffing.`;

function buildUserPrompt(input: {
  action: Action; title: string; content: string; excerpt: string;
  category: string; keywords: string; prompt: string;
}): string {
  const { action, title, content, excerpt, category, keywords, prompt } = input;
  const body = stripHtml(content).slice(0, 8000);
  const extra = prompt ? `\nExtra instructions from the writer:\n${prompt}` : "";
  const meta = `Title: ${title || "(untitled)"}\nCategory: ${category || "(none)"}\nKeywords/tags: ${keywords || "(none)"}\nExisting excerpt: ${excerpt || "(none)"}${extra}`;

  switch (action) {
    case "outline":
      return `${meta}\n\nProduce a detailed blog outline with an H1, 5-7 H2 sections, and 2-4 bullet H3 talking points under each H2. Include a suggested intro hook and a conclusion CTA. Return plain text.`;
    case "improve":
      return `${meta}\n\nImprove the following blog draft for clarity, flow, and engagement. Keep the writer's voice, tighten sentences, remove filler, and preserve HTML meaning. Return improved prose in plain text (no HTML tags).\n\nDraft:\n${body}`;
    case "rewrite":
      return `${meta}\n\nRewrite the following text in 2-3 alternative paragraph versions the writer can choose from. Each version should be distinct in tone (analytical, punchy, story-driven). Label them "Version 1:", "Version 2:", "Version 3:".\n\nText:\n${body || excerpt || title}`;
    case "seo":
      return `${meta}\n\nAnalyze the draft for SEO. Return: (1) a primary keyword suggestion, (2) 5 secondary/LSI keywords, (3) concrete rewrite suggestions for the intro and headings, (4) an FAQ block of 3-5 Q&A pairs likely to earn featured snippets. Plain text with headings.\n\nDraft:\n${body}`;
    case "meta":
      return `${meta}\n\nWrite an SEO meta title (max 60 chars) and meta description (max 155 chars) for this blog post. Format exactly as:\nTitle: <the title>\nDescription: <the description>\n\nDraft:\n${body}`;
    case "internal_links":
      return `${meta}\n\nSuggest 5-8 internal link ideas from this HydroBlaze post to other likely site pages (Services, Portfolio, Pricing, About, related blog topics). For each: anchor text, target page (best guess), and the sentence in the draft where it should be inserted. Plain text, numbered list.\n\nDraft:\n${body}`;
    case "excerpt":
      return `${meta}\n\nWrite a compelling 2-sentence blog excerpt (max 200 chars) that makes readers want to click. Return only the excerpt text — no quotes, no labels.\n\nDraft:\n${body}`;
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const key = Deno.env.get("LOVABLE_API_KEY");
    if (!key) return new Response(JSON.stringify({ error: "Missing LOVABLE_API_KEY" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });

    // Require an authenticated admin or manager (blog editors only)
    const authHeader = req.headers.get("Authorization") ?? "";
    if (!authHeader.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY") ?? Deno.env.get("SUPABASE_PUBLISHABLE_KEY");
    if (!supabaseUrl || !anonKey) {
      return new Response(JSON.stringify({ error: "Auth not configured" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    const authed = createClient(supabaseUrl, anonKey, { global: { headers: { Authorization: authHeader } } });
    const { data: userData, error: userErr } = await authed.auth.getUser();
    if (userErr || !userData.user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    const { data: roles } = await authed.from("user_roles").select("role").eq("user_id", userData.user.id);
    const allowed = (roles ?? []).some((r: { role: string }) => r.role === "admin" || r.role === "manager");
    if (!allowed) {
      return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const body = await req.json();
    const action = body?.action as Action;
    const valid: Action[] = ["outline", "improve", "rewrite", "seo", "meta", "internal_links", "excerpt"];
    if (!valid.includes(action)) {
      return new Response(JSON.stringify({ error: "Invalid action" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const userPrompt = buildUserPrompt({
      action,
      title: String(body?.title ?? ""),
      content: String(body?.content ?? ""),
      excerpt: String(body?.excerpt ?? ""),
      category: String(body?.category ?? ""),
      keywords: String(body?.keywords ?? ""),
      prompt: String(body?.prompt ?? ""),
    });

    const resp = await fetch(GATEWAY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!resp.ok) {
      const text = await resp.text();
      const status = resp.status === 429 ? 429 : resp.status === 402 ? 402 : 500;
      return new Response(JSON.stringify({ error: text || `Gateway error ${resp.status}` }), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    const data = await resp.json();
    const result = data?.choices?.[0]?.message?.content ?? "";
    return new Response(JSON.stringify({ result }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unexpected error";
    return new Response(JSON.stringify({ error: message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});