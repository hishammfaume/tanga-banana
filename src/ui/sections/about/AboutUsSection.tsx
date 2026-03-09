import { Stack, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import React from 'react'
import HeroImage from '../experiences/hero-image'
import AboutImage from '@/assets/Farm/Ideal.png'

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
        <HeroImage src={AboutImage} alt="About Us Image" />
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
            We believe in the healing power of fresh country air and the joy of connecting with the
            earth. Our garden is designed not just for growing crops, but for growing
            experiences—offering families, students, and travelers a place to pause, breathe, and
            learn.
          </Typography>
          <Typography variant="body2" align="left" color="grey.500">
            Here, organic farming isn&apos;t just a method; it&apos;s a way of life. From the
            careful tending of spice groves to the traditional brewing of Tanga coffee, every aspect
            of our farm celebrates the rich agricultural heritage of mainland Tanzania.
          </Typography>
        </Stack>
      </Stack>
    </Box>
  )
}

export default AboutUsSection
