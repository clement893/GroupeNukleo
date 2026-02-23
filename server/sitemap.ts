import { Router } from 'express';
import { allTerms } from '../client/src/data/glossary';

const router = Router();

// Generate sitemap.xml
router.get('/sitemap.xml', (req, res) => {
  const baseUrl = process.env.SITE_URL || 'https://nukleo.digital';
  const currentDate = new Date().toISOString().split('T')[0];

  // Resource articles
  const resourceArticles = [
    'agentic-ai-playbook',
    'pilot-to-scale',
    'agentic-marketing',
    'building-agentic-systems',
    'roi-ai-investment',
  ];

  // Static pages (English)
  const staticPagesEn = [
    { url: '', priority: '1.0', changefreq: 'weekly' },
    { url: '/about', priority: '0.8', changefreq: 'monthly' },
    { url: '/expertise', priority: '0.8', changefreq: 'monthly' },
    { url: '/projects', priority: '0.7', changefreq: 'weekly' },
    { url: '/resources', priority: '0.9', changefreq: 'weekly' },
    { url: '/glossary', priority: '0.9', changefreq: 'weekly' },
    { url: '/radar', priority: '0.8', changefreq: 'monthly' },
    { url: '/ai-readiness', priority: '0.7', changefreq: 'monthly' },
    { url: '/contact', priority: '0.6', changefreq: 'monthly' },
    { url: '/manifesto', priority: '0.7', changefreq: 'monthly' },
    { url: '/start-project', priority: '0.8', changefreq: 'monthly' },
    { url: '/services', priority: '0.9', changefreq: 'weekly' },
    { url: '/services/ai-strategy-marketing', priority: '0.8', changefreq: 'monthly' },
    { url: '/services/digital-platforms', priority: '0.8', changefreq: 'monthly' },
    { url: '/services/intelligent-operations', priority: '0.8', changefreq: 'monthly' },
    { url: '/services/agentic-ai', priority: '0.8', changefreq: 'monthly' },
    { url: '/services/digital-transformation', priority: '0.8', changefreq: 'monthly' },
  ];

  // Static pages (French)
  const staticPagesFr = [
    { url: '/fr', priority: '1.0', changefreq: 'weekly' },
    { url: '/fr/about', priority: '0.8', changefreq: 'monthly' },
    { url: '/fr/expertise', priority: '0.8', changefreq: 'monthly' },
    { url: '/fr/projects', priority: '0.7', changefreq: 'weekly' },
    { url: '/fr/resources', priority: '0.9', changefreq: 'weekly' },
    { url: '/fr/glossary', priority: '0.9', changefreq: 'weekly' },
    { url: '/fr/radar', priority: '0.8', changefreq: 'monthly' },
    { url: '/fr/ai-readiness', priority: '0.7', changefreq: 'monthly' },
    { url: '/fr/contact', priority: '0.6', changefreq: 'monthly' },
    { url: '/fr/manifesto', priority: '0.7', changefreq: 'monthly' },
    { url: '/fr/start-project', priority: '0.8', changefreq: 'monthly' },
    { url: '/fr/services', priority: '0.9', changefreq: 'weekly' },
    { url: '/fr/services/ai-strategy-marketing', priority: '0.8', changefreq: 'monthly' },
    { url: '/fr/services/digital-platforms', priority: '0.8', changefreq: 'monthly' },
    { url: '/fr/services/intelligent-operations', priority: '0.8', changefreq: 'monthly' },
    { url: '/fr/services/agentic-ai', priority: '0.8', changefreq: 'monthly' },
    { url: '/fr/services/digital-transformation', priority: '0.8', changefreq: 'monthly' },
    { url: '/fr/clients', priority: '0.7', changefreq: 'monthly' },
    { url: '/fr/testimonials', priority: '0.7', changefreq: 'monthly' },
    { url: '/fr/faq', priority: '0.6', changefreq: 'monthly' },
    { url: '/fr/leo', priority: '0.7', changefreq: 'monthly' },
  ];

  // Resource articles (English)
  const resourcePagesEn = resourceArticles.map(id => ({
    url: `/resources/${id}`,
    priority: '0.8',
    changefreq: 'monthly',
  }));

  // Resource articles (French)
  const resourcePagesFr = resourceArticles.map(id => ({
    url: `/fr/resources/${id}`,
    priority: '0.8',
    changefreq: 'monthly',
  }));

  // Glossary term pages (English)
  const glossaryPagesEn = allTerms.map(term => ({
    url: `/glossary/${term.id}`,
    priority: '0.8',
    changefreq: 'monthly',
  }));

  // Glossary term pages (French)
  const glossaryPagesFr = allTerms.map(term => ({
    url: `/fr/glossary/${term.id}`,
    priority: '0.8',
    changefreq: 'monthly',
  }));

  const allPages = [
    ...staticPagesEn,
    ...staticPagesFr,
    ...resourcePagesEn,
    ...resourcePagesFr,
    ...glossaryPagesEn,
    ...glossaryPagesFr,
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${allPages
  .map(
    page => {
      // Determine alternate language URL
      const isFr = page.url.startsWith('/fr');
      const enUrl = isFr ? (page.url.replace('/fr', '') || '/') : page.url;
      const frUrl = isFr ? page.url : `/fr${page.url}`;
      
      // Ensure URLs are properly formatted (no double slashes)
      const cleanEnUrl = enUrl === '/' ? '' : enUrl;
      const cleanFrUrl = frUrl === '/fr' ? '/fr' : frUrl;
      
      return `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <xhtml:link rel="alternate" hreflang="${isFr ? 'fr' : 'en'}" href="${baseUrl}${page.url}" />
    <xhtml:link rel="alternate" hreflang="${isFr ? 'en' : 'fr'}" href="${baseUrl}${isFr ? cleanEnUrl : cleanFrUrl}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}${cleanEnUrl || '/'}" />
  </url>`;
    }
  )
  .join('\n')}
</urlset>`;

  res.header('Content-Type', 'application/xml; charset=utf-8');
  res.header('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour
  res.send(sitemap);
});

// Generate robots.txt
router.get('/robots.txt', (req, res) => {
  const baseUrl = process.env.SITE_URL || 'https://nukleo.digital';
  
  const robots = `# Nukleo Digital - Robots.txt
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

# Sitemaps
Sitemap: ${baseUrl}/sitemap.xml

# Crawl-delay for bots
User-agent: *
Crawl-delay: 1

# Block specific bots if needed
# User-agent: BadBot
# Disallow: /
`;

  res.header('Content-Type', 'text/plain');
  res.send(robots);
});

export default router;
