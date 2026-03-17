import React from 'react';
import { Helmet } from 'react-helmet';
import AnimatedContent from '@/components/AnimatedContent';

const PrivacyPolicyPage = () => {
 return (
 <>
 <Helmet>
 <title>Privacy Policy | Unifiedhive</title>
 <meta name="description"content="Privacy Policy for Unifiedhive website and services."/>
 </Helmet>
 <div className="pt-24 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
 <AnimatedContent type="text">
 <h1 className="text-3xl font-bold text-[#001F3F] dark:text-white mb-8 font-heading">Privacy Policy</h1>
 <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">Last updated: November 22, 2025</p>
 </AnimatedContent>
 
 <div className="space-y-6 text-gray-700 dark:text-gray-300">
 <AnimatedContent type="fade"delay={0.1}>
 <section>
 <h2 className="text-xl font-semibold text-[#001F3F] dark:text-white mb-3 font-heading">1. Introduction</h2>
 <p>Unifiedhive ("we,""our,"or"us") respects your privacy and is committed to protecting it through our compliance with this policy. This policy describes the types of information we may collect from you or that you may provide when you visit the website Unifiedhive.com (our"Website") and our practices for collecting, using, maintaining, protecting, and disclosing that information.</p>
 </section>
 </AnimatedContent>
 
 <AnimatedContent type="fade"delay={0.2}>
 <section>
 <h2 className="text-xl font-semibold text-[#001F3F] dark:text-white mb-3 font-heading">2. Information We Collect</h2>
 <p className="mb-2">We collect several types of information from and about users of our Website, including information:</p>
 <ul className="list-disc ml-5 space-y-1">
 <li>By which you may be personally identified, such as name, postal address, e-mail address, telephone number, or company name ("personal information").</li>
 <li>That is about you but individually does not identify you.</li>
 <li>About your internet connection, the equipment you use to access our Website, and usage details.</li>
 </ul>
 </section>
 </AnimatedContent>

 <AnimatedContent type="fade"delay={0.3}>
 <section>
 <h2 className="text-xl font-semibold text-[#001F3F] dark:text-white mb-3 font-heading">3. How We Use Your Information</h2>
 <p className="mb-2">We use information that we collect about you or that you provide to us, including any personal information:</p>
 <ul className="list-disc ml-5 space-y-1">
 <li>To present our Website and its contents to you.</li>
 <li>To provide you with information, products, or services that you request from us.</li>
 <li>To fulfill any other purpose for which you provide it.</li>
 <li>To carry out our obligations and enforce our rights arising from any contracts entered into between you and us.</li>
 <li>To notify you about changes to our Website or any products or services we offer or provide though it.</li>
 </ul>
 </section>
 </AnimatedContent>

 <AnimatedContent type="fade"delay={0.4}>
 <section>
 <h2 className="text-xl font-semibold text-[#001F3F] dark:text-white mb-3 font-heading">4. Disclosure of Your Information</h2>
 <p>We may disclose aggregated information about our users, and information that does not identify any individual, without restriction. We may disclose personal information that we collect or you provide as described in this privacy policy to our subsidiaries and affiliates, to contractors, service providers, and other third parties we use to support our business.</p>
 </section>
 </AnimatedContent>

 <AnimatedContent type="fade"delay={0.5}>
 <section>
 <h2 className="text-xl font-semibold text-[#001F3F] dark:text-white mb-3 font-heading">5. Contact Information</h2>
 <p>To ask questions or comment about this privacy policy and our privacy practices, contact us at: Info@unifiedhive.com</p>
 </section>
 </AnimatedContent>
 </div>
 </div>
 </>
 );
};

export default PrivacyPolicyPage;