import type { Metadata } from 'next'
import { SITE_TITLE } from '@/utilities/constants/common'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description:
    'Explore farm tours, coffee tasting, and nature experiences at Tanga Banana Garden in Tanga, Tanzania.',
  images: [
    {
      url: `${getServerSideURL()}/android-chrome-512x512.png`,
      width: 512,
      height: 512,
      alt: 'Tanga Banana Garden logo',
    },
  ],
  locale: 'en_US',
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
