import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import AnimatedContent from '@/components/AnimatedContent';

export const products = [
  {
    name: 'Zaylo',
    tagline: 'Your money. Your move.',
    category: 'Personal & family finance',
    url: 'https://zaylo.cc/overview',
    domain: 'zaylo.cc',
    image: '/portfolio/zaylo.webp',
    alt: 'Zaylo sign-in screen with the tagline Your money. Your move.',
    description: 'Track spending, bills and savings in any currency, and share a workspace with the people you plan with.',
    features: ['50+ currencies', 'Shared family workspaces', 'Add expenses by voice or bank SMS', 'Arabic and English'],
    status: 'Live',
    accent: 'from-[#3B82F6] to-[#8B5CF6]',
  },
  {
    name: 'Skolza',
    tagline: 'Run your academy in one place',
    category: 'Education management',
    url: 'https://skolza.com/',
    domain: 'skolza.com',
    image: '/portfolio/skolza.webp',
    alt: 'Skolza home page: Your academy. Finally connected.',
    description: 'Students, schedules, attendance and payments in one connected platform for academies and training centres.',
    features: ['Student and class management', 'Scheduling and attendance', 'Payments', 'Portals for each role'],
    status: 'Coming soon',
    accent: 'from-[#06B6D4] to-[#0E7490]',
  },
  {
    name: 'HALA | حلا',
    tagline: 'A little HALA. A lot of happiness.',
    category: 'E-commerce',
    url: 'https://hala-cookies.vercel.app/#home',
    domain: 'hala-cookies.vercel.app',
    image: '/portfolio/hala.webp',
    alt: 'HALA cookie atelier storefront with a basket of chocolate chip cookies',
    description: 'A bilingual luxury cookie storefront where customers build their own box, send gifts and join the Cookie Club.',
    features: ['Build-a-box ordering', 'Gift wrapping and notes', 'Arabic and English', 'Light and dark themes'],
    status: 'Live',
    accent: 'from-[#D4A15A] to-[#8B5A2B]',
  },
];

const ProductCard = ({ p }) => (
  <article className="group h-full flex flex-col rounded-2xl overflow-hidden bg-white dark:bg-white/[0.03] border border-[#001F3F]/[0.08] dark:border-white/[0.08] hover:border-[#FFD700]/40 transition-colors">
    <a href={p.url} target="_blank" rel="noopener noreferrer" className="relative block aspect-[16/10] overflow-hidden bg-[#0C0E11]" tabIndex={-1} aria-hidden="true">
      <img src={p.image} alt="" loading="lazy" width="800" height="500" className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]" />
      <span className={`absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r ${p.accent}`} />
    </a>
    <div className="p-6 flex-1 flex flex-col">
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#06B6D4]">{p.category}</span>
        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${p.status === 'Live' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-[#FFD700]/15 text-[#FFD700]'}`}>{p.status}</span>
      </div>
      <h3 className="mt-3 text-2xl font-bold font-heading text-foreground">{p.name}</h3>
      <p className="mt-1 text-sm font-medium text-foreground/80">{p.tagline}</p>
      <p className="mt-3 text-sm text-muted-foreground">{p.description}</p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {p.features.map((f) => <li key={f} className="text-xs px-2.5 py-1 rounded-full border border-[#001F3F]/10 dark:border-white/10 text-muted-foreground">{f}</li>)}
      </ul>
      <a href={p.url} target="_blank" rel="noopener noreferrer" className="mt-6 pt-5 border-t border-[#001F3F]/[0.06] dark:border-white/[0.06] inline-flex items-center justify-between text-sm font-semibold text-foreground hover:text-[#FFD700] transition-colors">
        <span>Visit {p.domain}</span>
        <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    </div>
  </article>
);

const ProductShowcase = ({ showAllLink = true, heading = 'Products we have built' }) => (
  <section className="py-20 px-4 sm:px-6 lg:px-8" aria-labelledby="products-heading">
    <div className="max-w-6xl mx-auto">
      <AnimatedContent type="text" className="text-center mb-12">
        <span className="inline-block text-xs uppercase tracking-widest text-[#FFD700] font-semibold mb-3">Built by Unified Hive</span>
        <h2 id="products-heading" className="text-3xl md:text-4xl font-bold text-foreground font-heading">{heading}</h2>
        <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">Web applications we designed, engineered and run in production, from fintech to education to e-commerce.</p>
      </AnimatedContent>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p, i) => (
          <AnimatedContent key={p.name} type="fade" delay={i * 0.08}><ProductCard p={p} /></AnimatedContent>
        ))}
      </div>
      {showAllLink && (
        <div className="mt-10 text-center">
          <Link to="/products" className="inline-flex items-center gap-2 text-[#06B6D4] font-semibold hover:underline">See all products <ArrowRight className="w-4 h-4" aria-hidden="true" /></Link>
        </div>
      )}
    </div>
  </section>
);

export default ProductShowcase;
