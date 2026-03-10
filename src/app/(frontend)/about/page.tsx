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
import AboutUsSection from '@/ui/sections/about/AboutUsSection'
import AboutImageCarouselSection from '@/ui/sections/about/AboutImageCarouselSection'
import LearningExperienceSection from '@/ui/sections/about/LearningExperienceSection'
import OurPhilosophySection from '@/ui/sections/about/OurPhilosophySection'
import Box from '@mui/material/Box'
import React from 'react'

const ABOUT_FAQS = [
  {
    question: 'What does Tanga Banana Garden grow?',
    answer:
      'The farm grows bananas, coffee, spices, and other fresh produce in a working garden environment that visitors can explore on guided visits.',
  },
  {
    question: 'Who is the farm experience designed for?',
    answer:
      'Our experiences are designed for families, student groups, travelers, and anyone interested in sustainable farming, local food, and a slower day out in Tanga.',
  },
  {
    question: 'What makes the farm different from a normal garden visit?',
    answer:
      'Tanga Banana Garden combines a relaxing visit with practical learning. Guests can see how crops are grown, hear the story behind the farm, and understand the local farming culture of Tanga.',
  },
] as const

export const metadata = createPageMetadata({
  title: 'About Our Sustainable Farm in Tanga',
  description:
    'Learn the story behind Tanga Banana Garden, a banana, coffee, and spice farm in Tanga focused on sustainable farming, learning, and calm countryside visits.',
  path: '/about',
  keywords: [
    'about Tanga Banana Garden',
    'sustainable farm in Tanga',
    'organic banana coffee spice farm Tanzania',
  ],
})

const breadcrumbStructuredData = createBreadcrumbStructuredData([
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
])
const faqStructuredData = createFaqStructuredData(ABOUT_FAQS)

const AboutPage = () => {
  return (
    <>
      <JsonLd data={breadcrumbStructuredData} />
      <JsonLd data={faqStructuredData} />
      <Box component="main">
        <PageContainer>
          <Landing
            title="Who We Are"
            description="Discover how Tanga Banana Garden grew into a welcoming banana, coffee, and spice farm where visitors can learn about sustainable farming and enjoy meaningful time outdoors."
          />
        </PageContainer>
        <PageContainer>
          <AboutUsSection />
        </PageContainer>
        <SectionSpacer small />
        <OurPhilosophySection />
        <SectionSpacer small />
        <LearningExperienceSection />
        <PageContainer>
          <FaqSection
            title="Understand the farm before you visit"
            description="These answers explain what we grow, who visits, and why the farm matters to guests looking for a meaningful experience in Tanga."
            items={ABOUT_FAQS}
          />
        </PageContainer>
        <SectionSpacer small />
        <AboutImageCarouselSection />
        <SectionSpacer />
      </Box>
    </>
  )
}

export default AboutPage
