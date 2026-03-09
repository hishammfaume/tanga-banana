import { NAVBAR } from '@/ui/components/navbar/constants'
import PageContainer from '@/ui/components/page-container'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import React from 'react'
import Chip from '@mui/material/Chip'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Avatar from '@mui/material/Avatar'
import { PeopleIcon, PlantIcon } from '@/ui/components/icons'
import Button from '@mui/material/Button'
import Link from 'next/link'
import { routes } from '@/routes'
import { ICONS } from '@/utilities/constants/common'

const AboutUsSection = () => {
  return (
    <PageContainer transparent id="about">
      <Stack
        direction={{ [NAVBAR.BREAKPOINT]: 'row' }}
        spacing={{ xs: 2, [NAVBAR.BREAKPOINT]: 6 }}
        justifyContent={'center'}
        alignItems="center"
        textAlign="center"
      >
        <Stack justifyContent="flex-start" alignItems="flex-start" textAlign="left" spacing={2}>
          <Typography
            variant="body2"
            color="warning.main"
            textAlign="start"
            fontWeight={500}
            textTransform="uppercase"
          >
            About Us
          </Typography>
          <Typography
            variant="h4"
            color="grey.800"
            textAlign="start"
            fontWeight={600}
            lineHeight={1.25}
          >
            Tanga&apos;s Hidden Garden Farm
          </Typography>
          <Typography variant="body2" color="grey.500" textAlign="start" maxWidth={500}>
            Tanga Banana Garden is a working banana, coffee, and spice farm in the city of Tanga,
            Tanzania. We welcome you to slow down, breathe deeply, and reconnect with nature in a
            calm and friendly setting.
          </Typography>
          <Grid container spacing={2} mt={1}>
            <Grid>
              <Chip label="Quick city break from Tanga" variant="filled" />
            </Grid>
            <Grid>
              <Chip label="Peaceful garden groves" variant="filled" />
            </Grid>
            <Grid>
              <Chip label="Locally guided experiences" variant="filled" />
            </Grid>
          </Grid>
          <Button
            variant="text"
            color="primary"
            component={Link}
            href={routes.about}
            disableElevation
            sx={{
              border: 'none',
              mt: 1.5,
              borderRadius: '10px',
              textTransform: 'none',
              width: { xs: '100%', sm: 'auto' },
              boxShadow: 'none',
              px: 0,
              '&:hover': { boxShadow: 'none' },
            }}
            endIcon={ICONS.arrow_forward}
          >
            Learn more
          </Button>
        </Stack>
        <Stack
          spacing={{ xs: 2, [NAVBAR.BREAKPOINT]: 4 }}
          justifyContent="center"
          alignItems={{ xs: 'stretch', [NAVBAR.BREAKPOINT]: 'center' }}
          textAlign="center"
          sx={{ width: '100%', maxWidth: 500 }}
        >
          <Card sx={{ width: '100%' }}>
            <CardHeader
              avatar={
                <Avatar
                  sx={{ bgcolor: 'secondary.main', width: 50, height: 50 }}
                  aria-label="plant"
                >
                  <PeopleIcon />
                </Avatar>
              }
              action={null}
              sx={{ alignItems: 'flex-start' }}
              title="Made for Families & Nature Lovers"
              subheader="Safe walking paths, shaded resting spots, and friendly guides make this a perfect close-to-the-city day tour."
              slotProps={{
                title: { color: 'grey.800', align: 'left', fontWeight: 600 },
                subheader: { color: 'grey.500', align: 'left' },
              }}
            />
          </Card>
          <Card sx={{ width: '100%' }}>
            <CardHeader
              avatar={
                <Avatar
                  sx={{ bgcolor: 'secondary.main', width: 50, height: 50 }}
                  aria-label="plant"
                >
                  <PlantIcon />
                </Avatar>
              }
              action={null}
              sx={{ alignItems: 'flex-start' }}
              title="Rooted in Organic Farming"
              subheader="We grow bananas, coffee, and spices using organic methods that respect the land and support local biodiversity."
              slotProps={{
                title: { color: 'grey.800', align: 'left', fontWeight: 600 },
                subheader: { color: 'grey.500', align: 'left' },
              }}
            />
          </Card>
        </Stack>
      </Stack>
    </PageContainer>
  )
}

export default AboutUsSection
