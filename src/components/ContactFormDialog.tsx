import { createContext, useContext, useState, useCallback } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { z } from 'zod';
import { motion } from 'framer-motion';

const contactSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100, 'Name must be under 100 characters'),
  email: z.string().trim().email('Please enter a valid email').max(255, 'Email must be under 255 characters'),
  phone: z.string().trim().min(1, 'Phone number is required').max(20, 'Phone must be under 20 characters').regex(/^[\d\s+\-()]+$/, 'Please enter a valid phone number'),
  message: z.string().trim().min(1, 'Message is required').max(1000, 'Message must be under 1000 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;
type FormErrors = Partial<Record<keyof ContactFormData, string>>;

type ContactDialogContextType = { open: () => void };
const ContactDialogContext = createContext<ContactDialogContextType>({ open: () => {} });
export const useContactDialog = () => useContext(ContactDialogContext);

export const ContactDialogProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const open = useCallback(() => {
    setIsOpen(true);
    setSubmitted(false);
    setFormData({ name: '', email: '', phone: '', message: '' });
    setErrors({});
  }, []);

  const handleChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
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
    const text = `Hi, I'm ${encodeURIComponent(result.data.name)}.%0A%0AEmail: ${encodeURIComponent(result.data.email)}%0APhone: ${encodeURIComponent(result.data.phone)}%0A%0A${encodeURIComponent(result.data.message)}`;
    window.open(`https://wa.me/919999999999?text=${text}`, '_blank');
    setSubmitted(true);
  };

  const inputClass = "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-hydro/50 focus:ring-1 focus:ring-hydro/30 transition-all";

  return (
    <ContactDialogContext.Provider value={{ open }}>
      {children}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-lg bg-background/95 backdrop-blur-xl border-foreground/10 rounded-2xl p-0 overflow-hidden">
          {submitted ? (
            <div className="p-8 text-center">
              <CheckCircle className="w-14 h-14 text-hydro mx-auto mb-4" />
              <DialogHeader>
                <DialogTitle className="font-display text-2xl font-bold">Message Sent!</DialogTitle>
                <DialogDescription className="text-muted-foreground mt-2">
                  We'll get back to you within 24 hours. Check your WhatsApp for confirmation.
                </DialogDescription>
              </DialogHeader>
              <button onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', phone: '', message: '' }); }} className="mt-6 px-6 py-3 rounded-full text-sm font-medium bg-gradient-to-r from-hydro to-blaze text-white hover:shadow-[0_0_30px_hsl(var(--hydro)/0.4)] transition-all duration-300">
                Send Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-5">
              <DialogHeader>
                <DialogTitle className="font-display text-2xl font-bold">Let's <span className="text-gradient">ignite</span> your brand</DialogTitle>
                <DialogDescription className="text-muted-foreground">Fill out the form and we'll craft a strategy tailored to your goals.</DialogDescription>
              </DialogHeader>

              <div>
                <label htmlFor="dialog-name" className="block text-sm font-medium mb-2">Name</label>
                <input id="dialog-name" type="text" value={formData.name} onChange={e => handleChange('name', e.target.value)} placeholder="Your full name" className={inputClass} maxLength={100} />
                {errors.name && <p className="mt-1.5 text-xs text-destructive flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.name}</p>}
              </div>

              <div>
                <label htmlFor="dialog-email" className="block text-sm font-medium mb-2">Email</label>
                <input id="dialog-email" type="email" value={formData.email} onChange={e => handleChange('email', e.target.value)} placeholder="you@example.com" className={inputClass} maxLength={255} />
                {errors.email && <p className="mt-1.5 text-xs text-destructive flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.email}</p>}
              </div>

              <div>
                <label htmlFor="dialog-phone" className="block text-sm font-medium mb-2">Phone</label>
                <input id="dialog-phone" type="tel" value={formData.phone} onChange={e => handleChange('phone', e.target.value)} placeholder="+91 98765 43210" className={inputClass} maxLength={20} />
                {errors.phone && <p className="mt-1.5 text-xs text-destructive flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.phone}</p>}
              </div>

              <div>
                <label htmlFor="dialog-message" className="block text-sm font-medium mb-2">Message</label>
                <textarea id="dialog-message" value={formData.message} onChange={e => handleChange('message', e.target.value)} placeholder="Tell us about your project, goals, and budget..." rows={3} className={`${inputClass} resize-none`} maxLength={1000} />
                {errors.message && <p className="mt-1.5 text-xs text-destructive flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.message}</p>}
              </div>

              <button type="submit" className="w-full py-4 rounded-xl font-display font-semibold text-sm bg-gradient-to-r from-hydro to-blaze text-white hover:shadow-[0_0_30px_hsl(var(--hydro)/0.4)] transition-all duration-300 flex items-center justify-center gap-2">
                Send Message <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </ContactDialogContext.Provider>
  );
};
