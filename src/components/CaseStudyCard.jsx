import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

/**
 * CaseStudyCard - Reusable card for case study listings
 * Adapted from Next.js Link → react-router-dom Link
 */
const CaseStudyCard = ({ slug, title, industry, metric, metricLabel, summary, tags = [] }) => {
 return (
 <article className="border border-white/[0.08] rounded-2xl bg-white/[0.02] overflow-hidden hover:border-white/[0.18] hover:-translate-y-0.5 transition-all duration-300">
 <Link to={`/case-studies/${slug}`} className="flex flex-col p-6 text-white h-full no-underline focus-visible:outline-2 focus-visible:outline-[#FFD700] focus-visible:outline-offset-[-2px] rounded-2xl">
 <div className="flex justify-between items-start mb-6">
 <span className="text-[0.7rem] uppercase tracking-wider text-white/40 font-semibold px-3 py-1 border border-white/10 rounded-full">
 {industry}
 </span>
 <div className="text-right">
 <span className="block text-2xl font-extrabold bg-gradient-to-br from-[#FFD700] to-[#06B6D4] bg-clip-text text-transparent leading-none">
 {metric}
 </span>
 <span className="text-[0.7rem] text-white/40 block max-w-[120px] ml-auto">{metricLabel}</span>
 </div>
 </div>

 <h3 className="text-lg font-bold mb-3 leading-tight font-heading">{title}</h3>
 <p className="text-sm leading-relaxed text-white/55 mb-5 flex-1">{summary}</p>

 {tags.length > 0 && (
 <div className="flex flex-wrap gap-1.5 mb-5" aria-label="Technologies used">
 {tags.map((tag, i) => (
 <span key={i} className="text-[0.7rem] px-2.5 py-0.5 rounded-full bg-white/[0.05] text-white/50 border border-white/[0.08]">
 {tag}
 </span>
 ))}
 </div>
 )}

 <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#FFD700] mt-auto group" aria-hidden="true">
 Read case study
 <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
 </span>
 </Link>
 </article>
 );
};

export default CaseStudyCard;
