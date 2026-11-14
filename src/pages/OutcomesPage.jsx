import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, DollarSign, ShieldCheck, Zap, Users, CheckCircle2 } from 'lucide-react';
import AnimatedContent from '@/components/AnimatedContent';
import { customers } from '@/components/Testimonials';

const figures = [
  { v: '40%', l: 'Average cost reduction', s: 'Across 12+ engagements' },
  { v: '99.9%', l: 'Uptime achieved', s: 'For managed clients' },
  { v: '50+', l: 'Enterprise projects', s: 'Zero Trust and DevOps' },
  { v: '<4hr', l: 'Incident response', s: 'Average resolution time' },
];

const outcomes = [
  { icon: DollarSign, title: 'Reduce cost', text: 'Licence right-sizing, cloud waste removal, automation and remote delivery bring IT running costs down.' },
  { icon: ShieldCheck, title: 'Reduce risk', text: 'Stronger identity, device, data and cloud security, with evidence you can show auditors and insurers.' },
  { icon: Zap, title: 'Reduce manual work', text: 'Onboarding, approvals, reporting and routine fixes run automatically instead of by hand.' },
  { icon: Users, title: 'Better employee experience', text: 'Fast, reliable support for staff in any country and time zone.' },
];

const measure = ['Baseline captured in the assessment', 'Success measures agreed before work starts', 'Progress reported monthly', 'Results reviewed in a quarterly business review'];

const OutcomesPage = () => (
  <>
    <Helmet>
      <title>Client Outcomes | Unified Hive</title>
      <meta name="description" content="The results Unified Hive delivers for growing organizations: lower IT costs, reduced risk, less manual work and better support for employees worldwide." />
      <link rel="canonical" href="https://www.unifiedhive.com/outcomes" />
    </Helmet>

    <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-center">
      <div className="max-w-4xl mx-auto">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#001F3F]/[0.1] dark:border-white/[0.08] text-xs font-medium text-muted-foreground tracking-wider uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4]" /> Client outcomes
        </span>
        <h1 className="mt-6 text-4xl md:text-6xl font-extrabold font-heading text-foreground leading-tight">
          Measured results, <span className="text-gradient">not promises</span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          We agree what success looks like before we start, and report against it until it's delivered.
        </p>
      </div>
    </section>

    <section className="pb-20 px-4 sm:px-6 lg:px-8">
      <ul className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
        {figures.map(({ v, l, s }) => (
          <li key={l} className="p-6 rounded-2xl bg-white dark:bg-white/[0.03] border border-[#001F3F]/[0.08] dark:border-[#06B6D4]/[0.14]">
            <span className="block text-4xl md:text-5xl font-extrabold font-heading text-gradient">{v}</span>
            <span className="block mt-3 font-semibold text-foreground">{l}</span>
            <span className="block mt-1 text-sm text-muted-foreground">{s}</span>
          </li>
        ))}
      </ul>
    </section>

    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#121519] border-y border-white/[0.06]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold font-heading text-foreground text-center">The four outcomes we work toward</h2>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {outcomes.map(({ icon: Icon, title, text }) => (
            <div key={title} className="p-6 rounded-2xl border border-white/[0.08]">
              <Icon className="w-6 h-6 text-[#FFD700]" aria-hidden="true" />
              <h3 className="mt-4 font-bold font-heading text-foreground">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
        <AnimatedContent type="text">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-foreground">How we measure results</h2>
          <p className="mt-4 text-muted-foreground">Every engagement starts from a measured baseline, so improvements are real numbers from your own environment.</p>
          <ul className="mt-6 space-y-3">
            {measure.map((m) => <li key={m} className="flex gap-3 text-foreground"><CheckCircle2 className="w-5 h-5 flex-none text-[#06B6D4]" aria-hidden="true" />{m}</li>)}
          </ul>
        </AnimatedContent>
        <div>
          <h2 className="text-2xl font-bold font-heading text-foreground">Organizations we support</h2>
          <p className="mt-2 text-sm text-muted-foreground">Detailed case studies are published once each client approves them.</p>
          <ul className="mt-6 grid sm:grid-cols-2 gap-4">
            {customers.map((c) => (
              <li key={c.name}>
                <a href={c.url} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between p-5 rounded-xl bg-white dark:bg-white/[0.03] border border-[#001F3F]/[0.08] dark:border-white/[0.08] hover:border-[#FFD700]/50 transition-colors">
                  <span><span className="block font-bold font-heading text-foreground">{c.name}</span><span className="block text-xs text-muted-foreground">{c.domain}</span></span>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-[#FFD700]" aria-hidden="true" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>

    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#FFD700] via-[#FFE34D] to-[#F0C800]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-extrabold font-heading text-[#050A14]">Ready to write your success story?</h2>
          <p className="mt-2 text-[#050A14]/75">Start with an assessment and a clear baseline</p>
        </div>
        <Button asChild className="bg-[#050A14] text-white hover:bg-[#121519] rounded-full px-8 py-6 text-base"><Link to="/book-demo">Get your IT roadmap</Link></Button>
      </div>
    </section>
  </>
);

export default OutcomesPage;
