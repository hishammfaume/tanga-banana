import PageContainer from '@/ui/components/page-container'
import SectionSpacer from '@/ui/components/section-spacer'
import AboutUsSection from '@/ui/sections/home/about/AboutUsSection'
import ExperiencesSection from '@/ui/sections/home/Experiences/ExperiencesSection'
import LandingSection from '@/ui/sections/home/Landing/LandingSection'
import TourSection from '@/ui/sections/home/Tour/TourSection'
import Box from '@mui/material/Box'
import React from 'react'

const HomePage = () => {
  return (
    <Box>
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
  )
}

export default HomePage
