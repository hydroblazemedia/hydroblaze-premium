 import { motion } from 'framer-motion';
 import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
 import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
 import servicesPreview from '@/assets/services-preview.jpg';
 import pricingPreview from '@/assets/pricing-preview.jpg';
 import aboutPreview from '@/assets/about-preview.jpg';
 import blogPreview from '@/assets/blog-preview.jpg';
 
 const blogPosts = [
   {
     title: "10 Growth Hacks for 2024",
     excerpt: "Discover the latest strategies to accelerate your brand's digital presence.",
     category: "Growth",
     date: "Feb 1, 2024"
   },
   {
     title: "The Art of Scroll-Stopping Content",
     excerpt: "Learn how to create content that captures attention in under 3 seconds.",
     category: "Creative",
     date: "Jan 28, 2024"
   },
   {
     title: "AI in Marketing: A Complete Guide",
     excerpt: "How artificial intelligence is reshaping digital marketing strategies.",
     category: "Tech",
     date: "Jan 20, 2024"
   },
   {
     title: "Building Brand Loyalty in 2024",
     excerpt: "Strategies to turn one-time customers into lifelong advocates.",
     category: "Strategy",
     date: "Jan 15, 2024"
   }
 ];

const PagePreviewSection = () => {
   const [currentSlide, setCurrentSlide] = useState(0);
 
   useEffect(() => {
     const timer = setInterval(() => {
       setCurrentSlide((prev) => (prev + 1) % blogPosts.length);
     }, 5000);
     return () => clearInterval(timer);
   }, []);
 
   const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % blogPosts.length);
   const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + blogPosts.length) % blogPosts.length);
 
  return (
    <div className="relative z-10">
      {/* Services Section */}
      <section className="py-16 md:py-24 px-6 md:px-12 lg:px-16 border-b border-foreground/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium bg-hydro/10 text-hydro border border-hydro/20 mb-4">
                🚀 Services
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Powered by Strategy. <span className="text-gradient">Executed with Creative Precision.</span>
              </h2>
              <p className="text-muted-foreground mb-6">
                Every service follows our Hydro Strategy + Blaze Creative framework — ensuring consistency, performance, and scalable results across all engagements.
              </p>
              <Link
                to="/services"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium bg-gradient-to-r from-hydro to-hydro/80 text-white hover:shadow-[0_0_30px_hsl(var(--hydro)/0.4)] transition-all duration-300"
              >
                Explore Services
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <div className="relative">
               <div className="aspect-video rounded-2xl overflow-hidden border border-foreground/10">
                 <img 
                   src={servicesPreview} 
                   alt="Digital marketing services visualization" 
                   className="w-full h-full object-cover"
                 />
               </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-hydro/20 rounded-full blur-3xl" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 md:py-24 px-6 md:px-12 lg:px-16 border-b border-foreground/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div className="order-2 md:order-1 relative">
               <div className="aspect-video rounded-2xl overflow-hidden border border-foreground/10">
                 <img 
                   src={pricingPreview} 
                   alt="Premium pricing tiers visualization" 
                   className="w-full h-full object-cover"
                 />
               </div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blaze/20 rounded-full blur-3xl" />
            </div>
            <div className="order-1 md:order-2">
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium bg-blaze/10 text-blaze border border-blaze/20 mb-4">
                💎 Pricing
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Transparent Pricing. <span className="text-gradient-blaze">No Surprises.</span>
              </h2>
              <p className="text-muted-foreground mb-6">
                Every stage of growth deserves the right support. Choose the plan that fits your needs—no hidden fees, no long-term contracts, just results.
              </p>
              <Link
                to="/pricing"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium bg-gradient-to-r from-blaze to-blaze/80 text-white hover:shadow-[0_0_30px_hsl(var(--blaze)/0.4)] transition-all duration-300"
              >
                View Pricing
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-24 px-6 md:px-12 lg:px-16 border-b border-foreground/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium bg-hydro/10 text-hydro border border-hydro/20 mb-4">
                💧🔥 About Us
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Where <span className="text-gradient">Water</span> Meets <span className="text-gradient-blaze">Fire</span>
              </h2>
              <p className="text-muted-foreground mb-6">
                We're a digital marketing agency that combines the fluidity of data-driven strategy with the intensity of scroll-stopping creative. Learn about our story, values, and the team behind HydroBlaze.
              </p>
              <Link
                to="/about"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium border border-foreground/20 hover:border-hydro hover:shadow-[0_0_20px_hsl(var(--hydro)/0.3)] transition-all duration-300"
              >
                Meet the Team
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <div className="relative">
               <div className="aspect-video rounded-2xl overflow-hidden border border-foreground/10">
                 <img 
                   src={aboutPreview} 
                   alt="Water meets fire concept art" 
                   className="w-full h-full object-cover"
                 />
               </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-hydro to-blaze rounded-full blur-3xl opacity-30" />
            </div>
          </motion.div>
        </div>
      </section>

       {/* Blog Section - Sliding Carousel */}
       <section className="py-16 md:py-24 px-6 md:px-12 lg:px-16 border-b border-foreground/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
             <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium bg-blaze/10 text-blaze border border-blaze/20 mb-4">
                📚 Blog
              </span>
               <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 mx-auto">
                Insights & <span className="text-gradient-blaze">Strategies</span>
              </h2>
               <p className="text-muted-foreground max-w-2xl mx-auto">
                Stay ahead of the curve with our latest insights on digital marketing, growth strategies, and industry trends. Fuel your brand's digital growth with expert knowledge.
              </p>
            </div>
 
             {/* Carousel */}
             <div className="relative">
               <div className="overflow-hidden rounded-2xl">
                 <div 
                   className="flex transition-transform duration-500 ease-out"
                   style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                 >
                   {blogPosts.map((post, index) => (
                     <div key={index} className="w-full flex-shrink-0">
                       <div className="grid md:grid-cols-2 gap-8 items-center">
                         <div className="aspect-video rounded-2xl overflow-hidden border border-foreground/10">
                           <img 
                             src={blogPreview} 
                             alt={post.title}
                             className="w-full h-full object-cover"
                           />
                         </div>
                         <div className="p-4 md:p-8">
                           <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-blaze/10 text-blaze border border-blaze/20 mb-3">
                             {post.category}
                           </span>
                           <h3 className="font-display text-2xl md:text-3xl font-bold mb-3">{post.title}</h3>
                           <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                           <p className="text-sm text-muted-foreground/60 mb-6">{post.date}</p>
                           <Link
                             to="/blog"
                             className="group inline-flex items-center gap-2 text-blaze hover:underline"
                           >
                             Read More
                             <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                           </Link>
                         </div>
                       </div>
                     </div>
                   ))}
                </div>
              </div>
 
               {/* Carousel Controls */}
               <button
                 onClick={prevSlide}
                 className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-foreground/10 flex items-center justify-center hover:bg-foreground/10 transition-colors"
               >
                 <ChevronLeft className="w-5 h-5" />
               </button>
               <button
                 onClick={nextSlide}
                 className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-foreground/10 flex items-center justify-center hover:bg-foreground/10 transition-colors"
               >
                 <ChevronRight className="w-5 h-5" />
               </button>
 
               {/* Dots */}
               <div className="flex justify-center gap-2 mt-6">
                 {blogPosts.map((_, index) => (
                   <button
                     key={index}
                     onClick={() => setCurrentSlide(index)}
                     className={`w-2 h-2 rounded-full transition-all ${
                       index === currentSlide 
                         ? 'w-6 bg-blaze' 
                         : 'bg-foreground/20 hover:bg-foreground/40'
                     }`}
                   />
                 ))}
               </div>
            </div>
             
             <div className="text-center mt-8">
               <Link
                 to="/blog"
                 className="group inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium bg-gradient-to-r from-blaze to-blaze/80 text-white hover:shadow-[0_0_30px_hsl(var(--blaze)/0.4)] transition-all duration-300"
               >
                 View All Articles
                 <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
               </Link>
             </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PagePreviewSection;
