import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowLeft, Sparkles } from "lucide-react";
import { Seo } from "@/lib/seo";
import { Button } from "@/components/ui/button";

const ThankYou = () => {
  return (
    <main className="relative min-h-dvh bg-background text-foreground flex items-center justify-center overflow-hidden px-6">
      <Seo
        title="Thank You"
        description="Thanks for reaching out to HydroBlaze Media. We'll get back to you within 24 hours."
        path="/thank-you"
        noindex
      />

      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-accent/20 blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-lg rounded-3xl border border-foreground/10 bg-card/70 p-10 text-center shadow-2xl backdrop-blur-xl"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 14 }}
          className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/15 ring-1 ring-primary/30"
        >
          <CheckCircle2 className="h-10 w-10 text-primary" aria-hidden="true" />
        </motion.div>

        <p className="mb-2 inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.2em] text-primary">
          <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
          Message received
        </p>
        <h1 className="font-display text-3xl font-bold sm:text-4xl">
          Thank you for reaching out
        </h1>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          We&apos;ll get back to you within 24 hours. In the meantime, feel free
          to explore our work and services.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild size="lg">
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
              Back to home
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/portfolio">View our work</Link>
          </Button>
        </div>
      </motion.div>
    </main>
  );
};

export default ThankYou;
