import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const pages = [
  {
    title: 'Services',
    description: 'Three elements. One growth engine. Strategy, Creative, and Tech that work together.',
    icon: '🚀',
    path: '/services',
    gradient: 'from-hydro/20 to-hydro/5',
  },
  {
    title: 'Pricing',
    description: 'Transparent pricing for every stage of growth. No hidden fees, no surprises.',
    icon: '💎',
    path: '/pricing',
    gradient: 'from-blaze/20 to-blaze/5',
  },
  {
    title: 'About Us',
    description: 'Where water meets fire. Learn about our story, values, and the team behind HydroBlaze.',
    icon: '💧🔥',
    path: '/about',
    gradient: 'from-hydro/10 via-transparent to-blaze/10',
  },
  {
    title: 'Careers',
    description: 'Join a team that values creativity, growth, and making an impact. See open positions.',
    icon: '🌟',
    path: '/careers',
    gradient: 'from-hydro/20 to-hydro/5',
  },
  {
    title: 'Blog',
    description: 'Insights, trends, and strategies to fuel your brand\'s digital growth.',
    icon: '📚',
    path: '/blog',
    gradient: 'from-blaze/20 to-blaze/5',
  },
];

const PagePreviewSection = () => {
  return (
    <section className="relative z-10 py-20 md:py-28 px-6 md:px-12 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl font-medium mb-4">
            Explore <span className="text-gradient">HydroBlaze</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Everything you need to know about how we can help your brand grow.
          </p>
        </motion.div>

        {/* Pages grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pages.map((page, index) => (
            <motion.div
              key={page.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                to={page.path}
                className={`group block h-full p-6 rounded-2xl bg-gradient-to-br ${page.gradient} border border-foreground/10 backdrop-blur-sm transition-all duration-300 hover:border-foreground/20 hover:shadow-lg hover:shadow-hydro/5`}
              >
                <span className="text-3xl mb-4 block">{page.icon}</span>
                <h3 className="font-display text-xl font-semibold mb-2 group-hover:text-hydro transition-colors">
                  {page.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {page.description}
                </p>
                <span className="inline-flex items-center gap-2 text-sm text-foreground/70 group-hover:text-hydro transition-colors">
                  Learn more
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PagePreviewSection;
