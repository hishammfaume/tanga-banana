import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React from 'react'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Footer } from '@/Footer/Component'
import { Providers } from '@/providers'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { getSiteOriginURL } from '@/utilities/getURL'

import './globals.css'
import Navbar from '@/ui/components/navbar/Navbar'
import { SITE_TITLE } from '@/utilities/constants/common'
import { DEFAULT_META_DESCRIPTION } from '@/utilities/seo'

export const metadata: Metadata = {
  metadataBase: getSiteOriginURL(),
  applicationName: SITE_TITLE,
  title: {
    template: `${SITE_TITLE} | %s`,
    default: SITE_TITLE,
  },
  openGraph: mergeOpenGraph(),
  description: DEFAULT_META_DESCRIPTION,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: DEFAULT_META_DESCRIPTION,
    images: ['/android-chrome-512x512.png'],
  },
  icons: [
    {
      rel: 'apple-touch-icon',
      url: '/apple-touch-icon.png',
      type: 'image/png',
      sizes: '180x180',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/favicon-16x16.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '192x192',
      url: '/android-chrome-192x192.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '512x512',
      url: '/android-chrome-512x512.png',
    },
  ],
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={cn(GeistSans.variable, GeistMono.variable)} lang="en" suppressHydrationWarning>
      <head>
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <Providers>
          <Analytics />
          <SpeedInsights />
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}

// export const metadata: Metadata = {
//   metadataBase: new URL(getServerSideURL()),
//   openGraph: mergeOpenGraph(),
//   twitter: {
//     card: 'summary_large_image',
//     creator: '@payloadcms',
//   },
// }
