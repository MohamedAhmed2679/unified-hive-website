import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from '@/App';
import '@/index.css';

const rootElement = document.getElementById('root');

const app = <App />;

if (rootElement.hasChildNodes()) {
  // Pre-rendered HTML exists — hydrate (attach React to existing DOM)
  hydrateRoot(rootElement, app);
} else {
  // No pre-rendered HTML — render from scratch (dev mode)
  createRoot(rootElement).render(app);
}