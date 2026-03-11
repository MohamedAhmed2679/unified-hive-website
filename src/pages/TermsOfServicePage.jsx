import React from 'react';
import { Helmet } from 'react-helmet';
import AnimatedContent from '@/components/AnimatedContent';

const TermsOfServicePage = () => {
 return (
 <>
 <Helmet>
 <title>Terms of Service | Unifiedhive</title>
 <meta name="description"content="Terms of Service for using Unifiedhive website and services."/>
 </Helmet>
 <div className="pt-24 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
 <AnimatedContent type="text">
 <h1 className="text-3xl font-bold text-[#4A142C] mb-8 font-heading">Terms of Service</h1>
 <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">Last updated: November 22, 2025</p>
 </AnimatedContent>
 
 <div className="space-y-6 text-gray-700 dark:text-gray-300">
 <AnimatedContent type="fade"delay={0.1}>
 <section>
 <h2 className="text-xl font-semibold text-[#4A142C] mb-3 font-heading">1. Acceptance of the Terms of Service</h2>
 <p>These terms of service are entered into by and between You and Unifiedhive ("Company,""we,"or"us"). The following terms and conditions, together with any documents they expressly incorporate by reference (collectively,"Terms of Service"), govern your access to and use of Unifiedhive.com, including any content, functionality, and services offered on or through Unifiedhive.com (the"Website").</p>
 </section>
 </AnimatedContent>
 
 <AnimatedContent type="fade"delay={0.2}>
 <section>
 <h2 className="text-xl font-semibold text-[#4A142C] mb-3 font-heading">2. Changes to the Terms of Service</h2>
 <p>We may revise and update these Terms of Service from time to time in our sole discretion. All changes are effective immediately when we post them. Your continued use of the Website following the posting of revised Terms of Service means that you accept and agree to the changes.</p>
 </section>
 </AnimatedContent>

 <AnimatedContent type="fade"delay={0.3}>
 <section>
 <h2 className="text-xl font-semibold text-[#4A142C] mb-3 font-heading">3. Accessing the Website and Account Security</h2>
 <p>We reserve the right to withdraw or amend this Website, and any service or material we provide on the Website, in our sole discretion without notice. We will not be liable if for any reason all or any part of the Website is unavailable at any time or for any period.</p>
 </section>
 </AnimatedContent>

 <AnimatedContent type="fade"delay={0.4}>
 <section>
 <h2 className="text-xl font-semibold text-[#4A142C] mb-3 font-heading">4. Intellectual Property Rights</h2>
 <p>The Website and its entire contents, features, and functionality (including but not limited to all information, software, text, displays, images, video, and audio, and the design, selection, and arrangement thereof) are owned by the Company, its licensors, or other providers of such material and are protected by United States and international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.</p>
 </section>
 </AnimatedContent>

 <AnimatedContent type="fade"delay={0.5}>
 <section>
 <h2 className="text-xl font-semibold text-[#4A142C] mb-3 font-heading">5. Governing Law</h2>
 <p>All matters relating to the Website and these Terms of Service, and any dispute or claim arising therefrom or related thereto (in each case, including non-contractual disputes or claims), shall be governed by and construed in accordance with the internal laws of the State of Texas without giving effect to any choice or conflict of law provision or rule.</p>
 </section>
 </AnimatedContent>
 </div>
 </div>
 </>
 );
};

export default TermsOfServicePage;