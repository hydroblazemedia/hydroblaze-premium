import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ContactDialogProvider } from "@/components/ContactFormDialog";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index";
import Services from "./pages/Services";
import About from "./pages/About";

import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Portfolio from "./pages/Portfolio";
import PortfolioDetail from "./pages/PortfolioDetail";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import NotFound from "./pages/NotFound";
import { PortalAuthProvider } from "@/portal/PortalAuthContext";
import PortalLayout from "@/portal/PortalLayout";
import PortalLogin from "./pages/portal/Login";
import AcceptInvite from "./pages/portal/AcceptInvite";
import PortalDashboard from "./pages/portal/Dashboard";
import PortalTasks from "./pages/portal/Tasks";
import PortalAnnouncements from "./pages/portal/Announcements";
import PortalDocuments from "./pages/portal/Documents";
import PortalAdmin from "./pages/portal/Admin";
import PortalProfile from "./pages/portal/Profile";
import PortalTeam from "./pages/portal/Team";
import BlogsList from "./pages/portal/BlogsList";
import BlogEditor from "./pages/portal/BlogEditor";
import Pricing from "./pages/Pricing";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ContactDialogProvider>
          <PortalAuthProvider>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/portfolio/:slug" element={<PortfolioDetail />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/portal/login" element={<PortalLogin />} />
            <Route path="/portal/accept-invite" element={<AcceptInvite />} />
            <Route path="/portal" element={<PortalLayout />}>
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
          </PortalAuthProvider>
        </ContactDialogProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
