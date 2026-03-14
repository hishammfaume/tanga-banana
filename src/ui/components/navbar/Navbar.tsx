// 'use client'

import Link from 'next/link'
// import { routes } from 'src/routes'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import { LogoWide } from './logo'
import PageContainer from '../page-container'
import { NavbarCallToActionButtons } from './nav-bar-call-to-actions'
// import useSettings from '@/hooks/useSettings'
import { globalCssVar } from '../GlobalStyles'
import cssStyles from '@/utilities/cssStyles'
import { responsive } from '@/utilities/breakpoints'
import { NAVBAR } from './constants'
import palette from '@/Theme/palette'
import NavbarItems from './navbar-items'
import { getLocale } from 'next-intl/server'

const Navbar = async () => {
  // const { isNavbarOpen } = useSettings()
  const locale = await getLocale()

  return (
    <AppBar sx={sx} elevation={0}>
      <PageContainer
        sx={{ height: '100%', display: 'flex', alignItems: 'center' }}
        className="nav-container"
        ignoreNavHeight
      >
        <Stack
          alignItems="center"
          justifyContent="space-between"
          direction="row"
          flex={1}
          minWidth={0}
          columnGap={{ xs: 1, md: 2.5 }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <Link href={`/${locale}`}>
              <LogoWide />
            </Link>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flex: { xs: '0 0 auto', md: 1 },
              justifyContent: { xs: 'flex-end', md: 'center' },
              minWidth: 0,
            }}
          >
            <NavbarItems locale={locale} />
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, flexShrink: 0 }}>
            <NavbarCallToActionButtons locale={locale} />
          </Box>
        </Stack>
      </PageContainer>
    </AppBar>
  )
}

const sx = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  height: globalCssVar('page-container-padding-top'),
  zIndex: 1200,

  // STATIC blur (no scroll JS)
  ...cssStyles().bgBlur({
    opacity: 0.1,
    blur: 12,
    color: '#ffffff',
    filters: 'saturate(1.75)',
  }),

  transition: 'background-color 0.2s ease-in-out',

  '& .nav-container': {
    height: globalCssVar('nav-height'),
  },

  [responsive('down', NAVBAR.BREAKPOINT)]: {
    paddingLeft: 0.4,
    '&.nav-open': {
      backgroundColor: palette.background.default,
    },
  },
  [responsive('up', NAVBAR.BREAKPOINT)]: {
    '& .nav-toggle': {
      display: 'none',
    },
  },
}

export default Navbar
