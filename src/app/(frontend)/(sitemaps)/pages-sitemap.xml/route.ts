import { getServerSideSitemap } from 'next-sitemap'
import { unstable_cache } from 'next/cache'
import { routes } from '@/routes'
import { getServerSideURL } from '@/utilities/getURL'

const STATIC_PAGE_PATHS = [routes.home, routes.about, routes.contact, routes.experiences, '/posts']

const normalizePath = (path: string) => {
  if (path === '/') return path

  return path.replace(/\/+$/, '')
}

const getPagesSitemap = unstable_cache(
  async () => {
    const siteURL = getServerSideURL()
    const dateFallback = new Date().toISOString()

    return Array.from(new Set(STATIC_PAGE_PATHS.map(normalizePath))).map((path) => ({
      loc: `${siteURL}${path === '/' ? '' : path}`,
      lastmod: dateFallback,
    }))
  },
  ['pages-sitemap'],
  {
    tags: ['pages-sitemap'],
  },
)

export async function GET() {
  const sitemap = await getPagesSitemap()

  return getServerSideSitemap(sitemap)
}
