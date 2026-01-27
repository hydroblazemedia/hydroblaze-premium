import Navbar from '@/components/Navbar';
import PricingSection from '@/components/PricingSection';
import Footer from '@/components/Footer';

const Pricing = () => {
  return (
    <>
      {/* Noise overlay */}
      <div className="noise-overlay" />
      
      {/* Main content */}
      <Navbar />
      
      <main className="pt-24">
        <PricingSection />
        <Footer />
      </main>
    </>
  );
};

export default Pricing;
