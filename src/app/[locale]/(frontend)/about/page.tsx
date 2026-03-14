import { JsonLd } from '@/components/JsonLd'
import { createBreadcrumbStructuredData, createFaqStructuredData } from '@/utilities/seo'
import Landing from '@/ui/components/all-landing'
import FaqSection from '@/ui/components/FaqSection'
import PageContainer from '@/ui/components/page-container'
import SectionSpacer from '@/ui/components/section-spacer'
import AboutUsSection from '@/ui/sections/about/AboutUsSection'
import AboutImageCarouselSection from '@/ui/sections/about/AboutImageCarouselSection'
import LearningExperienceSection from '@/ui/sections/about/LearningExperienceSection'
import OurPhilosophySection from '@/ui/sections/about/OurPhilosophySection'
import Box from '@mui/material/Box'
import React from 'react'
import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
// import { getAbsoluteURL } from '@/utilities/seo'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata.about' })

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    alternates: {
      canonical: `${BASE_URL}/${locale}/about`,
      languages: {
        en: `${BASE_URL}/en/about`,
        sw: `${BASE_URL}/sw/about`,
        'x-default': `${BASE_URL}/en/about`,
      },
    },
    openGraph: mergeOpenGraph({
      title: t('title'),
      description: t('description'),
      url: `${BASE_URL}/${locale}/about`,
      locale: locale === 'sw' ? 'sw_TZ' : 'en_TZ',
    }),
    robots: { index: true, follow: true },
  }
}

const AboutPage = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'about' })
  const tFaq = await getTranslations({ locale, namespace: 'about.faq' })

  const ABOUT_FAQS = [
    { question: tFaq('q1.question'), answer: tFaq('q1.answer') },
    { question: tFaq('q2.question'), answer: tFaq('q2.answer') },
    { question: tFaq('q3.question'), answer: tFaq('q3.answer') },
    { question: tFaq('q4.question'), answer: tFaq('q4.answer') },
    { question: tFaq('q5.question'), answer: tFaq('q5.answer') },
    { question: tFaq('q6.question'), answer: tFaq('q6.answer') },
    { question: tFaq('q7.question'), answer: tFaq('q7.answer') },
  ]

  const breadcrumbStructuredData = createBreadcrumbStructuredData([
    { name: locale === 'sw' ? 'Nyumbani' : 'Home', path: `/${locale}` },
    { name: locale === 'sw' ? 'Kuhusu Sisi' : 'About', path: `/${locale}/about` },
  ])
  const faqStructuredData = createFaqStructuredData(ABOUT_FAQS)
  return (
    <>
      <JsonLd data={breadcrumbStructuredData} />
      <JsonLd data={faqStructuredData} />
      <Box component="main">
        <PageContainer>
          <Landing title={t('hero.headline')} description={t('hero.subheadline')} />
        </PageContainer>
        <PageContainer>
          <AboutUsSection locale={locale} />
        </PageContainer>
        {/* <SectionSpacer small /> */}
        <OurPhilosophySection locale={locale} />
        {/* <SectionSpacer small /> */}
        <LearningExperienceSection locale={locale} />
        <PageContainer>
          <FaqSection
            title={tFaq('heading')}
            description={
              locale === 'sw'
                ? 'Majibu haya yanaeleza tunalolima, wanaotembela, na kwa nini shamba lina maana kwa wageni.'
                : 'These answers explain what we grow, who visits, and why the farm matters to guests looking for a meaningful experience in Tanga.'
            }
            items={ABOUT_FAQS}
          />
        </PageContainer>
        {/* <SectionSpacer small /> */}
        <AboutImageCarouselSection locale={locale} />
        <SectionSpacer />
      </Box>
    </>
  )
}

export default AboutPage
