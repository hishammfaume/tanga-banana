import { JsonLd } from '@/components/JsonLd'
import { SITE_TITLE } from '@/utilities/constants/common'
import {
  createPageMetadata,
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

const HOME_FAQS = [
  {
    question: 'What can I expect on a farm tour in Tanga?',
    answer:
      'A visit to Tanga Banana Garden includes banana grove walks, fresh coffee moments, spice farming insights, and peaceful time in a working farm setting close to Tanga city.',
  },
  {
    question: 'Is Tanga Banana Garden good for families and school visits?',
    answer:
      'Yes. We welcome families, student groups, and curious first-time visitors who want a safe, hands-on introduction to farming, local produce, and outdoor learning.',
  },
  {
    question: 'How far is the farm from Tanga city?',
    answer:
      'The farm is located within easy reach of Tanga city, making it a practical day trip for visitors who want fresh air, local experiences, and a quiet countryside break.',
  },
] as const

export const metadata = createPageMetadata({
  title: 'Farm Tours in Tanga | Banana, Coffee and Spice Experiences',
  absoluteTitle: `${SITE_TITLE} | Farm Tours in Tanga`,
  description:
    'Book farm tours in Tanga for banana grove walks, coffee tasting, spice experiences, educational visits, and a calm countryside break at Tanga Banana Garden.',
  path: '/',
  keywords: [
    'farm tours in Tanga',
    'banana farm tours in Tanzania',
    'coffee tasting in Tanga',
    'agritourism in Tanga',
  ],
})

const faqStructuredData = createFaqStructuredData(HOME_FAQS)

const HomePage = () => {
  return (
    <>
      <JsonLd data={createWebsiteStructuredData()} />
      <JsonLd data={createLocalBusinessStructuredData()} />
      <JsonLd data={createTouristAttractionStructuredData()} />
      <JsonLd data={faqStructuredData} />
      <Box component="main">
        <PageContainer>
          <LandingSection />
        </PageContainer>
        <AboutUsSection />
        <SectionSpacer small />
        <ExperiencesSection />
        {/* <SectionSpacer small /> */}
        <TourSection />
        <PageContainer>
          <FaqSection
            title="Plan your first farm tour in Tanga"
            description="These are the most common questions from families, travelers, and schools planning a visit to Tanga Banana Garden."
            items={HOME_FAQS}
          />
        </PageContainer>
        <SectionSpacer />
      </Box>
    </>
  )
}

export default HomePage
