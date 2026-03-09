import { NextRequest, NextResponse } from 'next/server'

const TIMEZONE = 'Africa/Dar_es_Salaam'
const SLOT_DURATION_MIN = 60

// Opening hours per weekday (0 = Sunday)
const DAILY_HOURS: Record<number, { start: string; end: string }> = {
  0: { start: '06:30', end: '17:30' }, // Sunday
  1: { start: '06:00', end: '17:00' }, // Monday
  2: { start: '06:00', end: '17:00' }, // Tuesday
  3: { start: '06:00', end: '17:00' }, // Wednesday
  4: { start: '06:00', end: '17:00' }, // Thursday
  5: { start: '06:00', end: '11:00' }, // Friday (closes early)
  6: { start: '06:30', end: '17:00' }, // Saturday
}

const parseDateInTz = (date: string, time: string) => {
  const [year, month, day] = date.split('-').map(Number)
  const [hour, minute] = time.split(':').map(Number)
  const local = new Date(Date.UTC(year, month - 1, day, hour, minute))
  const tzOffsetMinutes =
    -1 *
    (local.getTimezoneOffset() -
      new Date(local.toLocaleString('en-US', { timeZone: TIMEZONE })).getTimezoneOffset())
  return new Date(local.getTime() + tzOffsetMinutes * 60 * 1000)
}

const generateSlots = (date: string) => {
  const weekday = new Date(`${date}T00:00:00Z`).getUTCDay()
  const hours = DAILY_HOURS[weekday]
  if (!hours) return []

  const toMinutes = (t: string) => {
    const [h, m] = t.split(':').map(Number)
    return h * 60 + m
  }

  const startM = toMinutes(hours.start)
  const endM = toMinutes(hours.end)

  const docs = []
  for (let m = startM; m < endM; m += SLOT_DURATION_MIN) {
    const hour = Math.floor(m / 60)
    const minute = m % 60
    const hh = String(hour).padStart(2, '0')
    const mm = String(minute).padStart(2, '0')
    const dt = parseDateInTz(date, `${hh}:${mm}`)

    docs.push({
      id: `${date}-${hh}${mm}`,
      title: `Tour ${hh}:${mm}`,
      startDateTime: dt.toISOString(),
      durationMinutes: SLOT_DURATION_MIN,
      timezone: TIMEZONE,
    })
  }

  return docs
}

export const dynamic = 'force-dynamic'

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url)
    const date = searchParams.get('date')

    if (!date) {
      return NextResponse.json({ error: 'Missing date query param (YYYY-MM-DD).' }, { status: 400 })
    }

    const slots = generateSlots(date)
    if (!slots.length) {
      return NextResponse.json({ error: 'No availability for this date.' }, { status: 400 })
    }

    return NextResponse.json({ slots })
  } catch (error) {
    console.error('Availability error', error)
    return NextResponse.json({ error: 'Failed to load availability' }, { status: 500 })
  }
}
