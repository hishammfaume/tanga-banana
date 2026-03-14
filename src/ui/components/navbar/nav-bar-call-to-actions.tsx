'use client'

import Stack from '@mui/material/Stack'
import { NAVBAR } from './constants'
import Button from '@mui/material/Button'
import { alpha, SxProps } from '@mui/material/styles'
import { responsive } from 'src/utilities/breakpoints'
import { ICONS, PHONE_NUMBER } from '@/utilities/constants/common'
import { useBookingModal } from '@/providers/BookingModal'
import { useTranslations } from 'next-intl'
import LanguageSwitcher from './LanguageSwitcher'
import palette from '@/Theme/palette'

const NavbarCallToActionButtons: React.FC<NavbarCallToActionButtonsProps> = ({
  mobile,
  locale,
}) => {
  const { openModal } = useBookingModal()
  const t = useTranslations('nav')
  return (
    <Stack
      className={`nav-cta ${mobile ? 'mobile' : 'desktop'}`}
      direction={{ xs: 'column', [NAVBAR.BREAKPOINT]: 'row' }}
      spacing={mobile ? 1.25 : 1}
      alignItems="stretch"
      sx={sx}
    >
      <Button
        size="large"
        variant="contained"
        color="primary"
        disableElevation
        onClick={() => openModal()}
        fullWidth={mobile}
        sx={primary_button_sx}
      >
        {t('book')}
      </Button>
      <Button
        size="large"
        variant="outlined"
        className="call-button"
        sx={secondary_button_sx}
        fullWidth={mobile}
        startIcon={ICONS.call}
        href={PHONE_NUMBER.contact.href}
      >
        {PHONE_NUMBER.contact.formatted}
      </Button>
      {/* Language switcher shown in desktop nav alongside CTA buttons */}
      {!mobile && <LanguageSwitcher locale={locale} />}
    </Stack>
  )
}

const sx: SxProps = {
  display: 'none',
  flexShrink: 0,

  '& .MuiButton-root': {
    whiteSpace: 'nowrap',
    textAlign: 'center',
    borderRadius: '999px',
    fontWeight: 600,
    letterSpacing: 0.2,
    minHeight: 48,
    px: { xs: 2.5, md: 2.25, lg: 2.75 },
    flexShrink: 0,
  },

  '& .MuiButton-startIcon': {
    marginRight: 1,
  },

  '&.desktop': {
    [responsive('down', NAVBAR.BREAKPOINT)]: {
      display: 'none',
    },

    [responsive('up', NAVBAR.BREAKPOINT)]: {
      display: 'flex',
    },
  },

  '&.mobile': {
    display: 'flex',
    width: '100%',
    paddingX: 2.5,
    paddingBottom: 0.5,

    '& .MuiButton-root': {
      width: '100%',
    },

    [responsive('down', NAVBAR.BREAKPOINT)]: {
      display: 'flex',
    },

    [responsive('up', NAVBAR.BREAKPOINT)]: {
      display: 'none',
    },

    [responsive('between', 'md', NAVBAR.BREAKPOINT)]: {
      borderTop: '1px solid',
      borderColor: alpha(palette.primary.main, 0.12),
      paddingTop: 2,
    },
  },
}

const primary_button_sx: SxProps = {
  color: 'grey.100',
  boxShadow: `0 12px 24px ${alpha(palette.primary.main, 0.24)}`,
  '&:hover': {
    boxShadow: `0 12px 24px ${alpha(palette.primary.main, 0.24)}`,
    bgcolor: 'primary.dark',
  },
}

const secondary_button_sx: SxProps = {
  borderColor: alpha(palette.primary.main, 0.18),
  bgcolor: alpha(palette.background.paper, 0.84),
  color: 'text.primary',
  '&:hover': {
    borderColor: 'primary.main',
    bgcolor: alpha(palette.secondary.main, 0.78),
  },
}

export type NavbarCallToActionButtonsProps = {
  mobile?: boolean
  locale: string
}

export { NavbarCallToActionButtons }
