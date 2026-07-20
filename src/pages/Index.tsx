import { useState } from 'react';
import Preloader from '@/components/Preloader';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import TrustMarquee from '@/components/TrustMarquee';
import PagePreviewSection from '@/components/PagePreviewSection';
import BlogSection from '@/components/BlogSection';
import Footer from '@/components/Footer';
import HomeSeoContent from '@/components/HomeSeoContent';
import { Seo } from '@/lib/seo';

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      <Seo
        title="Digital Marketing Agency Bangalore | HydroBlaze Media"
        description="HydroBlaze Media is a performance-driven digital marketing agency in Bangalore. Meta Ads, Google Ads, social media, branding, websites & lead generation."
        path="/"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "HydroBlaze Media — Digital Marketing Agency",
            "url": "https://hydroblazemedia.com/",
            "description": "Performance-driven digital marketing agency in Bangalore offering Meta Ads, Google Ads, social media, branding, websites and lead generation.",
            "inLanguage": "en"
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              { "@type": "Question", "name": "What does HydroBlaze Media do as a digital marketing agency?", "acceptedAnswer": { "@type": "Answer", "text": "HydroBlaze Media is a performance-driven digital marketing agency in Bangalore offering social media marketing, Meta Ads, Google Ads, branding, website development and lead generation." } },
              { "@type": "Question", "name": "Do you run Meta Ads and Google Ads campaigns?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. We run full-funnel Meta Ads and Google Ads structured around clear KPIs — cost per lead, ROAS and pipeline value — with weekly optimisation and transparent reporting." } },
              { "@type": "Question", "name": "How is your social media marketing different?", "acceptedAnswer": { "@type": "Answer", "text": "We treat social as a growth channel with strategy-first planning, content pillars and dedicated designers and editors instead of a generic posting calendar." } },
              { "@type": "Question", "name": "Do you build websites and landing pages?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. We build fast, SEO-friendly marketing sites and high-converting landing pages optimised for Core Web Vitals and conversion tracking." } },
              { "@type": "Question", "name": "How do you generate qualified leads?", "acceptedAnswer": { "@type": "Answer", "text": "We design end-to-end lead generation systems — paid traffic, landing pages, CRM automation and follow-up sequences — so sales teams receive qualified enquiries." } },
              { "@type": "Question", "name": "Are you a digital marketing agency in Bangalore?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, HydroBlaze Media is headquartered in Bangalore, Karnataka and works with clients across India and internationally." } },
              { "@type": "Question", "name": "What does branding include?", "acceptedAnswer": { "@type": "Answer", "text": "Logo design, colour and typography systems, brand guidelines, tone of voice and launch collateral for digital and offline surfaces." } },
              { "@type": "Question", "name": "How do I get started?", "acceptedAnswer": { "@type": "Answer", "text": "Book a free discovery call or request an audit through the contact form. We review your current performance and share a tailored growth plan." } }
            ]
          }
        ]}
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
            <HomeSeoContent />
            <BlogSection />
            <Footer />
          </main>
        </>
      )}
    </>
  );
};

export default Index;
