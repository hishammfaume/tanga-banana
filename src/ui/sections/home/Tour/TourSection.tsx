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
import { getTranslations } from 'next-intl/server'

const TourSection = async ({ locale }: { locale: string }) => {
  const t = await getTranslations({ locale, namespace: 'home.getaway' })

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
              {t('label')}
            </Typography>
            <Typography
              variant="h4"
              color="grey.800"
              textAlign="start"
              fontWeight={600}
              lineHeight={1.25}
            >
              {t('heading')}
            </Typography>
            <Typography variant="body2" color="grey.500" textAlign="start" maxWidth={500}>
              {t('body')}
            </Typography>
            <Stack direction="row" spacing={2}>
              <CheckIcon />
              <Typography variant="body2" color="grey.500" textAlign="start">
                {t('features.directions')}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={2}>
              <CheckIcon />
              <Typography variant="body2" color="grey.500" textAlign="start">
                {t('features.guided')}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={2}>
              <CheckIcon />
              <Typography variant="body2" color="grey.500" textAlign="start">
                {t('features.school')}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={2}>
              <CheckIcon />
              <Typography variant="body2" color="grey.500" textAlign="start">
                {t('features.rest')}
              </Typography>
            </Stack>
            <Button
              component={Link}
              href={routes.contact}
              variant="outlined"
              color="primary"
              sx={{
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
              {t('cta')}
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
