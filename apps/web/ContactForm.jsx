import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useLanguage } from '@/hooks/useLanguage';

export default function ContactForm() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error(t.contact.form.error);
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      toast.success(t.contact.form.success);
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-sm font-serif italic text-primary">
          {t.contact.form.name}
        </Label>
        <Input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          required
          className="bg-black/50 border-primary/30 text-foreground placeholder:text-muted-foreground focus-visible:ring-primary focus-visible:border-primary transition-all duration-300 rounded-none"
          placeholder={t.contact.form.name}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-serif italic text-primary">
          {t.contact.form.email}
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="bg-black/50 border-primary/30 text-foreground placeholder:text-muted-foreground focus-visible:ring-primary focus-visible:border-primary transition-all duration-300 rounded-none"
          placeholder={t.contact.form.email}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="text-sm font-serif italic text-primary">
          {t.contact.form.message}
        </Label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
          className="bg-black/50 border-primary/30 text-foreground placeholder:text-muted-foreground focus-visible:ring-primary focus-visible:border-primary transition-all duration-300 resize-none rounded-none"
          placeholder={t.contact.form.message}
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full font-serif italic tracking-wide rounded-none transition-all duration-300 hover:shadow-[0_0_15px_rgba(212,175,55,0.4)]"
      >
        {isSubmitting ? t.contact.form.sending : t.contact.form.submit}
      </Button>
    </form>
  );
}
