import type { MetadataRoute } from 'next'

import { getAbsoluteURL } from '@/utilities/seo'

export default function robots(): MetadataRoute.Robots {
  return {
    host: getAbsoluteURL('/'),
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/next/'],
      },
    ],
    sitemap: getAbsoluteURL('/sitemap.xml'),
  }
}
