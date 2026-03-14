import { Stack, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import React from 'react'
import HeroImage from '../experiences/hero-image'
import AboutImage from '@/assets/Farm/Ideal.webp'
import NextLink from 'next/link'
import { routes } from '@/routes'
import { getTranslations } from 'next-intl/server'

const AboutUsSection = async ({ locale }: { locale: string }) => {
  const t = await getTranslations({ locale, namespace: 'about.story' })
  // const tNav = await getTranslations({ locale, namespace: 'nav' })

  const experiencesLabel = locale === 'sw' ? 'uzoefu wa shamba' : 'farm experiences'
  const contactLabel = locale === 'sw' ? 'mawasiliano' : 'contact page'

  return (
    <Box>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={4}
        justifyContent="center"
        alignItems="center"
        alignContent="center"
        mb={4}
      >
        <HeroImage
          src={AboutImage}
          alt="Banana, coffee, and spice growing areas at Tanga Banana Garden in Tanga"
          priority
        />
        <Stack spacing={3} textAlign="left">
          <Typography
            variant="h4"
            align="left"
            color="grey.800"
            textAlign={'left'}
            fontWeight={600}
            lineHeight={1.25}
          >
            {t('heading')}
          </Typography>
          <Typography variant="body2" align="left" color="grey.500">
            {t('body1')}
          </Typography>
          <Typography variant="body2" align="left" color="grey.500">
            {t('body2')}
          </Typography>
          <Typography variant="body2" align="left" color="grey.500">
            {locale === 'sw' ? (
              <>
                Kazi yetu imejengwa juu ya kilimo cha uwajibikaji na kujifunza kwa vitendo. Kama
                unataka kuona jinsi hilo linavyogeuka kuwa uzoefu wa wageni, chunguza{' '}
                <Link
                  component={NextLink}
                  href={routes.experiences}
                  color="primary.main"
                  underline="hover"
                >
                  {experiencesLabel}
                </Link>{' '}
                au nenda kwenye{' '}
                <Link
                  component={NextLink}
                  href={routes.contact}
                  color="primary.main"
                  underline="hover"
                >
                  {contactLabel}
                </Link>{' '}
                kupanga ziara.
              </>
            ) : (
              <>
                Our work is rooted in responsible growing and practical learning. If you want to see
                how that turns into a visitor experience, explore our{' '}
                <Link
                  component={NextLink}
                  href={routes.experiences}
                  color="primary.main"
                  underline="hover"
                >
                  {experiencesLabel}
                </Link>{' '}
                or head to the{' '}
                <Link
                  component={NextLink}
                  href={routes.contact}
                  color="primary.main"
                  underline="hover"
                >
                  {contactLabel}
                </Link>{' '}
                to plan a visit.
              </>
            )}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  )
}

export default AboutUsSection
