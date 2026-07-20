import Navbar from '@/components/Navbar';
import PortfolioSection from '@/components/PortfolioSection';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
import { Seo } from '@/lib/seo';

const Portfolio = () => {
  return (
    <PageTransition>
      <Seo
        title="Portfolio — Case Studies & Client Work"
        description="Selected work from HydroBlaze Media: brand growth, performance marketing, and creative campaigns for clients including CultFit, BLR Kabab and Aayara."
        path="/portfolio"
        breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Portfolio', path: '/portfolio' }]}
      />
      <div className="noise-overlay" />
      <Navbar />
      <main className="pt-24">
        <PortfolioSection />
        <Footer />
      </main>
    </PageTransition>
  );
};

export default Portfolio;
