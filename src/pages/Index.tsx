import { useState } from 'react';
import Preloader from '@/components/Preloader';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import StatsCounter from '@/components/StatsCounter';
import PagePreviewSection from '@/components/PagePreviewSection';

import Footer from '@/components/Footer';

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      <Preloader onComplete={() => setIsLoaded(true)} />
      
      {isLoaded && (
        <>
          <div className="noise-overlay" />
          <Navbar />
          
          <main>
            <Hero />
            <StatsCounter />
            <PagePreviewSection />
            
            <Footer />
          </main>
        </>
      )}
    </>
  );
};

export default Index;
