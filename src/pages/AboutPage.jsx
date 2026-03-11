import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import AnimatedContent from '@/components/AnimatedContent';
import {
 Target, Shield, Award, Zap, FileText, Users,
 CheckCircle, ArrowRight, TrendingUp
} from 'lucide-react';
import { UHAnalytics } from '@/lib/analytics';

const AboutPage = () => {
 const differentiators = [
 {
 icon: Users,
 title:"Senior Expertise",
 description:"Our consultants average 12+ years of experience across Fortune 500 and high-growth startups."
 },
 {
 icon: Shield,
 title:"Security-First Design",
 description:"Every solution is architected with Zero Trust principles and compliance requirements built in from day one."
 },
 {
 icon: Award,
 title:"Vendor-Neutral",
 description:"We recommend the best tools for your needs, not what benefits us. No lock-in, no bias."
 },
 {
 icon: Zap,
 title:"Fast Delivery",
 description:"Agile methodology and proven frameworks enable us to deliver tangible results in weeks, not months."
 },
 {
 icon: FileText,
 title:"Clear Documentation",
 description:"Comprehensive runbooks, architecture diagrams, and knowledge transfer ensure your team's success."
 },
 {
 icon: TrendingUp,
 title:"Measurable Outcomes",
 description:"We define success metrics upfront and track progress with data-driven KPIs throughout engagements."
 }
 ];

 const team = [
 {
 role:"Senior Consultant",
 icon: Users,
 description:"Strategic advisors who align technology initiatives with business objectives and drive executive-level decision-making."
 },
 {
 role:"Solutions Architect",
 icon: Target,
 description:"Technical experts who design scalable, resilient systems leveraging cloud-native and hybrid architectures."
 },
 {
 role:"Security Lead",
 icon: Shield,
 description:"Specialists in Zero Trust, compliance frameworks, and threat modeling across all solution domains."
 },
 {
 role:"DevOps Engineer",
 icon: Zap,
 description:"Automation experts who build CI/CD pipelines, infrastructure as code, and observability platforms."
 }
 ];

 const certifications = [
"AWS Certified Solutions Architect",
"Microsoft Azure Solutions Architect Expert",
"Google Cloud Professional Architect",
"Certified Kubernetes Administrator (CKA)",
"CISSP - Certified Information Systems Security Professional",
"ISO 27001 Lead Implementer",
"ITIL 4 Foundation",
"Certified ScrumMaster (CSM)"
 ];

 const milestones = [
 { year:"2018", event:"Founded with mission to democratize enterprise IT consulting"},
 { year:"2019", event:"Achieved AWS Advanced Consulting Partner status"},
 { year:"2020", event:"Expanded to Microsoft Azure and Google Cloud practices"},
 { year:"2021", event:"Launched dedicated Security & Compliance practice"},
 { year:"2022", event:"Reached 100+ successful client engagements"},
 { year:"2023", event:"Established Modern Workplace and AI Advisory services"},
 { year:"2024", event:"Serving clients across 15+ industries in North America and Europe"}
 ];

 const structuredData = {
"@context":"https://schema.org",
"@type":"AboutPage",
"mainEntity": {
"@type":"Organization",
"name":"Unifiedhive",
"description":"Empowering organizations to innovate responsibly and deliver measurable business outcomes through expert IT consulting.",
"logo":"https://horizons-cdn.hostinger.com/3d5f6b13-c880-47b3-8cfb-48f3d18da893/65a7b1a51649e52a56ad0d3c553b286e.png",
"url":"https://unifiedhive.com",
"foundingDate":"2018"
 }
 };

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
"name":"About",
"item":"https://unifiedhive.com/about"
 }
 ]
 };

 return (
 <>
 <Helmet>
 <title>About Unified Hive | Enterprise IT Consultants & Zero Trust Architects</title>
 <meta name="description" content="Discover Unified Hive's mission, our expert team of Cloud Architects, and our proven track record of engineering measurable IT outcomes for SMBs and Enterprises."/>
 <meta property="og:title" content="About Unified Hive | Enterprise IT Consultants & Zero Trust Architects"/>
 <meta property="og:description" content="Learn about Unified Hive's mission and team of IT experts."/>
 <meta property="og:image" content="https://horizons-cdn.hostinger.com/3d5f6b13-c880-47b3-8cfb-48f3d18da893/65a7b1a51649e52a56ad0d3c553b286e.png"/>
 <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
 <script type="application/ld+json">{JSON.stringify(breadcrumbData)}</script>
 </Helmet>

 <a href="#about-content"className="skip-link">Skip to main content</a>

 <div className="pt-20"id="about-content"data-analytics-view="about_page">
 {/* Hero Section */}
 <section className="bg-gradient-to-br from-[#001F3F] via-[#003366] to-[#001F3F] text-white py-20">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <AnimatedContent type="text"className="text-center">
 <h1 className="text-4xl md:text-5xl font-bold mb-6 font-heading">
 About Unifiedhive
 </h1>
 <p className="text-xl text-gray-200 max-w-3xl mx-auto">
 Empowering organizations to innovate responsibly and deliver measurable business outcomes through expert IT consulting
 </p>
 </AnimatedContent>
 </div>
 </section>

 {/* Mission Statement */}
 <section className="section-dark py-20">
 <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
 <AnimatedContent type="fade"className="text-center">
 <AnimatedContent type="icon"delay={0.2}>
 <div className="bg-[#FFD700] w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
 <Target size={40} className="text-foreground"aria-hidden="true"/>
 </div>
 </AnimatedContent>
 <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 font-heading">
 Our Mission
 </h2>
 <p className="text-xl text-muted-foreground leading-relaxed">
 To help organizations <span className="font-semibold text-foreground text-[#06B6D4]">innovate responsibly</span> by delivering technology solutions that drive <span className="font-semibold text-foreground text-[#06B6D4]">measurable business outcomes</span>. We believe in transparency, collaboration, and empowering our clients with the knowledge and tools to sustain success long after our engagement ends.
 </p>
 </AnimatedContent>
 </div>
 </section>

 {/* Differentiators */}
 <section className="section-elevated py-20">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <AnimatedContent type="text"className="text-center mb-16">
 <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-heading">
 What Sets Us Apart
 </h2>
 <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
 Six core principles that define our approach to IT consulting
 </p>
 </AnimatedContent>

 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
 {differentiators.map((item, index) => (
 <AnimatedContent type="fade"key={index} delay={index * 0.1}>
 <div className="glass-card p-6">
 <AnimatedContent type="icon"delay={index * 0.1 + 0.2}>
 <div className="bg-[#FFD700] w-14 h-14 rounded-lg flex items-center justify-center mb-4">
 <item.icon size={28} className="text-foreground"aria-hidden="true"/>
 </div>
 </AnimatedContent>
 <h3 className="text-xl font-semibold text-foreground mb-3 font-heading">
 {item.title}
 </h3>
 <p className="text-muted-foreground">
 {item.description}
 </p>
 </div>
 </AnimatedContent>
 ))}
 </div>
 </div>
 </section>

 {/* Team Section */}
 <section className="section-dark py-20">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <AnimatedContent type="text"className="text-center mb-16">
 <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-heading">
 Our Expert Team
 </h2>
 <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
 Diverse specialists united by a passion for solving complex IT challenges
 </p>
 </AnimatedContent>

 <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
 {team.map((member, index) => (
 <AnimatedContent type="fade"key={index} delay={index * 0.1}>
 <div className="bg-gradient-to-br from-[#001F3F] to-[#003366] text-white rounded-lg p-6 text-center h-full">
 <AnimatedContent type="icon"delay={index * 0.1 + 0.2}>
 <div className="bg-[#FFD700] w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
 <member.icon size={32} className="text-foreground"aria-hidden="true"/>
 </div>
 </AnimatedContent>
 <h3 className="text-xl font-semibold mb-3 font-heading">
 {member.role}
 </h3>
 <p className="text-gray-200 text-sm">
 {member.description}
 </p>
 </div>
 </AnimatedContent>
 ))}
 </div>
 </div>
 </section>

 {/* Certifications */}
 <section className="section-elevated py-20">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <AnimatedContent type="text"className="text-center mb-16">
 <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-heading">
 Certifications & Partnerships
 </h2>
 <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
 Industry-recognized credentials and strategic alliances
 </p>
 </AnimatedContent>

 <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
 {certifications.map((cert, index) => (
 <AnimatedContent type="fade"key={index} delay={index * 0.05}>
 <div className="glass-card p-4 text-center">
 <CheckCircle className="text-[#FFD700] mx-auto mb-2"size={24} aria-hidden="true"/>
 <p className="text-sm text-muted-foreground font-medium">{cert}</p>
 </div>
 </AnimatedContent>
 ))}
 </div>
 </div>
 </section>

 {/* Timeline */}
 <section className="section-dark py-20">
 <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
 <AnimatedContent type="text"className="text-center mb-16">
 <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-heading">
 Our Journey
 </h2>
 <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
 Key milestones in our growth and impact
 </p>
 </AnimatedContent>

 <div className="space-y-8">
 {milestones.map((milestone, index) => (
 <AnimatedContent type="fade"key={index} delay={index * 0.1} className="flex items-start gap-6">
 <div className="bg-[#FFD700] text-foreground font-bold px-4 py-2 rounded-lg text-lg flex-shrink-0 font-heading">
 {milestone.year}
 </div>
 <div className="flex-1 bg-white/[0.03] dark:bg-white/[0.03] rounded-lg p-4">
 <p className="text-muted-foreground">{milestone.event}</p>
 </div>
 </AnimatedContent>
 ))}
 </div>
 </div>
 </section>

 {/* Culture Section */}
 <section className="bg-[#050A14] text-white py-20">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <AnimatedContent type="text"className="text-center mb-12">
 <h2 className="text-3xl md:text-4xl font-bold mb-6 font-heading">
 Our Culture
 </h2>
 <p className="text-xl text-gray-200 max-w-3xl mx-auto">
 We foster an environment of collaboration, knowledge-sharing, and continuous improvement
 </p>
 </AnimatedContent>

 <div className="grid md:grid-cols-3 gap-8">
 <AnimatedContent type="fade"delay={0.1} className="text-center">
 <div className="bg-[#FFD700] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
 <Users size={32} className="text-foreground"aria-hidden="true"/>
 </div>
 <h3 className="text-xl font-semibold mb-3 font-heading">Collaborative</h3>
 <p className="text-gray-300">
 We work as one team with our clients, sharing knowledge and building solutions together.
 </p>
 </AnimatedContent>

 <AnimatedContent type="fade"delay={0.2} className="text-center">
 <div className="bg-[#FFD700] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
 <FileText size={32} className="text-foreground"aria-hidden="true"/>
 </div>
 <h3 className="text-xl font-semibold mb-3 font-heading">Knowledge-Sharing</h3>
 <p className="text-gray-300">
 Comprehensive documentation and training ensure sustainable success beyond our engagement.
 </p>
 </AnimatedContent>

 <AnimatedContent type="fade"delay={0.3} className="text-center">
 <div className="bg-[#FFD700] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
 <TrendingUp size={32} className="text-foreground"aria-hidden="true"/>
 </div>
 <h3 className="text-xl font-semibold mb-3 font-heading">Continuous Improvement</h3>
 <p className="text-gray-300">
 We stay ahead of industry trends and continuously refine our methodologies.
 </p>
 </AnimatedContent>
 </div>
 </div>
 </section>

 {/* CTA Section */}
 <section className="section-dark py-20"data-analytics-view="about_cta">
 <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
 <AnimatedContent type="text">
 <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 font-heading">
 Let's Work Together
 </h2>
 <p className="text-xl text-muted-foreground mb-8">
 Ready to transform your IT operations? Connect with our team today.
 </p>
 <div className="flex flex-col sm:flex-row gap-4 justify-center">
 <Button
 asChild
 className="bg-[#FFD700] hover:bg-[#E5C100] text-foreground font-semibold text-lg px-10 py-6 transition-all duration-200 hover:shadow-xl dark:shadow-black/30 tap-target"
 onClick={() => UHAnalytics.trackClick('book_demo', 'about_cta')}
 >
 <Link to="/book-demo">
 Book Demo
 <ArrowRight className="ml-2" size={20} aria-hidden="true"/>
 </Link>
 </Button>
 <Button
 asChild
 variant="outline"
 className="border-2 border-[#001F3F] dark:border-white text-foreground hover:bg-[#001F3F] dark:hover:bg-white hover:text-white dark:hover:text-foreground font-semibold text-lg px-10 py-6 transition-all duration-200 tap-target"
 onClick={() => UHAnalytics.trackClick('contact_us', 'about_cta')}
 >
 <Link to="/contact">
 Contact Us
 </Link>
 </Button>
 </div>
 </AnimatedContent>
 </div>
 </section>
 </div>
 </>
 );
};

export default AboutPage;