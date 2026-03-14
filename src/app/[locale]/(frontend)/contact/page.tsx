import { JsonLd } from '@/components/JsonLd'
import {
  createBreadcrumbStructuredData,
  createFaqStructuredData,
  createLocalBusinessStructuredData,
  // createPageMetadata,
} from '@/utilities/seo'
import Box from '@mui/material/Box'
import React from 'react'

import PageContainer from '@/ui/components/page-container'
import SectionSpacer from '@/ui/components/section-spacer'
import FaqSection from '@/ui/components/FaqSection'
import ContactFormSection from '@/ui/sections/contact/ContactFormSection'
import ContactInfoSection from '@/ui/sections/contact/ContactInfoSection'
// import { CONTACT_FAQS } from '@/ui/sections/contact/constants'
import Landing from '@/ui/components/all-landing'
import Stack from '@mui/material/Stack'
import Card from '@mui/material/Card'
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
  const t = await getTranslations({ locale, namespace: 'metadata.contact' })

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    alternates: {
      canonical: `${BASE_URL}/${locale}/contact`,
      languages: {
        en: `${BASE_URL}/en/contact`,
        sw: `${BASE_URL}/sw/contact`,
        'x-default': `${BASE_URL}/en/contact`,
      },
    },
    openGraph: mergeOpenGraph({
      title: t('title'),
      description: t('description'),
      url: `${BASE_URL}/${locale}/contact`,
      locale: locale === 'sw' ? 'sw_TZ' : 'en_TZ',
    }),
    robots: { index: true, follow: true },
  }
}

const ContactPage = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'contact' })
  const tFaq = await getTranslations({ locale, namespace: 'contact.faq' })

  const CONTACT_FAQS = [
    { question: tFaq('q1.question'), answer: tFaq('q1.answer') },
    { question: tFaq('q2.question'), answer: tFaq('q2.answer') },
    { question: tFaq('q3.question'), answer: tFaq('q3.answer') },
    { question: tFaq('q4.question'), answer: tFaq('q4.answer') },
    { question: tFaq('q5.question'), answer: tFaq('q5.answer') },
  ]

  const breadcrumbStructuredData = createBreadcrumbStructuredData([
    { name: locale === 'sw' ? 'Nyumbani' : 'Home', path: `/${locale}` },
    { name: locale === 'sw' ? 'Mawasiliano' : 'Contact', path: `/${locale}/contact` },
  ])
  const faqStructuredData = createFaqStructuredData(CONTACT_FAQS)
  return (
    <>
      <JsonLd data={breadcrumbStructuredData} />
      <JsonLd data={faqStructuredData} />
      <JsonLd data={createLocalBusinessStructuredData()} />
      <Box component="main">
        <PageContainer>
          <Landing title={t('hero.headline')} description={t('hero.subheadline')} />
        </PageContainer>
        {/* <SectionSpacer small /> */}
        <PageContainer>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 2, md: 8 }}>
            <ContactInfoSection locale={locale} />
            <ContactFormSection locale={locale} />
          </Stack>
        </PageContainer>
        <PageContainer>
          <Card sx={{ mb: 4 }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3973.2666459599404!2d38.9810794!3d-5.220742699999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1843eb7fae1334fb%3A0x670bb0cca8190d64!2sTanga%20Banana%20Garden%3A%20Coffee%20%7C%20Banana%20%7C%20Spice%20%7C%20Fruit%20%7C%20Eco%20Farm%20Tour%20%7C%20Tanga%2C%20Tanzania%7C!5e0!3m2!1sen!2suk!4v1772908103516!5m2!1sen!2suk"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={
                locale === 'sw'
                  ? 'Ramani inayoonyesha mahali pa Tanga Banana Garden Tanzania'
                  : 'Map showing the location of Tanga Banana Garden in Tanzania'
              }
            />
          </Card>
        </PageContainer>
        <SectionSpacer small />
        <PageContainer>
          <FaqSection
            title={tFaq('heading')}
            description={
              locale === 'sw'
                ? 'Maswali haya yanajibu masuala ya kawaida kuhusu mawasiliano, mwelekeo, muda wa kujibu, na kupanga ziara yako ya shamba huko Tanga.'
                : 'These answers cover the most common questions about getting in touch, finding us, response times, and planning your farm visit in Tanga.'
            }
            items={CONTACT_FAQS}
          />
        </PageContainer>
        <SectionSpacer />
      </Box>
    </>
  )
}

export default ContactPage
