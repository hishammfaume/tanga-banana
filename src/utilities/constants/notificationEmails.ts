import 'server-only'

const INTERNAL_EMAIL_FALLBACK = process.env.SMTP_TO || process.env.SMTP_USER || null
const mailtrapUseSandbox = process.env.MAILTRAP_USE_SANDBOX === 'true'

export const EMAIL_FROM_ADDRESS =
  process.env.EMAIL_FROM_ADDRESS ||
  (mailtrapUseSandbox ? 'sandbox@example.com' : 'info@tanga-garden.com')

export const EMAIL_FROM_NAME = process.env.EMAIL_FROM_NAME || 'Tanga Banana Garden'

export const CONTACT_NOTIFICATION_EMAIL =
  process.env.CONTACT_NOTIFICATION_EMAIL ||
  process.env.BOOKING_NOTIFICATION_EMAIL ||
  INTERNAL_EMAIL_FALLBACK ||
  'tanga.farms@gmail.com'

export const BOOKING_NOTIFICATION_EMAIL =
  process.env.BOOKING_NOTIFICATION_EMAIL || INTERNAL_EMAIL_FALLBACK || 'tanga.farms@gmail.com'
