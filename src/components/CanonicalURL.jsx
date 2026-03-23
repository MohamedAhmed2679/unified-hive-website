import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';

/**
 * CanonicalURL — Adds <link rel="canonical"> to every page via react-helmet.
 * Prevents duplicate content issues with www/non-www and trailing slashes.
 * 
 * Place inside <BrowserRouter> in App.jsx.
 */
export default function CanonicalURL() {
  const location = useLocation();
  const baseUrl = 'https://www.unifiedhive.com';
  const canonicalUrl = `${baseUrl}${location.pathname}`.replace(/\/+$/, '') || baseUrl;

  return (
    <Helmet>
      <link rel="canonical" href={canonicalUrl} />
    </Helmet>
  );
}
