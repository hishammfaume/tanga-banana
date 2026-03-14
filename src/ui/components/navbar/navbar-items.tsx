'use client'
import { memo } from 'react'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import useSettings from 'src/hooks/useSettings'
import Stack from '@mui/material/Stack'
import List from '@mui/material/List'
import { NAVBAR, getNavbarItems } from './constants'
import ListItem from '@mui/material/ListItem'
import Link from 'next/link'
import useMediaQuery from '@mui/material/useMediaQuery'
import ListItemText from '@mui/material/ListItemText'
import { NavbarCallToActionButtons } from './nav-bar-call-to-actions'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import Collapse from '@mui/material/Collapse'
import { alpha, SxProps } from '@mui/material/styles'
import { responsive } from '@/utilities/breakpoints'
import typography from '@/Theme/typography'
import palette from '@/Theme/palette'
import { globalCssVar } from '../GlobalStyles'
import { useTranslations } from 'next-intl'
import LanguageSwitcher from './LanguageSwitcher'

type NavbarItemsProps = {
  locale: string
}

const NavbarItems = memo<NavbarItemsProps>(function NavbarItems({ locale }) {
  const { closeNavbar, toggleNavbar, onClickAway, isNavbarOpen, onLinkClick } = useSettings()

  const isMobile = useMediaQuery<Theme>((theme) => theme.breakpoints.down(NAVBAR.BREAKPOINT))

  const t = useTranslations()

  const navbarItems = getNavbarItems(locale)

  const navList = (
    <Stack
      component={List}
      spacing={isMobile ? 0.75 : 0}
      className="nav-items"
      sx={nav_items_sx}
      direction={isMobile ? 'column' : 'row'}
    >
      {navbarItems.map((item) => (
        <ListItem
          key={item.name}
          href={item.href}
          component={Link}
          onClick={onLinkClick}
          sx={item.sx ? ([nav_link_sx, item.sx] as SxProps<Theme>) : nav_link_sx}
        >
          <ListItemText className="nav-item-text" primary={t(item.name)} />
        </ListItem>
      ))}
    </Stack>
  )

  if (!isMobile) {
    return navList
  }

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <ClickAwayListener onClickAway={onClickAway as any}>
      <div>
        <Stack direction="row" spacing={1} alignItems="center">
          <LanguageSwitcher locale={locale} onSwitch={closeNavbar} />

          <IconButton
            className="nav-toggle"
            sx={{ justifyContent: 'center', alignItems: 'center' }}
            onClick={toggleNavbar}
          >
            <MenuIcon color="inherit" />
          </IconButton>
        </Stack>

        <Collapse sx={collapse_sx} in={isNavbarOpen}>
          <Stack className="mobile-nav-sheet" spacing={2.25}>
            {navList}

            <NavbarCallToActionButtons locale={locale} mobile />
          </Stack>
        </Collapse>
      </div>
    </ClickAwayListener>
  )
})

const collapse_sx = {
  position: 'fixed',
  top: globalCssVar('page-container-padding-top'),
  left: 0,
  right: 0,
  backgroundColor: globalCssVar('nav-background-color'),
  backdropFilter: 'blur(20px)',
  boxShadow: `0 18px 40px ${alpha(palette.grey[900], 0.08)}`,
  borderTop: `1px solid ${alpha(palette.primary.main, 0.1)}`,

  '& .mobile-nav-sheet': {
    paddingTop: 2,
  },
}

const nav_items_sx = {
  alignItems: 'center',
  flexWrap: 'nowrap',
  justifyContent: 'center',
  minWidth: 0,
  padding: 0,

  '& .nav-child-toggle': {
    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&.active': {
      transform: 'rotate(180deg)',
    },

    [responsive('down', NAVBAR.BREAKPOINT)]: {
      display: 'none',
    },
  },

  '& .nav-item-text.MuiListItemText-root .MuiListItemText-primary': {
    color: 'text.alt',
    whiteSpace: 'nowrap',
    textAlign: 'center',
    ...typography.body2,
    fontWeight: 600,
  },

  [responsive('down', NAVBAR.BREAKPOINT)]: {
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    paddingX: 2,
  },
}

const nav_link_sx: SxProps<Theme> = {
  alignItems: 'center',
  borderRadius: '999px',
  color: 'text.primary',
  display: 'flex',
  minHeight: { xs: 50, md: 40 },
  paddingX: { xs: 2, md: 1.5 },
  paddingY: { xs: 1, md: 0.75 },
  transition: 'background-color 160ms ease, color 160ms ease, transform 160ms ease',
  width: { xs: '100%', md: 'auto' },
  '&:hover': {
    backgroundColor: alpha(palette.primary.main, 0.08),
    transform: 'translateY(-1px)',
  },
}

export default NavbarItems
