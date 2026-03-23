import React from 'react';
import AnimatedContent from '@/components/AnimatedContent';

/**
 * Testimonials - Client testimonials section
 * Adapted from Next.js style jsx → Tailwind CSS
 */
const Testimonials = () => {
 const testimonials = [
 {
 quote: 'Unifiedhive transformed our security posture from reactive to proactive. Their Zero Trust implementation reduced our incident response time by 70% and gave our board the confidence they needed in our cybersecurity strategy.',
 name: 'Sarah Chen',
 title: 'VP of Information Security',
 company: 'Meridian Financial Group',
 },
 {
 quote: 'The DevOps automation work saved our engineering team over 20 hours per week on deployment tasks alone. We went from monthly releases to deploying multiple times per day with zero downtime.',
 name: 'Marcus Rivera',
 title: 'CTO',
 company: 'NexaFlow Technologies',
 },
 {
 quote: "What sets Unifiedhive apart is their ability to translate complex security requirements into practical, implementable solutions. They don't just audit — they build, deploy, and support.",
 name: 'Dr. Amara Osei',
 title: 'Chief Information Officer',
 company: 'Atlas Health Systems',
 },
 ];

 return (
 <section
 className="bg-[#050A14] py-20 px-4 sm:px-6 lg:px-8"
 aria-label="Client testimonials"
 >
 <div className="max-w-6xl mx-auto">
 <AnimatedContent type="text" className="text-center mb-14">
 <span className="inline-block text-xs uppercase tracking-widest text-[#FFD700] font-semibold mb-3">
 Client Outcomes
 </span>
 <h2 className="text-3xl md:text-4xl font-bold text-white font-heading">
 Trusted by Security-Conscious Enterprises
 </h2>
 </AnimatedContent>

 <div className="grid md:grid-cols-3 gap-6">
 {testimonials.map((t, i) => (
 <AnimatedContent key={i} type="fade" delay={i * 0.15}>
 <figure className="flex flex-col h-full p-6 bg-white/[0.03] border border-white/[0.08] rounded-2xl hover:border-white/[0.15] transition-colors duration-300">
 <blockquote className="flex-1 mb-6">
 <p className="text-sm leading-relaxed text-white/70">
 &ldquo;{t.quote}&rdquo;
 </p>
 </blockquote>
 <figcaption className="flex items-center gap-3 pt-5 border-t border-white/[0.06]">
 <div
 className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FFD700]/20 to-[#06B6D4]/20 flex items-center justify-center text-xs font-bold text-[#FFD700] flex-shrink-0"
 aria-hidden="true"
 >
 {t.name.split(' ').map(n => n[0]).join('')}
 </div>
 <div className="flex flex-col">
 <cite className="not-italic text-sm font-semibold text-white">{t.name}</cite>
 <span className="text-xs text-white/45">{t.title}, {t.company}</span>
 </div>
 </figcaption>
 </figure>
 </AnimatedContent>
 ))}
 </div>
 </div>
 </section>
 );
};

export default Testimonials;
