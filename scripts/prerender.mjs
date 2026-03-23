/**
 * Pre-render script for Unifiedhive SPA
 * 
 * Runs AFTER `vite build`. Spins up a static server on the dist/ folder,
 * then uses Puppeteer to visit each route and save the fully-rendered HTML.
 * This makes the SPA fully crawlable by search engines.
 */

import { createServer } from 'http';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, extname, dirname } from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST_DIR = join(__dirname, '..', 'dist');
const PORT = 4173;

// All public routes to pre-render
const ROUTES = [
  '/',
  '/solutions',
  '/about',
  '/contact',
  '/book-demo',
  '/method',
  '/outcomes',
  '/blog',
  '/resources',
  '/trust-center',
  '/pricing-engage',
  '/privacy',
  '/terms',
  '/cookies',
  '/login',
];

// MIME types for the static server
const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
  '.webp': 'image/webp',
};

/**
 * Create a minimal static file server for the dist directory
 */
function createStaticServer() {
  return new Promise((resolve) => {
    const server = createServer((req, res) => {
      let filePath = join(DIST_DIR, req.url === '/' ? '/index.html' : req.url);
      
      // SPA fallback: serve index.html for routes without file extensions
      if (!extname(filePath) || !existsSync(filePath)) {
        filePath = join(DIST_DIR, 'index.html');
      }

      try {
        const content = readFileSync(filePath);
        const ext = extname(filePath);
        res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
        res.end(content);
      } catch {
        // Fallback to index.html for any missing files (SPA behavior)
        try {
          const fallback = readFileSync(join(DIST_DIR, 'index.html'));
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(fallback);
        } catch {
          res.writeHead(404);
          res.end('Not found');
        }
      }
    });

    server.listen(PORT, () => {
      console.log(`📦 Static server running on http://localhost:${PORT}`);
      resolve(server);
    });
  });
}

/**
 * Pre-render a single route
 */
async function prerenderRoute(page, route) {
  const url = `http://localhost:${PORT}${route}`;
  console.log(`  🔄 Rendering ${route}...`);

  try {
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });

    // Wait for React to finish rendering (root div has content)
    await page.waitForFunction(
      () => {
        const root = document.getElementById('root');
        return root && root.innerHTML.length > 100;
      },
      { timeout: 15000 }
    );

    // Small extra wait for any animations/lazy images to settle
    await new Promise(r => setTimeout(r, 500));

    // Get the full rendered HTML
    let html = await page.content();

    // Remove any dev-only scripts that shouldn't be in pre-rendered output
    html = html.replace(/<script[^>]*type="module"[^>]*>[\s\S]*?<\/script>/gi, (match) => {
      // Keep the main entry point script, remove inline dev scripts
      if (match.includes('src="/src/main.jsx"') || match.includes('src="/assets/')) {
        return match;
      }
      // Keep JSON-LD structured data
      if (match.includes('application/ld+json')) {
        return match;
      }
      return match; // Keep all scripts — they're needed for hydration
    });

    // Determine output path
    const outputDir = route === '/'
      ? DIST_DIR
      : join(DIST_DIR, route);

    if (!existsSync(outputDir)) {
      mkdirSync(outputDir, { recursive: true });
    }

    const outputPath = join(outputDir, 'index.html');
    writeFileSync(outputPath, html, 'utf-8');
    
    console.log(`  ✅ Saved ${route} → ${outputPath.replace(DIST_DIR, 'dist')}`);
    return true;
  } catch (error) {
    console.error(`  ❌ Failed to render ${route}: ${error.message}`);
    return false;
  }
}

/**
 * Main pre-rendering pipeline
 */
async function main() {
  console.log('\n🚀 Starting pre-render pipeline...\n');

  // Verify dist exists
  if (!existsSync(DIST_DIR)) {
    console.error('❌ dist/ directory not found. Run `vite build` first.');
    process.exit(1);
  }

  // Start static server
  const server = await createStaticServer();

  // Launch Puppeteer
  console.log('🌐 Launching headless browser...\n');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
    ],
  });

  const page = await browser.newPage();
  
  // Set viewport and user agent for consistent rendering
  await page.setViewport({ width: 1280, height: 800 });
  await page.setUserAgent('Mozilla/5.0 (compatible; UnifiedhivePrerenderer/1.0)');

  // Suppress console output from page
  page.on('console', () => {});

  let successes = 0;
  let failures = 0;

  for (const route of ROUTES) {
    const result = await prerenderRoute(page, route);
    if (result) successes++;
    else failures++;
  }

  // Cleanup
  await browser.close();
  server.close();

  console.log(`\n📊 Pre-render complete: ${successes} succeeded, ${failures} failed out of ${ROUTES.length} routes\n`);

  if (failures > 0) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('❌ Pre-render pipeline failed:', err);
  process.exit(1);
});
