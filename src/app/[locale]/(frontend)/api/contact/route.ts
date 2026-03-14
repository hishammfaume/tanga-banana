import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import payloadConfig from '@payload-config'
import { CONTACT_NOTIFICATION_EMAIL } from '@/utilities/constants/notificationEmails'

export const dynamic = 'force-dynamic'

const shouldFailOnEmailError =
  process.env.EMAIL_FAIL_ON_SEND_ERROR === 'true' ||
  (process.env.EMAIL_FAIL_ON_SEND_ERROR !== 'false' && process.env.NODE_ENV !== 'production')

const serializeError = (error: unknown) => {
  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      stack: error.stack,
    }
  }

  if (typeof error === 'string') {
    return {
      message: error,
    }
  }

  try {
    return JSON.parse(JSON.stringify(error))
  } catch {
    return {
      message: 'Unknown error',
    }
  }
}

const buildHtml = (title: string, subtitle: string, items: Record<string, string | undefined>) => {
  const rows = Object.entries(items)
    .filter(([, value]) => Boolean(value))
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 0;font-weight:600;color:#14532D;">${label}</td><td style="padding:8px 0;color:#454F5B;">${value}</td></tr>`,
    )
    .join('')
  const detailsTable = rows
    ? `<table width="100%" style="border-collapse:collapse;">${rows}</table>`
    : ''

  return `
    <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; color: #14532D;">
      <h2 style="margin-bottom: 4px;">${title}</h2>
      <p style="margin: 0 0 16px 0; color: #637381;">${subtitle}</p>
      ${detailsTable}
    </div>
  `
}

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json()
    const { firstName, lastName, email, phone, subject, message } = body || {}

    if (!firstName || !lastName || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'firstName, lastName, email, subject, and message are required.' },
        { status: 400 },
      )
    }

    const payload = await getPayload({ config: payloadConfig })
    const name = `${firstName} ${lastName}`.trim()

    const contact = await payload.create({
      collection: 'contact-messages',
      data: {
        name,
        email,
        phone,
        subject,
        message,
        status: 'new',
      },
      overrideAccess: false,
    })

    const internalRecipient = CONTACT_NOTIFICATION_EMAIL

    const userHtml = buildHtml(
      'We received your message',
      'Thank you for reaching out. Our team will review your enquiry and reply shortly.',
      {},
    )

    const adminHtml = buildHtml(
      `New contact message from ${name}`,
      'A new enquiry was submitted on the website.',
      {
        Name: name,
        Email: email,
        Phone: phone,
        Subject: subject,
        Message: message,
      },
    )

    const emailTasks: Array<Promise<unknown>> = [
      payload.sendEmail({
        to: email,
        subject: 'Thanks for reaching out to Tanga Banana',
        html: userHtml,
      }),
    ]

    if (internalRecipient) {
      emailTasks.push(
        payload.sendEmail({
          to: internalRecipient,
          subject: `New contact enquiry: ${subject}`,
          html: adminHtml,
        }),
      )
    } else {
      payload.logger.warn(
        'No internal contact notification recipient configured. Set CONTACT_NOTIFICATION_EMAIL, BOOKING_NOTIFICATION_EMAIL, or SMTP_TO.',
      )
    }

    const results = await Promise.allSettled(emailTasks)
    const failed = results
      .filter((result): result is PromiseRejectedResult => result.status === 'rejected')
      .map((result) => serializeError(result.reason))

    if (failed.length > 0) {
      payload.logger.error({ failed }, 'One or more contact emails failed to send.')

      if (shouldFailOnEmailError) {
        return NextResponse.json(
          {
            error: 'Contact message was saved, but one or more emails failed to send.',
            contactId: contact.id,
            emailDelivered: false,
          },
          { status: 502 },
        )
      }
    }

    return NextResponse.json(
      {
        id: contact.id,
        name: contact.name,
        status: contact.status,
        emailDelivered: failed.length === 0,
      },
      { status: 201 },
    )
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to submit contact message'
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
