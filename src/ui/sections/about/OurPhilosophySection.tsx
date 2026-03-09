import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import React from 'react'
import PHILOSOPHY_ITEMS from './constants'
// import ExperienceCard from '../home/Experiences/ExperienceCard'
import Box from '@mui/material/Box'
import PageContainer from '@/ui/components/page-container'
import ExperienceImageCard from '../home/Experiences/ExperienceImageCard'

const OurPhilosophySection = () => {
  return (
    <Box sx={sx}>
      <PageContainer transparent>
        <Stack justifyContent="center" alignItems="center" alignContent="center" mb={4} spacing={4}>
          <Stack spacing={3} justifyContent={'center'} alignItems="center" textAlign="center">
            <Typography
              variant="h4"
              component="h2"
              align="left"
              color="grey.800"
              fontWeight={600}
              lineHeight={1.25}
            >
              Our Philosophy
            </Typography>
            <Typography variant="body2" align="center" color="grey.500">
              We are dedicated to preserving the environment while providing a memorable experience
              for our visitors.{' '}
            </Typography>
          </Stack>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={4}
            justifyContent="center"
            alignItems="stretch"
          >
            {PHILOSOPHY_ITEMS.map((item, index) => (
              <ExperienceImageCard
                key={index}
                title={item.title}
                description={item.description}
                backgroundImage={item.image}
              />
            ))}
          </Stack>
        </Stack>
      </PageContainer>
    </Box>
  )
}
const sx = {
  backgroundColor: 'secondary.light',
  py: 8,
}

export default OurPhilosophySection
