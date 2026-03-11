import React from 'react';
import { Helmet } from 'react-helmet';
import AnimatedContent from '@/components/AnimatedContent';

const CookiePolicyPage = () => {
 return (
 <>
 <Helmet>
 <title>Cookie Policy | Unifiedhive</title>
 <meta name="description"content="Cookie Policy explaining how Unifiedhive uses cookies."/>
 </Helmet>
 <div className="pt-24 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
 <AnimatedContent type="text">
 <h1 className="text-3xl font-bold text-[#4A142C] mb-8 font-heading">Cookie Policy</h1>
 <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">Last updated: November 22, 2025</p>
 </AnimatedContent>
 
 <div className="space-y-6 text-gray-700 dark:text-gray-300">
 <AnimatedContent type="fade"delay={0.1}>
 <section>
 <h2 className="text-xl font-semibold text-[#4A142C] mb-3 font-heading">1. What Are Cookies</h2>
 <p>Cookies are small text files that are placed on your computer or mobile device by websites that you visit. They are widely used in order to make websites work, or work more efficiently, as well as to provide information to the owners of the site.</p>
 </section>
 </AnimatedContent>
 
 <AnimatedContent type="fade"delay={0.2}>
 <section>
 <h2 className="text-xl font-semibold text-[#4A142C] mb-3 font-heading">2. How We Use Cookies</h2>
 <p className="mb-2">We use cookies for a variety of reasons detailed below. Unfortunately, in most cases there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to this site.</p>
 <ul className="list-disc ml-5 space-y-1">
 <li><strong>Necessary Cookies:</strong> These cookies are essential for you to browse the website and use its features, such as accessing secure areas of the site.</li>
 <li><strong>Functionality Cookies:</strong> These cookies allow a website to remember choices you have made in the past, like what language you prefer.</li>
 <li><strong>Analytics Cookies:</strong> We use these cookies to track information about how the Website is used so that we can make improvements. We may also use third-party analytics cookies.</li>
 </ul>
 </section>
 </AnimatedContent>

 <AnimatedContent type="fade"delay={0.3}>
 <section>
 <h2 className="text-xl font-semibold text-[#4A142C] mb-3 font-heading">3. Disabling Cookies</h2>
 <p>You can prevent the setting of cookies by adjusting the settings on your browser (see your browser Help for how to do this). Be aware that disabling cookies will affect the functionality of this and many other websites that you visit. Disabling cookies will usually result in also disabling certain functionality and features of the this site.</p>
 </section>
 </AnimatedContent>

 <AnimatedContent type="fade"delay={0.4}>
 <section>
 <h2 className="text-xl font-semibold text-[#4A142C] mb-3 font-heading">4. Third Party Cookies</h2>
 <p>In some special cases we also use cookies provided by trusted third parties. The following section details which third party cookies you might encounter through this site.</p>
 <ul className="list-disc ml-5 mt-2">
 <li>This site uses Google Analytics which is one of the most widespread and trusted analytics solutions on the web for helping us to understand how you use the site and ways that we can improve your experience.</li>
 <li>We also use social media buttons and/or plugins on this site that allow you to connect with your social network in various ways.</li>
 </ul>
 </section>
 </AnimatedContent>
 </div>
 </div>
 </>
 );
};

export default CookiePolicyPage;