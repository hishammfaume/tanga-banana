import { NAVBAR } from '@/ui/components/navbar/constants'
import PageContainer from '@/ui/components/page-container'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import React from 'react'
import TourImage from './tour-image'
import Typography from '@mui/material/Typography'
import { CheckIcon } from '@/ui/components/icons'
import Link from 'next/link'
import { routes } from '@/routes'
import { ICONS } from '@/utilities/constants/common'

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
              Whether you are planning a family outing, a school visit, or a peaceful day trip,
              Tanga Banana Garden offers a farm tour in Tanga that is easy to reach and rich in
              coffee, culture, and quiet countryside moments.
            </Typography>
            <Stack direction="row" spacing={2}>
              <CheckIcon />
              <Typography variant="body2" color="grey.500" textAlign="start">
                Easy day trip from Tanga city with simple directions
              </Typography>
            </Stack>
            <Stack direction="row" spacing={2}>
              <CheckIcon />
              <Typography variant="body2" color="grey.500" textAlign="start">
                Guided banana, coffee, and spice farm experiences
              </Typography>
            </Stack>
            <Stack direction="row" spacing={2}>
              <CheckIcon />
              <Typography variant="body2" color="grey.500" textAlign="start">
                Family-friendly and school-friendly learning environment
              </Typography>
            </Stack>
            <Stack direction="row" spacing={2}>
              <CheckIcon />
              <Typography variant="body2" color="grey.500" textAlign="start">
                Fresh air, shaded rest areas, and time to slow down
              </Typography>
            </Stack>
            <Button
              component={Link}
              href={routes.contact}
              variant="outlined"
              color="primary"
              sx={{
                // border: 'none',
                mt: 1.5,
                borderRadius: '10px',
                textTransform: 'none',
                width: { xs: '100%', sm: 'auto' },
                boxShadow: 'none',
                px: 2,
                '&:hover': { boxShadow: 'none' },
              }}
              endIcon={ICONS.arrow_forward}
            >
              Ask about bookings, school visits, and directions
            </Button>
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
