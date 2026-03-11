import React from 'react';
import { Helmet } from 'react-helmet';
import AnimatedContent from '@/components/AnimatedContent';
import { Search, PenTool, Rocket, TrendingUp, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { UHAnalytics } from '@/lib/analytics';

const MethodPage = () => {
 const steps = [
 {
 id:"01",
 title:"Assess",
 icon: Search,
 description:"We begin with a deep dive into your current infrastructure, workflows, and business goals. We identify bottlenecks, security gaps, and efficiency opportunities.",
 deliverables: ["Infrastructure Audit","Security Posture Report","Gap Analysis"]
 },
 {
 id:"02",
 title:"Architect",
 icon: PenTool,
 description:"Based on our findings, we design a tailored solution that aligns with your budget and growth trajectory. We prioritize scalability and resilience.",
 deliverables: ["Solution Design Document","Migration Roadmap","Cost Projection"]
 },
 {
 id:"03",
 title:"Implement",
 icon: Rocket,
 description:"Our experts execute the plan with precision, using agile methodologies to ensure rapid delivery with minimal disruption to your operations.",
 deliverables: ["Code Implementation","System Configuration","Testing & QA"]
 },
 {
 id:"04",
 title:"Improve",
 icon: TrendingUp,
 description:"Post-launch, we don't just walk away. We monitor performance, gather feedback, and continuously optimize your systems for peak efficiency.",
 deliverables: ["Performance Monitoring","Regular Review Meetings","Optimization Patches"]
 }
 ];

 return (
 <>
 <Helmet>
 <title>Our Methodology | Unifiedhive</title>
 <meta name="description"content="Discover the Unifiedhive 4-step methodology: Assess, Architect, Implement, and Improve. A proven framework for IT success."/>
 </Helmet>
 
 <div className="pt-24 pb-16 bg-white dark:bg-[#0A1228]"data-analytics-view="method_page">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <AnimatedContent type="text"className="text-center max-w-3xl mx-auto mb-20">
 <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 font-heading">
 The Path to <span className="text-[#FFD700]">Digital Excellence</span>
 </h1>
 <p className="text-xl text-muted-foreground">
 We don't guess; we engineer. Our proven 4-step framework ensures predictable outcomes and measurable success for every project.
 </p>
 </AnimatedContent>

 <div className="relative">
 {/* Connecting Line (Desktop) */}
 <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-10 transform -translate-y-1/2"></div>

 <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
 {steps.map((step, index) => (
 <AnimatedContent key={index} type="fade"delay={index * 0.2}>
 <div className="bg-white dark:bg-[#0A1228] p-8 rounded-xl shadow-lg dark:shadow-black/20 border border-gray-100 h-full hover:-translate-y-2 transition-transform duration-300">
 <div className="flex items-center justify-between mb-6">
 <div className="w-16 h-16 bg-[#001F3F] rounded-full flex items-center justify-center text-[#FFD700]">
 <step.icon size={32} />
 </div>
 <span className="text-4xl font-black text-gray-100 font-heading">{step.id}</span>
 </div>
 <h3 className="text-2xl font-bold text-foreground mb-4 font-heading">{step.title}</h3>
 <p className="text-gray-600 dark:text-gray-400 mb-6">{step.description}</p>
 <div>
 <h4 className="font-semibold text-sm text-foreground uppercase tracking-wider mb-2">Deliverables:</h4>
 <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
 {step.deliverables.map((item, i) => (
 <li key={i}>{item}</li>
 ))}
 </ul>
 </div>
 </div>
 </AnimatedContent>
 ))}
 </div>
 </div>

 <div className="mt-20 text-center">
 <Link to="/book-demo">
 <Button 
 className="bg-[#FFD700] hover:bg-[#E5C100] text-foreground font-semibold text-lg px-8 py-6 tap-target"
 onClick={() => UHAnalytics.trackClick('book_demo', 'method_page')}
 >
 Start Your Assessment
 <ArrowRight className="ml-2"size={20} />
 </Button>
 </Link>
 </div>
 </div>
 </div>
 </>
 );
};

export default MethodPage;