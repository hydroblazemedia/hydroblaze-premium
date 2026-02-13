import Navbar from '@/components/Navbar';
import ServicesSection from '@/components/ServicesSection';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';

const Services = () => {
  return (
    <PageTransition>
      <div className="noise-overlay" />
      <Navbar />
      <main className="pt-24">
        <ServicesSection />
        <ContactForm />
        <Footer />
      </main>
    </PageTransition>
  );
};

export default Services;
