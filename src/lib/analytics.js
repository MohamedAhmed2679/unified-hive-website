import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Unifiedhive Analytics Helper (UHAnalytics)
 * wrapper for GTM/GA4 events
 */
export const UHAnalytics = {
  // Track a specific event (click, form_submit, etc.)
  track: (eventName, params = {}) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, params);
      // console.log(`[UHAnalytics] Event: ${eventName}`, params);
    }
  },

  // Helper for clicks
  trackClick: (label, category = 'ui_interaction') => {
    UHAnalytics.track('click', {
      event_category: category,
      event_label: label
    });
  },

  // Helper for form submissions
  trackForm: (formName, status = 'success') => {
    UHAnalytics.track('form_submit', {
      form_name: formName,
      status: status
    });
  },

  // Initialize IntersectionObserver for section tracking
  initSectionTracking: () => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute('data-analytics-view');
          if (sectionId) {
            UHAnalytics.track('section_view', { section_id: sectionId });
            // Optional: Unobserve after first view if we only care about unique views
            // observer.unobserve(entry.target);
          }
        }
      });
    }, { threshold: 0.5 }); // Trigger when 50% visible

    // Find all trackable sections
    document.querySelectorAll('[data-analytics-view]').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }
};

/**
 * Hook to track page views on route change
 */
export const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: location.pathname + location.search,
        page_title: document.title
      });
    }
    
    // Re-initialize section tracking on page change
    const cleanup = UHAnalytics.initSectionTracking();
    return () => {
      if (cleanup) cleanup();
    };
  }, [location]);
};