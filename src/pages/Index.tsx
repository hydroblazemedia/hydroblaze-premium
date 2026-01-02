import { useState } from 'react';
import Preloader from '@/components/Preloader';
import ParticleCanvas from '@/components/ParticleCanvas';
import CustomCursor from '@/components/CustomCursor';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ServicesSection from '@/components/ServicesSection';
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
          
          {/* Custom cursor */}
          <CustomCursor />
          
          {/* Particle background */}
          <ParticleCanvas />
          
          {/* Main content */}
          <Navbar />
          
          <main>
            <Hero />
            <ServicesSection />
            <Footer />
          </main>
        </>
      )}
    </>
  );
};

export default Index;
