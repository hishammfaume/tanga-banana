import { JsonLd } from '@/components/JsonLd'
import { createBreadcrumbStructuredData, createPageMetadata } from '@/utilities/seo'
import Landing from '@/ui/components/all-landing'
import PageContainer from '@/ui/components/page-container'
import SectionSpacer from '@/ui/components/section-spacer'
import AboutUsSection from '@/ui/sections/about/AboutUsSection'
import AboutImageCarouselSection from '@/ui/sections/about/AboutImageCarouselSection'
import LearningExperienceSection from '@/ui/sections/about/LearningExperienceSection'
import OurPhilosophySection from '@/ui/sections/about/OurPhilosophySection'
import Box from '@mui/material/Box'
import React from 'react'

export const metadata = createPageMetadata({
  title: 'About the Farm and Our Story',
  description:
    'Learn about the story, philosophy, and hands-on learning experiences behind Tanga Banana Garden in Tanga, Tanzania.',
  path: '/about/',
  keywords: ['about Tanga Banana Garden', 'farm story Tanzania', 'organic farm philosophy'],
})

const breadcrumbStructuredData = createBreadcrumbStructuredData([
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about/' },
])

const AboutPage = () => {
  return (
    <>
      <JsonLd data={breadcrumbStructuredData} />
      <Box component="main">
        <PageContainer>
          <Landing
            title="Who We Are"
            description="Discover who we are, our philosophy, and how to get in touch with us. We're here to help you connect with nature and experience the beauty of Tanga Banana Garden."
          />
        </PageContainer>
        <PageContainer>
          <AboutUsSection />
        </PageContainer>
        <SectionSpacer small />
        <OurPhilosophySection />
        <SectionSpacer small />
        <LearningExperienceSection />
        <AboutImageCarouselSection />
        <SectionSpacer />
      </Box>
    </>
  )
}

export default AboutPage
