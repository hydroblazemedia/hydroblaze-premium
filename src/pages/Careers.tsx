import { motion } from 'framer-motion';
import { Flame, Globe, Clock, BookOpen, Palette, DollarSign, TrendingUp } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';

const Careers = () => {
  const openings = [
    { title: 'Senior Content Strategist', type: 'Full-time', location: 'Remote', department: 'Hydro Strategy', description: "Lead content strategy for high-growth brands. You'll develop data-driven content roadmaps and growth plans." },
    { title: 'Motion Graphics Designer', type: 'Full-time', location: 'Remote', department: 'Blaze Creative', description: 'Create scroll-stopping reels, animations, and video content that drives engagement and brand recall.' },
    { title: 'Full-Stack Developer', type: 'Full-time', location: 'Remote', department: 'Fusion Tech', description: 'Build high-performance websites and landing pages using React, Next.js, and modern web technologies.' },
    { title: 'Social Media Manager', type: 'Full-time', location: 'Remote', department: 'Hydro Strategy', description: 'Manage and grow social presence for multiple brands across Instagram, TikTok, and LinkedIn.' },
  ];

  const perks = [
    { title: 'Remote-First', description: 'Work from anywhere in the world', icon: Globe },
    { title: 'Flexible Hours', description: 'We care about output, not hours', icon: Clock },
    { title: 'Learning Budget', description: '$1,000/year for courses & tools', icon: BookOpen },
    { title: 'Creative Freedom', description: 'Your ideas matter here', icon: Palette },
    { title: 'Competitive Pay', description: 'Market-rate salaries + bonuses', icon: DollarSign },
    { title: 'Growth Path', description: 'Clear progression & mentorship', icon: TrendingUp },
  ];

  return (
    <PageTransition>
      <div className="noise-overlay" />
      <Navbar />
      
      <main className="pt-24">
        <section className="py-20 md:py-32 px-6 md:px-12 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium bg-blaze/10 text-blaze border border-blaze/20 mb-6">
                <Flame className="w-3.5 h-3.5" />
                Careers
              </span>
              <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">
                Join the <span className="text-gradient-blaze">HydroBlaze</span> Team
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto">
                We're building the future of digital marketing. If you're passionate about creating work that actually moves the needle, we want to hear from you.
              </p>
            </motion.div>

            {/* Perks */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-24">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-12">
                Why <span className="text-gradient">Work With Us</span>
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {perks.map((perk, index) => (
                  <motion.div
                    key={perk.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -5, transition: { duration: 0.3 } }}
                    className="p-6 rounded-2xl bg-card/50 border border-foreground/10 backdrop-blur-sm hover:border-hydro/20 transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-hydro/10 border border-hydro/20 flex items-center justify-center mb-3 group-hover:bg-hydro/20 transition-colors">
                      <perk.icon className="w-6 h-6 text-hydro" />
                    </div>
                    <h3 className="font-display text-lg font-semibold mb-1">{perk.title}</h3>
                    <p className="text-muted-foreground text-sm">{perk.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Open Positions */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-12">
                Open <span className="text-gradient-blaze">Positions</span>
              </h2>
              <div className="space-y-4">
                {openings.map((job, index) => (
                  <motion.div
                    key={job.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ x: 5, transition: { duration: 0.3 } }}
                    className="p-6 rounded-2xl bg-card/50 border border-foreground/10 backdrop-blur-sm hover:border-hydro/30 transition-colors duration-300"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <h3 className="font-display text-xl font-semibold mb-2">{job.title}</h3>
                        <p className="text-muted-foreground text-sm mb-3">{job.description}</p>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-3 py-1 rounded-full text-xs bg-hydro/10 text-hydro border border-hydro/20">{job.department}</span>
                          <span className="px-3 py-1 rounded-full text-xs bg-foreground/5 text-muted-foreground border border-foreground/10">{job.type}</span>
                          <span className="px-3 py-1 rounded-full text-xs bg-foreground/5 text-muted-foreground border border-foreground/10">{job.location}</span>
                        </div>
                      </div>
                      <a href="mailto:careers@hydroblazemedia.com" className="shrink-0 px-6 py-2.5 rounded-full text-sm font-medium bg-gradient-to-r from-hydro to-blaze text-white hover:shadow-[0_0_30px_hsl(var(--hydro)/0.4)] transition-all duration-300 hover:scale-105">
                        Apply Now
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mt-20 text-center p-8 md:p-12 rounded-3xl bg-gradient-to-br from-hydro/10 to-blaze/10 border border-foreground/10">
              <h3 className="font-display text-2xl md:text-3xl font-bold mb-4">Don't see the right role?</h3>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">We're always looking for talented people. Send us your portfolio and tell us how you can contribute.</p>
              <a href="mailto:careers@hydroblazemedia.com" className="inline-block px-8 py-3 rounded-full text-sm font-medium border border-foreground/20 hover:border-hydro hover:shadow-[0_0_20px_hsl(var(--hydro)/0.3)] transition-all duration-300">
                Send Open Application
              </a>
            </motion.div>
          </div>
        </section>
        <Footer />
      </main>
    </PageTransition>
  );
};

export default Careers;
