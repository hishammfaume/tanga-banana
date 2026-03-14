import { EMAILS, ICONS, PHONE_NUMBER, SOCIALS, WHATSAPP_LINK } from '@/utilities/constants/common'
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

type FooterLinkGroupsOptions = {
  locale: string
  labels: {
    groups: {
      explore: string
      experiences: string
      contact: string
    }
    nav: {
      home: string
      experiences: string
      about: string
      contact: string
      blog: string
    }
    experiences: {
      farmTours: string
      coffee: string
      culturalWalks: string
      freshAir: string
    }
    contact: {
      whatsapp: string
      instagram: string
      findUs: string
    }
  }
}

const withLocale = (locale: string, href: string) => {
  return href === routes.home ? `/${locale}` : `/${locale}${href}`
}

const getFooterLinkGroups = ({ locale, labels }: FooterLinkGroupsOptions): FooterLinkGroup[] => [
  {
    title: labels.groups.explore,
    links: [
      { title: labels.nav.home, href: withLocale(locale, routes.home) },
      { title: labels.nav.experiences, href: withLocale(locale, routes.experiences) },
      { title: labels.nav.about, href: withLocale(locale, routes.about) },
      { title: labels.nav.blog, href: withLocale(locale, routes.blog) },
      { title: labels.nav.contact, href: withLocale(locale, routes.contact) },
    ],
  },
  {
    title: labels.groups.experiences,
    links: [
      {
        title: labels.experiences.farmTours,
        href: `${withLocale(locale, routes.experiences)}#farm-tours`,
      },
      {
        title: labels.experiences.coffee,
        href: `${withLocale(locale, routes.experiences)}#tanga-coffee`,
      },
      {
        title: labels.experiences.culturalWalks,
        href: `${withLocale(locale, routes.experiences)}#cultural-walks`,
      },
      {
        title: labels.experiences.freshAir,
        href: `${withLocale(locale, routes.experiences)}#garden-relaxation`,
      },
    ],
  },
  {
    title: labels.groups.contact,
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
        title: labels.contact.whatsapp,
        href: WHATSAPP_LINK,
        icon: ICONS.whatsapp,
        external: true,
        newTab: true,
      },
      {
        title: labels.contact.instagram,
        href: SOCIALS.instagram.link,
        icon: SOCIALS.instagram.icon,
        external: true,
        newTab: true,
      },
      {
        title: labels.contact.findUs,
        href: SOCIALS.google.link,
        icon: SOCIALS.google.icon,
        external: true,
        newTab: true,
      },
    ],
  },
]

export { getFooterLinkGroups }
