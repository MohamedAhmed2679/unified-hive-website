import React from 'react';
import { Helmet } from 'react-helmet';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import AnimatedContent from '@/components/AnimatedContent';
import BookingEmbed from '@/components/BookingEmbed';
import {
    Cloud, Shield, Cog, Eye, Database, Users, RefreshCw, ArrowRight, ArrowLeft,
    CheckCircle, Monitor, Smartphone, PenTool, Rocket, PhoneCall, ShieldCheck, Zap,
    Library, BarChart3, FolderLock, Settings, ArrowRightLeft, LayoutGrid
} from 'lucide-react';
import { allSolutions } from '@/data/solutionsData';

const iconMap = {
    Cloud, Shield, Cog, Eye, Database, Users, RefreshCw, Monitor, Smartphone, PenTool,
    Rocket, PhoneCall, ShieldCheck, Zap, Library, BarChart3, FolderLock, Settings, ArrowRightLeft, LayoutGrid
};

const SolutionTemplate = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const solution = allSolutions.find(s => s.slug === slug);

    if (!solution) {
        return (
            <div className="pt-20 min-h-screen flex flex-col items-center justify-center">
                <h1 className="text-3xl font-bold text-foreground mb-4 font-heading">Solution Not Found</h1>
                <p className="text-muted-foreground mb-6">The solution you're looking for doesn't exist.</p>
                <Button asChild className="btn-premium">
                    <Link to="/solutions">
                        ← Back to Solutions
                    </Link>
                </Button>
            </div>
        );
    }

    const IconComp = iconMap[solution.icon] || Cloud;
    const relatedSolutions = (solution.related_ids || [])
        .map(id => allSolutions.find(s => s.id === id))
        .filter(Boolean);

    return (
        <>
            <Helmet>
                <title>{solution.title} | Unified Hive Consulting</title>
                <meta name="description" content={solution.summary} />
                <meta property="og:title" content={`${solution.title} | Unified Hive Consulting`} />
                <meta property="og:description" content={solution.summary} />
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Service",
                        "serviceType": solution.title,
                        "provider": {
                            "@type": "Organization",
                            "name": "Unified Hive",
                            "url": "https://unifiedhive.com"
                        },
                        "description": solution.summary,
                        "areaServed": {
                            "@type": "Country",
                            "name": "United States"
                        }
                    })}
                </script>
            </Helmet>

            <div className="pt-20">
                {/* Hero */}
                <section className="relative py-20 md:py-28 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#050A14] via-[#0A1228] to-[#050A14] dark:opacity-100 opacity-0 pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-br from-white via-[#F8FAFC] to-white dark:opacity-0 opacity-100 pointer-events-none" />

                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <AnimatedContent type="text">
                            {/* Back link */}
                            <button onClick={() => navigate('/solutions')} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-[#FFD700] transition-colors mb-8">
                                <ArrowLeft size={16} /> Back to Solutions
                            </button>

                            <div className="flex items-center gap-4 mb-6">
                                <div className="bg-[#FFD700]/10 p-4 rounded-2xl border border-[#FFD700]/20">
                                    <IconComp size={32} className="text-[#FFD700]" />
                                </div>
                                <div className="flex gap-2 flex-wrap">
                                    {solution.tags.map(tag => (
                                        <span key={tag} className="text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-white/[0.06] dark:bg-white/[0.06] text-muted-foreground border border-[#001F3F]/[0.06] dark:border-white/[0.06]">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground font-heading mb-4">
                                {solution.title}
                            </h1>
                            {solution.subtitle && (
                                <p className="text-xl md:text-2xl text-[#FFD700] font-medium mb-6 font-heading">{solution.subtitle}</p>
                            )}
                            <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">{solution.summary}</p>

                            <div className="flex flex-col sm:flex-row gap-4 mt-10">
                                <Button asChild className="btn-premium text-base px-8 py-6 rounded-full">
                                    <Link to="/book-demo">
                                        Book Free Consultation <ArrowRight className="ml-2" size={18} />
                                    </Link>
                                </Button>
                                <Button asChild variant="outline" className="bg-transparent border border-[#001F3F]/[0.15] dark:border-white/[0.1] text-foreground hover:bg-[#001F3F]/[0.04] dark:hover:bg-white/[0.04] text-base px-8 py-6 rounded-full">
                                    <Link to="/contact">
                                        Contact Us
                                    </Link>
                                </Button>
                            </div>
                        </AnimatedContent>
                    </div>
                </section>

                {/* Who It's For */}
                {solution.audience && solution.audience.length > 0 && (
                    <section className="py-12 border-y border-[#001F3F]/[0.06] dark:border-white/[0.04]">
                        <div className="max-w-5xl mx-auto px-4">
                            <div className="flex flex-wrap items-center gap-3">
                                <span className="text-xs font-semibold uppercase tracking-wider text-[#FFD700]">Who it's for:</span>
                                {solution.audience.map((a, i) => (
                                    <span key={i} className="text-sm text-muted-foreground px-3 py-1 rounded-full bg-white/[0.04] dark:bg-white/[0.04] border border-[#001F3F]/[0.06] dark:border-white/[0.06]">
                                        {a}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Features */}
                {solution.features && solution.features.length > 0 && (
                    <section className="py-20">
                        <div className="max-w-6xl mx-auto px-4">
                            <AnimatedContent type="text">
                                <h2 className="text-3xl font-bold text-foreground font-heading mb-12 text-center">
                                    What's Included
                                </h2>
                            </AnimatedContent>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                                {solution.features.map((feature, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.05 }}
                                        className="glass-card p-5 flex items-start gap-3"
                                    >
                                        <CheckCircle size={18} className="text-[#06B6D4] mt-0.5 flex-shrink-0" />
                                        <span className="text-sm text-foreground/80">{feature}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Process Steps */}
                {solution.process_steps && solution.process_steps.length > 0 && (
                    <section className="py-20 border-y border-[#001F3F]/[0.06] dark:border-white/[0.04]">
                        <div className="max-w-5xl mx-auto px-4">
                            <AnimatedContent type="text">
                                <h2 className="text-3xl font-bold text-foreground font-heading mb-12 text-center">
                                    How It Works
                                </h2>
                            </AnimatedContent>
                            <div className="space-y-6">
                                {solution.process_steps.map((step, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -30 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="flex gap-6 items-start"
                                    >
                                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/20 flex items-center justify-center">
                                            <span className="font-bold text-[#FFD700] font-heading text-lg">{i + 1}</span>
                                        </div>
                                        <div className="glass-card p-5 flex-1">
                                            <h3 className="font-bold text-foreground font-heading mb-1">{step.step}</h3>
                                            <p className="text-sm text-muted-foreground">{step.description}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Deliverables + Outcomes */}
                <section className="py-20">
                    <div className="max-w-6xl mx-auto px-4">
                        <div className="grid lg:grid-cols-2 gap-8">
                            {/* Deliverables */}
                            {solution.deliverables && solution.deliverables.length > 0 && (
                                <AnimatedContent type="fade">
                                    <div className="glass-card p-8 h-full">
                                        <h2 className="text-2xl font-bold text-foreground font-heading mb-6">Key Deliverables</h2>
                                        <ul className="space-y-3">
                                            {solution.deliverables.map((item, i) => (
                                                <li key={i} className="flex items-start gap-3">
                                                    <CheckCircle size={18} className="text-[#FFD700] mt-0.5 flex-shrink-0" />
                                                    <span className="text-sm text-foreground/80">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </AnimatedContent>
                            )}

                            {/* Outcomes */}
                            {(solution.business_outcomes || []).length > 0 && (
                                <AnimatedContent type="fade" delay={0.2}>
                                    <div className="bg-gradient-to-br from-[#001F3F] to-[#003366] rounded-xl p-8 text-white h-full">
                                        <h2 className="text-2xl font-bold mb-6 font-heading">Business Outcomes</h2>
                                        <ul className="space-y-3">
                                            {solution.business_outcomes.map((item, i) => (
                                                <li key={i} className="flex items-start gap-3">
                                                    <ArrowRight size={18} className="text-[#FFD700] mt-0.5 flex-shrink-0" />
                                                    <span className="text-sm">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </AnimatedContent>
                            )}
                        </div>
                    </div>
                </section>

                {/* Related Solutions */}
                {relatedSolutions.length > 0 && (
                    <section className="py-16 border-t border-[#001F3F]/[0.06] dark:border-white/[0.04]">
                        <div className="max-w-6xl mx-auto px-4">
                            <h2 className="text-2xl font-bold text-foreground font-heading mb-8 text-center">Related Solutions</h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                                {relatedSolutions.slice(0, 3).map(related => {
                                    const RelIcon = iconMap[related.icon] || Cloud;
                                    return (
                                        <Link key={related.id} to={`/solutions/${related.slug}`} className="glass-card p-5 flex items-start gap-4 hover:border-[#FFD700]/30 transition-all duration-300 group">
                                            <div className="bg-[#FFD700]/10 p-2.5 rounded-lg">
                                                <RelIcon size={20} className="text-[#FFD700]" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-foreground font-heading group-hover:text-[#FFD700] transition-colors text-sm">{related.title}</h3>
                                                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{related.summary}</p>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </section>
                )}

                {/* Booking CTA */}
                <section className="py-20 border-t border-[#001F3F]/[0.06] dark:border-white/[0.04]">
                    <div className="max-w-3xl mx-auto px-4 text-center">
                        <AnimatedContent type="text">
                            <h2 className="text-3xl font-bold text-foreground font-heading mb-4">
                                Ready to Get Started?
                            </h2>
                            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                                Book a free consultation and let's discuss how this solution can transform your business.
                            </p>
                        </AnimatedContent>
                        <BookingEmbed mode="button" />
                    </div>
                </section>
            </div>
        </>
    );
};

export default SolutionTemplate;