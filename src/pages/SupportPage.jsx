import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useLocation } from 'react-router-dom';
import SupportTicketForm from '@/components/SupportTicketForm';
import { FileText, Mail, Phone, Bot, AlertTriangle, Clock, ShieldCheck, ArrowRight, Headphones } from 'lucide-react';

const openBot = () => document.querySelector('button[aria-label="Open Unified Hive Bot"]')?.click();

const channels = [
  { icon: FileText, title: 'Submit a ticket', text: 'Best for most issues. You get a reference number and we reply by email.', action: { label: 'Open the form', href: '#ticket' } },
  { icon: Mail, title: 'Email support', text: 'Send screenshots or details to support@unifiedhive.com.', action: { label: 'Send an email', href: 'mailto:support@unifiedhive.com' } },
  { icon: Phone, title: 'Call us', text: 'For urgent problems that stop people working.', action: { label: '+1 332 220 0017', href: 'tel:+13322200017' } },
  { icon: Bot, title: 'Ask Unified Hive Bot', text: 'Instant answers and step-by-step troubleshooting, any time.', action: { label: 'Start a chat', onClick: openBot } },
];

const priorities = [
  { p: 'Urgent', d: 'Outage, security incident or many people unable to work', c: 'bg-red-500/15 text-red-400 border-red-500/30' },
  { p: 'High', d: 'One team blocked, or a key system degraded', c: 'bg-orange-500/15 text-orange-400 border-orange-500/30' },
  { p: 'Normal', d: 'One person affected, with a workaround', c: 'bg-[#06B6D4]/15 text-[#06B6D4] border-[#06B6D4]/30' },
  { p: 'Low', d: 'Questions, requests and planned changes', c: 'bg-white/5 text-muted-foreground border-white/10' },
];

const SupportPage = () => {
  const { hash } = useLocation();
  useEffect(() => {
    if (!hash) return;
    const t = setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 350);
    return () => clearTimeout(t);
  }, [hash]);
  return (
  <>
    <Helmet>
      <title>Get Support | Unified Hive</title>
      <meta name="description" content="Get help from Unified Hive support: submit a ticket, email support@unifiedhive.com, call +1 332 220 0017 or ask Unified Hive Bot." />
      <link rel="canonical" href="https://www.unifiedhive.com/support" />
    </Helmet>

    <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 text-center">
      <div className="max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#001F3F]/[0.1] dark:border-white/[0.08] text-xs font-medium text-muted-foreground tracking-wider uppercase">
          <Headphones className="w-3.5 h-3.5 text-[#06B6D4]" aria-hidden="true" /> Customer support
        </span>
        <h1 className="mt-6 text-4xl md:text-6xl font-extrabold font-heading text-foreground leading-tight">How can we <span className="text-gradient">help?</span></h1>
        <p className="mt-6 text-lg text-muted-foreground">Choose the fastest way to reach our support team. Existing clients and new enquiries are both welcome.</p>
      </div>
    </section>

    <section className="pb-16 px-4 sm:px-6 lg:px-8" aria-label="Ways to get support">
      <ul className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {channels.map(({ icon: Icon, title, text, action }) => (
          <li key={title} className="p-6 rounded-2xl bg-white dark:bg-white/[0.03] border border-[#001F3F]/[0.08] dark:border-[#06B6D4]/[0.14] flex flex-col">
            <span className="w-11 h-11 rounded-xl grid place-items-center bg-[#06B6D4]/15 text-[#06B6D4]"><Icon className="w-5 h-5" aria-hidden="true" /></span>
            <h2 className="mt-4 text-lg font-bold font-heading text-foreground">{title}</h2>
            <p className="mt-2 text-sm text-muted-foreground flex-1">{text}</p>
            {action.href ? (
              <a href={action.href} className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#FFD700] hover:underline break-all">{action.label} <ArrowRight className="w-4 h-4 flex-none" aria-hidden="true" /></a>
            ) : (
              <button type="button" onClick={action.onClick} className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#FFD700] hover:underline text-left">{action.label} <ArrowRight className="w-4 h-4" aria-hidden="true" /></button>
            )}
          </li>
        ))}
      </ul>
    </section>

    <section id="ticket" className="py-16 px-4 sm:px-6 lg:px-8 bg-[#121519] border-y border-white/[0.06] scroll-mt-24">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_2fr] gap-10 items-start">
        <aside className="lg:sticky lg:top-28 space-y-6">
          <div>
            <h2 className="text-3xl font-bold font-heading text-foreground">Submit a ticket</h2>
            <p className="mt-3 text-muted-foreground">Your ticket goes straight to support@unifiedhive.com with a reference number.</p>
          </div>
          <div>
            <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground"><Clock className="w-4 h-4 text-[#06B6D4]" aria-hidden="true" /> Choosing a priority</h3>
            <ul className="mt-3 space-y-2">
              {priorities.map(({ p, d, c }) => (
                <li key={p} className="flex items-start gap-3 text-sm">
                  <span className={`flex-none w-16 text-center px-2 py-0.5 rounded-full border text-xs font-semibold ${c}`}>{p}</span>
                  <span className="text-muted-foreground">{d}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="flex gap-2 p-4 rounded-xl border border-red-500/30 bg-red-500/[0.06] text-sm text-foreground">
            <AlertTriangle className="w-4 h-4 mt-0.5 flex-none text-red-400" aria-hidden="true" />
            For a security incident or suspected account compromise, submit an Urgent ticket and call +1 332 220 0017.
          </p>
          <p className="flex gap-2 text-sm text-muted-foreground">
            <ShieldCheck className="w-4 h-4 mt-0.5 flex-none text-[#06B6D4]" aria-hidden="true" />
            We will never ask for your password or MFA codes.
          </p>
        </aside>
        <SupportTicketForm />
      </div>
    </section>

    <section className="py-16 px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-2xl font-bold font-heading text-foreground">Not a client yet?</h2>
      <p className="mt-3 text-muted-foreground">See how our Global Help Desk can support your team, or book an assessment.</p>
      <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
        <Link to="/global-help-desk" className="inline-flex justify-center items-center h-11 px-6 rounded-full border border-white/15 text-foreground hover:bg-white/5">Explore the Global Help Desk</Link>
        <Link to="/book-demo" className="inline-flex justify-center items-center h-11 px-6 rounded-full bg-[#FFD700] text-[#050A14] font-semibold hover:bg-[#F0C800]">Book an assessment</Link>
      </div>
    </section>
  </>
  );
};

export default SupportPage;
