import React from 'react';
import { Helmet } from 'react-helmet';
import AnimatedContent from '@/components/AnimatedContent';

const PrivacyPolicyPage = () => {
 return (
 <>
 <Helmet>
 <title>Privacy Policy | Unifiedhive</title>
 <meta name="description" content="Unifiedhive's privacy policy. Learn how we collect, use, and protect your personal data. GDPR and CCPA compliant."/>
 </Helmet>
 <div className="pt-24 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
 <AnimatedContent type="text">
 <h1 className="text-3xl font-bold text-[#001F3F] dark:text-white mb-4 font-heading">Privacy Policy</h1>
 <p className="mb-8 text-sm text-gray-500 dark:text-gray-400"><strong>Last Updated:</strong> March 23, 2026 &nbsp;|&nbsp; <strong>Effective Date:</strong> March 23, 2026</p>
 </AnimatedContent>
 
 <div className="space-y-8 text-gray-700 dark:text-gray-300">
 <AnimatedContent type="fade" delay={0.1}>
 <p className="leading-relaxed">Unifiedhive ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website www.unifiedhive.com (the "Site") and use our services.</p>
 </AnimatedContent>

 <AnimatedContent type="fade" delay={0.15}>
 <section>
 <h2 className="text-xl font-semibold text-[#001F3F] dark:text-white mb-3 font-heading">1. Information We Collect</h2>
 
 <h3 className="text-lg font-medium text-[#001F3F] dark:text-white mb-2 mt-4">Information You Provide Directly</h3>
 <ul className="list-disc ml-5 space-y-1">
 <li><strong>Contact Information:</strong> Name, email address, phone number, company name, and job title when you fill out forms, request a demo, or contact us.</li>
 <li><strong>Communication Data:</strong> Messages, inquiries, and correspondence you send to us.</li>
 <li><strong>Account Information:</strong> If you create an account or access a client portal.</li>
 </ul>

 <h3 className="text-lg font-medium text-[#001F3F] dark:text-white mb-2 mt-4">Information Collected Automatically</h3>
 <ul className="list-disc ml-5 space-y-1">
 <li><strong>Device & Browser Data:</strong> IP address, browser type, operating system, device identifiers, and screen resolution.</li>
 <li><strong>Usage Data:</strong> Pages visited, time spent on pages, click patterns, referring URLs, and navigation paths.</li>
 <li><strong>Cookies & Similar Technologies:</strong> See Section 6 below.</li>
 </ul>

 <h3 className="text-lg font-medium text-[#001F3F] dark:text-white mb-2 mt-4">Information from Third Parties</h3>
 <ul className="list-disc ml-5 space-y-1">
 <li><strong>Analytics Providers:</strong> Aggregated usage data from analytics services.</li>
 <li><strong>Business Partners:</strong> Information shared by partners in the context of joint service delivery.</li>
 </ul>
 </section>
 </AnimatedContent>

 <AnimatedContent type="fade" delay={0.2}>
 <section>
 <h2 className="text-xl font-semibold text-[#001F3F] dark:text-white mb-3 font-heading">2. How We Use Your Information</h2>
 <p className="mb-2">We use collected information for the following purposes:</p>
 <ul className="list-disc ml-5 space-y-1">
 <li>To provide, maintain, and improve our services</li>
 <li>To respond to your inquiries and fulfill your requests</li>
 <li>To schedule and conduct demos and consultations</li>
 <li>To send you relevant communications about our services (with your consent)</li>
 <li>To analyze website usage and improve user experience</li>
 <li>To detect, prevent, and address technical issues and security threats</li>
 <li>To comply with legal obligations</li>
 </ul>
 <p className="mt-3 font-semibold">We do not sell your personal information to third parties.</p>
 </section>
 </AnimatedContent>

 <AnimatedContent type="fade" delay={0.25}>
 <section>
 <h2 className="text-xl font-semibold text-[#001F3F] dark:text-white mb-3 font-heading">3. Legal Basis for Processing (GDPR)</h2>
 <p className="mb-2">If you are located in the European Economic Area (EEA) or United Kingdom, we process your personal data based on the following legal grounds:</p>
 <ul className="list-disc ml-5 space-y-1">
 <li><strong>Consent:</strong> When you have given explicit consent (e.g., subscribing to communications).</li>
 <li><strong>Contractual Necessity:</strong> When processing is necessary to fulfill a contract with you.</li>
 <li><strong>Legitimate Interests:</strong> When processing serves our legitimate business interests (e.g., improving our services, security).</li>
 <li><strong>Legal Obligation:</strong> When we must comply with applicable law.</li>
 </ul>
 </section>
 </AnimatedContent>

 <AnimatedContent type="fade" delay={0.3}>
 <section>
 <h2 className="text-xl font-semibold text-[#001F3F] dark:text-white mb-3 font-heading">4. Data Sharing & Disclosure</h2>
 <p className="mb-2">We may share your information with:</p>
 <ul className="list-disc ml-5 space-y-1">
 <li><strong>Service Providers:</strong> Third-party vendors who assist with website hosting, analytics, email delivery, and CRM services, bound by confidentiality agreements.</li>
 <li><strong>Professional Advisors:</strong> Lawyers, accountants, and auditors as needed.</li>
 <li><strong>Legal Requirements:</strong> When required by law, court order, or governmental request.</li>
 <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets.</li>
 </ul>
 <p className="mt-2">We require all third parties to respect the security of your data and treat it in accordance with applicable law.</p>
 </section>
 </AnimatedContent>

 <AnimatedContent type="fade" delay={0.35}>
 <section>
 <h2 className="text-xl font-semibold text-[#001F3F] dark:text-white mb-3 font-heading">5. Data Retention</h2>
 <p className="mb-2">We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy:</p>
 <ul className="list-disc ml-5 space-y-1">
 <li><strong>Contact form submissions:</strong> 24 months from last interaction</li>
 <li><strong>Client data:</strong> Duration of engagement plus 36 months</li>
 <li><strong>Analytics data:</strong> 26 months (anonymized)</li>
 </ul>
 </section>
 </AnimatedContent>

 <AnimatedContent type="fade" delay={0.4}>
 <section>
 <h2 className="text-xl font-semibold text-[#001F3F] dark:text-white mb-3 font-heading">6. Cookies & Tracking Technologies</h2>
 <p className="mb-2">Our Site uses cookies and similar tracking technologies:</p>
 <ul className="list-disc ml-5 space-y-1">
 <li><strong>Essential Cookies:</strong> Required for the Site to function properly. Cannot be disabled.</li>
 <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with the Site.</li>
 <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements (only with your consent).</li>
 </ul>
 <p className="mt-2">You can manage your cookie preferences through your browser settings. For more details, see our <a href="/cookies" className="text-[#06B6D4] hover:text-[#001F3F] dark:hover:text-[#FFD700] underline">Cookie Policy</a>.</p>
 </section>
 </AnimatedContent>

 <AnimatedContent type="fade" delay={0.45}>
 <section>
 <h2 className="text-xl font-semibold text-[#001F3F] dark:text-white mb-3 font-heading">7. Your Rights</h2>
 
 <h3 className="text-lg font-medium text-[#001F3F] dark:text-white mb-2 mt-4">GDPR Rights (EEA/UK Residents)</h3>
 <ul className="list-disc ml-5 space-y-1">
 <li><strong>Access:</strong> Request a copy of your personal data.</li>
 <li><strong>Rectification:</strong> Request correction of inaccurate data.</li>
 <li><strong>Erasure:</strong> Request deletion of your data ("right to be forgotten").</li>
 <li><strong>Restriction:</strong> Request limitation of processing.</li>
 <li><strong>Portability:</strong> Receive your data in a portable format.</li>
 <li><strong>Objection:</strong> Object to processing based on legitimate interests.</li>
 <li><strong>Withdraw Consent:</strong> Withdraw consent at any time.</li>
 </ul>

 <h3 className="text-lg font-medium text-[#001F3F] dark:text-white mb-2 mt-4">CCPA Rights (California Residents)</h3>
 <ul className="list-disc ml-5 space-y-1">
 <li><strong>Right to Know:</strong> Request disclosure of personal information collected.</li>
 <li><strong>Right to Delete:</strong> Request deletion of personal information.</li>
 <li><strong>Right to Opt-Out:</strong> Opt out of the sale of personal information (we do not sell data).</li>
 <li><strong>Non-Discrimination:</strong> We will not discriminate against you for exercising your rights.</li>
 </ul>
 <p className="mt-3">To exercise any of these rights, contact us at <a href="mailto:Info@unifiedhive.com" className="text-[#06B6D4] hover:text-[#001F3F] dark:hover:text-[#FFD700] underline">Info@unifiedhive.com</a>.</p>
 </section>
 </AnimatedContent>

 <AnimatedContent type="fade" delay={0.5}>
 <section>
 <h2 className="text-xl font-semibold text-[#001F3F] dark:text-white mb-3 font-heading">8. Data Security</h2>
 <p className="mb-2">We implement appropriate technical and organizational measures to protect your personal information, including:</p>
 <ul className="list-disc ml-5 space-y-1">
 <li>Encryption in transit (TLS/SSL) and at rest</li>
 <li>Access controls and authentication</li>
 <li>Regular security assessments</li>
 <li>Employee training on data protection</li>
 </ul>
 <p className="mt-2">No method of transmission over the Internet is 100% secure. While we strive to protect your data, we cannot guarantee absolute security.</p>
 </section>
 </AnimatedContent>

 <AnimatedContent type="fade" delay={0.55}>
 <section>
 <h2 className="text-xl font-semibold text-[#001F3F] dark:text-white mb-3 font-heading">9. International Data Transfers</h2>
 <p>If you are located outside the United States, your information may be transferred to and processed in the United States. We ensure appropriate safeguards are in place, such as Standard Contractual Clauses (SCCs), to protect your data.</p>
 </section>
 </AnimatedContent>

 <AnimatedContent type="fade" delay={0.6}>
 <section>
 <h2 className="text-xl font-semibold text-[#001F3F] dark:text-white mb-3 font-heading">10. Children's Privacy</h2>
 <p>Our Site and services are not directed to individuals under the age of 16. We do not knowingly collect personal information from children. If we become aware of such collection, we will delete the data promptly.</p>
 </section>
 </AnimatedContent>

 <AnimatedContent type="fade" delay={0.65}>
 <section>
 <h2 className="text-xl font-semibold text-[#001F3F] dark:text-white mb-3 font-heading">11. Changes to This Policy</h2>
 <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated "Last Updated" date. We encourage you to review this policy periodically.</p>
 </section>
 </AnimatedContent>

 <AnimatedContent type="fade" delay={0.7}>
 <section>
 <h2 className="text-xl font-semibold text-[#001F3F] dark:text-white mb-3 font-heading">12. Contact Us</h2>
 <p>If you have questions about this Privacy Policy or wish to exercise your rights:</p>
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

export default PrivacyPolicyPage;