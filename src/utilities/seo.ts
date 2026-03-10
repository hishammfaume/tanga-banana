import type { Metadata } from 'next'

import {
  ADDRESS,
  BUSINESS_COORDINATES,
  BUSINESS_OPENING_HOURS,
  EMAILS,
  GOOGLE_MAPS_LINK,
  INSTAGRAM_LINK,
  PHONE_NUMBER,
  SITE_ALIASES,
  SITE_TITLE,
} from '@/utilities/constants/common'
import { getSiteOriginURL } from '@/utilities/getURL'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

export const DEFAULT_META_DESCRIPTION =
  'Book farm tours in Tanga for banana grove walks, coffee tasting, spice experiences, school visits, and peaceful countryside time at Tanga Banana Garden.'

export const DEFAULT_SOCIAL_IMAGE = '/android-chrome-512x512.png'

type CreatePageMetadataArgs = {
  absoluteTitle?: string
  title: string
  description: string
  path: string
  keywords?: string[]
}

export type FaqItem = {
  answer: string
  question: string
}

const PLACEHOLDER_PHONE_VALUES = new Set(['1234567890', '0987654321'])

const getCleanPhoneNumber = () => {
  const digits = PHONE_NUMBER.contact.formatted.replace(/\D/g, '')

  return PLACEHOLDER_PHONE_VALUES.has(digits) ? undefined : PHONE_NUMBER.contact.formatted
}

const getSchemaImageURLs = () => [getAbsoluteURL(DEFAULT_SOCIAL_IMAGE)]

export const getAbsoluteURL = (path = '/') => new URL(path, getSiteOriginURL()).toString()

export const createPageMetadata = ({
  absoluteTitle,
  title,
  description,
  path,
  keywords,
}: CreatePageMetadataArgs): Metadata => {
  const socialTitle = `${SITE_TITLE} | ${title}`
  const resolvedKeywords = keywords?.length ? Array.from(new Set(keywords)) : undefined

  return {
    title: absoluteTitle ? { absolute: absoluteTitle } : title,
    description,
    alternates: {
      canonical: getAbsoluteURL(path),
    },
    ...(resolvedKeywords ? { keywords: resolvedKeywords } : {}),
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

export const createWebsiteStructuredData = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': getAbsoluteURL('/#website'),
  name: SITE_TITLE,
  alternateName: [...SITE_ALIASES],
  description: DEFAULT_META_DESCRIPTION,
  inLanguage: 'en-TZ',
  publisher: {
    '@id': getAbsoluteURL('/#local-business'),
  },
  url: getAbsoluteURL('/'),
})

export const createLocalBusinessStructuredData = () => {
  const telephone = getCleanPhoneNumber()

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': getAbsoluteURL('/#local-business'),
    name: SITE_TITLE,
    alternateName: [...SITE_ALIASES],
    description: DEFAULT_META_DESCRIPTION,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'TZ',
      addressLocality: 'Tanga',
      addressRegion: 'Tanga Region',
      streetAddress: ADDRESS,
    },
    areaServed: ['Tanga', 'Tanzania'],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: EMAILS.mail,
      ...(telephone ? { telephone } : {}),
    },
    email: EMAILS.mail,
    geo: {
      '@type': 'GeoCoordinates',
      latitude: BUSINESS_COORDINATES.latitude,
      longitude: BUSINESS_COORDINATES.longitude,
    },
    hasMap: GOOGLE_MAPS_LINK,
    image: getSchemaImageURLs(),
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [...BUSINESS_OPENING_HOURS.days],
        opens: BUSINESS_OPENING_HOURS.opens,
        closes: BUSINESS_OPENING_HOURS.closes,
      },
    ],
    sameAs: [GOOGLE_MAPS_LINK, INSTAGRAM_LINK],
    url: getAbsoluteURL('/'),
    ...(telephone ? { telephone } : {}),
  }
}

export const createTouristAttractionStructuredData = () => ({
  '@context': 'https://schema.org',
  '@type': 'TouristAttraction',
  '@id': getAbsoluteURL('/#tourist-attraction'),
  description: DEFAULT_META_DESCRIPTION,
  image: getSchemaImageURLs(),
  isPartOf: {
    '@id': getAbsoluteURL('/#local-business'),
  },
  name: SITE_TITLE,
  sameAs: [GOOGLE_MAPS_LINK, INSTAGRAM_LINK],
  touristType: ['Families', 'School groups', 'Day trippers', 'Nature lovers'],
  url: getAbsoluteURL('/'),
})

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

export const createFaqStructuredData = (items: readonly FaqItem[]) => ({
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
