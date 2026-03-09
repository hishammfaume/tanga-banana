import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import payloadConfig from '@payload-config'

export const dynamic = 'force-dynamic'

const buildHtml = (title: string, subtitle: string, items: Record<string, string | undefined>) => {
  const rows = Object.entries(items)
    .filter(([, value]) => Boolean(value))
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 0;font-weight:600;color:#0f0a33;">${label}</td><td style="padding:8px 0;color:#444;">${value}</td></tr>`,
    )
    .join('')

  return `
    <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; color: #0f0a33;">
      <h2 style="margin-bottom: 4px;">${title}</h2>
      <p style="margin: 0 0 16px 0; color: #4f5d6a;">${subtitle}</p>
      <table width="100%" style="border-collapse:collapse;">${rows}</table>
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

    const internalRecipient =
      process.env.CONTACT_NOTIFICATION_EMAIL ||
      process.env.BOOKING_NOTIFICATION_EMAIL ||
      process.env.SMTP_TO ||
      process.env.SMTP_USER

    const userHtml = buildHtml('We received your message', 'Our team will reply shortly.', {
      Name: name,
      Email: email,
      Phone: phone,
      Subject: subject,
      Message: message,
    })

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
        'No internal contact notification recipient configured. Set CONTACT_NOTIFICATION_EMAIL or SMTP_TO.',
      )
    }

    const results = await Promise.allSettled(emailTasks)
    const failed = results.filter((r) => r.status === 'rejected')
    if (failed.length > 0) {
      payload.logger.error({ failed }, 'One or more contact emails failed to send.')
    }

    return NextResponse.json(
      { id: contact.id, name: contact.name, status: contact.status },
      { status: 201 },
    )
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to submit contact message'
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
