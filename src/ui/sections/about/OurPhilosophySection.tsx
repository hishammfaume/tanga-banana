import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import React from 'react'
// import ExperienceCard from '../home/Experiences/ExperienceCard'
import Box from '@mui/material/Box'
import PageContainer from '@/ui/components/page-container'
import ExperienceImageCard from '../home/Experiences/ExperienceImageCard'
import { getTranslations } from 'next-intl/server'
import Organic from '@/assets/Landing/gardenn.jpeg'
import Community from '@/assets/Landing/culture.png'
import Sanctuary from '@/assets/Landing/garden.jpeg'
import { ICONS } from '@/utilities/constants/common'
import { StaticImageData } from 'next/image'

const OurPhilosophySection = async ({ locale }: { locale: string }) => {
  const t = await getTranslations({ locale, namespace: 'about.philosophy' })

  const PHILOSOPHY_ITEMS: {
    title: string
    description: string
    icon: React.ReactNode
    image: StaticImageData
  }[] = [
    {
      title: t('organic.title'),
      description: t('organic.body'),
      icon: ICONS.plant,
      image: Organic,
    },
    {
      title: t('community.title'),
      description: t('community.body'),
      icon: ICONS.coffee,
      image: Community,
    },
    {
      title: t('sanctuary.title'),
      description: t('sanctuary.body'),
      icon: ICONS.sun,
      image: Sanctuary,
    },
  ]

  return (
    <Box sx={sx}>
      <PageContainer transparent ignoreNavHeight sx={{ py: { xs: 6, md: 8 } }}>
        <Stack justifyContent="center" alignItems="center" alignContent="center" spacing={4}>
          <Stack spacing={3} justifyContent={'center'} alignItems="center" textAlign="center">
            <Typography
              variant="h4"
              component="h2"
              align="left"
              color="grey.800"
              fontWeight={600}
              lineHeight={1.25}
            >
              {t('heading')}
            </Typography>
            <Typography variant="body2" align="center" color="grey.500">
              {t('subheading')}
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
}

export default OurPhilosophySection
