import { JsonLd } from '@/components/JsonLd'
import { createBreadcrumbStructuredData, createPageMetadata } from '@/utilities/seo'
import Landing from '@/ui/components/all-landing'
import PageContainer from '@/ui/components/page-container'
import ExperiencesSection from '@/ui/sections/experiences/ExperiencesSection'
import { Box } from '@mui/material'
import React from 'react'

export const metadata = createPageMetadata({
  title: 'Farm Experiences in Tanga',
  description:
    'Discover coffee tasting, banana grove walks, spice experiences, and countryside moments at Tanga Banana Garden.',
  path: '/experiences',
  keywords: ['farm experiences Tanga', 'banana grove walk', 'coffee tasting tour Tanzania'],
})

const breadcrumbStructuredData = createBreadcrumbStructuredData([
  { name: 'Home', path: '/' },
  { name: 'Experiences', path: '/experiences' },
])

const ExperiencesPage = () => {
  return (
    <>
      <JsonLd data={breadcrumbStructuredData} />
      <Box component="main">
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
    </>
  )
}

export default ExperiencesPage
