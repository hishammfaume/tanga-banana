import type { CollectionConfig } from 'payload'

import { authenticated } from '@/access/authenticated'

export const ContactMessages: CollectionConfig<'contact-messages'> = {
  slug: 'contact-messages',
  labels: {
    singular: 'Contact Message',
    plural: 'Contact Messages',
  },
  access: {
    create: () => true,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'email', 'status', 'createdAt'],
    useAsTitle: 'subject',
  },
  fields: [
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
      name: 'subject',
      type: 'text',
      required: true,
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'In Progress', value: 'in-progress' },
        { label: 'Resolved', value: 'resolved' },
      ],
    },
    {
      name: 'internalNotes',
      type: 'textarea',
      admin: {
        position: 'sidebar',
      },
    },
  ],
  timestamps: true,
}
