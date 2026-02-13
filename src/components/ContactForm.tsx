import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100, 'Name must be under 100 characters'),
  email: z.string().trim().email('Please enter a valid email').max(255, 'Email must be under 255 characters'),
  phone: z.string().trim().min(1, 'Phone number is required').max(20, 'Phone must be under 20 characters').regex(/^[\d\s+\-()]+$/, 'Please enter a valid phone number'),
  message: z.string().trim().min(1, 'Message is required').max(1000, 'Message must be under 1000 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;
type FormErrors = Partial<Record<keyof ContactFormData, string>>;

const ContactForm = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: FormErrors = {};
      result.error.errors.forEach(err => {
        const field = err.path[0] as keyof ContactFormData;
        if (!fieldErrors[field]) fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    // Build WhatsApp message
    const text = `Hi, I'm ${encodeURIComponent(result.data.name)}.%0A%0AEmail: ${encodeURIComponent(result.data.email)}%0APhone: ${encodeURIComponent(result.data.phone)}%0A%0A${encodeURIComponent(result.data.message)}`;
    window.open(`https://wa.me/919999999999?text=${text}`, '_blank');
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section id="contact" className="relative z-10 py-24 md:py-32 px-6 md:px-12 lg:px-16">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="glass-card p-12 rounded-2xl"
          >
            <CheckCircle className="w-16 h-16 text-hydro mx-auto mb-6" />
            <h3 className="font-display text-2xl md:text-3xl font-bold mb-4">
              Message Sent!
            </h3>
            <p className="text-muted-foreground mb-8">
              We'll get back to you within 24 hours. Meanwhile, check your WhatsApp for confirmation.
            </p>
            <button
              onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', phone: '', message: '' }); }}
              className="btn-primary"
            >
              <span>Send Another</span>
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="relative z-10 py-24 md:py-32 px-6 md:px-12 lg:px-16">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left - Copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <span className="badge-glow mb-6 w-fit">Get in Touch</span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Let's <span className="text-gradient">ignite</span> your brand
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-md">
              Ready to transform your digital presence? Fill out the form and we'll craft a strategy tailored to your goals.
            </p>
            <div className="space-y-4 text-sm text-muted-foreground">
              <p>✦ Response within 24 hours</p>
              <p>✦ Free initial consultation</p>
              <p>✦ No commitment required</p>
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="glass-card p-6 md:p-8 rounded-2xl space-y-5"
          >
            {/* Name */}
            <div>
              <label htmlFor="contact-name" className="block text-sm font-medium mb-2">Name</label>
              <input
                id="contact-name"
                type="text"
                value={formData.name}
                onChange={e => handleChange('name', e.target.value)}
                placeholder="Your full name"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-hydro/50 focus:ring-1 focus:ring-hydro/30 transition-all"
                maxLength={100}
              />
              {errors.name && (
                <p className="mt-1.5 text-xs text-destructive flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="contact-email" className="block text-sm font-medium mb-2">Email</label>
              <input
                id="contact-email"
                type="email"
                value={formData.email}
                onChange={e => handleChange('email', e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-hydro/50 focus:ring-1 focus:ring-hydro/30 transition-all"
                maxLength={255}
              />
              {errors.email && (
                <p className="mt-1.5 text-xs text-destructive flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.email}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="contact-phone" className="block text-sm font-medium mb-2">Phone</label>
              <input
                id="contact-phone"
                type="tel"
                value={formData.phone}
                onChange={e => handleChange('phone', e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-hydro/50 focus:ring-1 focus:ring-hydro/30 transition-all"
                maxLength={20}
              />
              {errors.phone && (
                <p className="mt-1.5 text-xs text-destructive flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.phone}
                </p>
              )}
            </div>

            {/* Message */}
            <div>
              <label htmlFor="contact-message" className="block text-sm font-medium mb-2">Message</label>
              <textarea
                id="contact-message"
                value={formData.message}
                onChange={e => handleChange('message', e.target.value)}
                placeholder="Tell us about your project, goals, and budget..."
                rows={4}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-hydro/50 focus:ring-1 focus:ring-hydro/30 transition-all resize-none"
                maxLength={1000}
              />
              {errors.message && (
                <p className="mt-1.5 text-xs text-destructive flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl font-display font-semibold text-sm bg-gradient-to-r from-hydro to-blaze text-white hover:shadow-[0_0_30px_hsl(var(--hydro)/0.4)] transition-all duration-300 flex items-center justify-center gap-2"
            >
              Send Message <Send className="w-4 h-4" />
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
