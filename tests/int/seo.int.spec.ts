import { afterEach, describe, expect, it } from 'vitest'

import robots from '@/app/robots'
import sitemap from '@/app/sitemap'
import { getServerSideURL } from '@/utilities/getURL'
import {
  createLocalBusinessStructuredData,
  createPageMetadata,
  createTouristAttractionStructuredData,
  createWebsiteStructuredData,
  getAbsoluteURL,
} from '@/utilities/seo'

const ORIGINAL_ENV = {
  NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
  VERCEL_PROJECT_PRODUCTION_URL: process.env.VERCEL_PROJECT_PRODUCTION_URL,
}

const mutableEnv = process.env as Partial<NodeJS.ProcessEnv>

const resetEnv = () => {
  if (ORIGINAL_ENV.NEXT_PUBLIC_SERVER_URL) {
    process.env.NEXT_PUBLIC_SERVER_URL = ORIGINAL_ENV.NEXT_PUBLIC_SERVER_URL
  } else {
    delete mutableEnv.NEXT_PUBLIC_SERVER_URL
  }

  if (ORIGINAL_ENV.VERCEL_PROJECT_PRODUCTION_URL) {
    process.env.VERCEL_PROJECT_PRODUCTION_URL = ORIGINAL_ENV.VERCEL_PROJECT_PRODUCTION_URL
  } else {
    delete mutableEnv.VERCEL_PROJECT_PRODUCTION_URL
  }
}

describe('SEO helpers', () => {
  afterEach(() => {
    resetEnv()
  })

  it('prefers NEXT_PUBLIC_SERVER_URL and trims trailing slashes', () => {
    process.env.NEXT_PUBLIC_SERVER_URL = 'https://www.example.com/'
    delete mutableEnv.VERCEL_PROJECT_PRODUCTION_URL

    expect(getServerSideURL()).toBe('https://www.example.com')
    expect(getAbsoluteURL('/about')).toBe('https://www.example.com/about')
  })

  it('falls back to the Vercel production URL when a custom domain is not configured', () => {
    delete mutableEnv.NEXT_PUBLIC_SERVER_URL
    process.env.VERCEL_PROJECT_PRODUCTION_URL = 'preview.example.vercel.app'

    expect(getServerSideURL()).toBe('https://preview.example.vercel.app')
  })

  it('returns localhost only when no production origin is configured', () => {
    delete mutableEnv.NEXT_PUBLIC_SERVER_URL
    delete mutableEnv.VERCEL_PROJECT_PRODUCTION_URL

    expect(getServerSideURL()).toBe('http://localhost:3000')
  })

  it('builds page metadata with an absolute canonical and no default keyword stuffing', () => {
    process.env.NEXT_PUBLIC_SERVER_URL = 'https://www.example.com'

    const metadata = createPageMetadata({
      title: 'Farm Tours in Tanga',
      description: 'Book a guided farm tour in Tanga.',
      path: '/experiences',
    })

    expect(metadata.alternates?.canonical).toBe('https://www.example.com/experiences')
    expect(metadata.keywords).toBeUndefined()
    expect(metadata.openGraph?.url).toBe('https://www.example.com/experiences')
  })

  it('generates runtime robots and sitemap outputs for the configured domain', () => {
    process.env.NEXT_PUBLIC_SERVER_URL = 'https://www.example.com'

    const robotsFile = robots()
    const sitemapEntries = sitemap()

    expect(robotsFile.host).toBe('https://www.example.com/')
    expect(robotsFile.sitemap).toBe('https://www.example.com/sitemap.xml')
    expect(sitemapEntries.map((entry) => entry.url)).toEqual([
      'https://www.example.com/',
      'https://www.example.com/about',
      'https://www.example.com/contact',
      'https://www.example.com/experiences',
    ])
    expect(JSON.stringify({ robotsFile, sitemapEntries })).not.toContain('localhost')
  })

  it('creates website, local business, and tourist attraction schema with the live origin', () => {
    process.env.NEXT_PUBLIC_SERVER_URL = 'https://www.example.com'

    const website = createWebsiteStructuredData()
    const localBusiness = createLocalBusinessStructuredData()
    const touristAttraction = createTouristAttractionStructuredData()

    expect(website['@type']).toBe('WebSite')
    expect(website.url).toBe('https://www.example.com/')
    expect(localBusiness['@type']).toBe('LocalBusiness')
    expect(localBusiness.url).toBe('https://www.example.com/')
    expect(localBusiness.hasMap).toBeDefined()
    expect(localBusiness.openingHoursSpecification).toBeDefined()
    expect(touristAttraction['@type']).toBe('TouristAttraction')
    expect(touristAttraction.url).toBe('https://www.example.com/')
  })
})
