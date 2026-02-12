import Navbar from '@/components/Navbar';
import PricingSection from '@/components/PricingSection';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';

const Pricing = () => {
  return (
    <PageTransition>
      <div className="noise-overlay" />
      <Navbar />
      <main className="pt-24">
        <PricingSection />
        <Footer />
      </main>
    </PageTransition>
  );
};

export default Pricing;
