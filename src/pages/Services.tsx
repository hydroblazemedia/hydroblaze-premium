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
