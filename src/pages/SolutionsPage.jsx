import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import AnimatedContent from '@/components/AnimatedContent';
import {
    Cloud, Shield, Cog, Eye, Database, Users, RefreshCw, ArrowRight, CheckCircle,
    Monitor, Smartphone, PenTool, Rocket, PhoneCall, ShieldCheck, Zap, Library,
    BarChart3, FolderLock, Settings, ArrowRightLeft, LayoutGrid
} from 'lucide-react';
import { UHAnalytics } from '@/lib/analytics';
import { allSolutions, SOLUTION_TAGS } from '@/data/solutionsData';

// Icon map
const iconMap = {
    Cloud, Shield, Cog, Eye, Database, Users, RefreshCw, Monitor, Smartphone, PenTool,
    Rocket, PhoneCall, ShieldCheck, Zap, Library, BarChart3, FolderLock, Settings, ArrowRightLeft, LayoutGrid
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};
const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
};

const SolutionsPage = () => {
    const [activeTag, setActiveTag] = useState('all');

    const filtered = activeTag === 'all'
        ? allSolutions
        : allSolutions.filter(s => s.tags.includes(activeTag));

    return (
        <>
            <Helmet>
                <title>IT & Cloud Solutions | Cybersecurity & DevOps | Unified Hive</title>
                <meta name="description" content="Explore Unified Hive's comprehensive IT solutions, from Zero Trust Security implementation and expert Microsoft 365 migrations to robust DevOps automation and strategic FinOps cost reduction." />
                <meta property="og:title" content="Solutions — Intelligent IT & Microsoft 365 | Unified Hive" />
                <meta property="og:description" content="Discover proven solutions across automation, security, collaboration, and cloud." />
                <meta property="og:image" content="https://horizons-cdn.hostinger.com/3d5f6b13-c880-47b3-8cfb-48f3d18da893/65a7b1a51649e52a56ad0d3c553b286e.png" />
            </Helmet>

            <div className="pt-20">
                {/* Hero */}
                <section className="relative py-24 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#050A14] via-[#0A1228] to-[#050A14] dark:opacity-100 opacity-0 pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-br from-white via-[#F8FAFC] to-white dark:opacity-0 opacity-100 pointer-events-none" />

                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                        <AnimatedContent type="text">
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#001F3F]/[0.1] dark:border-white/[0.08] bg-[#001F3F]/[0.03] dark:bg-white/[0.03] text-xs font-medium text-muted-foreground tracking-wider uppercase mb-6">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#FFD700] animate-pulse" />
                                Microsoft 365 & IT Solutions
                            </span>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground font-heading mb-6">
                                Smarter Business.{' '}
                                <span className="text-gradient">Powered By Microsoft 365.</span>
                            </h1>
                            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 font-light leading-relaxed">
                                Proven solutions across automation, security, collaboration, and cloud — built to move your business forward.
                            </p>

                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <Button asChild className="btn-premium text-base px-8 py-6 rounded-full">
                                    <Link to="/book-demo">
                                        Book a Consultation
                                    </Link>
                                </Button>
                                <Button asChild variant="outline" className="bg-transparent border border-[#001F3F]/[0.15] dark:border-white/[0.1] text-foreground hover:bg-[#001F3F]/[0.04] dark:hover:bg-white/[0.04] text-base px-8 py-6 rounded-full">
                                    <Link to="/contact">
                                        Contact Sales
                                    </Link>
                                </Button>
                            </div>
                        </AnimatedContent>
                    </div>
                </section>

                {/* Not sure? CTA */}
                <section className="py-12 border-y border-[#001F3F]/[0.06] dark:border-white/[0.04]">
                    <div className="max-w-4xl mx-auto px-4 text-center">
                        <h2 className="text-xl md:text-2xl font-bold text-foreground font-heading mb-3">
                            Not sure which solution is right for you?
                        </h2>
                        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                            Share your challenges and we'll map out the ideal path for your organization. Honest, expert guidance with zero pressure.
                        </p>
                        <Link to="/book-demo" className="text-[#FFD700] font-semibold hover:underline inline-flex items-center gap-1">
                            Book a Free Consultation <ArrowRight size={16} />
                        </Link>
                    </div>
                </section>

                {/* Tag Filter */}
                <section className="py-8 sticky top-[var(--header-h)] z-30 bg-background/80 backdrop-blur-xl border-b border-[#001F3F]/[0.06] dark:border-white/[0.04]">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide">
                            {SOLUTION_TAGS.map(tag => (
                                <button
                                    key={tag.id}
                                    onClick={() => setActiveTag(tag.id)}
                                    className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeTag === tag.id
                                            ? 'bg-[#FFD700] text-[#050A14] shadow-lg shadow-[#FFD700]/20'
                                            : 'bg-white/[0.04] dark:bg-white/[0.04] text-muted-foreground hover:bg-white/[0.08] dark:hover:bg-white/[0.08] border border-[#001F3F]/[0.08] dark:border-white/[0.06]'
                                        }`}
                                >
                                    {tag.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Solutions Grid */}
                <section className="py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            key={activeTag}
                        >
                            {filtered.map((solution) => {
                                const IconComp = iconMap[solution.icon] || Cloud;
                                return (
                                    <motion.div key={solution.id} variants={itemVariants}>
                                        <Link
                                            to={`/solutions/${solution.slug}`}
                                            className="group block h-full"
                                            onClick={() => UHAnalytics.trackClick('solution_card', solution.slug)}
                                        >
                                            <div className="glass-card p-6 h-full flex flex-col hover:border-[#FFD700]/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:hover:shadow-[#FFD700]/5">
                                                {/* Icon + Tags */}
                                                <div className="flex items-start justify-between mb-4">
                                                    <div className="bg-[#FFD700]/10 p-3 rounded-xl border border-[#FFD700]/20">
                                                        <IconComp size={24} className="text-[#FFD700]" />
                                                    </div>
                                                    <div className="flex gap-1.5 flex-wrap justify-end">
                                                        {solution.tags.slice(0, 2).map(tag => (
                                                            <span key={tag} className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/[0.06] dark:bg-white/[0.06] text-muted-foreground border border-[#001F3F]/[0.06] dark:border-white/[0.06]">
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Title */}
                                                <h3 className="text-lg font-bold text-foreground font-heading mb-2 group-hover:text-[#FFD700] transition-colors">
                                                    {solution.title}
                                                </h3>

                                                {/* Summary */}
                                                <p className="text-sm text-muted-foreground mb-4 flex-grow line-clamp-3">
                                                    {solution.summary}
                                                </p>

                                                {/* Outcomes preview */}
                                                <div className="space-y-1.5 mb-4">
                                                    {(solution.business_outcomes || solution.deliverables || []).slice(0, 3).map((item, i) => (
                                                        <div key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                                                            <CheckCircle size={12} className="text-[#06B6D4] mt-0.5 flex-shrink-0" />
                                                            <span className="line-clamp-1">{item}</span>
                                                        </div>
                                                    ))}
                                                </div>

                                                {/* CTA */}
                                                <div className="flex items-center text-sm font-semibold text-[#FFD700] group-hover:gap-3 gap-1.5 transition-all duration-300 mt-auto pt-4 border-t border-[#001F3F]/[0.06] dark:border-white/[0.06]">
                                                    Learn More <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </motion.div>

                        {filtered.length === 0 && (
                            <div className="text-center py-16">
                                <p className="text-muted-foreground text-lg">No solutions found for this filter.</p>
                                <button onClick={() => setActiveTag('all')} className="text-[#FFD700] font-semibold mt-2 hover:underline">
                                    View all solutions
                                </button>
                            </div>
                        )}
                    </div>
                </section>

                {/* CTA Section */}
                <section className="relative py-20 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700] to-[#F0C800]" />
                    <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                        <AnimatedContent type="text">
                            <h2 className="text-3xl md:text-4xl font-bold text-[#050A14] mb-4 font-heading">
                                Ready to Transform Your Business?
                            </h2>
                            <p className="text-lg text-[#050A14]/70 mb-8 max-w-2xl mx-auto">
                                Schedule a free consultation with our experts. No pressure, no jargon — just solutions that work.
                            </p>
                            <Button asChild className="bg-[#050A14] hover:bg-[#0A1228] text-white font-semibold text-lg px-10 py-6 rounded-full">
                                <Link to="/book-demo">
                                    Book Free Consultation <ArrowRight className="ml-2" size={20} />
                                </Link>
                            </Button>
                        </AnimatedContent>
                    </div>
                </section>
            </div>
        </>
    );
};

export default SolutionsPage;