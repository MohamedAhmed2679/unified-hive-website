import React from 'react';
import { Helmet } from 'react-helmet';
import { CheckCircle, Calendar, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const BookDemoPage = () => {
 const bookingUrl ="https://outlook.office.com/book/UnifiedHive4@Unifiedhive.com/?ismsaljsauthenabled"; 

 return (
 <>
 <Helmet>
 <title>Book an IT Consultation | Zero Trust & Cloud Architecture | Unified Hive</title>
 <meta name="description" content="Schedule a direct strategic IT consultation with our technical leadership. Let us audit your infrastructure and map out a Zero Trust, DevOps-driven growth strategy."/>
 </Helmet>

 <div className="pt-24 pb-16 min-h-screen bg-white dark:bg-[#0A1228]">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="grid lg:grid-cols-2 gap-12 items-start">
 
 {/* Left Content - Personnel Profile */}
 <motion.div 
 initial={{ opacity: 0, x: -20 }}
 animate={{ opacity: 1, x: 0 }}
 className="order-2 lg:order-1 space-y-8"
 >
 <div>
 <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 font-heading leading-tight">
 Strategic IT Consultation
 </h1>
 <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
 Book a direct session with our technical leadership to audit your infrastructure and map out a Zero Trust strategy.
 </p>
 </div>
 
 {/* Profile Card */}
 <div className="bg-white dark:bg-[#0A1228] p-8 rounded-2xl shadow-lg dark:shadow-black/20 border border-gray-100 flex flex-col md:flex-row items-center md:items-start gap-6 relative overflow-hidden">
 
 <div className="relative">
 <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-[#FFD700] overflow-hidden shadow-md flex-shrink-0">
 <img 
 src="https://horizons-cdn.hostinger.com/3d5f6b13-c880-47b3-8cfb-48f3d18da893/440cd96ae76da747d8773956e9c60663.jpg"
 alt="Sohila Samir - CTO"
 className="w-full h-full object-cover"
 />
 </div>
 </div>

 <div className="text-center md:text-left flex-1">
 <h2 className="text-2xl font-bold text-foreground font-heading">Sohila Samir</h2>
 <p className="text-[#FFD700] font-bold text-sm tracking-wider uppercase mb-3">Chief Technology Officer</p>
 <p className="text-gray-600 dark:text-gray-400 italic text-sm leading-relaxed mb-4">
"I personally oversee our enterprise architecture reviews. My goal is to ensure your technology stack isn't just secure, but a competitive advantage."
 </p>
 <div className="flex flex-wrap gap-2 justify-center md:justify-start">
 {["Cloud Architecture","Zero Trust","DevSecOps"].map(tag => (
 <span key={tag} className="bg-gray-100 text-gray-700 dark:text-gray-300 text-xs font-semibold px-3 py-1 rounded-full">
 {tag}
 </span>
 ))}
 </div>
 </div>
 </div>

 {/* What to expect */}
 <div className="space-y-4 pt-4">
 <h3 className="text-xl font-bold text-foreground font-heading">What to expect:</h3>
 <div className="space-y-3">
 {[
"30-minute deep dive into your current challenges",
"Preliminary security posture assessment",
"Direct answers to technical implementation questions",
"No sales pressure—just engineering expertise"
 ].map((item, index) => (
 <div key={index} className="flex items-start gap-3 bg-white dark:bg-[#0A1228] p-4 rounded-lg border border-gray-100 shadow-sm transition-all hover:shadow-md">
 <CheckCircle className="text-foreground w-6 h-6 flex-shrink-0 mt-0.5 fill-[#FFD700]"/>
 <span className="text-muted-foreground font-medium">{item}</span>
 </div>
 ))}
 </div>
 </div>
 </motion.div>

 {/* Right Content - Booking Iframe */}
 <motion.div 
 initial={{ opacity: 0, x: 20 }}
 animate={{ opacity: 1, x: 0 }}
 transition={{ delay: 0.2 }}
 className="order-1 lg:order-2 flex flex-col items-center"
 >
 <div className="w-full bg-white dark:bg-[#0A1228] rounded-2xl shadow-xl dark:shadow-black/30 border border-gray-200 dark:border-white/[0.06] overflow-hidden min-h-[800px] flex flex-col relative">
 <div className="bg-[#001F3F] p-4 text-white text-center">
 <h3 className="font-bold text-lg font-heading flex items-center justify-center gap-2">
 <Calendar className="w-5 h-5 text-[#FFD700]"/>
 Select a Time
 </h3>
 </div>
 
    <div className="flex-1 w-full relative bg-gray-50 dark:bg-[#050A14] flex flex-col items-center justify-center p-10 text-center min-h-[400px]">
        <div className="bg-white dark:bg-[#0A1228] p-8 rounded-full shadow-inner mb-6 border border-gray-100 dark:border-white/[0.06]">
            <Calendar className="w-16 h-16 text-[#001F3F] dark:text-[#FFD700] opacity-80" />
        </div>
        <h4 className="text-xl font-bold font-heading mb-4">Ready to align your IT strategy?</h4>
        <p className="text-muted-foreground mb-8 max-w-sm mx-auto">Click the button below to seamlessly open our scheduling portal in a new tab.</p>
        <a 
            href="https://outlook.office.com/book/UnifiedHive4@Unifiedhive.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#FFD700] to-[#F0C800] text-[#050A14] font-bold rounded-full hover:shadow-2xl hover:shadow-[#FFD700]/30 transition-all duration-300 hover:scale-105 text-lg"
        >
            <Calendar size={24} />
            Schedule online
            <ExternalLink size={18} className="opacity-70 ml-1" />
        </a>
    </div>

    <div className="p-3 bg-gray-50 dark:bg-[#050A14] text-center text-[10px] text-gray-400 border-t border-gray-100">
        <p>Powered by Microsoft Bookings</p>
    </div>
 </div>
 
 <div className="mt-8 text-center">
 <p className="text-gray-600 dark:text-gray-400 mb-3">Having trouble with the calendar?</p>
 <a href="mailto:info@unifiedhive.com"className="inline-block">
 <Button variant="outline"className="text-foreground border-[#001F3F] hover:bg-[#001F3F] hover:text-white transition-all px-6 py-5 h-auto text-base gap-2">
 Email Sohila Directly <ExternalLink className="w-4 h-4"/>
 </Button>
 </a>
 </div>
 </motion.div>

 </div>
 </div>
 </div>
 </>
 );
};

export default BookDemoPage;