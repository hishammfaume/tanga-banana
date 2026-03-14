'use client'
import { FONTS } from '@/Theme/fonts'
import { FadeInUpTranslateXY } from '@/ui/components/animations'
import Link from 'next/link'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import React from 'react'
import LandingImage from './landing-image'
import { ICONS } from '@/utilities/constants/common'
import { useBookingModal } from '@/providers/BookingModal'
import { useTranslations } from 'next-intl'
import { NAVBAR } from '@/ui/components/navbar/constants'
import { getLocalizedAppPath } from '@/utilities/localizedRoutes'
import { routes } from '@/routes'

const LandingSection = ({ locale }: { locale: string }) => {
  const { openModal } = useBookingModal()
  const t = useTranslations('home.hero')
  const experiencesHref = getLocalizedAppPath(locale, routes.experiences)

  return (
    <Stack
      direction={{ xs: 'column', [NAVBAR.BREAKPOINT]: 'row' }}
      spacing={{ xs: 5, md: 8 }}
      justifyContent="space-between"
      alignItems="center"
      mt={{ xs: 7, md: 10 }}
      sx={{
        position: 'relative',
        minHeight: { md: 540 },
      }}
    >
      <FadeInUpTranslateXY sx={{ width: '100%', maxWidth: { xs: '100%', md: 520 } }}>
        <Stack
          spacing={{ xs: 2.5, md: 3 }}
          justifyContent="center"
          alignItems={{ xs: 'center', md: 'flex-start' }}
          textAlign={{ xs: 'center', md: 'left' }}
        >
          <Typography
            variant="h1"
            component="h1"
            color="grey.800"
            textAlign={{ xs: 'center', md: 'left' }}
            fontWeight={FONTS.poppins.fontWeights[600]}
            lineHeight={{ xs: 1.08, md: 1.02 }}
            letterSpacing="-0.04em"
            maxWidth={420}
            sx={{
              fontSize: {
                xs: '2.85rem',
                sm: '3.65rem',
                md: '4.35rem',
                lg: '4.85rem',
              },
            }}
          >
            {t('headline')}
          </Typography>
          <Typography
            variant="body1"
            color="grey.600"
            textAlign={{ xs: 'center', md: 'left' }}
            maxWidth={470}
            sx={{
              fontSize: { xs: '1rem', md: '1.05rem' },
              lineHeight: 1.8,
            }}
          >
            {t('subheadline')}
          </Typography>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            sx={{
              width: '100%',
              justifyContent: { xs: 'center', md: 'flex-start' },
              alignItems: { xs: 'stretch', sm: 'center' },
              pt: { xs: 0.5, md: 1 },
            }}
          >
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{
                borderRadius: '12px',
                px: 3.25,
                py: 1.45,
                textTransform: 'none',
                fontWeight: 600,
                boxShadow: '0 12px 28px rgba(47, 158, 68, 0.24)',
              }}
              onClick={() => openModal()}
            >
              {t('cta')}
            </Button>
            <Button
              size="large"
              variant="outlined"
              component={Link}
              href={experiencesHref}
              endIcon={ICONS.arrow_forward}
              sx={{
                borderRadius: '12px',
                px: 3,
                py: 1.45,
                textTransform: 'none',
                fontWeight: 600,
                borderColor: 'grey.300',
                color: 'grey.800',
                backgroundColor: 'common.white',
                '&:hover': {
                  borderColor: 'primary.main',
                  backgroundColor: 'secondary.main',
                },
              }}
            >
              {t('secondaryCta')}
            </Button>
          </Stack>
        </Stack>
      </FadeInUpTranslateXY>

      <FadeInUpTranslateXY
        sx={{
          width: '100%',
          maxWidth: { xs: '100%', md: 680 },
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            p: { xs: 0, md: 2 },
            borderRadius: { xs: 0, md: 6 },
            background: {
              md: 'linear-gradient(145deg, rgba(255, 255, 255, 0.94) 0%, rgba(241, 255, 233, 0.78) 100%)',
            },
            border: {
              md: '1px solid rgba(223, 227, 232, 0.9)',
            },
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              inset: { md: 18 },
              zIndex: 0,
              borderRadius: { md: 5 },
              background:
                'radial-gradient(circle at top right, rgba(47, 158, 68, 0.18), transparent 48%)',
            }}
          />
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <LandingImage />
          </Box>
        </Box>
      </FadeInUpTranslateXY>
    </Stack>
  )
}

export default LandingSection
