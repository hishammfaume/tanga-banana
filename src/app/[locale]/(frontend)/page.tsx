import { JsonLd } from '@/components/JsonLd'
// import { SITE_TITLE } from '@/utilities/constants/common'
import {
  // createPageMetadata,
  createFaqStructuredData,
  createLocalBusinessStructuredData,
  createTouristAttractionStructuredData,
  createWebsiteStructuredData,
} from '@/utilities/seo'
import PageContainer from '@/ui/components/page-container'
import SectionSpacer from '@/ui/components/section-spacer'
import FaqSection from '@/ui/components/FaqSection'
import AboutUsSection from '@/ui/sections/home/about/AboutUsSection'
import ExperiencesSection from '@/ui/sections/home/Experiences/ExperiencesSection'
import LandingSection from '@/ui/sections/home/Landing/LandingSection'
import TourSection from '@/ui/sections/home/Tour/TourSection'
import Box from '@mui/material/Box'
import React from 'react'
import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
// import { getAbsoluteURL } from '@/utilities/seo'

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata.home' })

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: {
        en: `${BASE_URL}/en`,
        sw: `${BASE_URL}/sw`,
        'x-default': `${BASE_URL}/en`,
      },
    },
    openGraph: mergeOpenGraph({
      title: t('title'),
      description: t('description'),
      url: `${BASE_URL}/${locale}`,
      locale: locale === 'sw' ? 'sw_TZ' : 'en_TZ',
    }),
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
    robots: { index: true, follow: true },
  }
}

// const HOME_FAQS = [
//   {
//     question: 'What can I expect on a farm tour in Tanga?',
//     answer:
//       'A visit to Tanga Banana Garden includes banana grove walks, fresh coffee moments, spice farming insights, and peaceful time in a working farm setting close to Tanga city.',
//   },
//   {
//     question: 'Is Tanga Banana Garden good for families and school visits?',
//     answer:
//       'Yes. We welcome families, student groups, and curious first-time visitors who want a safe, hands-on introduction to farming, local produce, and outdoor learning.',
//   },
//   {
//     question: 'How far is the farm from Tanga city?',
//     answer:
//       'The farm is located within easy reach of Tanga city, making it a practical day trip for visitors who want fresh air, local experiences, and a quiet countryside break.',
//   },
// ] as const

// export const metadata = createPageMetadata({
//   title: 'Farm Tours in Tanga | Banana, Coffee and Spice Experiences',
//   absoluteTitle: `${SITE_TITLE} | Farm Tours in Tanga`,
//   description:
//     'Book farm tours in Tanga for banana grove walks, coffee tasting, spice experiences, educational visits, and a calm countryside break at Tanga Banana Garden.',
//   path: '/',
//   keywords: [
//     'farm tours in Tanga',
//     'banana farm tours in Tanzania',
//     'coffee tasting in Tanga',
//     'agritourism in Tanga',
//   ],
// })

// const faqStructuredData = createFaqStructuredData(HOME_FAQS)

const HomePage = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'home.faq' })

  const HOME_FAQS = [
    { question: t('q1.question'), answer: t('q1.answer') },
    { question: t('q2.question'), answer: t('q2.answer') },
    { question: t('q3.question'), answer: t('q3.answer') },
    { question: t('q4.question'), answer: t('q4.answer') },
    { question: t('q5.question'), answer: t('q5.answer') },
    { question: t('q6.question'), answer: t('q6.answer') },
  ]

  const faqStructuredData = createFaqStructuredData(HOME_FAQS)

  return (
    <>
      <JsonLd data={createWebsiteStructuredData()} />
      <JsonLd data={createLocalBusinessStructuredData()} />
      <JsonLd data={createTouristAttractionStructuredData()} />
      <JsonLd data={faqStructuredData} />
      <Box component="main">
        <PageContainer>
          <LandingSection locale={locale} />
        </PageContainer>
        <AboutUsSection locale={locale} />
        <SectionSpacer small />
        <ExperiencesSection locale={locale} />
        <TourSection locale={locale} />
        <PageContainer>
          <FaqSection
            title={t('heading')}
            description={
              locale === 'sw'
                ? 'Hizi ndizo maswali ya kawaida kutoka kwa familia, wasafiri na shule zinazopanga kutembelea Tanga Banana Garden.'
                : 'These are the most common questions from families, travelers, and schools planning a visit to Tanga Banana Garden.'
            }
            items={HOME_FAQS}
          />
        </PageContainer>
        <SectionSpacer />
      </Box>
    </>
  )
}

export default HomePage
