import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import AnimatedContent from '@/components/AnimatedContent';
import { Button } from '@/components/ui/button';
import {
  ArrowRight, Headphones, Bot, Users, Wrench, ShieldAlert, BookOpen, CheckCircle2,
  Mail, MessageSquare, Phone, Globe, LayoutGrid, KeyRound, Laptop, Wifi, UserPlus,
  Zap, BarChart3, Clock, DollarSign, ChevronDown,
} from 'lucide-react';

const flow = [
  { icon: Users, title: 'Employee', text: 'Asks for help by portal, email, Teams, phone or chat' },
  { icon: Bot, title: 'Self-service and Unified Hive Bot', text: 'Approved knowledge and structured intake' },
  { icon: Headphones, title: 'Tier 1', text: 'Common requests resolved remotely' },
  { icon: Wrench, title: 'Tier 2', text: 'Deeper troubleshooting across Microsoft 365, identity and devices' },
  { icon: ShieldAlert, title: 'Specialist', text: 'Security and cloud engineering' },
  { icon: CheckCircle2, title: 'Resolution', text: 'Confirmed with the employee' },
  { icon: BookOpen, title: 'Knowledge article or automation', text: 'So the same issue is faster next time' },
];

const audiences = [
  'Remote teams', 'Hybrid organizations', 'International businesses', 'SMBs', 'Mid-market organizations',
  'Enterprises', 'Organizations without 24/7 internal IT coverage', 'Employees across multiple countries',
  'Companies that need supplementary Tier 1 or Tier 2 support',
];

const outcomes = [
  { icon: DollarSign, color: 'from-[#FFD700] to-[#F0C800] text-[#050A14]', title: 'Reduce cost', text: 'Lower support overhead and less need for a large internal Tier 1 team.' },
  { icon: ShieldAlert, color: 'from-[#06B6D4] to-[#0891B2] text-white', title: 'Reduce risk', text: 'Security concerns go straight to specialists, and identity changes follow one standard process.' },
  { icon: Zap, color: 'from-[#A78BFA] to-[#7C3AED] text-white', title: 'Reduce manual work', text: 'Repetitive fixes, routing and account lifecycle steps are automated where it is safe to do so.' },
  { icon: Users, color: 'from-[#06B6D4] to-[#0891B2] text-white', title: 'Improve employee experience', text: 'Fast, reliable support wherever people work.' },
];

const channels = [
  { icon: Globe, label: 'Customer portal' }, { icon: Mail, label: 'Email' }, { icon: MessageSquare, label: 'Microsoft Teams' },
  { icon: Phone, label: 'Telephone' }, { icon: MessageSquare, label: 'Chat' }, { icon: Bot, label: 'Unified Hive Bot' },
];

const coverage = [
  { icon: Headphones, title: 'Tier 1 support', items: ['Sign-in problems and password self-service', 'Access requests', 'Outlook, Teams, SharePoint and OneDrive how-to and common faults', 'Software and application requests', 'Ticket intake, categorization and routing'] },
  { icon: Wrench, title: 'Tier 2 support', items: ['Problems Tier 1 could not resolve', 'Mail flow, sync and permission faults', 'Device and Intune issues', 'Network and VPN troubleshooting', 'Repeat incidents and root cause'] },
  { icon: LayoutGrid, title: 'Microsoft 365 support', items: ['Outlook and email', 'Teams, SharePoint and OneDrive', 'Licensing and billing questions'] },
  { icon: KeyRound, title: 'Identity and access', items: ['Sign-in and MFA', 'Group membership and access requests in Entra ID', 'We never ask for passwords or MFA codes'] },
  { icon: Laptop, title: 'Endpoint and devices', items: ['Device setup and Intune enrollment', 'Standardized provisioning', 'Remote remediation'] },
  { icon: Wifi, title: 'Remote employees', items: ['Home and travel connectivity', 'VPN', "Help in the employee's own working hours"] },
  { icon: UserPlus, title: 'Onboarding and offboarding', items: ['Accounts, licenses, groups and devices through one workflow', 'Departures handled the same way in reverse'] },
  { icon: ShieldAlert, title: 'Security escalations', items: ['Anything that looks like a security concern goes straight to specialists'] },
];

const reporting = [
  { title: 'Volume', items: ['Ticket volume', 'Ticket categories', 'Demand by department', 'Demand by geography'] },
  { title: 'Speed', items: ['First-response time', 'Resolution time', 'SLA attainment'] },
  { title: 'Quality', items: ['First-contact resolution', 'Repeat incidents', 'Escalation rate', 'Customer satisfaction'] },
  { title: 'Efficiency', items: ['Automation rate', 'Cost per ticket', 'Cost per supported user'] },
];

const faqs = [
  { q: 'Do you support employees outside the US?', a: 'Yes. Our team works remotely and supports clients across the globe in multiple time zones.' },
  { q: 'How quickly can support start?', a: 'Most engagements begin within 1–2 days of signing. We start with an assessment phase that typically takes 2–4 days, followed by implementation.' },
  { q: 'Can you work alongside our internal IT team?', a: 'Yes. We can act as supplementary Tier 1 or Tier 2 support and hand escalations to your team, or take them through to our specialists.' },
  { q: 'Will anyone ask for my password?', a: 'No. Unified Hive Bot and our technicians never ask for passwords, MFA codes or private keys.' },
];

const Section = ({ eyebrow, title, intro, children, band }) => (
  <section className={`py-20 px-4 sm:px-6 lg:px-8 ${band ? 'bg-[#121519] border-y border-white/[0.06]' : ''}`}>
    <div className="max-w-6xl mx-auto">
      <AnimatedContent type="text" className="text-center mb-12">
        {eyebrow && <span className="inline-block text-xs uppercase tracking-widest text-[#06B6D4] font-semibold mb-3">{eyebrow}</span>}
        <h2 className="text-3xl md:text-4xl font-bold text-foreground font-heading">{title}</h2>
        {intro && <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">{intro}</p>}
      </AnimatedContent>
      {children}
    </div>
  </section>
);

const Card = ({ children, className = '' }) => (
  <div className={`p-7 rounded-2xl bg-white dark:bg-white/[0.03] border border-[#001F3F]/[0.08] dark:border-[#06B6D4]/[0.12] ${className}`}>{children}</div>
);

const GlobalHelpDeskPage = () => (
  <>
    <Helmet>
      <title>Global Remote IT Help Desk | Unified Hive</title>
      <meta name="description" content="Enterprise-grade IT support without enterprise-sized overhead. Tier 1 and Tier 2 remote help desk for Microsoft 365, identity and devices, for teams in any country." />
      <link rel="canonical" href="https://www.unifiedhive.com/global-help-desk" />
      <script type="application/ld+json">{JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Service', name: 'Global Remote IT Help Desk',
        provider: { '@type': 'Organization', name: 'Unified Hive', url: 'https://www.unifiedhive.com', telephone: '+1 332 220 0017' },
        areaServed: 'Worldwide', serviceType: 'IT help desk and managed IT support',
      })}</script>
    </Helmet>

    {/* Hero */}
    <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-center">
      <div className="max-w-5xl mx-auto">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#001F3F]/[0.1] dark:border-white/[0.08] text-xs font-medium text-muted-foreground tracking-wider uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4]" /> Global Remote IT Help Desk
        </span>
        <h1 className="mt-6 text-4xl md:text-6xl font-extrabold font-heading text-foreground leading-tight">
          Enterprise-grade IT support <span className="text-gradient">without enterprise-sized overhead</span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Reduce IT operating costs while giving your employees fast, reliable support wherever they work.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="btn-premium text-base px-8 py-6">
            <Link to="/book-demo">Request an IT support assessment <ArrowRight className="w-4 h-4 ml-2" /></Link>
          </Button>
          <Button asChild variant="outline" className="bg-transparent border border-white/[0.1] text-foreground text-base px-8 py-6 rounded-full">
            <a href="#how-it-works">See how a request moves</a>
          </Button>
        </div>
      </div>

      <ol id="how-it-works" className="mt-16 max-w-3xl mx-auto text-left rounded-2xl bg-white dark:bg-white/[0.03] border border-[#001F3F]/[0.08] dark:border-[#06B6D4]/[0.14] divide-y divide-[#001F3F]/[0.06] dark:divide-white/[0.06] scroll-mt-24">
        {flow.map(({ icon: Icon, title, text }, i) => (
          <li key={title} className="flex items-center gap-4 px-6 py-4">
            <span className={`flex-none w-9 h-9 rounded-lg grid place-items-center ${i < 3 ? 'bg-[#FFD700]/15 text-[#FFD700]' : 'bg-[#06B6D4]/15 text-[#06B6D4]'}`}><Icon className="w-4 h-4" aria-hidden="true" /></span>
            <span><span className="block font-semibold text-foreground">{title}</span><span className="block text-sm text-muted-foreground">{text}</span></span>
          </li>
        ))}
      </ol>
    </section>

    <Section title="Who we support" intro="Teams that need dependable IT support without building a large internal desk" band>
      <ul className="flex flex-wrap justify-center gap-3">
        {audiences.map((a) => (
          <li key={a} className="px-5 py-2.5 rounded-full border border-[#001F3F]/[0.1] dark:border-white/[0.1] text-sm font-medium text-foreground">{a}</li>
        ))}
      </ul>
    </Section>

    <Section title="Business outcomes">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {outcomes.map(({ icon: Icon, color, title, text }) => (
          <Card key={title}>
            <span className={`w-12 h-12 rounded-xl grid place-items-center bg-gradient-to-br ${color} mb-5`}><Icon className="w-5 h-5" aria-hidden="true" /></span>
            <h3 className="text-lg font-bold font-heading text-foreground">{title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{text}</p>
          </Card>
        ))}
      </div>
    </Section>

    <Section title="Support channels" intro="Employees reach the desk the way they already work. Channels are confirmed per agreement" band>
      <ul className="flex flex-wrap justify-center gap-3">
        {channels.map(({ icon: Icon, label }) => (
          <li key={label} className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#001F3F]/[0.1] dark:border-white/[0.1] text-sm font-medium text-foreground">
            <Icon className="w-4 h-4 text-[#06B6D4]" aria-hidden="true" />{label}
          </li>
        ))}
      </ul>
    </Section>

    <Section title="What we cover" intro="Requests start at the lowest tier that can resolve them and move up with full notes">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {coverage.map(({ icon: Icon, title, items }) => (
          <Card key={title}>
            <Icon className="w-6 h-6 text-[#06B6D4] mb-4" aria-hidden="true" />
            <h3 className="font-bold font-heading text-foreground">{title}</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {items.map((it) => <li key={it} className="flex gap-2"><CheckCircle2 className="w-4 h-4 mt-0.5 flex-none text-[#06B6D4]" aria-hidden="true" />{it}</li>)}
            </ul>
          </Card>
        ))}
      </div>
    </Section>

    <Section title="Self-service and automation" intro="Every resolved ticket is a chance to write the article or build the automation that prevents the next one" band>
      <div className="grid md:grid-cols-2 gap-6">
        <Card><BookOpen className="w-6 h-6 text-[#FFD700] mb-4" aria-hidden="true" /><h3 className="font-bold font-heading text-foreground">Knowledge base and self-service</h3><p className="mt-2 text-sm text-muted-foreground">Approved knowledge articles, employee self-service for common requests, and knowledge recommendations during intake.</p></Card>
        <Card><Zap className="w-6 h-6 text-[#FFD700] mb-4" aria-hidden="true" /><h3 className="font-bold font-heading text-foreground">Help desk automation</h3><p className="mt-2 text-sm text-muted-foreground">Ticket categorization and summaries, automated routing and escalation, suggested resolutions for technicians and common issue remediation.</p></Card>
      </div>
    </Section>

    <Section title="SLA options and coverage" intro="Targets and hours are set with you during the assessment and written into your agreement">
      <div className="grid md:grid-cols-2 gap-6">
        <Card><Clock className="w-6 h-6 text-[#06B6D4] mb-4" aria-hidden="true" /><h3 className="font-bold font-heading text-foreground">SLA options</h3><p className="mt-2 text-sm text-muted-foreground">First-response and resolution targets by priority, custom SLA and uptime guarantees on the Enterprise plan, and SLA attainment reported every period.</p></Card>
        <Card><Globe className="w-6 h-6 text-[#06B6D4] mb-4" aria-hidden="true" /><h3 className="font-bold font-heading text-foreground">Service hours</h3><p className="mt-2 text-sm text-muted-foreground">Coverage across multiple time zones, 24/7 dedicated support on the Enterprise plan, and supplementary cover for your internal team.</p></Card>
      </div>
    </Section>

    <Section title="Reporting" intro="You see the same numbers we run the desk by" band>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {reporting.map(({ title, items }) => (
          <Card key={title}>
            <BarChart3 className="w-6 h-6 text-[#06B6D4] mb-4" aria-hidden="true" />
            <h3 className="font-bold font-heading text-foreground">{title}</h3>
            <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">{items.map((it) => <li key={it}>{it}</li>)}</ul>
          </Card>
        ))}
      </div>
    </Section>

    <Section title="Cost optimization" intro="We don't promise a percentage before an assessment. These are the levers we look at">
      <div className="grid md:grid-cols-2 gap-6">
        <Card><h3 className="font-bold font-heading text-foreground">People and process</h3><p className="mt-2 text-sm text-muted-foreground">Lower support overhead, a smaller internal Tier 1 team, better ticket routing, fewer escalations, and knowledge management with self-service.</p></Card>
        <Card><h3 className="font-bold font-heading text-foreground">Technology</h3><p className="mt-2 text-sm text-muted-foreground">Remote remediation, automated repetitive fixes, standardized onboarding and devices, automated identity administration, license optimization and preventive monitoring.</p></Card>
      </div>
      <div className="mt-10 text-center">
        <Button asChild className="btn-premium px-8 py-6"><Link to="/book-demo">Find your IT cost-saving opportunities</Link></Button>
      </div>
    </Section>

    <Section title="Frequently asked questions" band>
      <div className="max-w-3xl mx-auto space-y-3">
        {faqs.map(({ q, a }) => (
          <details key={q} className="group rounded-xl bg-white dark:bg-white/[0.03] border border-[#001F3F]/[0.08] dark:border-white/[0.08] px-6">
            <summary className="cursor-pointer list-none py-5 font-semibold text-foreground flex justify-between items-center">{q}<ChevronDown className="w-4 h-4 text-[#06B6D4] group-open:rotate-180 transition-transform" aria-hidden="true" /></summary>
            <p className="pb-5 text-muted-foreground">{a}</p>
          </details>
        ))}
      </div>
    </Section>

    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#FFD700] via-[#FFE34D] to-[#F0C800]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-extrabold font-heading text-[#050A14]">Request an IT support assessment</h2>
          <p className="mt-2 text-[#050A14]/75">Tell us how your team works and we'll show you where support can be faster and cost less</p>
        </div>
        <Button asChild className="bg-[#050A14] text-white hover:bg-[#121519] rounded-full px-8 py-6 text-base"><Link to="/book-demo">Request an assessment</Link></Button>
      </div>
    </section>
  </>
);

export default GlobalHelpDeskPage;
