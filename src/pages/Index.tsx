import { useState } from 'react';
import Preloader from '@/components/Preloader';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import TrustMarquee from '@/components/TrustMarquee';
import PagePreviewSection from '@/components/PagePreviewSection';
import BlogSection from '@/components/BlogSection';
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
            <BlogSection />
            <Footer />
            <div className="pb-6 text-center text-sm text-foreground/80">
              <a
                href="https://www.linkedin.com/company/hydroblaze-media/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Strategic Marketing by HydroBlaze Media
              </a>
            </div>
          </main>
        </>
      )}
    </>
  );
};

export default Index;
