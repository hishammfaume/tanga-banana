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
import { getTranslations } from 'next-intl/server'

const AboutUsSection = async ({ locale }: { locale: string }) => {
  const t = getTranslations({ locale, namespace: 'home.about' })
  const tResolved = await t

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
            {tResolved('label')}
          </Typography>
          <Typography
            variant="h4"
            color="grey.800"
            textAlign="start"
            fontWeight={600}
            lineHeight={1.25}
          >
            {tResolved('heading')}
          </Typography>
          <Typography variant="body2" color="grey.500" textAlign="start" maxWidth={500}>
            {tResolved('body')}
          </Typography>
          <Grid container spacing={2} mt={1}>
            <Grid>
              <Chip label={tResolved('features.daytrip')} variant="filled" />
            </Grid>
            <Grid>
              <Chip label={tResolved('features.groves')} variant="filled" />
            </Grid>
            <Grid>
              <Chip label={tResolved('features.family')} variant="filled" />
            </Grid>
          </Grid>
          <Button
            variant="outlined"
            color="primary"
            component={Link}
            href={routes.about}
            disableElevation
            sx={{
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
            {tResolved('learnMore')}
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
                  aria-label="people"
                >
                  <PeopleIcon />
                </Avatar>
              }
              action={null}
              sx={{ alignItems: 'flex-start' }}
              title={tResolved('values.families.title')}
              subheader={tResolved('values.families.body')}
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
              title={tResolved('values.organic.title')}
              subheader={tResolved('values.organic.body')}
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
          {tResolved('learnMore')}
        </Button>
      </Stack>
    </PageContainer>
  )
}

export default AboutUsSection
