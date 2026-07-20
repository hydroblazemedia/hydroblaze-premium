import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Building2, Utensils, Dumbbell, Home, GraduationCap, ShoppingBag, Stethoscope, Sparkles } from 'lucide-react';

const industries = [
  { icon: Utensils, name: 'Restaurants & F&B', desc: 'Reels, geo-targeted Meta Ads and delivery-app funnels.' },
  { icon: Dumbbell, name: 'Fitness & Wellness', desc: 'Membership lead generation and community building.' },
  { icon: Home, name: 'Real Estate', desc: 'High-intent lead capture and long-form video campaigns.' },
  { icon: ShoppingBag, name: 'D2C & E-commerce', desc: 'ROAS-focused Meta and Google Ads with creative testing.' },
  { icon: GraduationCap, name: 'Education & Coaching', desc: 'Webinar funnels, retargeting and organic content systems.' },
  { icon: Stethoscope, name: 'Healthcare & Clinics', desc: 'Local SEO, reputation and appointment lead flows.' },
  { icon: Building2, name: 'B2B & Professional', desc: 'LinkedIn thought leadership and Google search capture.' },
  { icon: Sparkles, name: 'Beauty & Lifestyle', desc: 'Influencer collaborations and content-led social growth.' },
];

const faqs = [
  {
    q: 'What does HydroBlaze Media do as a digital marketing agency?',
    a: 'HydroBlaze Media is a performance-driven digital marketing agency in Bangalore offering social media marketing, Meta Ads, Google Ads, branding, website development and lead generation. We combine data-led strategy with creative execution to help brands generate qualified leads and grow revenue.',
  },
  {
    q: 'Do you run Meta Ads and Google Ads campaigns?',
    a: 'Yes. Our performance marketing team runs full-funnel Meta Ads (Facebook and Instagram) and Google Ads (Search, Performance Max, YouTube). Every campaign is structured around clear KPIs — cost per lead, ROAS and pipeline value — with weekly optimisation and transparent reporting.',
  },
  {
    q: 'How is your social media marketing different?',
    a: 'We treat social as a growth channel, not a posting calendar. Every account gets a strategy-first plan covering positioning, content pillars, reel hooks and community engagement — executed by dedicated designers and editors, not junior interns.',
  },
  {
    q: 'Do you build websites and landing pages?',
    a: 'Yes. Our website development team ships fast, SEO-friendly marketing sites and high-converting landing pages built on modern stacks. Every build is optimised for Core Web Vitals, mobile performance and conversion tracking.',
  },
  {
    q: 'How do you generate qualified leads for businesses?',
    a: 'We design end-to-end lead generation systems — paid traffic, landing pages, lead magnets, CRM automation and follow-up sequences — so sales teams receive qualified enquiries, not just form fills.',
  },
  {
    q: 'Are you a digital marketing agency in Bangalore?',
    a: 'Yes, HydroBlaze Media is headquartered in Bangalore, Karnataka. We work with clients across Bangalore, pan-India and internationally, delivering strategy, creative and paid media remotely with structured weekly touchpoints.',
  },
  {
    q: 'What does branding include?',
    a: 'Our branding services cover logo design, colour and typography systems, brand guidelines, tone of voice and launch collateral — everything needed to present a professional identity across digital and offline surfaces.',
  },
  {
    q: 'How do I get started?',
    a: 'Book a free discovery call or request an audit through the contact form. We review your current performance, share a growth plan tailored to your goals, and only start once the fit is right.',
  },
];

const HomeSeoContent = () => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <>
      {/* ═══ ABOUT / OVERVIEW ═══ */}
      <section className="relative z-10 py-20 md:py-28 px-6 md:px-12 lg:px-16 border-t border-foreground/5">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium bg-hydro/10 text-hydro border border-hydro/20 mb-5">
              About HydroBlaze Media
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-[-0.025em] mb-6">
              A digital marketing agency built for <span className="text-gradient">measurable growth</span>.
            </h2>
            <div className="space-y-5 text-muted-foreground text-base md:text-lg leading-relaxed">
              <p>
                HydroBlaze Media is a performance-driven digital marketing agency based in Bangalore, Karnataka, working with ambitious brands across India and internationally. We combine analytical strategy with editorial-grade creative to help businesses generate leads, grow revenue and scale sustainably.
              </p>
              <p>
                We are a full-service marketing partner — social media marketing, Meta Ads, Google Ads, branding, website development, content production and lead generation all sit under one roof. Instead of stitching together freelancers or juggling multiple vendors, teams work with a single accountable partner that owns the outcome end to end.
              </p>
              <p>
                Every engagement starts with a growth diagnosis: audience research, channel mix, funnel gaps and creative benchmarks. From there we build a 90-day roadmap tied to real business KPIs — cost per lead, return on ad spend, pipeline value and revenue — and execute in tight weekly cycles with transparent reporting.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ INDUSTRIES ═══ */}
      <section className="relative z-10 py-20 md:py-28 px-6 md:px-12 lg:px-16 border-t border-foreground/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium bg-blaze/10 text-blaze border border-blaze/20 mb-5">
              Industries We Serve
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-[-0.025em] mb-4">
              Marketing built for <span className="text-gradient-blaze">real business categories</span>.
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
              We work with founder-led brands across categories where structured marketing directly moves revenue.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {industries.map((ind, i) => (
              <motion.div
                key={ind.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (i % 4) * 0.05 }}
                className="p-5 rounded-2xl border border-foreground/10 bg-card/50 backdrop-blur-sm hover:border-hydro/30 transition-colors"
              >
                <ind.icon className="w-6 h-6 text-hydro mb-3" />
                <h3 className="font-display font-semibold text-sm mb-1.5 tracking-[-0.01em]">{ind.name}</h3>
                <p className="text-muted-foreground text-xs leading-relaxed">{ind.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section id="faq" className="relative z-10 py-20 md:py-28 px-6 md:px-12 lg:px-16 border-t border-foreground/5">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium bg-hydro/10 text-hydro border border-hydro/20 mb-5">
              Frequently Asked Questions
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-[-0.025em]">
              Everything you wanted to <span className="text-gradient">ask</span>.
            </h2>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <div
                  key={f.q}
                  className="rounded-2xl border border-foreground/10 bg-card/50 backdrop-blur-sm overflow-hidden"
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 text-left px-5 md:px-6 py-4 md:py-5"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${i}`}
                  >
                    <h3 className="font-display font-semibold text-sm md:text-base tracking-[-0.01em]">{f.q}</h3>
                    <ChevronDown className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div id={`faq-answer-${i}`} className="px-5 md:px-6 pb-5 md:pb-6 text-muted-foreground text-sm md:text-base leading-relaxed">
                      {f.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeSeoContent;