import React from 'react';
import { motion } from 'framer-motion';
import AnimatedContent from '@/components/AnimatedContent';

/**
 * TrustSignals - Stats bar + certifications displayed below the hero
 * Adapted from Next.js style jsx → Tailwind CSS
 */
const TrustSignals = () => {
 const stats = [
 { value: '40%', label: 'Avg. Cost Reduction', note: 'Across 12+ engagements' },
 { value: '99.9%', label: 'Uptime Achieved', note: 'For managed clients' },
 { value: '50+', label: 'Enterprise Projects', note: 'Zero Trust & DevOps' },
 { value: '<4hr', label: 'Incident Response', note: 'Average resolution time' },
 ];

 const certifications = [
 { name: 'SOC 2 Type II', icon: '🛡️' },
 { name: 'ISO 27001', icon: '✓' },
 { name: 'CISSP Certified Team', icon: '🔐' },
 { name: 'AWS Solutions Architect', icon: '☁️' },
 ];

 return (
 <section
 className="bg-[#0A1228] border-t border-b border-white/[0.06] py-16 px-4 sm:px-6 lg:px-8"
 aria-label="Trust signals and credentials"
 >
 {/* Stats */}
 <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto mb-12 text-center">
 {stats.map((stat, i) => (
 <AnimatedContent key={i} type="fade" delay={i * 0.1}>
 <div className="flex flex-col gap-1">
 <span className="text-3xl md:text-4xl font-bold bg-gradient-to-br from-[#FFD700] to-[#06B6D4] bg-clip-text text-transparent">
 {stat.value}
 </span>
 <span className="text-sm font-semibold text-white/85">{stat.label}</span>
 <span className="text-xs text-white/40">{stat.note}</span>
 </div>
 </AnimatedContent>
 ))}
 </div>

 {/* Certifications */}
 <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
 {certifications.map((cert, i) => (
 <AnimatedContent key={i} type="fade" delay={0.4 + i * 0.1}>
 <div className="flex items-center gap-2 px-4 py-2 border border-white/10 rounded-lg text-sm text-white/60">
 <span aria-hidden="true">{cert.icon}</span>
 <span>{cert.name}</span>
 </div>
 </AnimatedContent>
 ))}
 </div>
 </section>
 );
};

export default TrustSignals;
