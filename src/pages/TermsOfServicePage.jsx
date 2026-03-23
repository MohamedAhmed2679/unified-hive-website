import React from 'react';
import { Helmet } from 'react-helmet';
import AnimatedContent from '@/components/AnimatedContent';

const TermsOfServicePage = () => {
 return (
 <>
 <Helmet>
 <title>Terms of Service | Unifiedhive</title>
 <meta name="description" content="Terms and conditions governing the use of Unifiedhive's website and consulting services."/>
 </Helmet>
 <div className="pt-24 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
 <AnimatedContent type="text">
 <h1 className="text-3xl font-bold text-[#001F3F] dark:text-white mb-4 font-heading">Terms of Service</h1>
 <p className="mb-8 text-sm text-gray-500 dark:text-gray-400"><strong>Last Updated:</strong> March 23, 2026 &nbsp;|&nbsp; <strong>Effective Date:</strong> March 23, 2026</p>
 </AnimatedContent>

 <div className="space-y-8 text-gray-700 dark:text-gray-300">
 <AnimatedContent type="fade" delay={0.1}>
 <p className="leading-relaxed">These Terms of Service ("Terms") govern your access to and use of the website www.unifiedhive.com (the "Site") and the services provided by Unifiedhive ("we," "our," or "us"). By accessing the Site, you agree to be bound by these Terms.</p>
 </AnimatedContent>

 <AnimatedContent type="fade" delay={0.15}>
 <section>
 <h2 className="text-xl font-semibold text-[#001F3F] dark:text-white mb-3 font-heading">1. Services</h2>
 <p>Unifiedhive provides enterprise IT consulting services, including but not limited to Zero Trust security architecture, DevOps automation, cloud infrastructure, and IT operations consulting. Specific service terms are outlined in individual Statements of Work (SOWs) or service agreements executed between Unifiedhive and the client.</p>
 </section>
 </AnimatedContent>

 <AnimatedContent type="fade" delay={0.2}>
 <section>
 <h2 className="text-xl font-semibold text-[#001F3F] dark:text-white mb-3 font-heading">2. Use of the Site</h2>
 <p className="mb-2">You agree to use the Site only for lawful purposes and in accordance with these Terms. You agree not to:</p>
 <ul className="list-disc ml-5 space-y-1">
 <li>Use the Site in any way that violates applicable law or regulation</li>
 <li>Attempt to gain unauthorized access to any part of the Site, its servers, or connected systems</li>
 <li>Introduce viruses, trojans, worms, or other malicious material</li>
 <li>Use automated tools to scrape, mine, or extract data from the Site without written permission</li>
 <li>Impersonate another person or entity</li>
 </ul>
 </section>
 </AnimatedContent>

 <AnimatedContent type="fade" delay={0.25}>
 <section>
 <h2 className="text-xl font-semibold text-[#001F3F] dark:text-white mb-3 font-heading">3. Intellectual Property</h2>
 <p className="mb-2">All content on the Site — including text, graphics, logos, icons, images, software, and design elements — is the property of Unifiedhive or its content suppliers and is protected by intellectual property laws.</p>
 <p>You may not reproduce, distribute, modify, create derivative works of, publicly display, or exploit any content from the Site without prior written consent from Unifiedhive.</p>
 </section>
 </AnimatedContent>

 <AnimatedContent type="fade" delay={0.3}>
 <section>
 <h2 className="text-xl font-semibold text-[#001F3F] dark:text-white mb-3 font-heading">4. Client Engagements</h2>
 
 <h3 className="text-lg font-medium text-[#001F3F] dark:text-white mb-2 mt-4">4.1 Proposals and Statements of Work</h3>
 <p>All consulting engagements are governed by individually negotiated Statements of Work (SOWs) that detail scope, deliverables, timelines, and fees. These Terms supplement but do not replace the terms of any executed SOW.</p>

 <h3 className="text-lg font-medium text-[#001F3F] dark:text-white mb-2 mt-4">4.2 Confidentiality</h3>
 <p>Both parties agree to maintain the confidentiality of proprietary information exchanged during engagements. Specific confidentiality obligations are defined in individual service agreements or Non-Disclosure Agreements (NDAs).</p>

 <h3 className="text-lg font-medium text-[#001F3F] dark:text-white mb-2 mt-4">4.3 Payment Terms</h3>
 <p>Payment terms are specified in individual SOWs. Unless otherwise stated, invoices are due within 30 days of receipt. Late payments may be subject to interest at 1.5% per month or the maximum rate permitted by law.</p>
 </section>
 </AnimatedContent>

 <AnimatedContent type="fade" delay={0.35}>
 <section>
 <h2 className="text-xl font-semibold text-[#001F3F] dark:text-white mb-3 font-heading">5. Disclaimers</h2>

 <h3 className="text-lg font-medium text-[#001F3F] dark:text-white mb-2 mt-4">5.1 "As Is" Basis</h3>
 <p>The Site and its content are provided on an "as is" and "as available" basis without warranties of any kind, either express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement.</p>

 <h3 className="text-lg font-medium text-[#001F3F] dark:text-white mb-2 mt-4">5.2 No Guarantee of Results</h3>
 <p>While we reference metrics such as cost reductions and performance improvements, results vary by client and engagement. Past performance and case study outcomes do not guarantee similar results for your organization.</p>

 <h3 className="text-lg font-medium text-[#001F3F] dark:text-white mb-2 mt-4">5.3 Third-Party Links</h3>
 <p>The Site may contain links to third-party websites. We are not responsible for the content, privacy practices, or availability of those sites.</p>
 </section>
 </AnimatedContent>

 <AnimatedContent type="fade" delay={0.4}>
 <section>
 <h2 className="text-xl font-semibold text-[#001F3F] dark:text-white mb-3 font-heading">6. Limitation of Liability</h2>
 <p className="mb-2">To the fullest extent permitted by applicable law, Unifiedhive shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or business opportunities, arising from your use of the Site or our services.</p>
 <p>Our total aggregate liability for any claims arising under these Terms shall not exceed the fees paid by you to Unifiedhive in the twelve (12) months preceding the claim.</p>
 </section>
 </AnimatedContent>

 <AnimatedContent type="fade" delay={0.45}>
 <section>
 <h2 className="text-xl font-semibold text-[#001F3F] dark:text-white mb-3 font-heading">7. Indemnification</h2>
 <p>You agree to indemnify and hold harmless Unifiedhive, its officers, directors, employees, and agents from any claims, liabilities, damages, losses, or expenses (including reasonable attorneys' fees) arising from your use of the Site or violation of these Terms.</p>
 </section>
 </AnimatedContent>

 <AnimatedContent type="fade" delay={0.5}>
 <section>
 <h2 className="text-xl font-semibold text-[#001F3F] dark:text-white mb-3 font-heading">8. Termination</h2>
 <p>We reserve the right to suspend or terminate your access to the Site at any time, without notice, for any reason, including violation of these Terms. Upon termination, all provisions that should reasonably survive (including Sections 3, 5, 6, 7, and 10) will remain in effect.</p>
 </section>
 </AnimatedContent>

 <AnimatedContent type="fade" delay={0.55}>
 <section>
 <h2 className="text-xl font-semibold text-[#001F3F] dark:text-white mb-3 font-heading">9. Changes to These Terms</h2>
 <p>We may update these Terms from time to time. Material changes will be indicated by updating the "Last Updated" date. Your continued use of the Site after changes constitutes acceptance of the revised Terms.</p>
 </section>
 </AnimatedContent>

 <AnimatedContent type="fade" delay={0.6}>
 <section>
 <h2 className="text-xl font-semibold text-[#001F3F] dark:text-white mb-3 font-heading">10. Governing Law</h2>
 <p>These Terms are governed by and construed in accordance with applicable laws. Any disputes shall be resolved exclusively in the appropriate courts of jurisdiction.</p>
 </section>
 </AnimatedContent>

 <AnimatedContent type="fade" delay={0.65}>
 <section>
 <h2 className="text-xl font-semibold text-[#001F3F] dark:text-white mb-3 font-heading">11. Severability</h2>
 <p>If any provision of these Terms is found to be unenforceable, the remaining provisions will continue in full force and effect.</p>
 </section>
 </AnimatedContent>

 <AnimatedContent type="fade" delay={0.7}>
 <section>
 <h2 className="text-xl font-semibold text-[#001F3F] dark:text-white mb-3 font-heading">12. Contact</h2>
 <p>For questions about these Terms:</p>
 <div className="mt-3 p-4 bg-gray-50 dark:bg-white/[0.03] rounded-lg border border-gray-200 dark:border-white/[0.06]">
 <p className="font-semibold text-[#001F3F] dark:text-white">Unifiedhive</p>
 <p>Email: <a href="mailto:Info@unifiedhive.com" className="text-[#06B6D4] hover:text-[#001F3F] dark:hover:text-[#FFD700] underline">Info@unifiedhive.com</a></p>
 <p>Website: <a href="/contact" className="text-[#06B6D4] hover:text-[#001F3F] dark:hover:text-[#FFD700] underline">unifiedhive.com/contact</a></p>
 </div>
 </section>
 </AnimatedContent>
 </div>
 </div>
 </>
 );
};

export default TermsOfServicePage;