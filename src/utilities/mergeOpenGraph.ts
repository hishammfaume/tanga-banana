import type { Metadata } from 'next'
import { SITE_TITLE } from '@/utilities/constants/common'
import { getServerSideURL } from './getURL'

const DEFAULT_SOCIAL_IMAGE = '/android-chrome-512x512.png'
const DEFAULT_OG_DESCRIPTION =
  'Book farm tours in Tanga for banana grove walks, coffee tasting, spice experiences, school visits, and peaceful countryside time at Tanga Banana Garden.'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: DEFAULT_OG_DESCRIPTION,
  images: [
    {
      url: `${getServerSideURL()}${DEFAULT_SOCIAL_IMAGE}`,
      width: 512,
      height: 512,
      alt: 'Banana, coffee, and spice farm experiences at Tanga Banana Garden in Tanga',
    },
  ],
  locale: 'en_TZ',
  siteName: SITE_TITLE,
  title: SITE_TITLE,
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
