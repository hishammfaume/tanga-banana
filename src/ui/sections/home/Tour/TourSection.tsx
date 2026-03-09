import { NAVBAR } from '@/ui/components/navbar/constants'
import PageContainer from '@/ui/components/page-container'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import React from 'react'
import TourImage from './tour-image'
import Typography from '@mui/material/Typography'
import { CheckIcon } from '@/ui/components/icons'

const TourSection = () => {
  return (
    <Box sx={sx}>
      <PageContainer transparent>
        <Stack
          direction={{ [NAVBAR.BREAKPOINT]: 'row' }}
          spacing={{ xs: 2, [NAVBAR.BREAKPOINT]: 6 }}
          justifyContent="center"
          alignItems="center"
        >
          <TourImage />
          <Stack
            spacing={2}
            justifyContent={'flex-start'}
            alignItems="flex-start"
            textAlign="start"
          >
            <Typography
              variant="body2"
              color="warning.main"
              textAlign="start"
              fontWeight={500}
              textTransform="uppercase"
            >
              Your Ideal Getaway
            </Typography>
            <Typography
              variant="h4"
              color="grey.800"
              textAlign="start"
              fontWeight={600}
              lineHeight={1.25}
            >
              The Perfect Day Tour
            </Typography>
            <Typography variant="body2" color="grey.500" textAlign="start" maxWidth={500}>
              Whether you&apos;re a family looking for quality time or a nature lover seeking a
              quick city break, Tanga Banana Garden is your sanctuary. Located just minutes from the
              city of Tanga, it&apos;s the ideal spot to unwind and breathe in the fresh air.
            </Typography>
            <Stack direction="row" spacing={2}>
              <CheckIcon />
              <Typography variant="body2" color="grey.500" textAlign="start">
                Quick and accessible getaway from Tanga City
              </Typography>
            </Stack>
            <Stack direction="row" spacing={2}>
              <CheckIcon />
              <Typography variant="body2" color="grey.500" textAlign="start">
                100% organic farming experience
              </Typography>
            </Stack>
            <Stack direction="row" spacing={2}>
              <CheckIcon />
              <Typography variant="body2" color="grey.500" textAlign="start">
                Safe and engaging environment for the whole family
              </Typography>
            </Stack>
            <Stack direction="row" spacing={2}>
              <CheckIcon />
              <Typography variant="body2" color="grey.500" textAlign="start">
                Breathe in the freshest country air in Tanga
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </PageContainer>
    </Box>
  )
}

const sx = {
  // backgroundColor: 'secondary.main',
}

export default TourSection
