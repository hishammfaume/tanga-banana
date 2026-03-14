import { routing, type Locale } from '@/i18n/routing'

const normalizePath = (path: string) => {
  if (!path || path === '/') return ''

  return path.startsWith('/') ? path : `/${path}`
}

export const isLocale = (value: string | null | undefined): value is Locale => {
  return Boolean(value && routing.locales.includes(value as Locale))
}

export const getLocaleFromPathname = (pathname: null | string | undefined): Locale => {
  const firstSegment = pathname?.split('/').filter(Boolean)[0]

  return isLocale(firstSegment) ? firstSegment : routing.defaultLocale
}

export const getLocaleHomePath = (locale?: null | string) => {
  const resolvedLocale = isLocale(locale) ? locale : routing.defaultLocale

  return `/${resolvedLocale}`
}

export const getLocalizedAppPath = (locale: null | string | undefined, path = '') => {
  return `${getLocaleHomePath(locale)}${normalizePath(path)}`
}
