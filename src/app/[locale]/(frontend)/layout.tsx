import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

// import { cn } from '@/utilities/ui'
// import { GeistMono } from 'geist/font/mono'
// import { GeistSans } from 'geist/font/sans'
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
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server'

import { type Locale, routing } from '@/i18n/routing'

const metadataBase = getSiteOriginURL()
const baseUrl = metadataBase.toString().replace(/\/$/, '')

type LayoutParams = Promise<{ locale: string }>
type LayoutProps = {
  children: React.ReactNode
  params: LayoutParams
}

const icons: Metadata['icons'] = [
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
]

const isValidLocale = (locale: string): locale is Locale => {
  return routing.locales.includes(locale as Locale)
}

const resolveLocale = async (params: LayoutParams) => {
  const { locale } = await params

  if (!isValidLocale(locale)) {
    notFound()
  }

  return locale
}

const getOpenGraphLocale = (locale: Locale) => {
  return locale === 'sw' ? 'sw_TZ' : 'en_TZ'
}

const getAlternateLocale = (locale: Locale) => {
  return locale === 'sw' ? 'en_TZ' : 'sw_TZ'
}

export async function generateMetadata({ params }: { params: LayoutParams }): Promise<Metadata> {
  const locale = await resolveLocale(params)
  const t = await getTranslations({ locale, namespace: 'metadata.home' })
  const title = t('title')
  const description = t('description')
  const keywords = t('keywords')
    .split(',')
    .map((keyword) => keyword.trim())
    .filter(Boolean)

  return {
    metadataBase,
    applicationName: SITE_TITLE,
    title: {
      template: `${SITE_TITLE} | %s`,
      default: title,
    },
    alternates: {
      languages: {
        en: `${baseUrl}/en`,
        sw: `${baseUrl}/sw`,
        'x-default': `${baseUrl}/en`,
      },
    },
    keywords,
    openGraph: mergeOpenGraph({
      title,
      description,
      locale: getOpenGraphLocale(locale),
      alternateLocale: getAlternateLocale(locale),
    }),
    description,
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
    verification: process.env.GOOGLE_SITE_VERIFICATION
      ? { google: process.env.GOOGLE_SITE_VERIFICATION }
      : undefined,
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/android-chrome-512x512.png'],
    },
    icons,
  }
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function RootLayout({ children, params }: LayoutProps) {
  const locale = await resolveLocale(params)

  setRequestLocale(locale)

  const messages = await getMessages({ locale })

  return (
    <html
      // className={cn(GeistSans.variable, GeistMono.variable)}
      dir="ltr"
      lang={locale}
      suppressHydrationWarning
    >
      <head>
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link crossOrigin="anonymous" href="https://fonts.gstatic.com" rel="preconnect" />
      </head>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>
            <Analytics />
            <SpeedInsights />
            <Navbar />
            {children}
            <Footer />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
