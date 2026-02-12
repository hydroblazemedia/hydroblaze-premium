import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const About = () => {
  const team = [
    { name: 'Vikas K S', role: 'Strategy Lead', emoji: '🔥' },
    { name: 'Sree Thilak', role: 'Creative Director', emoji: '💧' },
    { name: 'Umme Kulsum', role: 'Tech Lead', emoji: '⚙️' },
    { name: 'Nagdeep', role: 'Marketing Lead', emoji: '🎯' },
  ];

  const values = [
    { title: 'Data-Driven', description: 'Every decision is backed by insights, not guesswork.', icon: '📊' },
    { title: 'Creative Excellence', description: 'We push boundaries to create memorable experiences.', icon: '✨' },
    { title: 'Results First', description: 'Beautiful work means nothing without measurable impact.', icon: '🎯' },
    { title: 'Transparency', description: 'Clear communication and honest reporting, always.', icon: '🔍' },
  ];

  return (
    <>
      <div className="noise-overlay" />
      <Navbar />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-20 md:py-32 px-6 md:px-12 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium bg-hydro/10 text-hydro border border-hydro/20 mb-6">
                🚀 About Us
              </span>
              <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">
                Where <span className="text-gradient">Water</span> Meets <span className="text-gradient-blaze">Fire</span>
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto">
                We're a digital marketing agency that combines the fluidity of data-driven strategy 
                with the intensity of scroll-stopping creative. The result? Growth that flows and brands that burn bright.
              </p>
            </motion.div>

            {/* Story Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid md:grid-cols-2 gap-12 items-center mb-24"
            >
              <div>
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
                  Our Story
                </h2>
                <p className="text-muted-foreground mb-4">
                  HydroBlaze Media was born from a simple observation: most agencies are either 
                  all strategy with boring execution, or all creative with no measurable results.
                </p>
                <p className="text-muted-foreground mb-4">
                  We believed there had to be a better way — a fusion of analytical precision 
                  and creative fire that actually moves the needle.
                </p>
                <p className="text-muted-foreground">
                  Today, we help brands cut through the noise with systems that attract attention, 
                  convert interest, and scale revenue predictably.
                </p>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-hydro/20 to-blaze/20 border border-foreground/10 flex items-center justify-center">
                  <span className="text-8xl">💧🔥</span>
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-hydro to-blaze rounded-full blur-3xl opacity-50" />
              </div>
            </motion.div>

            {/* Values Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-24"
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-12">
                What We <span className="text-gradient">Stand For</span>
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {values.map((value, index) => (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="p-6 rounded-2xl bg-card/50 border border-foreground/10 backdrop-blur-sm"
                  >
                    <span className="text-4xl mb-4 block">{value.icon}</span>
                    <h3 className="font-display text-xl font-semibold mb-2">{value.title}</h3>
                    <p className="text-muted-foreground text-sm">{value.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Team Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-12">
                Meet the <span className="text-gradient-blaze">Team</span>
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {team.map((member, index) => (
                  <motion.div
                    key={member.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="text-center p-8 rounded-2xl bg-card/50 border border-foreground/10 backdrop-blur-sm"
                  >
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-hydro/20 to-blaze/20 flex items-center justify-center text-4xl">
                      {member.emoji}
                    </div>
                    <h3 className="font-display text-xl font-semibold mb-1">{member.name}</h3>
                    <p className="text-muted-foreground text-sm">{member.role}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default About;
