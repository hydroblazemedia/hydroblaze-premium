import { motion } from 'framer-motion';
import { Check, X, Sparkles, Camera, Target, Palette, Globe, Zap } from 'lucide-react';
import { useContactDialog } from '@/components/ContactFormDialog';

const GetStartedButton = () => {
  const { open } = useContactDialog();
  return <button onClick={() => open("Get Started - Pricing")} className="btn-primary inline-block">Get Started</button>;
};

const PricingSection = () => {
  return (
    <section id="pricing" className="relative z-10 py-24 md:py-32 px-6 md:px-12 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16"
        >
          <h2 className="font-display text-2xl md:text-3xl font-normal">
            Service Pricing
          </h2>
          <div className="section-line" />
        </motion.div>

        {/* Social Media Management */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-8">
            <Sparkles className="w-6 h-6 text-blaze" />
            <h3 className="font-display text-xl md:text-2xl">Social Media Management</h3>
            <span className="text-sm text-muted-foreground">(Monthly Retainer)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Starter Plan */}
            <div className="glass-card p-6 rounded-2xl">
              <div className="mb-4">
                <span className="text-sm text-hydro font-medium">Starter Plan</span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-3xl font-display font-bold">₹15,000</span>
                  <span className="text-muted-foreground">/ month</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">Best for small/local businesses</p>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2 text-sm"><Check className="w-4 h-4 text-hydro" /> 8 Static Posts</li>
                <li className="flex items-center gap-2 text-sm"><Check className="w-4 h-4 text-hydro" /> 4 Reels</li>
                <li className="flex items-center gap-2 text-sm"><Check className="w-4 h-4 text-hydro" /> Content calendar</li>
                <li className="flex items-center gap-2 text-sm"><Check className="w-4 h-4 text-hydro" /> Basic captions & hashtags</li>
                <li className="flex items-center gap-2 text-sm"><Check className="w-4 h-4 text-hydro" /> Instagram + Facebook</li>
                <li className="flex items-center gap-2 text-sm"><Check className="w-4 h-4 text-hydro" /> Monthly performance report</li>
                <li className="flex items-center gap-2 text-sm text-muted-foreground"><X className="w-4 h-4" /> Ads not included</li>
                <li className="flex items-center gap-2 text-sm text-muted-foreground"><X className="w-4 h-4" /> Shoot not included</li>
              </ul>
            </div>

            {/* Growth Plan */}
            <div className="glass-card p-6 rounded-2xl border-2 border-blaze/50 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-blaze text-white text-xs font-bold px-3 py-1 rounded-full">Most Popular</span>
              </div>
              <div className="mb-4">
                <span className="text-sm text-blaze font-medium">Growth Plan</span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-3xl font-display font-bold">₹25,000</span>
                  <span className="text-muted-foreground">/ month</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">Best for growing brands</p>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2 text-sm"><Check className="w-4 h-4 text-blaze" /> 12 Static Posts</li>
                <li className="flex items-center gap-2 text-sm"><Check className="w-4 h-4 text-blaze" /> 8 Reels</li>
                <li className="flex items-center gap-2 text-sm"><Check className="w-4 h-4 text-blaze" /> Content strategy</li>
                <li className="flex items-center gap-2 text-sm"><Check className="w-4 h-4 text-blaze" /> Captions + hashtag research</li>
                <li className="flex items-center gap-2 text-sm"><Check className="w-4 h-4 text-blaze" /> Instagram + Facebook</li>
                <li className="flex items-center gap-2 text-sm"><Check className="w-4 h-4 text-blaze" /> Basic community management</li>
                <li className="flex items-center gap-2 text-sm"><Check className="w-4 h-4 text-blaze" /> Monthly report</li>
                <li className="flex items-center gap-2 text-sm text-hydro"><Zap className="w-4 h-4" /> Add-on: Shoot ₹8k–₹12k</li>
              </ul>
            </div>

            {/* Premium Plan */}
            <div className="glass-card p-6 rounded-2xl">
              <div className="mb-4">
                <span className="text-sm text-hydro font-medium">Premium Plan</span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-3xl font-display font-bold">₹40,000</span>
                  <span className="text-muted-foreground">/ month</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">Best for serious brands</p>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2 text-sm"><Check className="w-4 h-4 text-hydro" /> 16–20 Posts (Static + Reels)</li>
                <li className="flex items-center gap-2 text-sm"><Check className="w-4 h-4 text-hydro" /> Advanced content strategy</li>
                <li className="flex items-center gap-2 text-sm"><Check className="w-4 h-4 text-hydro" /> Trend-based reel planning</li>
                <li className="flex items-center gap-2 text-sm"><Check className="w-4 h-4 text-hydro" /> Instagram + Facebook</li>
                <li className="flex items-center gap-2 text-sm"><Check className="w-4 h-4 text-hydro" /> Full community management</li>
                <li className="flex items-center gap-2 text-sm"><Check className="w-4 h-4 text-hydro" /> Monthly analytics + insights</li>
                <li className="flex items-center gap-2 text-sm"><Check className="w-4 h-4 text-hydro" /> Priority support</li>
                <li className="flex items-center gap-2 text-sm text-blaze"><Check className="w-4 h-4" /> Includes 1 shoot/month</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Content Shoot & Meta Ads */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Content Shoot */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-card p-6 rounded-2xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <Camera className="w-5 h-5 text-hydro" />
              <h3 className="font-display text-lg">Content Shoot Pricing</h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-white/10">
                <div>
                  <p className="font-medium">Basic Shoot</p>
                  <p className="text-sm text-muted-foreground">2–3 hours, mobile, reels + photos</p>
                </div>
                <span className="text-hydro font-bold">₹8,000</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-white/10">
                <div>
                  <p className="font-medium">Standard Shoot</p>
                  <p className="text-sm text-muted-foreground">Half-day, reels-focused, trend content</p>
                </div>
                <span className="text-hydro font-bold">₹12,000</span>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Premium Shoot</p>
                  <p className="text-sm text-muted-foreground">Full-day, cinematic shots, multiple formats</p>
                </div>
                <span className="text-hydro font-bold">₹18,000+</span>
              </div>
              <p className="text-xs text-muted-foreground mt-4">Travel charges extra if outside city</p>
            </div>
          </motion.div>

          {/* Meta Ads */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card p-6 rounded-2xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <Target className="w-5 h-5 text-blaze" />
              <h3 className="font-display text-lg">Meta Ads Management</h3>
            </div>
            <div className="space-y-4">
              <div className="pb-3 border-b border-white/10">
                <p className="font-medium mb-2">Ads Setup (One-Time)</p>
                <p className="text-sm text-muted-foreground">Campaign setup, creatives, audience research</p>
                <span className="text-blaze font-bold">₹5,000</span>
              </div>
              <div>
                <p className="font-medium mb-3">Monthly Ads Management</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span>Ad budget up to ₹30,000</span><span className="text-blaze font-bold">₹7,000</span></div>
                  <div className="flex justify-between"><span>Ad budget up to ₹75,000</span><span className="text-blaze font-bold">₹10,000</span></div>
                  <div className="flex justify-between"><span>Ad budget ₹1L+</span><span className="text-blaze font-bold">₹15,000</span></div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">Includes: Campaign creation, audience targeting, creative testing, weekly optimisation, lead tracking</p>
            </div>
          </motion.div>
        </div>

        {/* Lead Gen, Branding, Website */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Lead Generation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-card p-6 rounded-2xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <Target className="w-5 h-5 text-hydro" />
              <h3 className="font-display text-lg">Lead Generation</h3>
            </div>
            <div className="space-y-4">
              <div className="pb-3 border-b border-white/10">
                <p className="font-medium">Local Leads</p>
                <p className="text-xs text-muted-foreground">Service / Store</p>
                <span className="text-hydro font-bold">₹12,000 + ad spend</span>
              </div>
              <div className="pb-3 border-b border-white/10">
                <p className="font-medium">High-Intent Leads</p>
                <p className="text-xs text-muted-foreground">Real Estate, Education, Clinics</p>
                <span className="text-hydro font-bold">₹18,000 + ad spend</span>
              </div>
              <div>
                <p className="font-medium">Performance-Based</p>
                <p className="text-xs text-muted-foreground">Fixed fee + per qualified lead</p>
              </div>
            </div>
          </motion.div>

          {/* Branding */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card p-6 rounded-2xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <Palette className="w-5 h-5 text-blaze" />
              <h3 className="font-display text-lg">Branding & Creatives</h3>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span>Logo Design</span><span className="text-blaze font-bold">₹5k–₹12k</span></div>
              <div className="flex justify-between"><span>Brand Kit</span><span className="text-blaze font-bold">₹15,000</span></div>
              <div className="flex justify-between"><span>Poster / Banner</span><span className="text-blaze font-bold">₹500–₹1k</span></div>
              <div className="flex justify-between"><span>Reel Editing</span><span className="text-blaze font-bold">₹800–₹1.5k</span></div>
            </div>
          </motion.div>

          {/* Website */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass-card p-6 rounded-2xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <Globe className="w-5 h-5 text-hydro" />
              <h3 className="font-display text-lg">Website Services</h3>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span>Landing Page</span><span className="text-hydro font-bold">₹8k–₹15k</span></div>
              <div className="flex justify-between"><span>Business Website (5 pages)</span><span className="text-hydro font-bold">₹20k–₹35k</span></div>
              <div className="flex justify-between"><span>Website + Lead Form + Pixel</span><span className="text-hydro font-bold">₹40,000+</span></div>
            </div>
          </motion.div>
        </div>

        {/* Recommended Combo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass-card p-8 rounded-2xl border-2 border-blaze/30 bg-gradient-to-br from-blaze/10 to-hydro/10"
        >
          <div className="flex items-center gap-3 mb-4">
            <Zap className="w-6 h-6 text-blaze" />
            <h3 className="font-display text-xl md:text-2xl">Recommended Combo</h3>
          </div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-4xl font-display font-bold text-gradient">₹30,000</span>
                <span className="text-muted-foreground">/ month</span>
              </div>
              <p className="text-lg font-medium mb-4">Growth Combo</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-blaze" /> Social Media (Growth Plan)</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-blaze" /> 1 Content Shoot</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-blaze" /> Meta Ads Management (up to ₹30k spend)</li>
              </ul>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground mb-2">This is your sweet spot retainer</p>
              <GetStartedButton />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
