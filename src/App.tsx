import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ContactDialogProvider } from "@/components/ContactFormDialog";
import ScrollToTop from "@/components/ScrollToTop";
import { Button } from "@/components/ui/button";
import { hasBackendConfig } from "@/lib/optionalSupabase";
import Index from "./pages/Index";

// Route-level code splitting — keeps the initial bundle lean.
const Services = lazy(() => import("./pages/Services"));
const About = lazy(() => import("./pages/About"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const PortfolioDetail = lazy(() => import("./pages/PortfolioDetail"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const NotFound = lazy(() => import("./pages/NotFound"));
const PortalShell = lazy(() => import("@/portal/PortalShell"));
const PortalLogin = lazy(() => import("./pages/portal/Login"));
const AcceptInvite = lazy(() => import("./pages/portal/AcceptInvite"));
const PortalDashboard = lazy(() => import("./pages/portal/Dashboard"));
const PortalTasks = lazy(() => import("./pages/portal/Tasks"));
const PortalAnnouncements = lazy(() => import("./pages/portal/Announcements"));
const PortalDocuments = lazy(() => import("./pages/portal/Documents"));
const PortalAdmin = lazy(() => import("./pages/portal/Admin"));
const PortalProfile = lazy(() => import("./pages/portal/Profile"));
const PortalTeam = lazy(() => import("./pages/portal/Team"));
const BlogsList = lazy(() => import("./pages/portal/BlogsList"));
const BlogEditor = lazy(() => import("./pages/portal/BlogEditor"));
const Pricing = lazy(() => import("./pages/Pricing"));

const queryClient = new QueryClient();

const PortalUnavailable = () => (
  <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-6">
    <div className="w-full max-w-md rounded-2xl border border-foreground/10 bg-card/70 p-8 text-center shadow-2xl backdrop-blur-xl">
      <p className="font-display text-2xl font-bold mb-2">Portal temporarily unavailable</p>
      <p className="text-sm text-muted-foreground mb-6">
        The employee portal needs the backend configuration to be present in this environment.
      </p>
      <Button asChild variant="outline">
        <a href="/">Back to website</a>
      </Button>
    </div>
  </div>
);

const BackendRequired = ({ children }: { children: React.ReactNode }) => (
  hasBackendConfig ? <>{children}</> : <PortalUnavailable />
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ContactDialogProvider>
          <ScrollToTop />
          <Suspense fallback={<div className="min-h-dvh bg-background" />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/portfolio/:slug" element={<PortfolioDetail />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/portal/login" element={<BackendRequired><PortalLogin /></BackendRequired>} />
            <Route path="/portal/accept-invite" element={<BackendRequired><AcceptInvite /></BackendRequired>} />
            <Route path="/portal" element={<BackendRequired><PortalShell /></BackendRequired>}>
              <Route index element={<PortalDashboard />} />
              <Route path="tasks" element={<PortalTasks />} />
              <Route path="announcements" element={<PortalAnnouncements />} />
              <Route path="documents" element={<PortalDocuments />} />
              <Route path="team" element={<PortalTeam />} />
              <Route path="profile" element={<PortalProfile />} />
              <Route path="admin" element={<PortalAdmin />} />
              <Route path="blogs" element={<BlogsList />} />
              <Route path="blogs/new" element={<BlogEditor />} />
              <Route path="blogs/:id" element={<BlogEditor />} />
              <Route path="pricing" element={<Pricing />} />
            </Route>
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          </Suspense>
        </ContactDialogProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
