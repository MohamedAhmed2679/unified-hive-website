import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, TrendingUp, ShieldCheck, Zap } from 'lucide-react';
import AnimatedContent from '@/components/AnimatedContent';

const OutcomesPage = () => {
 const cases = [
 {
 slug: 'fintech-scale',
 title:"Scaling Fintech Infrastructure for 10M Users",
 client:"PayFlow Inc.",
 metric:"99.99% Availability",
 category:"Fintech",
 icon: TrendingUp
 },
 {
 slug: 'healthcare-security',
 title:"Zero Trust Implementation for Healthcare Provider",
 client:"MediCare Plus",
 metric:"100% HIPAA Compliance",
 category:"Healthcare",
 icon: ShieldCheck
 }
 ];

 return (
 <>
 <Helmet>
 <title>Client Outcomes & Success Stories | Unifiedhive</title>
 <meta name="description"content="See how Unifiedhive delivers measurable business outcomes through IT modernization and security."/>
 </Helmet>
 
 <div className="pt-20">
 <section className="bg-[#001F3F] text-white py-20 text-center">
 <div className="max-w-4xl mx-auto px-4">
 <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">Driven by Outcomes</h1>
 <p className="text-xl text-gray-300">We measure our success by the tangible value we create for your business.</p>
 </div>
 </section>

 <section className="py-20 bg-gray-50 dark:bg-[#050A14]">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="grid md:grid-cols-2 gap-8">
 {cases.map((study, i) => (
 <AnimatedContent key={i} type="fade"delay={i * 0.1}>
 <Link to={`/case-studies/${study.slug}`} className="block group">
 <div className="glass-card shadow-lg dark:shadow-black/20 border border-gray-100 p-8 h-full transition-all duration-300 group-hover:-translate-y-2 group-hover:border-[#FFD700]">
 <div className="flex justify-between items-start mb-6">
 <div className="bg-[#001F3F]/5 p-4 rounded-full">
 <study.icon size={32} className="text-foreground"/>
 </div>
 <span className="bg-[#FFD700] text-foreground text-xs font-bold px-3 py-1 rounded-full uppercase">{study.category}</span>
 </div>
 <h3 className="text-2xl font-bold text-foreground font-heading mb-2 group-hover:text-[#003366]">{study.title}</h3>
 <p className="text-muted-foreground mb-6">Client: {study.client}</p>
 
 <div className="border-t border-gray-100 pt-6 flex items-center justify-between">
 <div>
 <p className="text-xs text-gray-400 uppercase tracking-wide font-bold">Key Outcome</p>
 <p className="text-xl font-bold text-foreground font-heading">{study.metric}</p>
 </div>
 <Button variant="ghost"className="text-foreground group-hover:text-[#FFD700] group-hover:bg-[#001F3F]">
 Read Case Study <ArrowRight className="ml-2"size={16} />
 </Button>
 </div>
 </div>
 </Link>
 </AnimatedContent>
 ))}
 </div>
 </div>
 </section>

 <section className="py-20 bg-white dark:bg-[#0A1228]">
 <div className="max-w-4xl mx-auto px-4 text-center">
 <h2 className="text-3xl font-bold text-foreground mb-6 font-heading">Ready to write your success story?</h2>
 <Link to="/contact">
 <Button className="bg-[#FFD700] text-foreground hover:bg-[#E5C100] font-bold text-lg px-8 py-6 rounded-full">
 Start Your Project
 </Button>
 </Link>
 </div>
 </section>
 </div>
 </>
 );
};

export default OutcomesPage;