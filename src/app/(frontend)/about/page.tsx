import Landing from '@/ui/components/all-landing'
import PageContainer from '@/ui/components/page-container'
import SectionSpacer from '@/ui/components/section-spacer'
import AboutUsSection from '@/ui/sections/about/AboutUsSection'
import AboutImageCarouselSection from '@/ui/sections/about/AboutImageCarouselSection'
import LearningExperienceSection from '@/ui/sections/about/LearningExperienceSection'
import OurPhilosophySection from '@/ui/sections/about/OurPhilosophySection'
import Box from '@mui/material/Box'
import React from 'react'

const AboutPage = () => {
  return (
    <Box>
      <PageContainer>
        <Landing
          title="Who We Are"
          description="Discover who we are, our philosophy, and how to get in touch with us. We're here to help you connect with nature and experience the beauty of Tanga Banana Garden."
        />
      </PageContainer>
      <PageContainer>
        <AboutUsSection />
      </PageContainer>{' '}
      <SectionSpacer small />
      <OurPhilosophySection />
      <SectionSpacer small />
      <LearningExperienceSection />
      <AboutImageCarouselSection />
      <SectionSpacer />
    </Box>
  )
}

export default AboutPage
