import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

const ACC = Deno.env.get('ZOHO_ACCOUNTS_DOMAIN') ?? 'https://accounts.zoho.in';

const token = async () => {
  const p = new URLSearchParams({
    refresh_token: Deno.env.get('ZOHO_REFRESH_TOKEN')!,
    client_id: Deno.env.get('ZOHO_CLIENT_ID')!,
    client_secret: Deno.env.get('ZOHO_CLIENT_SECRET')!,
    grant_type: 'refresh_token',
  });
  const r = await fetch(`${ACC}/oauth/v2/token?${p}`, { method: 'POST' });
  const j = await r.json();
  return { t: j.access_token as string, d: (j.api_domain as string) ?? 'https://www.zohoapis.in', raw: j };
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  const { action, path, method, body } = await req.json().catch(() => ({ action: 'fields' }));
  const { t, d, raw } = await token();
  if (!t) return new Response(JSON.stringify({ tokenError: raw }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  const url = action === 'raw' ? `${d}${path}` : `${d}/crm/v6/settings/fields?module=Leads`;
  const r = await fetch(url, {
    method: method ?? 'GET',
    headers: { Authorization: `Zoho-oauthtoken ${t}`, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await r.text();
  return new Response(JSON.stringify({ status: r.status, apiDomain: d, body: text.slice(0, 200000) }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
});
