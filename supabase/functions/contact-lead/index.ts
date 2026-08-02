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
});

// Neutralize spreadsheet formula / CSV injection.
const sanitizeCell = (input: string) => {
  const cleaned = input.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').trim();
  return /^[=+\-@\t\r]/.test(cleaned) ? `'${cleaned}` : cleaned;
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

    const response = await fetch(GOOGLE_SHEET_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error(`Lead forward failed [${response.status}]: ${await response.text()}`);
      return json({ error: 'Could not record your submission right now' }, 502);
    }

    return json({ ok: true });
  } catch (error) {
    console.error('contact-lead error:', error instanceof Error ? error.message : error);
    return json({ error: 'Could not record your submission right now' }, 500);
  }
});
