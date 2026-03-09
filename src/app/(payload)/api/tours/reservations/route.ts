import { NextRequest, NextResponse } from 'next/server'
import { getPayload, type Payload } from 'payload'
import payloadConfig from '@payload-config'
import type { TourReservation } from '@/payload-types'
import { loadAndCompileTemplate } from '@/mjml/helpers'

export const dynamic = 'force-dynamic'

const DEFAULT_TIMEZONE = 'Africa/Dar_es_Salaam'

const timePreferenceLabelMap: Record<NonNullable<TourReservation['timePreference']>, string> = {
  morning: 'Morning',
  afternoon: 'Afternoon',
  fullday: 'Full day',
}

const formatDateForEmail = (date: string, timezone?: string | null): string => {
  const parsedDate = new Date(date)

  if (Number.isNaN(parsedDate.getTime())) return date

  return new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'full',
    timeZone: timezone || DEFAULT_TIMEZONE,
  }).format(parsedDate)
}

const formatTimePreference = (timePreference?: TourReservation['timePreference']) => {
  if (!timePreference) return 'Not specified'
  return timePreferenceLabelMap[timePreference] ?? timePreference
}

const buildBookingSummaryItems = (reservation: TourReservation) => {
  const guestSummary = `${reservation.adults} adult${reservation.adults === 1 ? '' : 's'}, ${reservation.children} child${reservation.children === 1 ? '' : 'ren'}`

  return [
    { label: 'Booking code', value: reservation.confirmationCode || 'Pending' },
    { label: 'Date', value: formatDateForEmail(reservation.date, reservation.timezone) },
    { label: 'Preferred time', value: formatTimePreference(reservation.timePreference) },
    { label: 'Estimated duration', value: `${reservation.durationMinutes} minutes` },
    { label: 'Timezone', value: reservation.timezone || DEFAULT_TIMEZONE },
    { label: 'Guest count', value: guestSummary },
    { label: 'Name', value: reservation.name },
    { label: 'Email', value: reservation.email },
    { label: 'Phone', value: reservation.phone || 'Not provided' },
    { label: 'Notes', value: reservation.notes || 'No additional notes' },
  ]
}

const sendReservationEmails = async ({
  payload,
  reservation,
}: {
  payload: Payload
  reservation: TourReservation
}) => {
  const bookingItems = buildBookingSummaryItems(reservation)
  const internalRecipient =
    process.env.BOOKING_NOTIFICATION_EMAIL || process.env.SMTP_TO || process.env.SMTP_USER

  const sendEmailTasks: Array<Promise<unknown>> = [
    payload.sendEmail({
      to: reservation.email,
      subject: `Booking request received (${reservation.confirmationCode || reservation.id})`,
      html: loadAndCompileTemplate('tour-booking-confirmation', {
        title: 'Booking Request Received',
        name: reservation.name,
        description: 'thank you for booking with Tanga Banana.',
        booking: {
          items: bookingItems,
        },
      }),
    }),
  ]

  if (internalRecipient) {
    sendEmailTasks.push(
      payload.sendEmail({
        to: internalRecipient,
        subject: `New booking request from ${reservation.name}`,
        html: loadAndCompileTemplate('tour-booking-notification', {
          title: 'New Booking Request',
          description: `A new booking was submitted by ${reservation.name}.`,
          booking: {
            items: bookingItems,
          },
        }),
      }),
    )
  } else {
    payload.logger.warn(
      'No internal booking notification recipient configured. Set BOOKING_NOTIFICATION_EMAIL or SMTP_TO.',
    )
  }

  const results = await Promise.allSettled(sendEmailTasks)
  const failed = results.filter((result) => result.status === 'rejected')

  if (failed.length > 0) {
    throw new Error(`Failed to send ${failed.length} reservation email(s).`)
  }
}

export const POST = async (req: NextRequest) => {
  try {
    const payload = await getPayload({ config: payloadConfig })
    const body = await req.json()

    const { date, timePreference, durationMinutes, timezone, name, email, phone, notes, adults, children } = body || {}
    if (!date || !timePreference || !name || !email) {
      return NextResponse.json({ error: 'date, timePreference, name, and email are required.' }, { status: 400 })
    }
    const adultsCount = adults ?? 2
    const childrenCount = children ?? 0
    if (adultsCount < 1 || childrenCount < 0) {
      return NextResponse.json({ error: 'Invalid guest counts.' }, { status: 400 })
    }

    const reservation = await payload.create({
      collection: 'tour-reservations',
      data: {
        date,
        timePreference,
        durationMinutes: durationMinutes ?? 180,
        timezone: timezone ?? DEFAULT_TIMEZONE,
        adults: adultsCount,
        children: childrenCount,
        name,
        email,
        phone,
        notes,
        status: 'confirmed',
      },
    })

    try {
      await sendReservationEmails({ payload, reservation })
    } catch (emailError) {
      const message = emailError instanceof Error ? emailError.message : 'Unknown email error'
      payload.logger.error(
        `Reservation ${reservation.id} created but one or more emails failed to send: ${message}`,
      )
    }

    return NextResponse.json(
      {
        id: reservation.id,
        confirmationCode: reservation.confirmationCode,
        date: reservation.date,
        timePreference: reservation.timePreference,
        durationMinutes: reservation.durationMinutes,
        timezone: reservation.timezone,
        adults: reservation.adults,
        children: reservation.children,
        name: reservation.name,
        email: reservation.email,
        notes: reservation.notes,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Reservation error', error)
    const message = error instanceof Error ? error.message : 'Failed to create reservation'
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
