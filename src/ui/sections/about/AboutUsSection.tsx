import { Stack, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import React from 'react'
import HeroImage from '../experiences/hero-image'
import AboutImage from '@/assets/Farm/Ideal.png'
import NextLink from 'next/link'
import { routes } from '@/routes'

const AboutUsSection = () => {
  return (
    <Box>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={4}
        justifyContent="center"
        alignItems="center"
        alignContent="center"
        mb={4}
      >
        <HeroImage
          src={AboutImage}
          alt="Banana, coffee, and spice growing areas at Tanga Banana Garden in Tanga"
        />
        <Stack spacing={3} textAlign="left">
          <Typography
            variant="h4"
            align="left"
            color="grey.800"
            textAlign={'left'}
            fontWeight={600}
            lineHeight={1.25}
          >
            More Than Just a Farm
          </Typography>
          <Typography variant="body2" align="left" color="grey.500">
            Tanga Banana Garden began with a simple vision: to create a peaceful escape within the
            City of Tanga where nature thrives. What started as a modest cultivation of bananas has
            blossomed into a diverse ecosystem of coffee, spices, and lush greenery.
          </Typography>
          <Typography variant="body2" align="left" color="grey.500">
            Today, the farm welcomes families, student groups, and travelers who want more than a
            quick stop. Visitors come here to slow down, ask questions, and understand the local
            farming story behind each crop.
          </Typography>
          <Typography variant="body2" align="left" color="grey.500">
            Our work is rooted in responsible growing and practical learning. If you want to see how
            that turns into a visitor experience, explore our{' '}
            <Link
              component={NextLink}
              href={routes.experiences}
              color="primary.main"
              underline="hover"
            >
              farm experiences
            </Link>{' '}
            or head to the{' '}
            <Link component={NextLink} href={routes.contact} color="primary.main" underline="hover">
              contact page
            </Link>{' '}
            to plan a visit.
          </Typography>
        </Stack>
      </Stack>
    </Box>
  )
}

export default AboutUsSection
