'use client'

import Link from 'next/link'
import { routes } from 'src/routes'
import NavbarItems from './navbar-items'
import AppBar from '@mui/material/AppBar'
import Stack from '@mui/material/Stack'
import { LogoWide } from './logo'
import PageContainer from '../page-container'
import { NavbarCallToActionButtons } from './nav-bar-call-to-actions'
import useSettings from '@/hooks/useSettings'
import { globalCssVar } from '../GlobalStyles'
import cssStyles from '@/utilities/cssStyles'
import { responsive } from '@/utilities/breakpoints'
import { NAVBAR } from './constants'
import palette from '@/Theme/palette'

const Navbar = () => {
  const { isNavbarOpen } = useSettings()

  return (
    <AppBar sx={sx} elevation={0} className={isNavbarOpen ? 'nav-open' : ''}>
      <PageContainer
        sx={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
        className="nav-container"
        ignoreNavHeight
        // transparent
      >
        <Stack alignItems="center" justifyContent="space-between" direction="row" flex={1}>
          <Link href={routes.home}>
            <LogoWide isScrolled={isNavbarOpen} />
          </Link>
          <NavbarItems />
          <NavbarCallToActionButtons />
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
