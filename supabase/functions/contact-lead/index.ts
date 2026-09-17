import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { z } from 'npm:zod@3';

const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbzkex-NlLu7qDYzoEu5FvLILHLCTeNdYnml3x0BYYyFro4nvgJsPjAOJAezq2SP1b1zZA/exec';

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

const LeadSchema = z.object({
  name: z.string().trim().min(1).max(100),
  company: z.string().trim().max(100).optional().default(''),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(1).max(20).regex(/^[\d\s+\-()]+$/),
  message: z.string().trim().min(1).max(1000),
  source: z.string().trim().max(100).optional().default('Direct'),
  utm_source: z.string().trim().max(200).optional().default(''),
  utm_medium: z.string().trim().max(200).optional().default(''),
  utm_campaign: z.string().trim().max(200).optional().default(''),
  utm_term: z.string().trim().max(200).optional().default(''),
  utm_content: z.string().trim().max(200).optional().default(''),
});

// Neutralize spreadsheet formula / CSV injection.
const sanitizeCell = (input: string) => {
  const cleaned = input.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').trim();
  return /^[=+\-@\t\r]/.test(cleaned) ? `'${cleaned}` : cleaned;
};

// ---------- Zoho CRM (server-side only) ----------

const ZOHO_CLIENT_ID = Deno.env.get('ZOHO_CLIENT_ID');
const ZOHO_CLIENT_SECRET = Deno.env.get('ZOHO_CLIENT_SECRET');
const ZOHO_REFRESH_TOKEN = Deno.env.get('ZOHO_REFRESH_TOKEN');
// e.g. https://www.zohoapis.in — used only as a fallback; OAuth response wins.
const ZOHO_API_DOMAIN_FALLBACK = Deno.env.get('ZOHO_API_DOMAIN') ?? 'https://www.zohoapis.in';
const ZOHO_ACCOUNTS_DOMAIN = Deno.env.get('ZOHO_ACCOUNTS_DOMAIN') ?? 'https://accounts.zoho.in';

let cachedToken: { accessToken: string; apiDomain: string; expiresAt: number } | null = null;

const getZohoToken = async () => {
  if (cachedToken && cachedToken.expiresAt > Date.now() + 60_000) return cachedToken;

  const params = new URLSearchParams({
    refresh_token: ZOHO_REFRESH_TOKEN!,
    client_id: ZOHO_CLIENT_ID!,
    client_secret: ZOHO_CLIENT_SECRET!,
    grant_type: 'refresh_token',
  });

  const res = await fetch(`${ZOHO_ACCOUNTS_DOMAIN}/oauth/v2/token?${params.toString()}`, { method: 'POST' });
  const body = await res.text();
  if (!res.ok) throw new Error(`Zoho token request failed [${res.status}]: ${body}`);

  const parsed = JSON.parse(body) as {
    access_token?: string;
    api_domain?: string;
    expires_in?: number;
    error?: string;
  };
  if (!parsed.access_token) throw new Error(`Zoho token response had no access_token: ${body}`);

  cachedToken = {
    accessToken: parsed.access_token,
    // Prefer the region-correct domain Zoho itself returns.
    apiDomain: parsed.api_domain ?? ZOHO_API_DOMAIN_FALLBACK,
    expiresAt: Date.now() + (parsed.expires_in ?? 3600) * 1000,
  };
  return cachedToken;
};

const splitName = (fullName: string) => {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 1) return { firstName: '', lastName: parts[0] };
  return { firstName: parts.slice(0, -1).join(' '), lastName: parts[parts.length - 1] };
};

const UTM_FIELD_MAP: Record<string, keyof z.infer<typeof LeadSchema>> = {
  UTM_Source: 'utm_source',
  UTM_Medium: 'utm_medium',
  UTM_Campaign: 'utm_campaign',
  UTM_Term: 'utm_term',
  UTM_Content: 'utm_content',
};

const utmSummary = (data: z.infer<typeof LeadSchema>) => {
  const lines = Object.entries(UTM_FIELD_MAP)
    .map(([label, key]) => [label.replace('_', ' '), String(data[key] ?? '').trim()] as const)
    .filter(([, value]) => value.length > 0)
    .map(([label, value]) => `${label}: ${value}`);
  return lines.length ? lines.join('\n') : '';
};

const postLead = async (apiDomain: string, accessToken: string, record: Record<string, unknown>) => {
  const res = await fetch(`${apiDomain}/crm/v6/Leads`, {
    method: 'POST',
    headers: {
      Authorization: `Zoho-oauthtoken ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data: [record] }),
  });
  const text = await res.text();
  let record0: { code?: string; message?: string } | undefined;
  try {
    record0 = (JSON.parse(text) as { data?: Array<{ code?: string; message?: string }> }).data?.[0];
  } catch { /* non-JSON body */ }
  const ok = res.ok && (!record0?.code || record0.code === 'SUCCESS');
  return { ok, status: res.status, text, code: record0?.code };
};

const createZohoLead = async (data: z.infer<typeof LeadSchema>) => {
  if (!ZOHO_CLIENT_ID || !ZOHO_CLIENT_SECRET || !ZOHO_REFRESH_TOKEN) {
    return { ok: false, skipped: true, error: 'Zoho credentials not configured' };
  }

  const { accessToken, apiDomain } = await getZohoToken();
  const { firstName, lastName } = splitName(data.name);

  // The message must reach Zoho verbatim in the Lead's Description field.
  const description = String(data.message ?? '');

  const base: Record<string, unknown> = {
    // Full_Name is read-only in Zoho; it is derived from First/Last name.
    First_Name: firstName || undefined,
    Last_Name: lastName,
    Company: data.company || 'Not provided',
    Email: data.email,
    Phone: data.phone,
    Description: description,
    Lead_Source: 'Website',
  };

  const withUtm: Record<string, unknown> = { ...base };
  for (const [apiName, key] of Object.entries(UTM_FIELD_MAP)) {
    const value = String(data[key] ?? '').trim();
    if (value) withUtm[apiName] = value;
  }

  let attempt = await postLead(apiDomain, accessToken, withUtm);

  // If the custom UTM fields do not exist on this Zoho account, retry with the
  // standard fields only and keep the campaign data inside Description.
  if (!attempt.ok && Object.keys(withUtm).length > Object.keys(base).length) {
    console.error(`Zoho lead with UTM fields failed [${attempt.status}] ${attempt.code ?? ''}: ${attempt.text}`);
    const summary = utmSummary(data);
    const fallback = { ...base, Description: summary ? `${description}\n\n---\nCampaign\n${summary}` : description };
    attempt = await postLead(apiDomain, accessToken, fallback);
    if (attempt.ok) return { ok: true, utmFields: false };
  }

  if (!attempt.ok) {
    console.error(`Zoho lead create failed [${attempt.status}] ${attempt.code ?? ''}: ${attempt.text}`);
    return { ok: false, status: attempt.status, error: attempt.text };
  }

  return { ok: true, utmFields: true };
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);

  try {
    const body = await req.json().catch(() => null);
    const parsed = LeadSchema.safeParse(body);
    if (!parsed.success) {
      return json({ error: 'Invalid submission', fields: parsed.error.flatten().fieldErrors }, 400);
    }

    const payload = Object.fromEntries(
      Object.entries(parsed.data).map(([key, val]) => [key, sanitizeCell(String(val ?? ''))]),
    );

    const [sheetResult, zohoResult] = await Promise.allSettled([
      fetch(GOOGLE_SHEET_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }),
      createZohoLead(parsed.data),
    ]);

    const sheetOk = sheetResult.status === 'fulfilled' && sheetResult.value.ok;
    if (sheetResult.status === 'fulfilled' && !sheetResult.value.ok) {
      console.error(`Lead forward failed [${sheetResult.value.status}]: ${await sheetResult.value.text()}`);
    } else if (sheetResult.status === 'rejected') {
      console.error('Lead forward error:', sheetResult.reason);
    }

    let zohoOk = false;
    let zohoError: unknown = null;
    if (zohoResult.status === 'fulfilled') {
      zohoOk = zohoResult.value.ok;
      zohoError = zohoResult.value.ok ? null : zohoResult.value.error;
    } else {
      zohoError = zohoResult.reason instanceof Error ? zohoResult.reason.message : String(zohoResult.reason);
      console.error('Zoho lead error:', zohoError);
    }

    if (!sheetOk && !zohoOk) {
      return json({ error: 'Could not record your submission right now', crm: false, sheet: false }, 502);
    }

    return json({ ok: true, crm: zohoOk, sheet: sheetOk });
  } catch (error) {
    console.error('contact-lead error:', error instanceof Error ? error.message : error);
    return json({ error: 'Could not record your submission right now' }, 500);
  }
});
