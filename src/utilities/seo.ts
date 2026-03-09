import type { Metadata } from 'next'

import {
  ADDRESS,
  EMAILS,
  GOOGLE_MAPS_LINK,
  INSTAGRAM_LINK,
  SEO_KEYWORDS,
  SITE_ALIASES,
  SITE_TITLE,
} from '@/utilities/constants/common'
import { getServerSideURL } from '@/utilities/getURL'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

export const SITE_URL = getServerSideURL()
export const SITE_ORIGIN = new URL(SITE_URL)

export const DEFAULT_META_DESCRIPTION =
  'Explore farm tours, coffee tasting, and nature experiences at Tanga Banana Garden in Tanga, Tanzania.'

const DEFAULT_SOCIAL_IMAGE = '/android-chrome-512x512.png'

type CreatePageMetadataArgs = {
  absoluteTitle?: string
  title: string
  description: string
  path: string
  keywords?: string[]
}

type FaqItem = {
  answer: string
  question: string
}

export const getAbsoluteURL = (path = '/') => new URL(path, SITE_ORIGIN).toString()

export const createPageMetadata = ({
  absoluteTitle,
  title,
  description,
  path,
  keywords = [],
}: CreatePageMetadataArgs): Metadata => {
  const resolvedKeywords = Array.from(new Set([...SEO_KEYWORDS, ...keywords]))
  const socialTitle = `${SITE_TITLE} | ${title}`

  return {
    title: absoluteTitle ? { absolute: absoluteTitle } : title,
    description,
    alternates: {
      canonical: path,
    },
    keywords: resolvedKeywords,
    openGraph: mergeOpenGraph({
      title: socialTitle,
      description,
      url: getAbsoluteURL(path),
    }),
    twitter: {
      card: 'summary_large_image',
      description,
      images: [DEFAULT_SOCIAL_IMAGE],
      title: socialTitle,
    },
  }
}

export const websiteStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_TITLE,
  alternateName: [...SITE_ALIASES],
  url: getAbsoluteURL('/'),
  description: DEFAULT_META_DESCRIPTION,
  inLanguage: 'en',
}

export const businessStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'TouristAttraction',
  name: SITE_TITLE,
  alternateName: [...SITE_ALIASES],
  description: DEFAULT_META_DESCRIPTION,
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'TZ',
    addressLocality: 'Tanga',
    streetAddress: ADDRESS,
  },
  email: EMAILS.mail,
  hasMap: GOOGLE_MAPS_LINK,
  image: [getAbsoluteURL(DEFAULT_SOCIAL_IMAGE)],
  sameAs: [GOOGLE_MAPS_LINK, INSTAGRAM_LINK],
  url: getAbsoluteURL('/'),
}

export const createBreadcrumbStructuredData = (
  items: Array<{ name: string; path: string }>,
) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    item: getAbsoluteURL(item.path),
    name: item.name,
    position: index + 1,
  })),
})

export const createFaqStructuredData = (items: FaqItem[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((item) => ({
    '@type': 'Question',
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
    name: item.question,
  })),
})
