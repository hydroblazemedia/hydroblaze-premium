import { useState } from 'react';
import Preloader from '@/components/Preloader';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ServicesSection from '@/components/ServicesSection';
import PricingSection from '@/components/PricingSection';
import Footer from '@/components/Footer';

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      <Preloader onComplete={() => setIsLoaded(true)} />
      
      {isLoaded && (
        <>
          {/* Noise overlay */}
          <div className="noise-overlay" />
          
          {/* Main content */}
          <Navbar />
          
          <main>
            <Hero />
            <ServicesSection />
            <PricingSection />
            <Footer />
          </main>
        </>
      )}
    </>
  );
};

export default Index;
