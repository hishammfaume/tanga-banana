import Landing from '@/ui/components/all-landing'
import PageContainer from '@/ui/components/page-container'
import ExperiencesSection from '@/ui/sections/experiences/ExperiencesSection'
import { Box } from '@mui/material'
import React from 'react'

const ExperiencesPage = () => {
  return (
    <Box>
      <PageContainer>
        <Landing
          title="Farm Experiences"
          description="Walk through banana and spice groves, taste fresh Tanga coffee, meet local hosts and enjoy the soft quiet countryside - all within easy reach of the city of Tanga."
        />
      </PageContainer>
      <PageContainer>
        <ExperiencesSection />
      </PageContainer>
    </Box>
  )
}

export default ExperiencesPage
