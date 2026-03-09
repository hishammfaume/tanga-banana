import crypto from 'crypto'
import type { CollectionConfig } from 'payload'

import { authenticated } from '@/access/authenticated'

export const TourReservations: CollectionConfig<'tour-reservations'> = {
  slug: 'tour-reservations',
  labels: {
    singular: 'Tour Reservation',
    plural: 'Tour Reservations',
  },
  access: {
    create: () => true, // public bookings
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['startDateTime', 'name', 'status'],
    useAsTitle: 'name',
  },
  hooks: {
    beforeChange: [
      async ({ data }) => {
        if (!data.confirmationCode) {
          data.confirmationCode = crypto.randomUUID()
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'date',
      label: 'Date of Tour',
      type: 'date',
      required: true,
    },
    {
      name: 'timePreference',
      label: 'Preferred Time',
      type: 'select',
      options: [
        { label: 'Morning', value: 'morning' },
        { label: 'Afternoon', value: 'afternoon' },
        { label: 'Full Day', value: 'fullday' },
      ],
      defaultValue: 'morning',
    },
    {
      name: 'timezone',
      type: 'text',
      label: 'Timezone',
      defaultValue: 'Africa/Dar_es_Salaam',
    },
    {
      name: 'durationMinutes',
      label: 'Estimated Duration (minutes)',
      type: 'number',
      required: true,
      min: 10,
      defaultValue: 180,
    },
    {
      name: 'adults',
      label: 'Adults',
      type: 'number',
      min: 1,
      defaultValue: 2,
      required: true,
    },
    {
      name: 'children',
      label: 'Children',
      type: 'number',
      min: 0,
      defaultValue: 0,
      required: true,
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'notes',
      type: 'textarea',
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Confirmed', value: 'confirmed' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
      defaultValue: 'confirmed',
    },
    {
      name: 'confirmationCode',
      type: 'text',
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },
  ],
}
