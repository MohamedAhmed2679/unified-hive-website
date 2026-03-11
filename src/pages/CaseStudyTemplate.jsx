import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CaseStudyTemplate = () => {
    const { slug } = useParams();

    // Mock Data
    const caseStudies = {
        'fintech-scale': {
            title: "Scaling Fintech Infrastructure for 10M Users",
            client: "PayFlow Inc.",
            industry: "Financial Services",
            challenge: "Legacy on-prem systems unable to handle 300% user growth.",
            approach: "Migrated to AWS microservices architecture with Kubernetes orchestration.",
            stack: ["AWS", "Kubernetes", "Terraform", "PostgreSQL"],
            outcomes: [
                "99.99% Availability achieved",
                "40% Reduction in operational costs",
                "Deployment time reduced from 2 days to 1 hour"
            ],
            quote: "Unifiedhive didn't just move us to the cloud; they fundamentally reimagined how we deliver value to our customers.",
            author: "Alex Rivera, CTO"
        },
        'healthcare-security': {
            title: "Zero Trust Implementation for Healthcare Provider",
            client: "MediCare Plus",
            industry: "Healthcare",
            challenge: "Need for HIPAA compliance while enabling remote work for 500+ staff.",
            approach: "Implemented Zero Trust Network Access (ZTNA) and comprehensive endpoint protection.",
            stack: ["Cloudflare Access", "SentinelOne", "Okta"],
            outcomes: [
                "100% HIPAA Compliance Audit Pass",
                "Zero reported breaches in 12 months",
                "Seamless remote access for doctors"
            ],
            quote: "Security used to be a blocker. Now it's an enabler for our remote workforce.",
            author: "Dr. Sarah Jenkins, CIO"
        }
    };

    const study = caseStudies[slug];

    if (!study) {
        return <Navigate to="/" />; // Redirect if not found
    }

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": study.title,
        "description": `Case study for ${study.client}: ${study.challenge}`,
        "image": "https://horizons-cdn.hostinger.com/3d5f6b13-c880-47b3-8cfb-48f3d18da893/32e2f0ba808a982fc7905f7808be64c1.png",
        "author": {
            "@type": "Organization",
            "name": "Unifiedhive"
        },
        "publisher": {
            "@type": "Organization",
            "name": "Unifiedhive",
            "logo": {
                "@type": "ImageObject",
                "url": "https://horizons-cdn.hostinger.com/3d5f6b13-c880-47b3-8cfb-48f3d18da893/65a7b1a51649e52a56ad0d3c553b286e.png"
            }
        }
    };

    const breadcrumbData = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://unifiedhive.com/"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Case Studies",
                "item": "https://unifiedhive.com/#case-studies"
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": study.title,
                "item": `https://unifiedhive.com/case-studies/${slug}`
            }
        ]
    };

    return (
        <>
            <Helmet>
                <title>{study.title} | Case Study</title>
                <meta name="description" content={`Case study: How Unifiedhive helped ${study.client} achieve ${study.outcomes[0]} and more.`} />
                <meta property="og:title" content={`${study.title} | Unifiedhive Case Study`} />
                <meta property="og:description" content={`See how we helped ${study.client} solve key challenges.`} />
                <meta property="og:image" content="https://horizons-cdn.hostinger.com/3d5f6b13-c880-47b3-8cfb-48f3d18da893/32e2f0ba808a982fc7905f7808be64c1.png" />
                <script type="application/ld+json">
                    {JSON.stringify(structuredData)}
                </script>
                <script type="application/ld+json">
                    {JSON.stringify(breadcrumbData)}
                </script>
            </Helmet>

            <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[100] bg-white dark:bg-[#0A1228] text-foreground p-4 rounded-md shadow-lg dark:shadow-black/20 font-bold">
                Skip to main content
            </a>

            <article className="pt-24 pb-20 bg-white dark:bg-[#050A14]" id="main-content">
                {/* Header - Fixed colors */}
                <header className="bg-[#001F3F] text-white py-20 mb-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-[#FFD700] font-semibold mb-2 uppercase tracking-wide">{study.industry}</div>
                        <h1 className="text-3xl md:text-5xl font-bold font-heading max-w-4xl leading-tight mb-6">{study.title}</h1>
                        <p className="text-xl text-gray-200">Client: {study.client}</p>
                    </div>
                </header>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-12">
                        <div className="md:col-span-2 space-y-12">
                            <section aria-labelledby="challenge-heading">
                                <h2 id="challenge-heading" className="text-2xl font-bold text-foreground mb-4 font-heading">The Challenge</h2>
                                <p className="text-lg text-muted-foreground leading-relaxed">{study.challenge}</p>
                            </section>

                            <section aria-labelledby="approach-heading">
                                <h2 id="approach-heading" className="text-2xl font-bold text-foreground mb-4 font-heading">The Approach</h2>
                                <p className="text-lg text-muted-foreground leading-relaxed">{study.approach}</p>
                            </section>

                            <section className="bg-gray-50 dark:bg-[#0A1228] p-8 rounded-xl border border-gray-100 dark:border-white/[0.08]" aria-label="Client Testimonial">
                                <div className="flex gap-4 mb-4" aria-hidden="true">
                                    {[1, 2, 3, 4, 5].map(i => <CheckCircle key={i} size={24} className="text-[#FFD700]" />)}
                                </div>
                                <blockquote className="text-xl italic font-serif text-gray-700 dark:text-gray-200 mb-4">
                                    "{study.quote}"
                                </blockquote>
                                <cite className="font-semibold text-gray-800 dark:text-gray-100 not-italic">- {study.author}</cite>
                            </section>
                        </div>

                        <aside className="space-y-8">
                            <div className="bg-gray-50 dark:bg-[#0A1228] p-6 rounded-lg border border-gray-200 dark:border-white/[0.08]">
                                <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-4 font-heading uppercase text-sm tracking-wider">Tech Stack</h3>
                                <div className="flex flex-wrap gap-2">
                                    {study.stack.map(tech => (
                                        <span key={tech} className="bg-white dark:bg-white/[0.06] px-3 py-1 rounded-full text-sm border border-gray-200 dark:border-white/[0.08] text-gray-700 dark:text-gray-300">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-[#001F3F] text-white p-6 rounded-lg">
                                <h3 className="font-bold text-[#FFD700] mb-4 font-heading uppercase text-sm tracking-wider">Key Outcomes</h3>
                                <ul className="space-y-3">
                                    {study.outcomes.map((outcome, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                            <CheckCircle size={18} className="text-[#FFD700] mt-1 shrink-0" aria-hidden="true" />
                                            <span>{outcome}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </aside>
                    </div>
                </div>
            </article>
        </>
    );
};

export default CaseStudyTemplate;