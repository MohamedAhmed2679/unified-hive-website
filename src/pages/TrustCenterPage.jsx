import React from 'react';
import { Helmet } from 'react-helmet';
import AnimatedContent from '@/components/AnimatedContent';
import { Shield, Lock, Server, FileCheck } from 'lucide-react';

const TrustCenterPage = () => {
 return (
 <>
 <Helmet>
 <title>Trust Center | Unifiedhive</title>
 <meta name="description"content="Unifiedhive Trust Center: Security, Compliance, and Availability information."/>
 </Helmet>
 
 <div className="pt-24 pb-16 bg-white dark:bg-[#0A1228]">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <AnimatedContent type="text"className="mb-12">
 <h1 className="text-4xl font-bold text-[#001F3F] dark:text-white mb-4 font-heading">Trust Center</h1>
 <p className="text-xl text-muted-foreground">Security is not a feature; it's our foundation.</p>
 </AnimatedContent>

 <div className="grid md:grid-cols-2 gap-12">
 <div className="space-y-8">
 <section>
 <div className="flex items-center gap-3 mb-4">
 <Shield className="text-[#FFC107] w-8 h-8"/>
 <h2 className="text-2xl font-bold text-[#001F3F] dark:text-white font-heading">Security Measures</h2>
 </div>
 <p className="text-muted-foreground mb-4">We employ defense-in-depth strategies including:</p>
 <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
 <li>AES-256 encryption for data at rest</li>
 <li>TLS 1.3 for data in transit</li>
 <li>Multi-Factor Authentication (MFA) enforcement</li>
 <li>Regular penetration testing</li>
 </ul>
 </section>

 <section>
 <div className="flex items-center gap-3 mb-4">
 <FileCheck className="text-[#FFC107] w-8 h-8"/>
 <h2 className="text-2xl font-bold text-[#001F3F] dark:text-white font-heading">Compliance</h2>
 </div>
 <p className="text-muted-foreground">Our processes align with major industry standards:</p>
 <div className="flex gap-4 mt-4">
 <div className="border border-gray-200 dark:border-white/[0.06] rounded p-2 text-sm font-bold text-gray-700 dark:text-gray-300">SOC 2 Type II</div>
 <div className="border border-gray-200 dark:border-white/[0.06] rounded p-2 text-sm font-bold text-gray-700 dark:text-gray-300">ISO 27001</div>
 <div className="border border-gray-200 dark:border-white/[0.06] rounded p-2 text-sm font-bold text-gray-700 dark:text-gray-300">GDPR</div>
 </div>
 </section>
 </div>

 <div className="space-y-8">
 <section>
 <div className="flex items-center gap-3 mb-4">
 <Server className="text-[#FFC107] w-8 h-8"/>
 <h2 className="text-2xl font-bold text-[#001F3F] dark:text-white font-heading">Availability</h2>
 </div>
 <p className="text-muted-foreground mb-4">Real-time system status and uptime metrics.</p>
 <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 dark:border-white/[0.06]">
 <div className="flex justify-between items-center mb-2">
 <span className="font-semibold text-gray-700 dark:text-gray-300">API Uptime (90 days)</span>
 <span className="text-green-600 font-bold">99.99%</span>
 </div>
 <div className="flex justify-between items-center">
 <span className="font-semibold text-gray-700 dark:text-gray-300">Dashboard Uptime</span>
 <span className="text-green-600 font-bold">100%</span>
 </div>
 <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">Last updated: Just now</div>
 </div>
 </section>

 <section>
 <div className="flex items-center gap-3 mb-4">
 <Lock className="text-[#FFC107] w-8 h-8"/>
 <h2 className="text-2xl font-bold text-[#001F3F] dark:text-white font-heading">Data Privacy</h2>
 </div>
 <p className="text-muted-foreground">
 We respect your data rights. Read our <a href="/privacy"className="text-[#06B6D4] hover:text-[#001F3F] dark:hover:text-[#FFD700] underline">Privacy Policy</a> to understand how we handle your information.
 </p>
 </section>
 </div>
 </div>
 </div>
 </div>
 </>
 );
};

export default TrustCenterPage;