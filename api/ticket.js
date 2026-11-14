// Support ticket relay: validates the form server-side and emails it to support@unifiedhive.com.
// Primary: Microsoft Graph sendMail (GRAPH_TENANT_ID, GRAPH_CLIENT_ID, GRAPH_CLIENT_SECRET, GRAPH_SENDER).
// Fallback when Graph isn't configured: FormSubmit (needs one-time activation).
const TO = process.env.SUPPORT_EMAIL || 'support@unifiedhive.com';
const G = { tenant: process.env.GRAPH_TENANT_ID, client: process.env.GRAPH_CLIENT_ID, secret: process.env.GRAPH_CLIENT_SECRET, sender: process.env.GRAPH_SENDER || 'info@unifiedhive.com' };
const graphReady = () => G.tenant && G.client && G.secret;
let tokenCache = { value: '', exp: 0 };
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

async function graphToken() {
  if (tokenCache.value && Date.now() < tokenCache.exp - 60_000) return tokenCache.value;
  const r = await fetch(`https://login.microsoftonline.com/${encodeURIComponent(G.tenant)}/oauth2/v2.0/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ client_id: G.client, client_secret: G.secret, scope: 'https://graph.microsoft.com/.default', grant_type: 'client_credentials' }),
  });
  const d = await r.json().catch(() => ({}));
  if (!r.ok || !d.access_token) throw new Error(`token ${r.status} ${d.error || ''}`);
  tokenCache = { value: d.access_token, exp: Date.now() + (d.expires_in || 3600) * 1000 };
  return tokenCache.value;
}

// Sends the ticket from GRAPH_SENDER to the support address through Microsoft Graph (Mail.Send, application permission).
async function sendViaGraph(subject, fields, replyTo) {
  const rows = Object.entries(fields).map(([k, v]) => `<tr><th align="left" style="padding:6px 12px;background:#f3f4f6;vertical-align:top">${esc(k)}</th><td style="padding:6px 12px;white-space:pre-wrap">${esc(v)}</td></tr>`).join('');
  const token = await graphToken();
  const r = await fetch(`https://graph.microsoft.com/v1.0/users/${encodeURIComponent(G.sender)}/sendMail`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: {
        subject,
        body: { contentType: 'HTML', content: `<p>New support ticket from www.unifiedhive.com</p><table style="border-collapse:collapse;font-family:Segoe UI,Arial,sans-serif;font-size:14px">${rows}</table>` },
        toRecipients: [{ emailAddress: { address: TO } }],
        replyTo: [{ emailAddress: { address: replyTo } }],
      },
      saveToSentItems: false,
    }),
  });
  if (r.status !== 202) throw new Error(`sendMail ${r.status} ${(await r.text()).slice(0, 200)}`);
}

const WINDOW_MS = 10 * 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map();

const CATEGORIES = ['Microsoft 365', 'Sign-in / identity', 'Outlook / email', 'Teams', 'SharePoint / OneDrive', 'Device / Intune',
  'Security concern', 'Network / VPN', 'Software / application', 'Access request', 'New employee', 'Employee departure',
  'Automation problem', 'Cloud / Azure', 'Billing / licensing', 'Something else'];
const PRIORITIES = ['Low', 'Normal', 'High', 'Urgent'];
const clean = (v, n) => String(v ?? '').replace(/[\u0000-\u0008\u000B-\u001F]/g, '').trim().slice(0, n);
const redact = (s) => s.replace(/\b(?:\d[ -]?){13,19}\b/g, '[redacted number]').replace(/\b(password|passcode|pwd|mfa code|otp)\s*[:=]\s*\S+/gi, '$1: [redacted]');

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  if (list.length >= MAX_PER_WINDOW) return res.status(429).json({ error: 'rate_limited' });

  let b = req.body;
  if (typeof b === 'string') { try { b = JSON.parse(b); } catch { b = {}; } }
  b = b || {};
  if (b.website) return res.status(200).json({ ok: true }); // honeypot: silently drop bots

  const t = {
    name: clean(b.name, 120), email: clean(b.email, 200), company: clean(b.company, 160),
    category: CATEGORIES.includes(b.category) ? b.category : 'Something else',
    priority: PRIORITIES.includes(b.priority) ? b.priority : 'Normal',
    affected: clean(b.affected, 120), started: clean(b.started, 120),
    subject: clean(b.subject, 160), description: redact(clean(b.description, 5000)),
  };
  if (!t.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t.email) || !t.subject || t.description.length < 10) {
    return res.status(400).json({ error: 'invalid' });
  }
  list.push(now); hits.set(ip, list);

  const ref = `UH-${new Date().toISOString().slice(2, 10).replace(/-/g, '')}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
  const subject = `[${t.priority}] ${t.category}: ${t.subject} (${ref})`;
  const fields = {
    Reference: ref, Name: t.name, Email: t.email, Company: t.company || '-', Category: t.category, Priority: t.priority,
    'Who is affected': t.affected || '-', Started: t.started || '-', Subject: t.subject, Description: t.description,
  };
  if (graphReady()) {
    try {
      await sendViaGraph(subject, fields, t.email);
      return res.status(200).json({ ok: true, ref });
    } catch (e) {
      console.error('Graph send failed', String(e?.message || e).slice(0, 200));
      return res.status(502).json({ error: 'upstream', ref });
    }
  }
  try {
    const r = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(TO)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json', Referer: 'https://www.unifiedhive.com/global-help-desk' },
      body: JSON.stringify({
        _subject: subject, _replyto: t.email, _template: 'table', _captcha: 'false', ...fields,
      }),
    });
    const data = await r.json().catch(() => ({}));
    if (!r.ok || String(data.success) === 'false') {
      console.error('Ticket relay failed', r.status, JSON.stringify(data).slice(0, 300));
      return res.status(502).json({ error: 'upstream', ref, detail: String(data.message || r.status).slice(0, 200) });
    }
    return res.status(200).json({ ok: true, ref });
  } catch (e) {
    console.error('Ticket relay error', e?.name || e);
    return res.status(502).json({ error: 'upstream', ref, detail: String(e?.message || e).slice(0, 200) });
  }
}
