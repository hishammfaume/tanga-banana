'use client'
// src/ui/sections/blog/BlogCta.tsx
// Booking CTA shown at the end of every blog post.
// Mirrors the TourSection style — warm, on-brand, not intrusive.

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { ICONS, PHONE_NUMBER } from '@/utilities/constants/common'
import { useBookingModal } from '@/providers/BookingModal'
import { useTranslations } from 'next-intl'

const BlogCta = ({ locale }: { locale: string }) => {
  const { openModal } = useBookingModal()
  const t = useTranslations('blog.cta')

  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, rgba(141,169,126,0.18) 0%, rgba(194,173,96,0.12) 100%)',
        border: '1px solid rgba(141,169,126,0.28)',
        borderRadius: { xs: '24px', md: '32px' },
        px: { xs: 3, md: 6 },
        py: { xs: 4, md: 6 },
        textAlign: 'center',
      }}
    >
      <Stack spacing={2.5} alignItems="center">
        <Typography
          variant="body2"
          color="warning.main"
          fontWeight={700}
          textTransform="uppercase"
          letterSpacing={1.4}
        >
          {t('label')}
        </Typography>
        <Typography variant="h4" color="grey.900" fontWeight={700} lineHeight={1.2} maxWidth={520}>
          {t('heading')}
        </Typography>
        <Typography variant="body2" color="grey.600" maxWidth={480} lineHeight={1.75}>
          {t('body')}
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" width="100%">
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ borderRadius: '12px', textTransform: 'none', px: 4, color: 'grey.100' }}
            onClick={() => openModal()}
          >
            {t('book')}
          </Button>
          <Button
            variant="outlined"
            size="large"
            sx={{ borderRadius: '12px', textTransform: 'none', px: 4 }}
            startIcon={ICONS.call}
            href={PHONE_NUMBER.contact.href}
          >
            {PHONE_NUMBER.contact.formatted}
          </Button>
        </Stack>
      </Stack>
    </Box>
  )
}

export default BlogCta
