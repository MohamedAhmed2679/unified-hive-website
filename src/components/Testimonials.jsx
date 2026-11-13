import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import AnimatedContent from '@/components/AnimatedContent';

/**
 * Customers — organizations Unified Hive currently supports.
 * Names only: no quotes, scope or results are shown until each customer approves them.
 * Logos can be added per customer once logo-use permission is confirmed.
 */
export const customers = [
  { name: 'Vantage', url: 'https://www.vantageservices.co/services', domain: 'vantageservices.co' },
  { name: 'OhBaby', url: 'https://www.ohbabyeg.com/', domain: 'ohbabyeg.com' },
  { name: 'Evolve Solutions', url: 'https://www.evolvesolutionscorp.com/', domain: 'evolvesolutionscorp.com' },
  { name: 'The Best Track', url: 'https://www.thebesttrack.com/', domain: 'thebesttrack.com' },
  { name: 'Negotiations.com', url: 'https://www.negotiations.com/', domain: 'negotiations.com' },
];

const CustomerCard = ({ c }) => (
  <a
    href={c.url}
    target="_blank"
    rel="noopener noreferrer"
    className="group/card flex-shrink-0 w-full md:w-[260px] flex items-center justify-between gap-4 p-6 bg-white/[0.03] border border-white/[0.08] rounded-2xl hover:border-[#FFD700]/40 transition-colors"
  >
    <span className="flex flex-col">
      <span className="text-lg font-bold text-white font-heading">{c.name}</span>
      <span className="text-xs text-white/45">{c.domain}</span>
    </span>
    <ArrowUpRight className="w-4 h-4 text-white/30 group-hover/card:text-[#FFD700] transition-colors" aria-hidden="true" />
    <span className="sr-only">(opens in a new tab)</span>
  </a>
);

const Testimonials = () => {
  const doubled = [...customers, ...customers, ...customers];

  return (
    <section className="bg-[#0C0E11] py-20 px-4 sm:px-6 lg:px-8 overflow-hidden" aria-label="Our customers">
      <div className="max-w-6xl mx-auto">
        <AnimatedContent type="text" className="text-center mb-14">
          <span className="inline-block text-xs uppercase tracking-widest text-[#FFD700] font-semibold mb-3">
            Our Customers
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white font-heading">
            Trusted by Global Businesses
          </h2>
          <p className="mt-4 text-white/60 max-w-2xl mx-auto">
            Supporting organizations across different industries, operating models and geographic markets.
          </p>
        </AnimatedContent>
      </div>

      {/* Desktop: infinite marquee, pauses on hover */}
      <div className="hidden md:block group">
        <div className="flex gap-6 animate-marquee w-max">
          {doubled.map((c, i) => (
            <CustomerCard key={i} c={c} />
          ))}
        </div>
      </div>

      {/* Mobile: stacked list */}
      <div className="md:hidden max-w-6xl mx-auto">
        <div className="flex flex-col gap-4">
          {customers.map((c) => (
            <CustomerCard key={c.name} c={{ ...c }} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
