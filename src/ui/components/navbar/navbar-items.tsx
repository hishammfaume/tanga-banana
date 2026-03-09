/* eslint-disable @typescript-eslint/no-empty-object-type */

'use client'
import { Fragment, memo, useMemo, useRef } from 'react'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import useSettings from 'src/hooks/useSettings'
import Stack from '@mui/material/Stack'
import List from '@mui/material/List'
import { NAVBAR, NAVBAR_ITEMS } from './constants'
import ListItem from '@mui/material/ListItem'
import Link from 'next/link'
import useMediaQuery from '@mui/material/useMediaQuery'
import ListItemText from '@mui/material/ListItemText'
import { NavbarCallToActionButtons } from './nav-bar-call-to-actions'
import { ClickAwayListener, Collapse } from 'node_modules/@mui/material'
import { responsive } from '@/utilities/breakpoints'
import typography from '@/Theme/typography'
import palette from '@/Theme/palette'
import { globalCssVar } from '../GlobalStyles'

const NavbarItems = memo<NavbarItemsProps>(function NavbarItems() {
  const { toggleNavbar, onClickAway, isNavbarOpen, onLinkClick } = useSettings()

  const isUpBreakPoint = useMediaQuery<Theme>((theme) => theme.breakpoints.down(NAVBAR.BREAKPOINT))

  const refs = useRef<{ [key: string]: HTMLButtonElement | null }>({})

  const children = useMemo(() => {
    return (
      <>
        <IconButton
          sx={{ justifyContent: 'center', alignItems: 'center' }}
          className="nav-toggle fake"
        >
          <MenuIcon />
        </IconButton>
        <Stack>
          <Stack
            component={List}
            spacing={1}
            className="nav-items"
            sx={nav_items_sx}
            direction={{
              xs: 'column',
              [NAVBAR.BREAKPOINT]: 'row',
            }}
          >
            {NAVBAR_ITEMS.map((item) => {
              return (
                <Fragment key={item.name}>
                  <ListItem
                    href={item.href}
                    component={Link}
                    onClick={onLinkClick}
                    ref={(e) => {
                      refs.current[item.name] = e as unknown as HTMLButtonElement
                    }}
                    sx={item.sx}
                  >
                    <ListItemText className="nav-item-text" primary={item.name} />
                  </ListItem>
                </Fragment>
              )
            })}
          </Stack>
          <NavbarCallToActionButtons mobile />
        </Stack>
      </>
    )
  }, [onLinkClick])

  if (!isUpBreakPoint) return children

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <ClickAwayListener onClickAway={onClickAway as any}>
      <div>
        <IconButton
          className="nav-toggle"
          sx={{ justifyContent: 'center', alignItems: 'center' }}
          onClick={toggleNavbar}
        >
          <MenuIcon color="inherit" />
        </IconButton>

        <Collapse sx={collapse_sx} in={isNavbarOpen}>
          <div>{children}</div>
        </Collapse>
      </div>
    </ClickAwayListener>
  )
})

type NavbarItemsProps = {}
const collapse_sx = {
  position: 'fixed',
  top: globalCssVar('page-container-padding-top'),
  left: 0,
  right: 0,
  backgroundColor: globalCssVar('nav-background-color'),
  // boxShadow: shadows[12],
  boxShadow: '0px 12px 12px 0px rgba(0,0,0,0.1)',
  //border top
  borderTop: palette.grey[200],
  borderTopWidth: 1,
  borderTopStyle: 'solid',

  '& .nav-items': {
    display: 'flex',
  },

  '& .fake': {
    display: 'none !important',
  },
}

const nav_items_sx = {
  flexWrap: 'nowrap',

  [responsive('down', NAVBAR.BREAKPOINT)]: {
    display: 'none',
  },

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
  },
}

export default NavbarItems
