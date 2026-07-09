import { NavLink, Outlet, useNavigate, Navigate } from "react-router-dom";
import { LayoutDashboard, CheckSquare, Megaphone, FileText, Users, LogOut, Shield } from "lucide-react";
import { usePortalAuth } from "./PortalAuthContext";
import { Button } from "@/components/ui/button";

const navItems = [
  { to: "/portal", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/portal/tasks", label: "Tasks", icon: CheckSquare },
  { to: "/portal/announcements", label: "Announcements", icon: Megaphone },
  { to: "/portal/documents", label: "Documents", icon: FileText },
];

const PortalLayout = () => {
  const { session, loading, isAdmin, role, user, signOut } = usePortalAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-muted-foreground">
        Loading portal…
      </div>
    );
  }
  if (!session) return <Navigate to="/portal/login" replace />;

  return (
    <div className="min-h-screen flex bg-background text-foreground">
      <aside className="w-64 border-r border-foreground/10 bg-card/50 backdrop-blur-xl flex flex-col">
        <div className="p-6 border-b border-foreground/10">
          <div className="font-display text-lg font-bold">Employee Portal</div>
          <div className="text-xs text-muted-foreground mt-1 truncate">{user?.email}</div>
          {role && (
            <div className="inline-flex items-center gap-1 mt-2 px-2 py-0.5 rounded-full text-[10px] font-medium bg-hydro/15 text-hydro border border-hydro/30 capitalize">
              <Shield className="w-3 h-3" /> {role}
            </div>
          )}
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((it) => (
            <NavLink
              key={it.to}
              to={it.to}
              end={it.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive
                    ? "bg-foreground/10 text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
                }`
              }
            >
              <it.icon className="w-4 h-4" />
              {it.label}
            </NavLink>
          ))}
          {isAdmin && (
            <NavLink
              to="/portal/admin"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive
                    ? "bg-foreground/10 text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
                }`
              }
            >
              <Users className="w-4 h-4" />
              Team & Invites
            </NavLink>
          )}
        </nav>
        <div className="p-3 border-t border-foreground/10">
          <Button
            variant="ghost"
            className="w-full justify-start gap-2"
            onClick={async () => {
              await signOut();
              navigate("/portal/login");
            }}
          >
            <LogOut className="w-4 h-4" /> Sign out
          </Button>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto p-6 md:p-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default PortalLayout;