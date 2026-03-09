import { SxProps } from '@mui/material/styles'
import { RefObject } from 'react'
import { routes } from 'src/routes'

const NAVBAR = {
  HEIGHT_SM: 65,
  HEIGHT_MD: 70,
  TOGGLE_SIZE: 40,

  COLLAPSED_HEIGHT: 40,
  BREAKPOINT: 'md',
} as const

const NAVBAR_BROCHURE = {
  HEIGHT_SM: 0,
  HEIGHT_MD: 0,
} as const

const NAVBAR_LOGO = {
  HEIGHT_SM: 40,
  HEIGHT_MD: 50,
} as const

const NAVBAR_ITEMS: NavbarLinkItem[] = [
  {
    name: 'Home',
    href: routes.home,
    children: [],
  },
  {
    name: 'Experiences',
    href: routes.experiences,
    children: [],
  },
  {
    name: 'About Us',
    href: routes.about,
    children: [],
  },

  {
    name: 'Contact Us',
    href: routes.contact,
    children: [],
  },
]

export type NavbarLinkItem = {
  name: string
  href: string
  children?: NavbarLinkItem[]
  sx?: SxProps
  renderChildren?: React.FC<{
    link: string
    refs: RefObject<{
      [key: string]: HTMLButtonElement | null
    }>
  }>
}

export { NAVBAR, NAVBAR_BROCHURE, NAVBAR_LOGO, NAVBAR_ITEMS }
