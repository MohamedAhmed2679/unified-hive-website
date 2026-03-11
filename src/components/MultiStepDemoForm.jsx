import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { CheckCircle, ChevronRight, ChevronLeft, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/customSupabaseClient';

const MultiStepDemoForm = () => {
 const [step, setStep] = useState(1);
 const [isSubmitting, setIsSubmitting] = useState(false);
 const { toast } = useToast();
 
 const [formData, setFormData] = useState({
 name: '',
 email: '',
 company: '',
 painPoints: [],
 message: ''
 });

 const painOptions = [
 "High Cloud Costs",
 "Security Vulnerabilities",
 "Slow Deployment Cycles",
 "Legacy System Issues",
 "Lack of Observability",
 "Compliance Headaches"
 ];

 const handleInputChange = (e) => {
 setFormData({ ...formData, [e.target.name]: e.target.value });
 };

 const togglePainPoint = (pain) => {
 setFormData(prev => {
 if (prev.painPoints.includes(pain)) {
 return { ...prev, painPoints: prev.painPoints.filter(p => p !== pain) };
 } else {
 return { ...prev, painPoints: [...prev.painPoints, pain] };
 }
 });
 };

 const handleNext = (e) => {
 e.preventDefault();
 if (step === 1) {
 if (!formData.name || !formData.email) {
 toast({
 title: "Required Fields Missing",
 description: "Please fill in your name and email to proceed.",
 variant: "destructive"
 });
 return;
 }
 setStep(2);
 }
 };

 const handleSubmit = async (e) => {
 e.preventDefault();
 setIsSubmitting(true);

 try {
 // Assuming a 'leads' table or similar exists, or utilizing contact_submissions
 const { error } = await supabase.from('contact_submissions').insert([{
 name: formData.name,
 email: formData.email,
 company: formData.company,
 message: `[Demo Request] Pains: ${formData.painPoints.join(', ')}. Msg: ${formData.message}`
 }]);

 if (error) throw error;

 toast({
 title: "Demo Request Received!",
 description: "We'll be in touch shortly to schedule your personalized walkthrough.",
 });
 setStep(3); // Success state
 } catch (error) {
 console.error(error);
 toast({
 title: "Submission Error",
 description: "Something went wrong. Please try again.",
 variant: "destructive"
 });
 } finally {
 setIsSubmitting(false);
 }
 };

 return (
 <div className="bg-white dark:bg-[#0A1228] p-8 rounded-2xl shadow-xl dark:shadow-black/30 border border-gray-100 max-w-lg mx-auto w-full">
 <div className="mb-8">
 <div className="flex items-center justify-between mb-4">
 <span className={`h-2 flex-1 rounded-full mr-2 ${step >= 1 ? 'bg-[#FFC107]' : 'bg-gray-200'}`}></span>
 <span className={`h-2 flex-1 rounded-full ${step >= 2 ? 'bg-[#FFC107]' : 'bg-gray-200'}`}></span>
 </div>
 <h3 className="text-2xl font-bold text-[#4A142C] font-heading">
 {step === 1 && "Let's get started"}
 {step === 2 && "Tell us your challenges"}
 {step === 3 && "You're all set!"}
 </h3>
 </div>

 <AnimatePresence mode="wait">
 {step === 1 && (
 <motion.form
 key="step1"
 initial={{ opacity: 0, x: -20 }}
 animate={{ opacity: 1, x: 0 }}
 exit={{ opacity: 0, x: 20 }}
 onSubmit={handleNext}
 className="space-y-4"
 >
 <div>
 <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name *</label>
 <input
 id="name"
 name="name"
 type="text"
 required
 value={formData.name}
 onChange={handleInputChange}
 className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-white/[0.08] focus:ring-2 focus:ring-[#FFC107] focus:border-transparent outline-none transition-all"
 placeholder="Jane Doe"
 />
 </div>
 <div>
 <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Work Email *</label>
 <input
 id="email"
 name="email"
 type="email"
 required
 value={formData.email}
 onChange={handleInputChange}
 className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-white/[0.08] focus:ring-2 focus:ring-[#FFC107] focus:border-transparent outline-none transition-all"
 placeholder="jane@company.com"
 />
 </div>
 <div>
 <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Company Name</label>
 <input
 id="company"
 name="company"
 type="text"
 value={formData.company}
 onChange={handleInputChange}
 className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-white/[0.08] focus:ring-2 focus:ring-[#FFC107] focus:border-transparent outline-none transition-all"
 placeholder="Acme Inc."
 />
 </div>
 <Button type="submit" className="w-full bg-[#4A142C] hover:bg-[#5A1A3C] text-white py-6 text-lg mt-4">
 Next Step <ChevronRight className="ml-2" size={20} />
 </Button>
 </motion.form>
 )}

 {step === 2 && (
 <motion.form
 key="step2"
 initial={{ opacity: 0, x: -20 }}
 animate={{ opacity: 1, x: 0 }}
 exit={{ opacity: 0, x: 20 }}
 onSubmit={handleSubmit}
 className="space-y-6"
 >
 <div>
 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">What are your main challenges? (Select all that apply)</label>
 <div className="grid grid-cols-1 gap-2">
 {painOptions.map((pain) => (
 <div 
 key={pain}
 onClick={() => togglePainPoint(pain)}
 className={`p-3 rounded-lg border cursor-pointer flex items-center transition-all ${
 formData.painPoints.includes(pain) 
 ? 'bg-[#FFC107]/20 border-[#FFC107] text-[#4A142C]' 
 : 'border-gray-200 dark:border-white/[0.06] hover:border-gray-300 dark:border-white/[0.08]'
 }`}
 >
 <div className={`w-5 h-5 rounded-full border mr-3 flex items-center justify-center ${
 formData.painPoints.includes(pain) ? 'bg-[#4A142C] border-[#4A142C]' : 'border-gray-400'
 }`}>
 {formData.painPoints.includes(pain) && <CheckCircle size={12} className="text-white" />}
 </div>
 {pain}
 </div>
 ))}
 </div>
 </div>
 
 <div className="flex gap-3 pt-2">
 <Button 
 type="button" 
 variant="outline" 
 onClick={() => setStep(1)}
 className="flex-1 py-6"
 >
 <ChevronLeft className="mr-2" size={20} /> Back
 </Button>
 <Button 
 type="submit" 
 className="flex-1 bg-[#FFC107] hover:bg-[#FFB300] text-[#4A142C] font-semibold py-6"
 disabled={isSubmitting}
 >
 {isSubmitting ? <Loader2 className="animate-spin" /> : "Book Demo"}
 </Button>
 </div>
 </motion.form>
 )}

 {step === 3 && (
 <motion.div
 key="step3"
 initial={{ opacity: 0, scale: 0.9 }}
 animate={{ opacity: 1, scale: 1 }}
 className="text-center py-8"
 >
 <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
 <CheckCircle size={40} className="text-green-600" />
 </div>
 <h4 className="text-2xl font-bold text-[#4A142C] mb-2 font-heading">Request Received!</h4>
 <p className="text-gray-600 dark:text-gray-400 mb-6 ">
 Thanks {formData.name}. We've sent a confirmation email to {formData.email}. Our team will review your requirements and reach out within 24 hours.
 </p>
 <Button onClick={() => window.location.href='/'} variant="outline">
 Return Home
 </Button>
 </motion.div>
 )}
 </AnimatePresence>
 </div>
 );
};

export default MultiStepDemoForm;