const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL
  ? process.env.NEXT_PUBLIC_SERVER_URL
  : process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'https://example.com'

const normalizePath = (path) => {
  if (path === '/') return path

  return path.replace(/\/+$/, '')
}

const STATIC_PAGE_PATHS = ['/', '/about/', '/contact/', '/experiences/']

const SITEMAP_FIELDS = Array.from(new Set(STATIC_PAGE_PATHS.map(normalizePath))).map((path) => ({
  loc: path,
  lastmod: new Date().toISOString(),
  changefreq: 'weekly',
  priority: path === '/' ? 1 : 0.7,
}))

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  exclude: ['/*'],
  additionalPaths: async () => SITEMAP_FIELDS,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: ['/admin/*', '/api/*', '/next/*'],
      },
    ],
  },
}
