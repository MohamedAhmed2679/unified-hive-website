import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { ChevronDown, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';
import { useLocation } from 'react-router-dom';

const PricingEngagePage = () => {
 const { search } = useLocation();
 const queryParams = new URLSearchParams(search);
 const preSelectedPlan = queryParams.get('plan') || '';

 const [formData, setFormData] = useState({
 name: '',
 email: '',
 company: '',
 region: 'North America',
 plan: preSelectedPlan,
 notes: ''
 });
 const [isSubmitting, setIsSubmitting] = useState(false);
 const { toast } = useToast();

 const handleInputChange = (e) => {
 setFormData({ ...formData, [e.target.name]: e.target.value });
 };

 const handleSubmit = async (e) => {
 e.preventDefault();
 setIsSubmitting(true);
 try {
 const { error } = await supabase.from('contact_submissions').insert([{
 name: formData.name,
 email: formData.email,
 company: formData.company,
 message: `[Pricing Inquiry] Region: ${formData.region}, Plan: ${formData.plan}. Notes: ${formData.notes}`
 }]);

 if (error) throw error;

 await supabase.functions.invoke('send-email', {
 body: { type: 'contact', data: { ...formData, message: `[Pricing Inquiry] Region: ${formData.region}, Plan: ${formData.plan}. Notes: ${formData.notes}` } }
 });

 toast({
 title:"Inquiry Sent!",
 description:"Our sales team will contact you shortly.",
 });
 setFormData({ name: '', email: '', company: '', region: 'North America', plan: '', notes: '' });
 } catch (error) {
 console.error(error);
 toast({ variant:"destructive", title:"Error", description:"Failed to submit inquiry."});
 } finally {
 setIsSubmitting(false);
 }
 };

 const comparisonData = [
 { feature:"Security Assessment", startup:"Basic", smb:"Advanced", enterprise:"Zero Trust Audit"},
 { feature:"Automation Scripts", startup:"5/mo", smb:"20/mo", enterprise:"Unlimited"},
 { feature:"Observability", startup:"Standard Metrics", smb:"Full Stack", enterprise:"AI-Driven"},
 { feature:"Compliance", startup:"-", smb:"SOC2 Ready", enterprise:"HIPAA/ISO/SOC2"},
 { feature:"Support SLA", startup:"48h Response", smb:"24h Response", enterprise:"1h Critical"},
 { feature:"Time-to-Value", startup:"< 2 Weeks", smb:"< 1 Month", enterprise:"Custom"},
 ];

 return (
 <>
 <Helmet>
 <title>Pricing & Engagement | Unifiedhive</title>
 <meta name="description"content="Detailed pricing plans and engagement models for Unifiedhive IT consulting services."/>
 </Helmet>
 
 <div className="pt-20">
 <section className="bg-[#001F3F] text-white py-12 md:py-20 text-center">
 <div className="max-w-4xl mx-auto px-4">
 <h1 className="text-3xl md:text-5xl font-bold font-heading mb-6">Pricing & Engagement Models</h1>
 <p className="text-lg md:text-xl text-gray-300">Transparent, value-driven pricing designed for scale.</p>
 </div>
 </section>

 <section className="py-12 md:py-20 bg-white dark:bg-[#0A1228]">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 md:mb-12 text-center font-heading">Feature Comparison</h2>
 {/* Responsive table wrapper */}
 <div className="overflow-x-auto border rounded-lg shadow-sm">
 <table className="w-full border-collapse min-w-[600px]">
 <thead>
 <tr className="bg-gray-50 dark:bg-[#050A14]">
 <th className="p-4 text-left font-bold text-foreground font-heading border-b-2 border-gray-200 dark:border-white/[0.06]">Feature</th>
 <th className="p-4 text-center font-bold text-foreground font-heading border-b-2 border-gray-200 dark:border-white/[0.06]">Startups</th>
 <th className="p-4 text-center font-bold text-foreground font-heading border-b-2 border-gray-200 dark:border-white/[0.06]">SMB</th>
 <th className="p-4 text-center font-bold text-foreground font-heading border-b-2 border-gray-200 dark:border-white/[0.06] bg-[#FFD700]/10">Enterprise</th>
 </tr>
 </thead>
 <tbody>
 {comparisonData.map((row, i) => (
 <tr key={i} className="hover:bg-gray-50 transition-colors">
 <td className="p-4 border-b border-gray-100 font-medium text-muted-foreground">{row.feature}</td>
 <td className="p-4 border-b border-gray-100 text-center text-muted-foreground">{row.startup}</td>
 <td className="p-4 border-b border-gray-100 text-center text-muted-foreground">{row.smb}</td>
 <td className="p-4 border-b border-gray-100 text-center text-foreground font-bold bg-[#FFD700]/5">{row.enterprise}</td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </div>
 </section>

 <section className="py-12 md:py-20 bg-gray-50 dark:bg-[#050A14]">
 <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 lg:gap-16">
 <div>
 <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 font-heading">Frequently Asked Questions</h2>
 <div className="space-y-4">
 <details className="bg-white dark:bg-[#0A1228] p-6 rounded-lg shadow-sm group">
 <summary className="font-bold text-foreground cursor-pointer flex justify-between items-center font-heading list-none">
 Can I switch plans later? <ChevronDown className="group-open:rotate-180 transition-transform"/>
 </summary>
 <p className="mt-4 text-muted-foreground">Yes, you can upgrade or downgrade your plan at any time. Changes take effect in the next billing cycle.</p>
 </details>
 <details className="bg-white dark:bg-[#0A1228] p-6 rounded-lg shadow-sm group">
 <summary className="font-bold text-foreground cursor-pointer flex justify-between items-center font-heading list-none">
 Do you offer custom consulting? <ChevronDown className="group-open:rotate-180 transition-transform"/>
 </summary>
 <p className="mt-4 text-muted-foreground">Absolutely. Our Enterprise plan is fully customizable, and we also offer project-based consulting rates.</p>
 </details>
 <details className="bg-white dark:bg-[#0A1228] p-6 rounded-lg shadow-sm group">
 <summary className="font-bold text-foreground cursor-pointer flex justify-between items-center font-heading list-none">
 What is your cancellation policy? <ChevronDown className="group-open:rotate-180 transition-transform"/>
 </summary>
 <p className="mt-4 text-muted-foreground">Monthly plans can be cancelled with 30 days notice. Annual plans are non-refundable but can be transferred.</p>
 </details>
 </div>
 </div>

 <div className="bg-white dark:bg-[#0A1228] p-6 md:p-8 rounded-xl shadow-lg dark:shadow-black/20 border border-gray-100">
 <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6 font-heading">Start Your Engagement</h2>
 <form onSubmit={handleSubmit} className="space-y-4">
 <div className="grid md:grid-cols-2 gap-4">
 <div>
 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
 <input required type="text"name="name"value={formData.name} onChange={handleInputChange} className="w-full p-3 border rounded-lg text-base"/>
 </div>
 <div>
 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
 <input required type="email"name="email"value={formData.email} onChange={handleInputChange} className="w-full p-3 border rounded-lg text-base"/>
 </div>
 </div>
 
 <div className="grid md:grid-cols-2 gap-4">
 <div>
 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Company</label>
 <input type="text"name="company"value={formData.company} onChange={handleInputChange} className="w-full p-3 border rounded-lg text-base"/>
 </div>
 <div>
 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Region</label>
 <select name="region"value={formData.region} onChange={handleInputChange} className="w-full p-3 border rounded-lg bg-white dark:bg-[#0A1228] text-base">
 <option>North America</option>
 <option>Europe</option>
 <option>Asia Pacific</option>
 <option>Other</option>
 </select>
 </div>
 </div>

 <div>
 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Interested Plan</label>
 <select name="plan"value={formData.plan} onChange={handleInputChange} className="w-full p-3 border rounded-lg bg-white dark:bg-[#0A1228] text-base">
 <option value="">Select a plan...</option>
 <option value="Free Consulting">Free Consulting</option>
 <option value="Individuals">Individuals</option>
 <option value="Startups">Startups</option>
 <option value="SMB">SMB</option>
 <option value="Enterprise">Enterprise</option>
 </select>
 </div>

 <div>
 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Additional Notes</label>
 <textarea name="notes"value={formData.notes} onChange={handleInputChange} rows={3} className="w-full p-3 border rounded-lg text-base"></textarea>
 </div>

 <Button type="submit"className="w-full bg-[#FFD700] text-foreground hover:bg-[#E5C100] font-bold py-4 min-h-[50px]"disabled={isSubmitting}>
 {isSubmitting ? <Loader2 className="animate-spin"/> :"Submit Inquiry"}
 </Button>
 </form>
 </div>
 </div>
 </section>
 </div>
 </>
 );
};

export default PricingEngagePage;