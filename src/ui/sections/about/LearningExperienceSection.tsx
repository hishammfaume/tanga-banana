import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import React from 'react'
import Learning from '@/assets/Farm/LearningExp.png'
import HeroImage from '../experiences/hero-image'
import Typography from '@mui/material/Typography'
import PageContainer from '@/ui/components/page-container'
import NextLink from 'next/link'
import { routes } from '@/routes'

const LearningExperienceSection = () => {
  return (
    <Box>
      <PageContainer>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={4}
          justifyContent="center"
          alignItems="center"
          alignContent="center"
          mb={4}
        >
          <Stack spacing={3} textAlign="left">
            <Typography
              variant="h4"
              align="left"
              color="grey.800"
              textAlign={'left'}
              fontWeight={600}
              lineHeight={1.25}
            >
              A Learning Experience
            </Typography>
            <Typography variant="body2" align="left" color="grey.500">
              Tanga Banana Garden is a practical learning environment for children, families,
              school groups, and curious travelers who want to understand farming through real
              crops, real soil, and guided conversation.
            </Typography>
            <Typography variant="body2" align="left" color="grey.500">
              Guests can learn about banana and spice cultivation, watch a Tanga coffee moment come
              together, and connect the farm visit to nearby cultural stops. For questions about
              group planning, visit our{' '}
              <Link component={NextLink} href={routes.contact} color="primary.main" underline="hover">
                booking and contact page
              </Link>
              .
            </Typography>
          </Stack>
          <HeroImage
            src={Learning}
            alt="Students and visitors learning about banana, coffee, and spice farming in Tanga"
          />
        </Stack>
      </PageContainer>
    </Box>
  )
}

export default LearningExperienceSection
