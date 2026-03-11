import React, { Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import PageTransition from '@/components/PageTransition';

const HomePage = lazy(() => import('@/pages/HomePage'));
const SolutionsPage = lazy(() => import('@/pages/SolutionsPage'));
const SolutionTemplate = lazy(() => import('@/pages/SolutionTemplate')); 
const AboutPage = lazy(() => import('@/pages/AboutPage'));
const ContactPage = lazy(() => import('@/pages/ContactPage'));
const BookDemoPage = lazy(() => import('@/pages/BookDemoPage'));
const PrivacyPolicyPage = lazy(() => import('@/pages/PrivacyPolicyPage'));
const TermsOfServicePage = lazy(() => import('@/pages/TermsOfServicePage'));
const CookiePolicyPage = lazy(() => import('@/pages/CookiePolicyPage'));
const LoginPage = lazy(() => import('@/pages/LoginPage'));
const SignUpPage = lazy(() => import('@/pages/SignUpPage'));
const DashboardPage = lazy(() => import('@/pages/DashboardPage'));
const BlogPage = lazy(() => import('@/pages/BlogPage'));

const MethodPage = lazy(() => import('@/pages/MethodPage'));
const ResourcesPage = lazy(() => import('@/pages/ResourcesPage'));
const GuideTemplate = lazy(() => import('@/pages/GuideTemplate'));
const TrustCenterPage = lazy(() => import('@/pages/TrustCenterPage'));
const CaseStudyTemplate = lazy(() => import('@/pages/CaseStudyTemplate'));
const PricingEngagePage = lazy(() => import('@/pages/PricingEngagePage'));
const OutcomesPage = lazy(() => import('@/pages/OutcomesPage'));

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={
        <div className="min-h-[80vh] flex items-center justify-center bg-transparent">
          <div className="w-10 h-10 rounded-full border-4 border-[#06B6D4]/20 border-t-[#06B6D4] animate-spin"></div>
        </div>
      }>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
          
          {/* Solution Routes */}
          <Route path="/solutions" element={<PageTransition><SolutionsPage /></PageTransition>} />
          <Route path="/solutions/:slug" element={<PageTransition><SolutionTemplate /></PageTransition>} />

          <Route path="/method" element={<PageTransition><MethodPage /></PageTransition>} />
          <Route path="/outcomes" element={<PageTransition><OutcomesPage /></PageTransition>} />
          
          {/* Pricing Routes */}
          <Route path="/pricing-engage" element={<PageTransition><PricingEngagePage /></PageTransition>} />

          {/* Resource Routes */}
          <Route path="/resources" element={<PageTransition><ResourcesPage /></PageTransition>} />
          <Route path="/resources/:slug" element={<PageTransition><GuideTemplate /></PageTransition>} />
          
          <Route path="/trust-center" element={<PageTransition><TrustCenterPage /></PageTransition>} />
          <Route path="/case-studies/:slug" element={<PageTransition><CaseStudyTemplate /></PageTransition>} />

          <Route path="/about" element={<PageTransition><AboutPage /></PageTransition>} />
          <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
          <Route path="/book-demo" element={<PageTransition><BookDemoPage /></PageTransition>} />
          <Route path="/login" element={<PageTransition><LoginPage /></PageTransition>} />
          <Route path="/signup" element={<PageTransition><SignUpPage /></PageTransition>} />
          <Route path="/dashboard" element={<PageTransition><DashboardPage /></PageTransition>} />
          <Route path="/blog" element={<PageTransition><BlogPage /></PageTransition>} />
          <Route path="/privacy" element={<PageTransition><PrivacyPolicyPage /></PageTransition>} />
          <Route path="/terms" element={<PageTransition><TermsOfServicePage /></PageTransition>} />
          <Route path="/cookies" element={<PageTransition><CookiePolicyPage /></PageTransition>} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;