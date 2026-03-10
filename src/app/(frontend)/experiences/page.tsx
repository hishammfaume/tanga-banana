import { JsonLd } from '@/components/JsonLd'
import {
  createBreadcrumbStructuredData,
  createFaqStructuredData,
  createPageMetadata,
} from '@/utilities/seo'
import Landing from '@/ui/components/all-landing'
import FaqSection from '@/ui/components/FaqSection'
import PageContainer from '@/ui/components/page-container'
import SectionSpacer from '@/ui/components/section-spacer'
import ExperiencesSection from '@/ui/sections/experiences/ExperiencesSection'
import { Box } from '@mui/material'
import React from 'react'

const EXPERIENCES_FAQS = [
  {
    question: 'What experiences are available at Tanga Banana Garden?',
    answer:
      'Guests can book farm tours, coffee experiences, cultural and nature walks, and relaxing garden visits that are easy to combine into one day in Tanga.',
  },
  {
    question: 'Are the experiences suitable for school groups?',
    answer:
      'Yes. The farm tour and hands-on learning experience are especially useful for schools and student groups looking for practical agricultural learning near Tanga city.',
  },
  {
    question: 'How long should I plan for a visit?',
    answer:
      'Most guests plan a half-day or relaxed day trip so they can walk the farm, enjoy coffee, ask questions, and spend quiet time in the garden without rushing.',
  },
] as const

export const metadata = createPageMetadata({
  title: 'Farm Experiences in Tanga | Coffee, Culture and Learning',
  description:
    'Explore farm tours in Tanga with coffee tasting, cultural walks, school-friendly learning, and quiet countryside moments at Tanga Banana Garden.',
  path: '/experiences',
  keywords: [
    'farm experiences Tanga',
    'coffee tasting tour Tanzania',
    'cultural farm tours Tanga',
    'school visits in Tanga',
  ],
})

const breadcrumbStructuredData = createBreadcrumbStructuredData([
  { name: 'Home', path: '/' },
  { name: 'Experiences', path: '/experiences' },
])
const faqStructuredData = createFaqStructuredData(EXPERIENCES_FAQS)

const ExperiencesPage = () => {
  return (
    <>
      <JsonLd data={breadcrumbStructuredData} />
      <JsonLd data={faqStructuredData} />
      <Box component="main">
        <PageContainer>
          <Landing
            title="Farm Experiences in Tanga"
            description="Walk through banana and spice groves, taste fresh Tanga coffee, learn from a working farm, and enjoy a calm day out close to the city of Tanga."
          />
        </PageContainer>
        <PageContainer>
          <ExperiencesSection />
        </PageContainer>
        <SectionSpacer small />
        <PageContainer>
          <FaqSection
            title="Choose the right experience for your visit"
            description="These answers cover the most common planning questions about farm tours, coffee tasting, school visits, and timing."
            items={EXPERIENCES_FAQS}
          />
        </PageContainer>
      </Box>
    </>
  )
}

export default ExperiencesPage
