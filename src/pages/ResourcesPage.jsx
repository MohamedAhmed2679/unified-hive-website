import React from 'react';
import { Helmet } from 'react-helmet';
import AnimatedContent from '@/components/AnimatedContent';
import { Button } from '@/components/ui/button';
import { Download, FileText, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ResourcesPage = () => {
 const guides = [
 {
 slug:"zero-trust-blueprint",
 title:"Zero Trust Security Blueprint",
 description:"A comprehensive checklist for implementing Zero Trust architecture in your organization.",
 type:"Blueprint",
 size:"2.4 MB"
 },
 {
 slug:"cloud-finops-playbook",
 title:"Cloud FinOps Playbook",
 description:"Strategies to optimize your cloud spend without compromising performance.",
 type:"Playbook",
 size:"1.8 MB"
 },
 {
 slug:"observability-maturity-model",
 title:"Observability Maturity Model",
 description:"Assess your current monitoring capabilities and define your path to full observability.",
 type:"Whitepaper",
 size:"3.1 MB"
 }
 ];

 return (
 <>
 <Helmet>
 <title>Resources & Guides | Unifiedhive</title>
 <meta name="description"content="Download free resources, blueprints, and playbooks to help you navigate the complex world of IT infrastructure."/>
 </Helmet>
 
 <div className="pt-24 pb-16 bg-gray-50 dark:bg-[#050A14] min-h-screen">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <AnimatedContent type="text"className="mb-12 text-center">
 <h1 className="text-4xl font-bold text-foreground mb-4 font-heading">Resources Hub</h1>
 <p className="text-xl text-muted-foreground">Expert insights and actionable tools for your IT team.</p>
 </AnimatedContent>

 <div className="grid md:grid-cols-3 gap-8">
 {guides.map((guide, index) => (
 <AnimatedContent key={index} type="fade"delay={index * 0.1}>
 <Link to={`/resources/${guide.slug}`} className="block h-full group">
 <div className="bg-white dark:bg-[#0A1228] rounded-xl overflow-hidden shadow-lg dark:shadow-black/20 border border-gray-100 flex flex-col h-full transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-1">
 <div className="bg-[#001F3F] p-8 flex items-center justify-center group-hover:bg-[#003366] transition-colors">
 <FileText className="text-[#FFD700] w-16 h-16"/>
 </div>
 <div className="p-6 flex-1 flex flex-col">
 <div className="text-xs font-semibold text-foreground bg-[#FFD700] inline-block px-2 py-1 rounded mb-3 self-start">
 {guide.type}
 </div>
 <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 font-heading group-hover:text-foreground">{guide.title}</h3>
 <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm flex-1">{guide.description}</p>
 <Button variant="outline"className="w-full justify-between group-hover:border-[#001F3F] group-hover:text-foreground">
 View Details
 <ArrowRight size={16} />
 </Button>
 </div>
 </div>
 </Link>
 </AnimatedContent>
 ))}
 </div>
 </div>
 </div>
 </>
 );
};

export default ResourcesPage;