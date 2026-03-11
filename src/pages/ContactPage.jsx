import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import AnimatedContent from '@/components/AnimatedContent';
import GoogleMap from '@/components/GoogleMap';
import BookingEmbed from '@/components/BookingEmbed';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '', email: '', phone: '', company: '', message: '', consent: false
    });
    const [honeypot, setHoneypot] = useState('');
    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const formRef = useRef(null);
    const { toast } = useToast();

    // Newsletter state
    const [newsletterEmail, setNewsletterEmail] = useState('');
    const [isNewsletterSubmitting, setIsNewsletterSubmitting] = useState(false);

    const validate = () => {
        const e = {};
        if (!formData.name.trim()) e.name = 'Name is required';
        if (!formData.email.trim()) e.email = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = 'Enter a valid email address';
        if (!formData.message.trim()) e.message = 'Message is required';
        if (!formData.consent) e.consent = 'You must consent to be contacted';
        return e;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Honeypot check
        if (honeypot) return;

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setErrors({});
        setIsSubmitting(true);

        try {
            const subject = encodeURIComponent(`Website Contact – ${formData.name}`);
            const body = encodeURIComponent(
                `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone || 'N/A'}\nCompany: ${formData.company || 'N/A'}\n\nMessage:\n${formData.message}`
            );

            // Send directly to the user's default email client
            window.location.href = `mailto:info@unifiedhive.com?subject=${subject}&body=${body}`;

            setIsSubmitted(true);
            toast({
                title: "Message Sent Successfully!",
                description: "We'll get back to you within 24 hours.",
            });

            setTimeout(() => {
                setFormData({ name: '', email: '', phone: '', company: '', message: '', consent: false });
                setIsSubmitted(false);
            }, 5000);

        } catch (error) {
            console.error('Error submitting form:', error);
            toast({
                variant: "destructive",
                title: "Submission Failed",
                description: "There was an error sending your message. Please try again or email us directly.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleNewsletterSubmit = async (e) => {
        e.preventDefault();
        if (!newsletterEmail) return;
        setIsNewsletterSubmitting(true);
        try {
            const { supabase } = await import('@/lib/customSupabaseClient');
            const { error: dbError } = await supabase.from('newsletter_subscribers').insert([{ email: newsletterEmail }]);
            if (dbError) {
                if (dbError.code === '23505') {
                    toast({ title: "Already Subscribed", description: "This email is already on our list!" });
                    setIsNewsletterSubmitting(false);
                    return;
                } else throw dbError;
            }
            toast({ title: "Subscribed Successfully!", description: "You'll receive our latest insights and updates." });
            setNewsletterEmail('');
        } catch {
            toast({ variant: "destructive", title: "Subscription Failed", description: "Please try again later." });
        } finally {
            setIsNewsletterSubmitting(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: undefined }));
    };

    const inputClasses = (fieldName) =>
        `w-full px-4 py-3 rounded-lg bg-white/[0.04] dark:bg-white/[0.04] border ${errors[fieldName] ? 'border-red-500' : 'border-[#001F3F]/[0.1] dark:border-white/[0.08]'
        } text-foreground placeholder-muted-foreground focus:outline-none focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700]/20 transition-all duration-200 relative z-[60] pointer-events-auto cursor-text`;

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "mainEntity": {
            "@type": "Organization",
            "name": "Unified Hive",
            "telephone": "+1-917-781-4487",
            "email": "info@unifiedhive.com",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "700 A.D. Mosley Street",
                "addressLocality": "Ferris",
                "addressRegion": "TX",
                "postalCode": "75125",
                "addressCountry": "US"
            }
        }
    };

    return (
        <>
            <Helmet>
                <title>Contact Unified Hive | Enterprise IT Consulting in Ferris, TX</title>
                <meta name="description" content="Reach out to Unified Hive for expert IT consulting. Partner with us for Zero Trust implementations, seamless cloud migrations, and robust DevOps automation. Based in Ferris, TX." />
                <meta property="og:title" content="Contact Unified Hive | Enterprise IT Consulting in Ferris, TX" />
                <meta property="og:description" content="Our experts are ready to audit your security posture and engineer a resilient IT foundation." />
                <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
            </Helmet>

            <div className="pt-20">
                {/* Hero */}
                <section className="relative py-20 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#050A14] via-[#0A1228] to-[#050A14] dark:opacity-100 opacity-0 pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-br from-white via-[#F8FAFC] to-white dark:opacity-0 opacity-100 pointer-events-none" />
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                        <AnimatedContent type="text">
                            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 font-heading">Get In Touch</h1>
                            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                                Ready to transform your IT operations? Our team is here to help. Reach out today.
                            </p>
                        </AnimatedContent>
                    </div>
                </section>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Left Column — Contact Info */}
                        <AnimatedContent type="fade">
                            <h2 className="text-3xl font-bold text-foreground mb-8 font-heading">Contact Information</h2>

                            <div className="space-y-6 mb-10">
                                {/* Phone */}
                                <a href="tel:+19177814487" className="flex items-start space-x-4 group">
                                    <div className="bg-[#FFD700]/10 p-3 rounded-lg border border-[#FFD700]/20 group-hover:bg-[#FFD700]/20 transition-colors">
                                        <Phone size={24} className="text-[#FFD700]" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-foreground mb-1 font-heading">Phone</h3>
                                        <p className="text-muted-foreground group-hover:text-[#FFD700] transition-colors">+1 917 781 4487</p>
                                        <p className="text-sm text-muted-foreground">Mon-Fri, 9am-6pm EST</p>
                                    </div>
                                </a>

                                {/* Email */}
                                <a href="mailto:info@unifiedhive.com" className="flex items-start space-x-4 group">
                                    <div className="bg-[#FFD700]/10 p-3 rounded-lg border border-[#FFD700]/20 group-hover:bg-[#FFD700]/20 transition-colors">
                                        <Mail size={24} className="text-[#FFD700]" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-foreground mb-1 font-heading">Email</h3>
                                        <p className="text-muted-foreground group-hover:text-[#FFD700] transition-colors">info@unifiedhive.com</p>
                                        <p className="text-sm text-muted-foreground">We respond within 24 hours</p>
                                    </div>
                                </a>

                                {/* Office */}
                                <div className="flex items-start space-x-4">
                                    <div className="bg-[#FFD700]/10 p-3 rounded-lg border border-[#FFD700]/20">
                                        <MapPin size={24} className="text-[#FFD700]" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-foreground mb-1 font-heading">Office</h3>
                                        <p className="text-muted-foreground">700 A.D. Mosley Street</p>
                                        <p className="text-sm text-muted-foreground">Ferris TX 75125, US</p>
                                    </div>
                                </div>

                                {/* Hours */}
                                <div className="flex items-start space-x-4">
                                    <div className="bg-[#FFD700]/10 p-3 rounded-lg border border-[#FFD700]/20">
                                        <Clock size={24} className="text-[#FFD700]" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-foreground mb-1 font-heading">Support Hours</h3>
                                        <p className="text-muted-foreground">Monday - Friday: 9:00 AM - 6:00 PM EST</p>
                                        <p className="text-sm text-muted-foreground">Emergency support available 24/7</p>
                                    </div>
                                </div>
                            </div>

                            {/* Google Map */}
                            <GoogleMap height="280px" className="mb-10" />

                            {/* Newsletter */}
                            <div className="glass-card p-8">
                                <h3 className="text-xl font-bold mb-3 text-foreground font-heading">Subscribe to Our Newsletter</h3>
                                <p className="text-sm text-muted-foreground mb-4">Get the latest insights and updates delivered to your inbox.</p>
                                <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                                    <input
                                        type="email"
                                        value={newsletterEmail}
                                        onChange={(e) => setNewsletterEmail(e.target.value)}
                                        placeholder="Your email address"
                                        className={inputClasses('')}
                                        required
                                        disabled={isNewsletterSubmitting}
                                    />
                                    <Button type="submit" className="w-full btn-premium" disabled={isNewsletterSubmitting}>
                                        {isNewsletterSubmitting ? <Loader2 className="animate-spin w-5 h-5" /> : "Subscribe"}
                                    </Button>
                                </form>
                            </div>
                        </AnimatedContent>

                        {/* Right Column — Form */}
                        <AnimatedContent type="fade" delay={0.2} className="relative z-20">
                            <div className="glass-card p-8">
                                <h2 className="text-3xl font-bold text-foreground mb-6 font-heading">Send Us a Message</h2>

                                {isSubmitted ? (
                                    <div className="text-center py-12">
                                        <div className="bg-green-500/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/20">
                                            <CheckCircle size={48} className="text-green-500" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-foreground mb-4 font-heading">Message Sent Successfully!</h3>
                                        <p className="text-muted-foreground">Thank you for contacting us. We'll get back to you within 24 hours.</p>
                                        <Button onClick={() => setIsSubmitted(false)} className="mt-6 btn-premium">
                                            Send Another Message
                                        </Button>
                                    </div>
                                ) : (
                                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-5 relative z-[50]" noValidate>
                                        {/* Honeypot */}
                                        <input
                                            type="text"
                                            name="website"
                                            value={honeypot}
                                            onChange={(e) => setHoneypot(e.target.value)}
                                            style={{ display: 'none' }}
                                            tabIndex={-1}
                                            autoComplete="off"
                                            aria-hidden="true"
                                        />

                                        {/* Name */}
                                        <div>
                                            <label htmlFor="contact-name" className="block text-sm font-semibold text-foreground mb-2 font-heading">
                                                Full Name <span className="text-red-500">*</span>
                                            </label>
                                            <input type="text" id="contact-name" name="name" value={formData.name} onChange={handleInputChange}
                                                className={inputClasses('name')} placeholder="John Doe" required />
                                            {errors.name && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} />{errors.name}</p>}
                                        </div>

                                        {/* Email */}
                                        <div>
                                            <label htmlFor="contact-email" className="block text-sm font-semibold text-foreground mb-2 font-heading">
                                                Email Address <span className="text-red-500">*</span>
                                            </label>
                                            <input type="email" id="contact-email" name="email" value={formData.email} onChange={handleInputChange}
                                                className={inputClasses('email')} placeholder="john@company.com" required />
                                            {errors.email && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} />{errors.email}</p>}
                                        </div>

                                        {/* Phone */}
                                        <div>
                                            <label htmlFor="contact-phone" className="block text-sm font-semibold text-foreground mb-2 font-heading">
                                                Phone
                                            </label>
                                            <input type="tel" id="contact-phone" name="phone" value={formData.phone} onChange={handleInputChange}
                                                className={inputClasses('phone')} placeholder="+1 (555) 000-0000" inputMode="tel" />
                                        </div>

                                        {/* Company */}
                                        <div>
                                            <label htmlFor="contact-company" className="block text-sm font-semibold text-foreground mb-2 font-heading">
                                                Company
                                            </label>
                                            <input type="text" id="contact-company" name="company" value={formData.company} onChange={handleInputChange}
                                                className={inputClasses('company')} placeholder="Your Company" />
                                        </div>

                                        {/* Message */}
                                        <div>
                                            <label htmlFor="contact-message" className="block text-sm font-semibold text-foreground mb-2 font-heading">
                                                Message <span className="text-red-500">*</span>
                                            </label>
                                            <textarea id="contact-message" name="message" value={formData.message} onChange={handleInputChange}
                                                required rows={5} className={`${inputClasses('message')} resize-none`}
                                                placeholder="Tell us about your project or inquiry..." />
                                            {errors.message && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} />{errors.message}</p>}
                                        </div>

                                        {/* Consent */}
                                        <div className="relative z-[60] pointer-events-auto">
                                            <label className="flex items-start gap-3 cursor-pointer">
                                                <input type="checkbox" name="consent" checked={formData.consent} onChange={handleInputChange}
                                                    className="mt-1 w-4 h-4 accent-[#FFD700] rounded" required />
                                                <span className="text-sm text-muted-foreground">
                                                    I consent to be contacted regarding my inquiry and agree to the{' '}
                                                    <a href="/privacy" className="text-[#FFD700] hover:underline">Privacy Policy</a>.
                                                </span>
                                            </label>
                                            {errors.consent && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} />{errors.consent}</p>}
                                        </div>

                                        <Button type="submit" className="w-full btn-premium py-4 text-base" disabled={isSubmitting}>
                                            {isSubmitting ? (
                                                <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Sending...</>
                                            ) : (
                                                <><Send className="mr-2" size={20} /> Send Message</>
                                            )}
                                        </Button>

                                        <p className="text-xs text-muted-foreground text-center">
                                            Your message will be sent to info@unifiedhive.com. We typically respond within 24 hours.
                                        </p>
                                    </form>
                                )}
                            </div>

                            {/* SLA Info */}
                            <div className="glass-card p-6 mt-6">
                                <h3 className="font-semibold text-foreground mb-4 font-heading">Response Time SLA</h3>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    <li className="flex items-start"><CheckCircle className="text-[#FFD700] mr-2 mt-0.5 flex-shrink-0" size={16} />General inquiries: Response within 24 hours</li>
                                    <li className="flex items-start"><CheckCircle className="text-[#FFD700] mr-2 mt-0.5 flex-shrink-0" size={16} />Project consultations: Initial call within 48 hours</li>
                                    <li className="flex items-start"><CheckCircle className="text-[#FFD700] mr-2 mt-0.5 flex-shrink-0" size={16} />Emergency support: 24/7 for active clients</li>
                                </ul>
                            </div>

                            {/* Booking */}
                            <div className="mt-6">
                                <BookingEmbed mode="button" className="glass-card p-6 text-center" />
                            </div>
                        </AnimatedContent>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ContactPage;