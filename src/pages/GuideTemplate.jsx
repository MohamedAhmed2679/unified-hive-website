import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Download, FileText, CheckSquare, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import AnimatedContent from '@/components/AnimatedContent';
import { Link } from 'react-router-dom';

const GuideTemplate = () => {
 const { slug } = useParams();
 const { toast } = useToast();

 const handleDownload = () => {
 toast({
 title:"Download Started",
 description:"Your guide is downloading...",
 });
 };

 const guides = {
 'zero-trust-blueprint': {
 title:"Zero Trust Security Blueprint",
 type:"Implementation Guide",
 description:"A step-by-step framework for implementing Zero Trust architecture in your organization.",
 content: [
"Defining the Protect Surface",
"Mapping Transaction Flows",
"Architecting the Environment",
"Creating Zero Trust Policy",
"Monitoring and Maintaining"
 ],
 checklist: [
"Identify sensitive data and assets",
"Map user and application flows",
"Implement MFA everywhere",
"Verify endpoint health",
"Segment the network"
 ],
 faq: [
 { q:"What is Zero Trust?", a:"A security model requiring strict identity verification for every person and device accessing resources on a private network."},
 { q:"How long does implementation take?", a:"Typically 3-6 months depending on organization size and complexity."}
 ]
 },
 'cloud-finops-playbook': {
 title:"Cloud FinOps Playbook",
 type:"Strategic Playbook",
 description:"Master cloud financial management with strategies to optimize spend without compromising performance.",
 content: [
"The Principles of FinOps",
"Cost Allocation Strategies",
"Rate Optimization (RIs/Savings Plans)",
"Usage Optimization (Rightsizing)",
"Building a FinOps Culture"
 ],
 checklist: [
"Tag all cloud resources",
"Set up budget alerts",
"Review idle resources weekly",
"Purchase Savings Plans for steady workloads",
"Automate shutdown of dev environments"
 ],
 faq: [
 { q:"What is FinOps?", a:"The practice of bringing financial accountability to the variable spend model of cloud."}
 ]
 },
 'observability-maturity-model': {
 title:"Observability Maturity Model",
 type:"Assessment Framework",
 description:"Evaluate your current monitoring capabilities and define your path to full-stack observability.",
 content: [
"Level 1: Basic Monitoring",
"Level 2: Centralized Logging",
"Level 3: Distributed Tracing",
"Level 4: Business Insight",
"Level 5: Automated Remediation"
 ],
 checklist: [
"Audit current monitoring tools",
"Define Service Level Objectives (SLOs)",
"Implement structured logging",
"Correlate metrics, logs, and traces",
"Establish incident retrospective process"
 ],
 faq: [
 { q:"How does observability differ from monitoring?", a:"Monitoring tells you when something is wrong; observability tells you why."}
 ]
 }
 };

 const guide = guides[slug];

 if (!guide) {
 return <Navigate to="/resources"/>;
 }

 const structuredData = {
"@context":"https://schema.org",
"@type":"Article",
"headline": guide.title,
"description": guide.description,
"image":"https://horizons-cdn.hostinger.com/3d5f6b13-c880-47b3-8cfb-48f3d18da893/32e2f0ba808a982fc7905f7808be64c1.png",
"author": {
"@type":"Organization",
"name":"Unifiedhive"
 },
"publisher": {
"@type":"Organization",
"name":"Unifiedhive",
"logo": {
"@type":"ImageObject",
"url":"https://horizons-cdn.hostinger.com/3d5f6b13-c880-47b3-8cfb-48f3d18da893/65a7b1a51649e52a56ad0d3c553b286e.png"
 }
 },
"datePublished":"2024-01-01"// Static for now, would be dynamic in real app
 };

 const faqData = guide.faq ? {
"@context":"https://schema.org",
"@type":"FAQPage",
"mainEntity": guide.faq.map(item => ({
"@type":"Question",
"name": item.q,
"acceptedAnswer": {
"@type":"Answer",
"text": item.a
 }
 }))
 } : null;

 const breadcrumbData = {
"@context":"https://schema.org",
"@type":"BreadcrumbList",
"itemListElement": [
 {
"@type":"ListItem",
"position": 1,
"name":"Home",
"item":"https://unifiedhive.com/"
 },
 {
"@type":"ListItem",
"position": 2,
"name":"Resources",
"item":"https://unifiedhive.com/resources"
 },
 {
"@type":"ListItem",
"position": 3,
"name": guide.title,
"item": `https://unifiedhive.com/resources/${slug}`
 }
 ]
 };

 return (
 <>
 <Helmet>
 <title>{guide.title} | Unifiedhive Resources</title>
 <meta name="description"content={guide.description} />
 <meta property="og:title"content={`${guide.title} | Unifiedhive Resources`} />
 <meta property="og:description"content={guide.description} />
 <meta property="og:image"content="https://horizons-cdn.hostinger.com/3d5f6b13-c880-47b3-8cfb-48f3d18da893/32e2f0ba808a982fc7905f7808be64c1.png"/>
 <script type="application/ld+json">
 {JSON.stringify(structuredData)}
 </script>
 {faqData && (
 <script type="application/ld+json">
 {JSON.stringify(faqData)}
 </script>
 )}
 <script type="application/ld+json">
 {JSON.stringify(breadcrumbData)}
 </script>
 </Helmet>

 <a href="#main-content"className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[100] bg-white dark:bg-[#0A1228] text-foreground p-4 rounded-md shadow-lg dark:shadow-black/20 font-bold">
 Skip to main content
 </a>

 <div className="pt-24 pb-20 bg-gray-50 dark:bg-[#050A14] min-h-screen"id="main-content">
 <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
 <Link 
 to="/resources"
 className="inline-flex items-center text-gray-500 dark:text-gray-400 hover:text-foreground mb-8 transition-colors focus-visible:ring-2 focus-visible:ring-[#FFD700] rounded px-2 py-1"
 aria-label="Back to Resources"
 >
 <ArrowLeft size={20} className="mr-2"aria-hidden="true"/> Back to Resources
 </Link>

 <AnimatedContent type="fade">
 <article className="bg-white dark:bg-[#0A1228] rounded-2xl shadow-xl dark:shadow-black/30 overflow-hidden border border-gray-100">
 <div className="bg-[#001F3F] text-white p-10 relative overflow-hidden">
 <div className="absolute top-0 right-0 opacity-10 transform translate-x-1/4 -translate-y-1/4"aria-hidden="true">
 <FileText size={300} />
 </div>
 <div className="relative z-10">
 <span className="bg-[#FFD700] text-foreground font-bold px-3 py-1 rounded text-xs uppercase tracking-wide mb-4 inline-block">
 {guide.type}
 </span>
 <h1 className="text-3xl md:text-5xl font-bold font-heading mb-4">{guide.title}</h1>
 <p className="text-xl text-gray-300 max-w-2xl">{guide.description}</p>
 </div>
 </div>

 <div className="p-10">
 <div className="grid md:grid-cols-2 gap-12">
 <section>
 <h2 className="text-2xl font-bold text-foreground mb-6 font-heading flex items-center">
 What's Inside
 </h2>
 <ul className="space-y-4">
 {guide.content.map((item, i) => (
 <li key={i} className="flex items-center text-muted-foreground">
 <span className="w-8 h-8 rounded-full bg-[#001F3F]/10 text-foreground flex items-center justify-center font-bold mr-3 text-sm shrink-0">
 {i + 1}
 </span>
 {item}
 </li>
 ))}
 </ul>
 </section>

 <section className="bg-gray-50 p-6 rounded-xl border border-gray-200 dark:border-white/[0.06]">
 <h2 className="text-xl font-bold text-foreground mb-4 font-heading flex items-center">
 <CheckSquare className="mr-2 text-[#FFD700]"aria-hidden="true"/>
 Quick Checklist Preview
 </h2>
 <ul className="space-y-3">
 {guide.checklist.map((item, i) => (
 <li key={i} className="flex items-start text-sm text-muted-foreground">
 <input 
 type="checkbox"
 className="mt-1 mr-3 text-foreground focus:ring-[#FFD700] rounded border-gray-300 dark:border-white/[0.08]"
 readOnly 
 checked 
 aria-label={`Checklist item: ${item}`}
 />
 {item}
 </li>
 ))}
 </ul>
 </section>
 </div>

 <div className="mt-12 pt-8 border-t border-gray-100 flex justify-center">
 <Button 
 onClick={handleDownload}
 className="bg-[#FFD700] hover:bg-[#E5C100] text-foreground font-bold text-lg px-10 py-6 rounded-full shadow-lg hover:shadow-xl dark:shadow-black/30 transition-all min-h-[60px] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#001F3F]"
 aria-label={`Download ${guide.title} PDF`}
 >
 <Download className="mr-2"size={24} aria-hidden="true"/>
 Download Full Guide (PDF)
 </Button>
 </div>
 </div>
 </article>
 </AnimatedContent>
 </div>
 </div>
 </>
 );
};

export default GuideTemplate;