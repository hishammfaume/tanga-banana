import type { CollectionConfig } from 'payload'

import { authenticated } from '@/access/authenticated'
import { anyone } from '@/access/anyone'
import { slugField } from '@/app/(payload)/admin/fields/slug'

export const BlogTags: CollectionConfig = {
  slug: 'blog-tags',
  labels: {
    singular: 'Blog Tag',
    plural: 'Blog Tags',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      localized: true,
      type: 'text',
      required: true,
    },
    slugField('title'),
  ],
  timestamps: true,
}
