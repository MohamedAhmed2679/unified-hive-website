import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { cn } from '@/lib/utils';

const AnimatedContent = ({ 
 children, 
 type = 'fade', 
 delay = 0, 
 duration = 0.5, 
 className 
}) => {
 const ref = useRef(null);
 const isInView = useInView(ref, { once: true, margin: "-50px" });

 const variants = {
 fade: {
 hidden: { opacity: 0, y: 20 },
 visible: { opacity: 1, y: 0 }
 },
 text: {
 hidden: { opacity: 0, x: -20 },
 visible: { opacity: 1, x: 0 }
 },
 image: {
 hidden: { opacity: 0, scale: 0.95 },
 visible: { opacity: 1, scale: 1 }
 },
 icon: {
 hidden: { opacity: 0, scale: 0 },
 visible: { opacity: 1, scale: 1 }
 }
 };

 return (
 <motion.div
 ref={ref}
 initial="hidden"
 animate={isInView ? "visible" : "hidden"}
 variants={variants[type] || variants.fade}
 transition={{ 
 duration: duration, 
 delay: delay,
 ease: "easeOut" 
 }}
 className={cn(className)}
 >
 {children}
 </motion.div>
 );
};

export default AnimatedContent;