import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const CookieNotice = () => {
 const [isVisible, setIsVisible] = useState(false);

 useEffect(() => {
 const consent = localStorage.getItem('cookie-consent');
 if (!consent) {
 // Small delay to not annoy immediately
 const timer = setTimeout(() => setIsVisible(true), 1000);
 return () => clearTimeout(timer);
 }
 }, []);

 const handleAccept = () => {
 localStorage.setItem('cookie-consent', 'accepted');
 setIsVisible(false);
 };

 const handleDecline = () => {
 localStorage.setItem('cookie-consent', 'declined');
 setIsVisible(false);
 };

 return (
 <AnimatePresence>
 {isVisible && (
 <motion.div
 initial={{ y: 100, opacity: 0 }}
 animate={{ y: 0, opacity: 1 }}
 exit={{ y: 100, opacity: 0 }}
 className="fixed bottom-0 left-0 right-0 z-50 p-4"
 >
 <div className="max-w-7xl mx-auto bg-white dark:bg-[#0A1228] rounded-lg shadow-2xl border border-gray-200 dark:border-white/[0.06] p-6 md:p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
 <div className="flex-1">
 <h3 className="text-lg font-semibold text-[#001F3F] dark:text-white mb-1 font-heading">We value your privacy</h3>
 <p className="text-sm text-muted-foreground">
 We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
 By clicking "Accept", you consent to our use of cookies. 
 <Link to="/cookies" className="text-[#001F3F] dark:text-white hover:text-[#FFC107] underline ml-1">
 Read our Cookie Policy
 </Link>.
 </p>
 </div>
 <div className="flex items-center gap-3 w-full md:w-auto">
 <Button 
 variant="outline" 
 onClick={handleDecline}
 className="flex-1 md:flex-none "
 >
 Decline
 </Button>
 <Button 
 onClick={handleAccept}
 className="flex-1 md:flex-none bg-[#001F3F] hover:bg-[#003366] text-white dark:bg-[#FFD700] dark:text-[#001F3F] "
 >
 Accept
 </Button>
 <button 
 onClick={() => setIsVisible(false)}
 className="text-gray-400 hover:text-gray-600 dark:text-gray-400 md:ml-2"
 >
 <X size={20} />
 </button>
 </div>
 </div>
 </motion.div>
 )}
 </AnimatePresence>
 );
};

export default CookieNotice;