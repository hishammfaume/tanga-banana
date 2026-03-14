import { NAVBAR } from '@/ui/components/navbar/constants'
import PageContainer from '@/ui/components/page-container'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import React from 'react'
// import EXPERIENCE_ITEMS from './constants'
import ExperienceCard from './ExperienceCard'
import { routes } from '@/routes'
import { getTranslations } from 'next-intl/server'
import { ICONS } from '@/utilities/constants/common'

const ExperiencesSection = async ({ locale }: { locale: string }) => {
  const t = await getTranslations({ locale, namespace: 'home.experiences' })

  const EXPERIENCE_ITEMS = [
    {
      title: t('farmTours.title'),
      description: t('farmTours.body'),
      icon: ICONS.map,
      learnMoreLabel: t('farmTours.link'),
    },
    {
      title: t('coffee.title'),
      description: t('coffee.body'),
      icon: ICONS.coffee,
      learnMoreLabel: t('coffee.link'),
    },
    {
      title: t('culturalWalks.title'),
      description: t('culturalWalks.body'),
      icon: ICONS.shoes,
      learnMoreLabel: t('culturalWalks.link'),
    },
    {
      title: t('freshAir.title'),
      description: t('freshAir.body'),
      icon: ICONS.sun,
      learnMoreLabel: t('freshAir.link'),
    },
  ]

  return (
    <Box sx={sx}>
      <PageContainer transparent className="container" ignoreNavHeight id="experiences">
        <Stack spacing={4} justifyContent={'center'} alignItems="center" textAlign="center">
          <Stack spacing={3} justifyContent={'center'} alignItems="center" textAlign="center">
            <Typography variant="h4" color="grey.800" textAlign="center" fontWeight={600}>
              {t('heading')}
            </Typography>
            <Typography variant="body2" color="grey.500" textAlign="center" maxWidth={600}>
              {t('subheading')}
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
                learnMoreLabel={item.learnMoreLabel}
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
