import type { MetadataRoute } from 'next'

import { getAbsoluteURL } from '@/utilities/seo'

const STATIC_ROUTES = ['/', '/about', '/contact', '/experiences'] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return STATIC_ROUTES.map((path) => ({
    lastModified,
    url: getAbsoluteURL(path),
  }))
}
