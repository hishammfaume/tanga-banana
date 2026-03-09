import { JsonLd } from '@/components/JsonLd'
import {
  businessStructuredData,
  createPageMetadata,
  websiteStructuredData,
} from '@/utilities/seo'
import PageContainer from '@/ui/components/page-container'
import SectionSpacer from '@/ui/components/section-spacer'
import AboutUsSection from '@/ui/sections/home/about/AboutUsSection'
import ExperiencesSection from '@/ui/sections/home/Experiences/ExperiencesSection'
import LandingSection from '@/ui/sections/home/Landing/LandingSection'
import TourSection from '@/ui/sections/home/Tour/TourSection'
import Box from '@mui/material/Box'
import React from 'react'

export const metadata = createPageMetadata({
  title: 'Farm Tours, Coffee Tasting and Nature Escape',
  description:
    'Book a peaceful farm visit in Tanga for banana garden walks, coffee tasting, spice experiences, and family-friendly nature time.',
  path: '/',
  keywords: ['farm tours in Tanga', 'coffee tasting in Tanga', 'nature escape Tanzania'],
})

const HomePage = () => {
  return (
    <>
      <JsonLd data={websiteStructuredData} />
      <JsonLd data={businessStructuredData} />
      <Box component="main">
        <PageContainer>
          <LandingSection />
        </PageContainer>
        <AboutUsSection />
        <SectionSpacer small />
        <ExperiencesSection />
        {/* <SectionSpacer small /> */}
        <TourSection />
        <SectionSpacer />
      </Box>
    </>
  )
}

export default HomePage
