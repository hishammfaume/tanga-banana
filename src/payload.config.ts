import { postgresAdapter } from '@payloadcms/db-postgres'
import sharp from 'sharp'
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { MailtrapTransport } from 'mailtrap'
import nodemailer from 'nodemailer'
import { plugins } from './plugins'
import { defaultLexical } from '@/app/(payload)/admin/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'
import { EMAIL_FROM_ADDRESS, EMAIL_FROM_NAME } from '@/utilities/constants/notificationEmails'
import { Users } from './app/(payload)/admin/collections/Users'
import { BlogImages } from './app/(payload)/admin/collections/BlogImages'
import { Blogs } from './app/(payload)/admin/collections/Blogs'
import { BlogTags } from './app/(payload)/admin/collections/BlogTags'
import { TourReservations } from './app/(payload)/admin/collections/TourReservations'
import { ContactMessages } from './app/(payload)/admin/collections/ContactMessages'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const mailtrapToken = process.env.MAILTRAP_API_KEY || process.env.MAILTRAP_TOKEN
const mailtrapUseSandbox = process.env.MAILTRAP_USE_SANDBOX === 'true'
const mailtrapInboxId = process.env.MAILTRAP_INBOX_ID
  ? Number(process.env.MAILTRAP_INBOX_ID)
  : undefined
const hasSmtpConfig = Boolean(
  process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS,
)
const emailTransportMode =
  process.env.EMAIL_TRANSPORT?.toLowerCase() || (hasSmtpConfig ? 'smtp' : mailtrapToken ? 'mailtrap' : 'smtp')
const useMailtrapApiTransport =
  emailTransportMode === 'mailtrap' || emailTransportMode === 'mailtrap-api'

const emailTransport = useMailtrapApiTransport && mailtrapToken
  ? nodemailer.createTransport(
      MailtrapTransport({
        token: mailtrapToken,
        sandbox: mailtrapUseSandbox,
        testInboxId: mailtrapUseSandbox ? mailtrapInboxId : undefined,
      }),
    )
  : nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

export default buildConfig({
  admin: {
    components: {
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below.
      beforeLogin: ['@/components/BeforeLogin'],
      // The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below.
      // beforeDashboard: ['@/components/BeforeDashboard'],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  localization: {
    defaultLocale: 'en',
    fallback: true,
    locales: [
      {
        code: 'en',
        label: 'English',
      },
      {
        code: 'sw',
        label: 'Swahili',
      },
    ],
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  collections: [Users, BlogImages, BlogTags, Blogs, TourReservations, ContactMessages],
  cors: [getServerSideURL()].filter(Boolean),
  plugins,
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user) return true

        const secret = process.env.CRON_SECRET
        if (!secret) return false

        // If there is no logged in user, then check
        // for the Vercel Cron secret to be present as an
        // Authorization header:
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${secret}`
      },
    },
    tasks: [],
  },
  email: nodemailerAdapter({
    defaultFromAddress: EMAIL_FROM_ADDRESS,
    defaultFromName: EMAIL_FROM_NAME,
    transport: emailTransport,
  }),
})
