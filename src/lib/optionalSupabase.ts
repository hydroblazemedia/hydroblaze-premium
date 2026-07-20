import type { supabase as SupabaseClient } from "@/integrations/supabase/client";

type SupabaseModule = { supabase: typeof SupabaseClient };

export const hasBackendConfig = Boolean(
  import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
);

export async function getOptionalSupabase() {
  if (!hasBackendConfig) return null;

  try {
    const mod = (await import("@/integrations/supabase/client")) as SupabaseModule;
    return mod.supabase;
  } catch {
    return null;
  }
}