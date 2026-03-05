import { useState } from 'react';
import Preloader from '@/components/Preloader';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import TrustMarquee from '@/components/TrustMarquee';
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
            <TrustMarquee />
            <PagePreviewSection />
            <Footer />
          </main>
        </>
      )}
    </>
  );
};

export default Index;
