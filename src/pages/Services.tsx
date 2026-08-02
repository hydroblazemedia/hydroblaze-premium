import Navbar from '@/components/Navbar';
import ServicesSection from '@/components/ServicesSection';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
import { Seo } from '@/lib/seo';

const Services = () => {
  return (
    <PageTransition>
      <Seo
        title="Services — Performance Marketing, Social, Content & Websites"
        description="Meta & Google Ads, social media management, content creation, lead funnels, and website design engineered to move revenue for ambitious brands."
        path="/services"
        breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Services', path: '/services' }]}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Digital Marketing Services',
          serviceType: 'Digital marketing, performance advertising and content production',
          provider: {
            '@type': 'Organization',
            name: 'HydroBlaze Media',
            url: 'https://hydroblazemedia.com',
          },
          areaServed: ['Bangalore', 'India', 'Worldwide'],
          url: 'https://hydroblazemedia.com/services',
          description:
            'Meta & Google Ads, social media management, content creation, lead funnels, and website design engineered to move revenue for ambitious brands.',
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'HydroBlaze Media Services',
            itemListElement: [
              'Social Media Marketing',
              'Performance Marketing (Meta & Google Ads)',
              'Content Production',
              'Branding & Design',
              'Website Development',
              'Lead Generation Funnels',
            ].map((service) => ({
              '@type': 'Offer',
              itemOffered: { '@type': 'Service', name: service },
            })),
          },
        }}
      />
      <div className="noise-overlay" />
      <Navbar />
      <main className="pt-24">
        <ServicesSection />
        
        <Footer />
      </main>
    </PageTransition>
  );
};

export default Services;
