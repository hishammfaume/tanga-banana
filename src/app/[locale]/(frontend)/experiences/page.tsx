import { JsonLd } from '@/components/JsonLd'
import {
  createBreadcrumbStructuredData,
  createFaqStructuredData,
  // createPageMetadata,
} from '@/utilities/seo'
import Landing from '@/ui/components/all-landing'
import FaqSection from '@/ui/components/FaqSection'
import PageContainer from '@/ui/components/page-container'
import SectionSpacer from '@/ui/components/section-spacer'
import ExperiencesSection from '@/ui/sections/experiences/ExperiencesSection'
import { Box } from '@mui/material'
import React from 'react'
import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata.experiences' })

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    alternates: {
      canonical: `${BASE_URL}/${locale}/experiences`,
      languages: {
        en: `${BASE_URL}/en/experiences`,
        sw: `${BASE_URL}/sw/experiences`,
        'x-default': `${BASE_URL}/en/experiences`,
      },
    },
    openGraph: mergeOpenGraph({
      title: t('title'),
      description: t('description'),
      url: `${BASE_URL}/${locale}/experiences`,
      locale: locale === 'sw' ? 'sw_TZ' : 'en_TZ',
    }),
    robots: { index: true, follow: true },
  }
}

const ExperiencesPage = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'experiences' })
  const tFaq = await getTranslations({ locale, namespace: 'experiences.faq' })

  const EXPERIENCES_FAQS = [
    { question: tFaq('q1.question'), answer: tFaq('q1.answer') },
    { question: tFaq('q2.question'), answer: tFaq('q2.answer') },
    { question: tFaq('q3.question'), answer: tFaq('q3.answer') },
    { question: tFaq('q4.question'), answer: tFaq('q4.answer') },
    { question: tFaq('q5.question'), answer: tFaq('q5.answer') },
    { question: tFaq('q6.question'), answer: tFaq('q6.answer') },
    { question: tFaq('q7.question'), answer: tFaq('q7.answer') },
    { question: tFaq('q8.question'), answer: tFaq('q8.answer') },
  ]

  const breadcrumbStructuredData = createBreadcrumbStructuredData([
    { name: locale === 'sw' ? 'Nyumbani' : 'Home', path: `/${locale}` },
    { name: locale === 'sw' ? 'Uzoefu' : 'Experiences', path: `/${locale}/experiences` },
  ])
  const faqStructuredData = createFaqStructuredData(EXPERIENCES_FAQS)

  return (
    <>
      <JsonLd data={breadcrumbStructuredData} />
      <JsonLd data={faqStructuredData} />
      <Box component="main">
        <PageContainer>
          <Landing title={t('hero.headline')} description={t('hero.subheadline')} />
        </PageContainer>
        <PageContainer>
          <ExperiencesSection locale={locale} />
        </PageContainer>
        <SectionSpacer small />
        <PageContainer>
          <FaqSection
            title={tFaq('heading')}
            description={
              locale === 'sw'
                ? 'Majibu haya yanashughulikia maswali ya kawaida ya kupanga ziara za shamba, kuonja kahawa, ziara za shule, na wakati.'
                : 'These answers cover the most common planning questions about farm tours, coffee tasting, school visits, and timing.'
            }
            items={EXPERIENCES_FAQS}
          />
        </PageContainer>
      </Box>
    </>
  )
}

export default ExperiencesPage
