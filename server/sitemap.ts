import { Router, Request } from 'express';

const router = Router();

// Paths without language prefix (used to generate both / and /fr/*)
const STATIC_PATHS: { path: string; priority: string; changefreq: string }[] = [
  { path: '', priority: '1.0', changefreq: 'weekly' },
  { path: '/about', priority: '0.9', changefreq: 'monthly' },
  { path: '/approche', priority: '0.8', changefreq: 'monthly' },
  { path: '/resources', priority: '0.9', changefreq: 'weekly' },
  { path: '/contact', priority: '0.7', changefreq: 'monthly' },
  { path: '/leo', priority: '0.7', changefreq: 'monthly' },
  { path: '/services', priority: '0.9', changefreq: 'weekly' },
  { path: '/services/tech', priority: '0.8', changefreq: 'monthly' },
  { path: '/services/studio', priority: '0.8', changefreq: 'monthly' },
  { path: '/services/agency', priority: '0.8', changefreq: 'monthly' },
  { path: '/services/consulting', priority: '0.8', changefreq: 'monthly' },
  { path: '/privacy-policy', priority: '0.4', changefreq: 'yearly' },
  { path: '/nukleo-time-privacy', priority: '0.4', changefreq: 'yearly' },
  { path: '/terms-of-service', priority: '0.4', changefreq: 'yearly' },
  { path: '/cookie-policy', priority: '0.4', changefreq: 'yearly' },
  { path: '/faq', priority: '0.6', changefreq: 'monthly' },
];

const RESOURCE_ARTICLE_IDS = [
  'agentic-ai-playbook',
  'pilot-to-scale',
  'agentic-marketing',
  'building-agentic-systems',
  'roi-ai-investment',
];

function getBaseUrl(req: Request): string {
  const siteUrl = process.env.SITE_URL;
  if (siteUrl) return siteUrl.replace(/\/$/, '');
  const host = req.get('host');
  const protocol = req.get('x-forwarded-proto') || req.protocol || 'http';
  return host ? `${protocol}://${host}` : 'https://nukleo.digital';
}

// Generate sitemap.xml
router.get('/sitemap.xml', (req, res) => {
  const baseUrl = getBaseUrl(req);
  const currentDate = new Date().toISOString().split('T')[0];

  const urls: string[] = [];

  // Static pages: one <url> per path with loc (EN), alternates EN/FR and x-default
  for (const { path, priority, changefreq } of STATIC_PATHS) {
    const enPath = path || '/';
    const frPath = path ? `/fr${path}` : '/fr';
    const locEn = `${baseUrl}${enPath}`;
    const locFr = `${baseUrl}${frPath}`;

    urls.push(`  <url>
    <loc>${locEn}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${locEn}"/>
    <xhtml:link rel="alternate" hreflang="fr" href="${locFr}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${locEn}"/>
  </url>`);

    urls.push(`  <url>
    <loc>${locFr}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${locEn}"/>
    <xhtml:link rel="alternate" hreflang="fr" href="${locFr}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${locEn}"/>
  </url>`);
  }

  // Resource articles
  for (const id of RESOURCE_ARTICLE_IDS) {
    const enPath = `/resources/${id}`;
    const frPath = `/fr/resources/${id}`;
    const locEn = `${baseUrl}${enPath}`;
    const locFr = `${baseUrl}${frPath}`;

    urls.push(`  <url>
    <loc>${locEn}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${locEn}"/>
    <xhtml:link rel="alternate" hreflang="fr" href="${locFr}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${locEn}"/>
  </url>`);

    urls.push(`  <url>
    <loc>${locFr}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${locEn}"/>
    <xhtml:link rel="alternate" hreflang="fr" href="${locFr}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${locEn}"/>
  </url>`);
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>`;

  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=3600');
  res.send(sitemap);
});

// robots.txt
router.get('/robots.txt', (req, res) => {
  const baseUrl = getBaseUrl(req);

  const robots = `# Nukleo Digital
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

Sitemap: ${baseUrl}/sitemap.xml
`;

  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=86400');
  res.send(robots);
});

export default router;
