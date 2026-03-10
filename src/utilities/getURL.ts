import canUseDOM from './canUseDOM'

const DEFAULT_LOCAL_ORIGIN = 'http://localhost:3000'

const trimTrailingSlash = (value: string) => value.replace(/\/+$/, '')

const getConfiguredOrigin = () => {
  if (process.env.NEXT_PUBLIC_SERVER_URL) {
    return trimTrailingSlash(process.env.NEXT_PUBLIC_SERVER_URL)
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return trimTrailingSlash(`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`)
  }

  return undefined
}

export const getServerSideURL = () => {
  return getConfiguredOrigin() || DEFAULT_LOCAL_ORIGIN
}

export const getClientSideURL = () => {
  if (canUseDOM) {
    return trimTrailingSlash(window.location.origin)
  }

  return getServerSideURL()
}

export const getSiteOriginURL = () => new URL(getServerSideURL())
