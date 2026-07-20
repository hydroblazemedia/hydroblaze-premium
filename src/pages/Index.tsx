import { useState } from 'react';
import Preloader from '@/components/Preloader';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import TrustMarquee from '@/components/TrustMarquee';
import PagePreviewSection from '@/components/PagePreviewSection';
import BlogSection from '@/components/BlogSection';
import Footer from '@/components/Footer';
import { Seo } from '@/lib/seo';

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      <Seo
        title="HydroBlaze Media | Digital Marketing Agency That Drives Revenue"
        description="Performance-driven digital marketing agency helping ambitious brands generate leads, grow revenue, and scale with strategy-first creative."
        path="/"
      />
      <Preloader onComplete={() => setIsLoaded(true)} />
      
      {isLoaded && (
        <>
          <div className="noise-overlay" />
          <Navbar />
          
          <main>
            <Hero />
            <TrustMarquee />
            <PagePreviewSection />
            <BlogSection />
            <Footer />
          </main>
        </>
      )}
    </>
  );
};

export default Index;
