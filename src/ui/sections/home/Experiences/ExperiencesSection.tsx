import { NAVBAR } from '@/ui/components/navbar/constants'
import PageContainer from '@/ui/components/page-container'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import React from 'react'
import EXPERIENCE_ITEMS from './constants'
import ExperienceCard from './ExperienceCard'
import { routes } from '@/routes'

const ExperiencesSection = () => {
  return (
    <Box sx={sx}>
      <PageContainer transparent className="container" ignoreNavHeight id="experiences">
        <Stack spacing={4} justifyContent={'center'} alignItems="center" textAlign="center">
          <Stack spacing={3} justifyContent={'center'} alignItems="center" textAlign="center">
            <Typography
              variant="h4"
              color="grey.800"
              textAlign="center"
              fontWeight={600}
              // marginTop={1}
            >
              Authentic Farm Experiences
            </Typography>
            <Typography variant="body2" color="grey.500" textAlign="center" maxWidth={600}>
              Immerse yourself in the authentic sights, sounds, and flavors of our organic farm. A
              perfect day tour for nature lovers and families.
            </Typography>
          </Stack>
          <Stack direction={{ xs: 'column', [NAVBAR.BREAKPOINT]: 'row' }} spacing={2}>
            {EXPERIENCE_ITEMS.map((item, index) => (
              <ExperienceCard
                key={index}
                title={item.title}
                description={item.description}
                icon={item.icon}
                learnMoreHref={routes.experiences}
              />
            ))}
          </Stack>
        </Stack>
      </PageContainer>
    </Box>
  )
}

const sx = {
  backgroundColor: 'grey.200',
  py: 8,
}

export default ExperiencesSection
