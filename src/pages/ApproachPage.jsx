import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import AnimatedContent from '@/components/AnimatedContent';
import { Button } from '@/components/ui/button';
import {
  Search, PenTool, Rocket, TrendingUp, ArrowRight, FileText, CheckCircle2, ShieldCheck,
  ClipboardList, Users, Gauge, BookOpen,
} from 'lucide-react';

const phases = [
  {
    n: 'Phase 1', title: 'Assess', icon: Search, time: 'Typically 2–4 days',
    text: 'We review your Microsoft 365 tenant, identities, devices, data exposure, licensing and support workload against Microsoft and CIS baselines, then interview the people who run and use it.',
    out: ['Tenant and security posture report', 'Licensing and cost findings', 'Prioritized risk register'],
  },
  {
    n: 'Phase 2', title: 'Architect', icon: PenTool, time: 'Agreed with you',
    text: 'We turn the findings into a target design and a 30/60/90-day roadmap with scope, owners, dependencies, cost and a rollback plan for every change that touches users.',
    out: ['Target architecture', '30/60/90-day roadmap', 'Fixed-scope proposal'],
  },
  {
    n: 'Phase 3', title: 'Implement', icon: Rocket, time: 'Staged rollout',
    text: 'Changes go to a pilot group first, then roll out in batches with change notices to your staff. Every step is documented and tested before the next one starts.',
    out: ['Configured and tested controls', 'As-built documentation', 'User communications and training'],
  },
  {
    n: 'Phase 4', title: 'Improve', icon: TrendingUp, time: 'Ongoing',
    text: 'After go-live we monitor for configuration drift, review access and licensing every month, and bring a quarterly roadmap to keep your environment secure and cost-effective.',
    out: ['Monthly access and licence review', 'Drift and security alerts', 'Quarterly executive report'],
  },
];

const principles = [
  { icon: ShieldCheck, title: 'Security first', text: 'Least privilege, MFA and Zero Trust principles are the default, not an add-on.' },
  { icon: ClipboardList, title: 'Documented', text: 'You own the documentation, runbooks and configuration records for everything we build.' },
  { icon: Users, title: 'Senior-led', text: 'Engagements are led by senior engineers you can speak to directly.' },
  { icon: Gauge, title: 'Measured', text: 'Every engagement has agreed success measures that we report against.' },
];

const guides = [
  { slug: 'zero-trust-blueprint', title: 'Zero Trust Security Blueprint', type: 'Blueprint', text: 'A practical checklist for applying Zero Trust to identities, devices, apps and data in Microsoft 365.' },
  { slug: 'cloud-finops-playbook', title: 'Cloud FinOps Playbook', type: 'Playbook', text: 'Ways to reduce cloud spend without cutting performance, from right-sizing to licence clean-up.' },
  { slug: 'observability-maturity-model', title: 'Observability Maturity Model', type: 'Whitepaper', text: 'Assess your current monitoring and plan the path to full observability.' },
];

const ApproachPage = () => (
  <>
    <Helmet>
      <title>Our Approach & Resources | Unified Hive</title>
      <meta name="description" content="How Unified Hive delivers Microsoft 365, security and automation projects: Assess, Architect, Implement, Improve. Plus practical guides for IT leaders." />
      <link rel="canonical" href="https://www.unifiedhive.com/approach" />
    </Helmet>

    <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-center">
      <div className="max-w-4xl mx-auto">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#001F3F]/[0.1] dark:border-white/[0.08] text-xs font-medium text-muted-foreground tracking-wider uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4]" /> Approach & Resources
        </span>
        <h1 className="mt-6 text-4xl md:text-6xl font-extrabold font-heading text-foreground leading-tight">
          A proven delivery method, <span className="text-gradient">no surprises</span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Every engagement follows the same four phases, so you always know what happens next, what it costs and what you get at the end.
        </p>
      </div>
    </section>

    <section className="pb-20 px-4 sm:px-6 lg:px-8" aria-label="Delivery method">
      <ol className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {phases.map(({ n, title, icon: Icon, time, text, out }, i) => (
          <AnimatedContent key={title} type="fade" delay={i * 0.08}>
            <li className="h-full p-7 rounded-2xl bg-white dark:bg-white/[0.03] border border-[#001F3F]/[0.08] dark:border-[#06B6D4]/[0.14] flex flex-col">
              <div className="flex items-center justify-between">
                <span className="w-11 h-11 rounded-xl grid place-items-center bg-gradient-to-br from-[#FFD700] to-[#F0C800] text-[#050A14]"><Icon className="w-5 h-5" aria-hidden="true" /></span>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#06B6D4]">{n}</span>
              </div>
              <h2 className="mt-5 text-2xl font-bold font-heading text-foreground">{title}</h2>
              <p className="text-xs text-muted-foreground mt-1">{time}</p>
              <p className="mt-4 text-sm text-muted-foreground flex-1">{text}</p>
              <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-foreground">You receive</p>
              <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                {out.map((o) => <li key={o} className="flex gap-2"><CheckCircle2 className="w-4 h-4 mt-0.5 flex-none text-[#06B6D4]" aria-hidden="true" />{o}</li>)}
              </ul>
            </li>
          </AnimatedContent>
        ))}
      </ol>
    </section>

    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#121519] border-y border-white/[0.06]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold font-heading text-foreground text-center">How we work with you</h2>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {principles.map(({ icon: Icon, title, text }) => (
            <div key={title} className="p-6 rounded-2xl border border-white/[0.08]">
              <Icon className="w-6 h-6 text-[#FFD700]" aria-hidden="true" />
              <h3 className="mt-4 font-bold font-heading text-foreground">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section id="resources" className="py-20 px-4 sm:px-6 lg:px-8 scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block text-xs uppercase tracking-widest text-[#06B6D4] font-semibold mb-3">Resources</span>
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-foreground">Guides for IT leaders</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">Practical frameworks we use in our own engagements, free to read.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {guides.map(({ slug, title, type, text }) => (
            <Link key={slug} to={`/resources/${slug}`} className="group p-7 rounded-2xl bg-white dark:bg-white/[0.03] border border-[#001F3F]/[0.08] dark:border-white/[0.08] hover:border-[#FFD700]/50 transition-colors flex flex-col">
              <div className="flex items-center justify-between">
                <FileText className="w-7 h-7 text-[#FFD700]" aria-hidden="true" />
                <span className="text-xs font-semibold px-2 py-1 rounded bg-[#06B6D4]/15 text-[#06B6D4]">{type}</span>
              </div>
              <h3 className="mt-5 text-lg font-bold font-heading text-foreground">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground flex-1">{text}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-foreground">Read the guide <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" /></span>
            </Link>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link to="/blog" className="inline-flex items-center gap-2 text-[#06B6D4] hover:underline"><BookOpen className="w-4 h-4" aria-hidden="true" /> More articles on the blog</Link>
        </div>
      </div>
    </section>

    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#FFD700] via-[#FFE34D] to-[#F0C800]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-extrabold font-heading text-[#050A14]">Start with an assessment</h2>
          <p className="mt-2 text-[#050A14]/75">A 30-minute call to understand your environment and agree what Phase 1 should cover</p>
        </div>
        <Button asChild className="bg-[#050A14] text-white hover:bg-[#121519] rounded-full px-8 py-6 text-base"><Link to="/book-demo">Book an assessment</Link></Button>
      </div>
    </section>
  </>
);

export default ApproachPage;
