import { EMAILS, ICONS, PHONE_NUMBER, SOCIALS, WHATSAPP_LINK } from '@/utilities/constants/common'
import FULL_EXPERIENCE_ITEMS from '@/ui/sections/experiences/constants'
import { routes } from '@/routes'
import type { ReactNode } from 'react'

type FooterLink = {
  title: string
  href: string
  icon?: ReactNode
  external?: boolean
  newTab?: boolean
}

type FooterLinkGroup = {
  title: string
  links: FooterLink[]
}

const LINKS: FooterLinkGroup[] = [
  {
    title: 'Explore',
    links: [
      { title: 'Home', href: routes.home },
      { title: 'Experiences', href: routes.experiences },
      { title: 'About Us', href: routes.about },
      { title: 'Contact Us', href: routes.contact },
    ],
  },
  {
    title: 'Experiences',
    links: FULL_EXPERIENCE_ITEMS.map((item) => ({
      title: item.title,
      href: `${routes.experiences}#${item.sectionId}`,
    })),
  },
  {
    title: 'Contact',
    links: [
      {
        title: PHONE_NUMBER.contact.formatted,
        href: PHONE_NUMBER.contact.href,
        icon: ICONS.call,
        external: true,
      },
      {
        title: EMAILS.mail,
        href: EMAILS.mailto,
        icon: ICONS.email_outlined,
        external: true,
      },
      {
        title: 'WhatsApp Us',
        href: WHATSAPP_LINK,
        icon: ICONS.whatsapp,
        external: true,
        newTab: true,
      },
      {
        title: 'Instagram',
        href: SOCIALS.instagram.link,
        icon: SOCIALS.instagram.icon,
        external: true,
        newTab: true,
      },
      {
        title: 'Find Us on Google Maps',
        href: SOCIALS.google.link,
        icon: SOCIALS.google.icon,
        external: true,
        newTab: true,
      },
    ],
  },
]

export { LINKS }
