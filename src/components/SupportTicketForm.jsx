import React, { useState } from 'react';
import { Send, CheckCircle2, AlertTriangle, Loader2, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CATEGORIES = ['Microsoft 365', 'Sign-in / identity', 'Outlook / email', 'Teams', 'SharePoint / OneDrive', 'Device / Intune',
  'Security concern', 'Network / VPN', 'Software / application', 'Access request', 'New employee', 'Employee departure',
  'Automation problem', 'Cloud / Azure', 'Billing / licensing', 'Something else'];
const PRIORITIES = ['Low', 'Normal', 'High', 'Urgent'];

const empty = { name: '', email: '', company: '', category: 'Microsoft 365', priority: 'Normal', affected: '', started: '', subject: '', description: '', website: '' };

const field = 'w-full min-w-0 h-11 px-3 rounded-lg bg-white dark:bg-[#0C0E11] border border-[#001F3F]/15 dark:border-white/10 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#06B6D4]';
const label = 'block text-sm font-medium text-foreground mb-1.5';

const SupportTicketForm = () => {
  const [f, setF] = useState(empty);
  const [state, setState] = useState({ status: 'idle', ref: '' });
  const set = (k) => (e) => setF((p) => ({ ...p, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setState({ status: 'sending', ref: '' });
    try {
      const r = await fetch('/api/ticket', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(f) });
      const d = await r.json().catch(() => ({}));
      if (r.ok && d.ok) { setState({ status: 'sent', ref: d.ref || '' }); setF(empty); return; }
      setState({ status: r.status === 429 ? 'limited' : r.status === 400 ? 'invalid' : 'error', ref: d.ref || '' });
    } catch {
      setState({ status: 'error', ref: '' });
    }
  };

  if (state.status === 'sent') {
    return (
      <div className="p-8 rounded-2xl bg-white dark:bg-white/[0.03] border border-[#06B6D4]/30 text-center" role="status">
        <CheckCircle2 className="w-10 h-10 mx-auto text-[#06B6D4]" aria-hidden="true" />
        <h3 className="mt-4 text-xl font-bold font-heading text-foreground">Ticket sent to support</h3>
        <p className="mt-2 text-muted-foreground">Your reference is <strong className="text-foreground">{state.ref}</strong>. We'll reply to the email you gave.</p>
        <Button variant="outline" className="mt-6 rounded-full" onClick={() => setState({ status: 'idle', ref: '' })}>Submit another ticket</Button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="p-6 md:p-8 rounded-2xl bg-white dark:bg-white/[0.03] border border-[#001F3F]/[0.08] dark:border-[#06B6D4]/[0.14] grid gap-5 md:grid-cols-2" noValidate={false}>
      <div><label htmlFor="t-name" className={label}>Your name</label><input id="t-name" required className={field} value={f.name} onChange={set('name')} autoComplete="name" /></div>
      <div><label htmlFor="t-email" className={label}>Work email</label><input id="t-email" type="email" required className={field} value={f.email} onChange={set('email')} autoComplete="email" /></div>
      <div><label htmlFor="t-company" className={label}>Company <span className="text-muted-foreground font-normal">(optional)</span></label><input id="t-company" className={field} value={f.company} onChange={set('company')} autoComplete="organization" /></div>
      <div className="grid grid-cols-[3fr_2fr] gap-3">
        <div><label htmlFor="t-category" className={label}>Category</label><select id="t-category" className={field} value={f.category} onChange={set('category')}>{CATEGORIES.map((c) => <option key={c}>{c}</option>)}</select></div>
        <div><label htmlFor="t-priority" className={label}>Priority</label><select id="t-priority" className={field} value={f.priority} onChange={set('priority')}>{PRIORITIES.map((c) => <option key={c}>{c}</option>)}</select></div>
      </div>
      <div><label htmlFor="t-affected" className={label}>Who is affected <span className="text-muted-foreground font-normal">(optional)</span></label><input id="t-affected" className={field} placeholder="Just me, my team, everyone" value={f.affected} onChange={set('affected')} /></div>
      <div><label htmlFor="t-started" className={label}>When did it start <span className="text-muted-foreground font-normal">(optional)</span></label><input id="t-started" className={field} placeholder="Today around 10:00" value={f.started} onChange={set('started')} /></div>
      <div className="md:col-span-2"><label htmlFor="t-subject" className={label}>Subject</label><input id="t-subject" required maxLength={160} className={field} value={f.subject} onChange={set('subject')} /></div>
      <div className="md:col-span-2">
        <label htmlFor="t-description" className={label}>Describe the problem</label>
        <textarea id="t-description" required minLength={10} maxLength={5000} rows={6} className={`${field} h-auto py-2.5`} placeholder="What happened, any error message, and what you've already tried" value={f.description} onChange={set('description')} />
      </div>
      {/* Honeypot for bots: hidden from people and screen readers */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" value={f.website} onChange={set('website')} />

      <p className="md:col-span-2 flex items-start gap-2 text-sm text-muted-foreground">
        <ShieldCheck className="w-4 h-4 mt-0.5 flex-none text-[#06B6D4]" aria-hidden="true" />
        Never include passwords, MFA codes or private keys. Our team will never ask for them.
      </p>

      {['invalid', 'limited', 'error'].includes(state.status) && (
        <p className="md:col-span-2 flex items-start gap-2 text-sm text-red-500" role="alert">
          <AlertTriangle className="w-4 h-4 mt-0.5 flex-none" aria-hidden="true" />
          {state.status === 'invalid' && 'Please add your name, a valid email, a subject and a short description.'}
          {state.status === 'limited' && 'Too many tickets from this connection. Please wait a few minutes or email support@unifiedhive.com.'}
          {state.status === 'error' && 'The ticket could not be sent. Please email support@unifiedhive.com instead.'}
        </p>
      )}

      <div className="md:col-span-2 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <a href="mailto:support@unifiedhive.com" className="text-sm text-[#06B6D4] hover:underline">Or email support@unifiedhive.com</a>
        <Button type="submit" disabled={state.status === 'sending'} className="btn-premium px-8 py-6 gap-2">
          {state.status === 'sending' ? <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /> : <Send className="w-4 h-4" aria-hidden="true" />}
          {state.status === 'sending' ? 'Sending' : 'Submit ticket'}
        </Button>
      </div>
    </form>
  );
};

export default SupportTicketForm;
