import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Session, User } from "@supabase/supabase-js";

type Role = "admin" | "employee" | null;

interface Ctx {
  session: Session | null;
  user: User | null;
  role: Role;
  loading: boolean;
  isAdmin: boolean;
  signOut: () => Promise<void>;
  refreshRole: () => Promise<void>;
}

const PortalAuthContext = createContext<Ctx | undefined>(undefined);

export const PortalAuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [role, setRole] = useState<Role>(null);
  const [loading, setLoading] = useState(true);

  const loadRole = async (userId: string | undefined) => {
    if (!userId) return setRole(null);
    const { data } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId);
    if (data && data.length > 0) {
      const roles = data.map((r) => r.role);
      setRole(roles.includes("admin") ? "admin" : "employee");
    } else {
      setRole(null);
    }
  };

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s);
      setTimeout(() => loadRole(s?.user?.id), 0);
    });
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      loadRole(data.session?.user?.id).finally(() => setLoading(false));
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const value: Ctx = {
    session,
    user: session?.user ?? null,
    role,
    loading,
    isAdmin: role === "admin",
    signOut: async () => {
      await supabase.auth.signOut();
    },
    refreshRole: async () => loadRole(session?.user?.id),
  };

  return <PortalAuthContext.Provider value={value}>{children}</PortalAuthContext.Provider>;
};

export const usePortalAuth = () => {
  const ctx = useContext(PortalAuthContext);
  if (!ctx) throw new Error("usePortalAuth outside provider");
  return ctx;
};