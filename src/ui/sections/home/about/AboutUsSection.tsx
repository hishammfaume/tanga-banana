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
            A Working Banana, Coffee and Spice Farm in Tanga
          </Typography>
          <Typography variant="body2" color="grey.500" textAlign="start" maxWidth={500}>
            Tanga Banana Garden is a working banana, coffee, and spice farm in the city of Tanga,
            Tanzania. We welcome you to slow down, breathe deeply, and reconnect with nature in a
            calm and friendly setting.
          </Typography>
          <Grid container spacing={2} mt={1}>
            <Grid>
              <Chip label="Easy day trip from Tanga city" variant="filled" />
            </Grid>
            <Grid>
              <Chip label="Banana, coffee and spice groves" variant="filled" />
            </Grid>
            <Grid>
              <Chip label="Family and school friendly visits" variant="filled" />
            </Grid>
          </Grid>
          <Button
            variant="outlined"
            color="primary"
            component={Link}
            href={routes.about}
            disableElevation
            sx={{
              // border: 'none',
              display: { xs: 'none', [NAVBAR.BREAKPOINT]: 'inline-flex' },
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
            Learn More About Us
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
              subheader="Safe walking paths, shaded rest stops, and welcoming hosts make this an easy day trip for families, travelers, and school groups."
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
              subheader="We grow bananas, coffee, and spices using farming practices that respect the soil, support biodiversity, and create meaningful learning for visitors."
              slotProps={{
                title: { color: 'grey.800', align: 'left', fontWeight: 600 },
                subheader: { color: 'grey.500', align: 'left' },
              }}
            />
          </Card>
        </Stack>
        <Button
          variant="outlined"
          color="primary"
          component={Link}
          href={routes.about}
          disableElevation
          sx={{
            // border: 'none',
            display: { xs: 'inline-flex', [NAVBAR.BREAKPOINT]: 'none' },
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
          Learn More About Us
        </Button>
      </Stack>
    </PageContainer>
  )
}

export default AboutUsSection
