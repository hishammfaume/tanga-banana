export type CreateReservationPayload = {
  date: string
  timePreference: 'morning' | 'afternoon' | 'fullday'
  durationMinutes?: number
  timezone?: string
  adults?: number
  children?: number
  name: string
  email: string
  phone?: string
  notes?: string
}

export type CreateReservationResponse = {
  id: string
  confirmationCode: string
  date: string
  timePreference: 'morning' | 'afternoon' | 'fullday'
  durationMinutes: number
  timezone: string
  adults: number
  children: number
  name: string
  email: string
  notes?: string
}

/**
 * Client-side helper to book a tour via the public reservations endpoint.
 */
export const createReservation = async (
  input: CreateReservationPayload,
): Promise<CreateReservationResponse> => {
  const res = await fetch('/api/tours/reservations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error ?? 'Failed to create reservation')
  }

  return res.json()
}
