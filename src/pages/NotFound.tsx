import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Seo } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { Home, ArrowRight, Briefcase, Layers, Users, Mail, BookOpen } from "lucide-react";

const quickLinks = [
  { name: "Services", path: "/services", icon: Briefcase },
  { name: "Portfolio", path: "/portfolio", icon: Layers },
  { name: "About", path: "/about", icon: Users },
  { name: "Blog", path: "/blog", icon: BookOpen },
  { name: "Contact", path: "/contact", icon: Mail },
];

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <Seo
        title="Page Not Found"
        description="The page you're looking for doesn't exist. Explore HydroBlaze Media services, portfolio, or get in touch."
        path="/404"
        noindex
      />
      <section className="relative min-h-screen flex items-center justify-center px-6 py-24 overflow-hidden bg-background">
        {/* Ambient orbs */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <motion.div
            className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full opacity-[0.08]"
            style={{ background: "radial-gradient(circle, hsl(var(--hydro)), transparent 70%)" }}
            animate={{ scale: [1, 1.2, 1], x: [0, 40, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-[0.06]"
            style={{ background: "radial-gradient(circle, hsl(var(--blaze)), transparent 70%)" }}
            animate={{ scale: [1, 1.15, 1], x: [0, -30, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-2xl mx-auto relative z-10"
        >
          <div className="glass-card p-8 md:p-14 text-center">
            {/* 404 badge */}
            <div className="mb-6 inline-flex items-center justify-center w-24 h-24 md:w-28 md:h-28 rounded-full border border-border bg-card/50 shadow-[var(--shadow-glow)]">
              <span className="font-display text-5xl md:text-6xl font-bold text-gradient">404</span>
            </div>

            <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Lost in the digital wilderness?
            </h1>

            <p className="text-base md:text-lg text-muted-foreground max-w-md mx-auto leading-relaxed mb-10">
              We couldn't find that page. Let's get you back on track and turn this dead end into a growth opportunity.
            </p>

            {/* Primary CTA */}
            <Button
              asChild
              size="lg"
              className="group rounded-full px-8 py-6 text-base font-semibold bg-gradient-to-r from-hydro to-blaze text-white hover:shadow-[0_0_40px_hsl(var(--hydro)/0.4)] transition-all duration-500 hover:scale-105"
            >
              <Link to="/" className="inline-flex items-center gap-2">
                <Home className="w-4 h-4" />
                Back to Home
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
              </Link>
            </Button>

            {/* Quick links */}
            <div className="mt-12 pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground mb-5">Or explore popular pages</p>
              <nav aria-label="Popular pages">
                <ul className="flex flex-wrap items-center justify-center gap-3">
                  {quickLinks.map((link) => (
                    <li key={link.path}>
                      <Link
                        to={link.path}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium border border-border bg-card/60 text-foreground hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all duration-300"
                      >
                        <link.icon className="w-4 h-4" />
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>

          <p className="mt-8 text-center text-xs text-muted-foreground">
            Error: page not found at <code className="px-1.5 py-0.5 rounded bg-muted text-foreground">{location.pathname}</code>
          </p>
        </motion.div>
      </section>
    </>
  );
};

export default NotFound;
