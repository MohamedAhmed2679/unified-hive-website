import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Shield, Zap, TrendingUp, ArrowRight, ChevronDown, Facebook, Instagram, Twitter, Youtube, Linkedin, CheckCircle } from 'lucide-react';
import AnimatedContent from '@/components/AnimatedContent';
import { UHAnalytics } from '@/lib/analytics';
import { Switch } from "@/components/ui/switch";
import TrustSignals from '@/components/TrustSignals';
import Testimonials from '@/components/Testimonials';

/* ── Animated Counter ── */
const AnimatedCounter = ({ value, suffix = '', prefix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const numericValue = parseInt(value.replace(/[^0-9]/g, ''));

  useEffect(() => {
    if (!inView || isNaN(numericValue)) return;
    let start = 0;
    const duration = 2000;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * numericValue));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, numericValue]);

  return <span ref={ref}>{prefix}{inView ? count : 0}{suffix}</span>;
};

/* ── Pricing Card ── */
const PricingCard = ({ plan, billingCycle, featured }) => (
  <div className={`glass-card p-6 md:p-8 flex flex-col h-full transition-all duration-500 relative group w-full ${featured ? 'ring-1 ring-[#FFD700]/30' : ''}`}>
    <div className="absolute top-4 left-4 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider bg-[#001F3F]/[0.04] dark:bg-white/[0.06] text-[#001F3F]/50 dark:text-white/50 border border-[#001F3F]/[0.08] dark:border-white/[0.06]">
      Customizable
    </div>
    {plan.isPopular && (
      <div className="absolute top-4 right-4 bg-gradient-to-r from-[#FFD700] to-[#F0C800] text-[#050A14] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
        Most Popular
      </div>
    )}

    <h3 className="text-xl font-bold text-foreground font-heading mb-1 mt-8 md:mt-6">{plan.name}</h3>
    <p className="text-sm text-muted-foreground mb-6">{plan.idealFor}</p>

    <div className="mb-6">
      <span className="text-3xl font-extrabold text-foreground font-heading">{plan.price}</span>
      {billingCycle === 'annual' && plan.price.includes('$') && (
        <span className="block text-xs text-cyan font-semibold mt-1">Billed annually (Save 20%)</span>
      )}
    </div>

    <div className="flex-1 mb-8">
      <h4 className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-[0.15em]">Key Benefits</h4>
      <ul className="space-y-3">
        {plan.benefits.map((benefit, i) => (
          <li key={i} className="flex items-start text-sm text-muted-foreground">
            <CheckCircle size={15} className="text-[#06B6D4] mr-2.5 mt-0.5 flex-shrink-0" />
            <span className="flex-1">{benefit}</span>
          </li>
        ))}
      </ul>
    </div>

      <Button
        asChild
        className={`w-full font-semibold py-6 rounded-lg text-base transition-all duration-300 ${featured ? 'btn-premium' : 'bg-[#001F3F]/[0.06] dark:bg-white/[0.06] hover:bg-[#001F3F]/[0.1] dark:hover:bg-white/[0.1] text-[#001F3F] dark:text-white border border-[#001F3F]/[0.1] dark:border-white/[0.08] hover:border-[#001F3F]/[0.2] dark:hover:border-white/[0.15]'}`}
        onClick={() => UHAnalytics.trackClick(plan.ctaText, `pricing_${plan.name}`)}
      >
        <Link to={plan.ctaLink} className="block w-full mt-auto">
          {plan.ctaText}
        </Link>
      </Button>
  </div>
);

const HomePage = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');

  const stats = [
    { value: '40', suffix: '%', label: 'Cost Reduction' },
    { value: '99', suffix: '.9%', label: 'Uptime SLA' },
    { value: '10', suffix: 'x', label: 'Faster Deploy' },
    { value: '200', suffix: '+', label: 'Projects Done' },
  ];

  const pricingPlans = [
    { name: "Free Consulting", idealFor: "Initial discovery and audit.", price: "Free", benefits: ["30-min Infrastructure Audit", "High-level Recommendations", "Security Posture Check", "Cost Savings Estimate"], ctaText: "Book Demo", ctaLink: "/book-demo" },
    { name: "Free Migration", idealFor: "Migrate to Microsoft 365 at no cost.", price: "Free", benefits: ["Email & Calendar Migration", "OneDrive/SharePoint File Transfer", "DNS Cutover & Domain Setup", "Post-Migration Validation", "Team Onboarding Session"], ctaText: "Start Migration", ctaLink: "/contact?plan=Free+Migration" },
    { name: "Individuals", idealFor: "Consultants and freelancers.", price: "$700/mo", benefits: ["Access to Resource Library", "Community Access", "1 Hour Expert Consultation/mo", "Basic Tool Access"], ctaText: "Join Now", ctaLink: "/book-demo" },
    { name: "Startups", idealFor: "Ideal for early-stage companies.", price: "$1,000/mo", benefits: ["Cloud Architecture Review", "Basic CI/CD Setup", "Security Essentials", "Email Support", "Monthly Strategy Call"], ctaText: "Start Building", ctaLink: "/contact?plan=Startups" },
    { name: "SMB", idealFor: "Growing businesses needing robust IT.", price: "$2,500/mo", benefits: ["Advanced Security Monitoring", "Full DevOps Pipeline", "Compliance Audit (SOC2)", "Slack & Email Support", "Bi-weekly Strategy Calls", "Cost Optimization"], ctaText: "Scale Up", ctaLink: "/contact?plan=SMB", isPopular: true },
    { name: "Enterprise", idealFor: "Large organizations with complex needs.", price: "Contact for quote", benefits: ["Zero Trust Implementation", "24/7 Dedicated Support", "Custom SLA & Uptime Guarantees", "On-prem to Cloud Migration", "Dedicated Solutions Architect", "Quarterly Business Reviews"], ctaText: "Contact Sales", ctaLink: "/contact?plan=Enterprise" },
  ];

  const faqs = [
    { q: "Can I switch plans later?", a: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect in the next billing cycle." },
    { q: "Do you offer custom consulting?", a: "Absolutely. Our Enterprise plan is fully customizable, and we also offer project-based consulting rates." },
    { q: "What is your cancellation policy?", a: "Monthly plans can be cancelled with 30 days notice. Annual plans are non-refundable but can be transferred." },
  ];

  const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } };

  return (
    <>
      <Helmet>
        <title>Unified Hive | Intelligent IT Solutions & Zero Trust Security Consulting</title>
        <meta name="description" content="Unified Hive engineers resilient IT foundations. From Microsoft 365 migrations to Zero Trust cybersecurity architectures and automated DevOps, we help SMBs and Enterprises scale securely and slash cloud costs." />
        <script type="application/ld+json">
          {JSON.stringify({ 
            "@context": "https://schema.org", 
            "@type": ["Organization", "LocalBusiness", "ITService"], 
            "name": "Unified Hive", 
            "url": "https://unifiedhive.com", 
            "logo": "https://horizons-cdn.hostinger.com/3d5f6b13-c880-47b3-8cfb-48f3d18da893/65a7b1a51649e52a56ad0d3c553b286e.png",
            "description": "Enterprise IT Consulting providing Zero Trust Security, Cloud Migrations, and DevOps automation.",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "700 A.D. Mosley Street",
              "addressLocality": "Ferris",
              "addressRegion": "TX",
              "postalCode": "75125",
              "addressCountry": "US"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "email": "info@unifiedhive.com",
              "contactType": "customer service"
            },
            "sameAs": [
              "https://www.linkedin.com/company/unifiedhive",
              "https://x.com/UnifiedHive",
              "https://www.youtube.com/channel/UCuOzD6hbJpcaRqgswo37CzA",
              "https://www.facebook.com/profile.php?id=61585777135146",
              "https://www.instagram.com/unifiedhive"
            ]
          })}
        </script>
      </Helmet>

      {/* ──── Hero Section ──── */}
      <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden pt-24 md:pt-20 pb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050A14] via-[#050A14] to-[#0A1228] dark:opacity-100 opacity-0 pointer-events-none z-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-[#F1F5F9] dark:opacity-0 opacity-100 pointer-events-none z-0" />

        <motion.div
          className="relative z-10 max-w-5xl mx-auto flex flex-col items-center w-full"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="mb-4">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#001F3F]/[0.1] dark:border-white/[0.08] bg-[#001F3F]/[0.03] dark:bg-white/[0.03] text-xs font-medium text-muted-foreground tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4] animate-pulse" />
              Intelligent IT Operations
            </span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-display font-heading text-foreground mt-4 mb-6 px-2">
            Secure Your Future with{' '}
            <span className="text-gradient">Intelligent IT</span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed mb-10">
            We reduce operational costs by <span className="font-semibold text-foreground">40%</span> and eliminate downtime risks with Zero Trust security and DevOps automation.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto mb-12">
            <Link to="/book-demo" className="w-full sm:w-auto">
              <Button className="btn-premium text-base px-8 py-6 w-full sm:w-auto gap-2" onClick={() => UHAnalytics.trackClick('book_demo', 'hero_cta')}>
                Book Demo <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/solutions" className="w-full sm:w-auto">
              <Button variant="outline" className="bg-transparent border border-[#001F3F]/[0.15] dark:border-white/[0.1] text-foreground hover:bg-[#001F3F]/[0.04] dark:hover:bg-white/[0.04] text-base px-8 py-6 rounded-full w-full sm:w-auto transition-all duration-300" onClick={() => UHAnalytics.trackClick('explore_solutions', 'hero_cta')}>
                Explore Solutions
              </Button>
            </Link>
          </motion.div>

          <motion.div variants={itemVariants} className="flex gap-5 sm:gap-8 justify-center items-center flex-wrap">
            {[
              { icon: Linkedin, url: "https://www.linkedin.com/company/unifiedhive", label: "LinkedIn" },
              { icon: Twitter, url: "https://x.com/UnifiedHive", label: "Twitter" },
              { icon: Youtube, url: "https://www.youtube.com/channel/UCuOzD6hbJpcaRqgswo37CzA", label: "YouTube" },
              { icon: Facebook, url: "https://www.facebook.com/profile.php?id=61585777135146", label: "Facebook" },
              { icon: Instagram, url: "https://www.instagram.com/unifiedhive", label: "Instagram" },
            ].map(({ icon: Icon, url, label }) => (
              <a key={label} href={url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-[#FFD700] transition-all duration-300 hover:scale-110 p-2 tap-target" aria-label={label}>
                <Icon size={22} />
              </a>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hidden md:block"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={28} />
        </motion.div>
      </section>

      {/* ──── Stats Bar ──── */}
      <section className="relative py-16 border-y border-white/[0.04] dark:border-white/[0.04]">
        <div className="absolute inset-0 bg-[#050A14]/50 dark:bg-[#050A14]/50 backdrop-blur-sm opacity-0 dark:opacity-100" />
        <div className="absolute inset-0 bg-white/50 backdrop-blur-sm dark:opacity-0 opacity-100" />
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <div className="text-4xl md:text-5xl font-extrabold font-heading text-gradient mb-2">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-sm text-muted-foreground font-medium tracking-wider uppercase">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ──── Trust Signals ──── */}
      <TrustSignals />

      {/* ──── Value Props ──── */}
      <section className="relative py-20 md:py-28">
        <div className="absolute inset-0 bg-[#0A1228]/50 dark:bg-[#0A1228]/50 backdrop-blur-sm opacity-0 dark:opacity-100" />
        <div className="absolute inset-0 bg-[#F1F5F9]/70 backdrop-blur-sm dark:opacity-0 opacity-100" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="text-display-sm font-heading text-foreground mb-4">Why Unifiedhive?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">We don't just fix problems — we re-engineer your IT foundation for growth.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              { icon: Shield, title: "Zero Trust Security", desc: "Never trust, always verify. Rigorous security controls that protect your data without slowing your team.", color: "from-[#06B6D4] to-[#0891B2]" },
              { icon: Zap, title: "DevOps Automation", desc: "Stop manual toil. Self-healing infrastructure and CI/CD pipelines that deploy code 10x faster.", color: "from-[#FFD700] to-[#F0C800]" },
              { icon: TrendingUp, title: "Cost Optimization", desc: "Cut cloud waste. Our FinOps strategies reduce AWS/Azure spend by 30-50% within the first quarter.", color: "from-[#8B5CF6] to-[#A78BFA]" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
              >
                <div className="glass-card p-7 md:p-8 h-full group">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon size={24} className="text-white" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-foreground font-heading mb-3">{item.title}</h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 md:mt-24" />
        </div>
      </section>

      {/* ──── Testimonials ──── */}
      <Testimonials />

      {/* ──── Pricing ──── */}
      <section className="relative py-20 md:py-28 overflow-hidden" id="pricing">
        <div className="absolute inset-0 bg-[#050A14]/50 dark:bg-[#050A14]/50 backdrop-blur-sm opacity-0 dark:opacity-100 pointer-events-none z-0" />
        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm dark:opacity-0 opacity-100 pointer-events-none z-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="text-display-sm font-heading text-foreground mb-4">Transparent Pricing</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">Choose the plan that fits your stage of growth.</p>

            <div className="flex items-center justify-center gap-3">
              <span className={`text-sm font-semibold ${billingCycle === 'monthly' ? 'text-foreground' : 'text-muted-foreground'}`}>Monthly</span>
              <Switch
                checked={billingCycle === 'annual'}
                onCheckedChange={(checked) => setBillingCycle(checked ? 'annual' : 'monthly')}
                className="data-[state=checked]:bg-[#06B6D4] data-[state=unchecked]:bg-white/10 dark:data-[state=unchecked]:bg-white/10"
              />
              <span className={`text-sm font-semibold ${billingCycle === 'annual' ? 'text-foreground' : 'text-muted-foreground'}`}>Annual</span>
              {billingCycle === 'annual' && (
                <motion.span initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="bg-[#06B6D4]/10 text-[#06B6D4] text-xs font-bold px-2.5 py-1 rounded-full border border-[#06B6D4]/20">
                  Save 20%
                </motion.span>
              )}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {pricingPlans.map((plan, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-30px' }} transition={{ delay: i * 0.08, duration: 0.5 }}>
                <PricingCard plan={plan} billingCycle={billingCycle} featured={plan.isPopular} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ──── FAQ ──── */}
      <section className="relative py-20 md:py-28">
        <div className="absolute inset-0 bg-[#0A1228]/50 dark:bg-[#0A1228]/50 backdrop-blur-sm opacity-0 dark:opacity-100" />
        <div className="absolute inset-0 bg-[#F1F5F9]/70 backdrop-blur-sm dark:opacity-0 opacity-100" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="text-display-sm font-heading text-foreground mb-4">Frequently Asked Questions</h2>
          </motion.div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.details key={i} className="glass-card overflow-hidden group" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}>
                <summary className="font-bold text-foreground cursor-pointer flex justify-between items-center font-heading list-none text-left p-6">
                  <span className="pr-4">{faq.q}</span>
                  <ChevronDown className="group-open:rotate-180 transition-transform duration-300 text-muted-foreground flex-shrink-0" size={18} />
                </summary>
                <div className="px-6 pb-6 -mt-2">
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed">{faq.a}</p>
                </div>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* ──── CTA Strip ──── */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700] via-[#F0C800] to-[#FFD700]" />
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left relative z-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#050A14] font-heading mb-2">Ready to modernize your IT?</h2>
            <p className="text-[#050A14]/70 font-medium">Schedule your free support call today.</p>
          </div>
          <Button asChild className="w-full md:w-auto bg-[#050A14] text-white hover:bg-[#0A1228] text-lg px-8 py-6 rounded-full shadow-2xl shadow-black/30 transition-all duration-300 hover:-translate-y-1 font-semibold" onClick={() => UHAnalytics.trackClick('book_demo', 'footer_cta')}>
            <Link to="/book-demo">
              Book Demo
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
};

export default HomePage;