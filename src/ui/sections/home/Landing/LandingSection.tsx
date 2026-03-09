'use client'
import { FONTS } from '@/Theme/fonts'
import { FadeInUpTranslateXY } from '@/ui/components/animations'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import React from 'react'
import LandingImage from './landing-image'
import { ICONS, PHONE_NUMBER } from '@/utilities/constants/common'
import { useBookingModal } from '@/providers/BookingModal'

const LandingSection = () => {
  const { openModal } = useBookingModal()
  return (
    <FadeInUpTranslateXY>
      <Stack spacing={4} justifyContent={'center'} alignItems="center" textAlign="center" mt={8}>
        <Stack spacing={2} justifyContent={'center'} alignItems="center" textAlign="center">
          <Typography
            variant="h2"
            component="h1"
            color="grey.800"
            textAlign="center"
            fontWeight={FONTS.poppins.fontWeights[600]}
            marginTop={1}
            lineHeight={1.25}
          >
            Escape to Nature&apos;s Paradise in Tanga
          </Typography>
          <Typography variant="body2" color="grey.500" textAlign="center" mt={2}>
            Discover a peaceful banana, coffee, and spice farm where lush green groves and fresh
            country air set the perfect scene for your city break.
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{ borderRadius: '10px' }}
              onClick={() => openModal()}
            >
              Book Farm Tour
            </Button>
            <Button
              size="medium"
              variant="outlined"
              sx={{ borderRadius: '10px' }}
              startIcon={ICONS.call}
              href={PHONE_NUMBER.contact.href}
            >
              {PHONE_NUMBER.contact.formatted}
            </Button>
          </Stack>
        </Stack>
        <LandingImage />
      </Stack>
    </FadeInUpTranslateXY>
  )
}

export default LandingSection
