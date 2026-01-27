import Navbar from '@/components/Navbar';
import ServicesSection from '@/components/ServicesSection';
import Footer from '@/components/Footer';

const Services = () => {
  return (
    <>
      {/* Noise overlay */}
      <div className="noise-overlay" />
      
      {/* Main content */}
      <Navbar />
      
      <main className="pt-24">
        <ServicesSection />
        <Footer />
      </main>
    </>
  );
};

export default Services;
