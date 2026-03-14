import type { Access, CollectionConfig } from 'payload'

import { authenticated } from '@/access/authenticated'
import { slugField } from '@/app/(payload)/admin/fields/slug'
import { revalidateBlogsAfterChange, revalidateBlogsAfterDelete } from '@/hooks/revalidateBlogs'

const authenticatedOrPublished: Access = ({ req: { user } }) => {
  if (user) {
    return true
  }

  return {
    status: {
      equals: 'published',
    },
  }
}

const getRelationshipID = (value: unknown) => {
  if (typeof value === 'number' || typeof value === 'string') {
    return value
  }

  if (value && typeof value === 'object' && 'id' in value) {
    const id = (value as { id?: unknown }).id

    if (typeof id === 'number' || typeof id === 'string') {
      return id
    }
  }

  return undefined
}

const collectTextNodes = (value: unknown): string[] => {
  if (!value || typeof value !== 'object') {
    return []
  }

  if (Array.isArray(value)) {
    return value.flatMap((entry) => collectTextNodes(entry))
  }

  const node = value as Record<string, unknown>
  const text = typeof node.text === 'string' ? [node.text] : []
  const children = collectTextNodes(node.children)

  return [...text, ...children]
}

const estimateReadingTime = (content: unknown) => {
  const words = collectTextNodes(content).join(' ').trim().split(/\s+/).filter(Boolean).length

  if (!words) {
    return undefined
  }

  return Math.max(1, Math.ceil(words / 200))
}

export const Blogs: CollectionConfig = {
  slug: 'blogs',
  labels: {
    singular: 'Blog',
    plural: 'Blogs',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['title', 'status', 'authorName', 'publishedAt', 'updatedAt'],
    useAsTitle: 'title',
  },
  hooks: {
    afterChange: [revalidateBlogsAfterChange],
    afterDelete: [revalidateBlogsAfterDelete],
    afterRead: [
      ({ doc }) => {
        if (!doc || typeof doc !== 'object') {
          return doc
        }

        const nextDoc = doc as Record<string, unknown>

        if (!nextDoc.featuredImage && nextDoc.thumbnail) {
          nextDoc.featuredImage = nextDoc.thumbnail
        }

        if (typeof nextDoc.readingTimeMinutes !== 'number') {
          const readingTime = estimateReadingTime(nextDoc.content)

          if (readingTime) {
            nextDoc.readingTimeMinutes = readingTime
          }
        }

        return doc
      },
    ],
    beforeValidate: [
      ({ data, originalDoc }) => {
        if (!data || typeof data !== 'object') {
          return data
        }

        const nextData = data as Record<string, unknown>
        const previousDoc =
          originalDoc && typeof originalDoc === 'object'
            ? (originalDoc as Record<string, unknown>)
            : undefined

        if (!nextData.featuredImage) {
          nextData.featuredImage =
            nextData.thumbnail ?? previousDoc?.featuredImage ?? previousDoc?.thumbnail
        }

        return data
      },
    ],
    beforeChange: [
      async ({ data, operation, originalDoc, req }) => {
        if (operation === 'create' && !data.author && req.user) {
          data.author = req.user.id
        }

        const nextStatus = typeof data.status === 'string' ? data.status : originalDoc?.status

        if (nextStatus === 'published' && !data.publishedAt && !originalDoc?.publishedAt) {
          data.publishedAt = new Date().toISOString()
        }

        const readingTime = estimateReadingTime(data.content ?? originalDoc?.content)

        if (readingTime) {
          data.readingTimeMinutes = readingTime
        }

        const authorID = getRelationshipID(data.author) ?? getRelationshipID(originalDoc?.author)

        if (authorID) {
          const author = await req.payload.findByID({
            collection: 'users',
            id: authorID,
            overrideAccess: false,
            req,
          })

          data.authorName = author.name || author.email
        }

        return data
      },
    ],
  },
  fields: [
    {
      name: 'title',
      localized: true,
      type: 'text',
      required: true,
    },
    slugField('title'),
    {
      name: 'featuredImage',
      type: 'upload',
      localized: true,
      relationTo: 'blog-images',
      required: true,
    },
    {
      name: 'featuredImageAlt',
      localized: true,
      type: 'text',
    },
    {
      name: 'thumbnail',
      type: 'upload',
      admin: {
        hidden: true,
      },
      relationTo: 'blog-images',
    },
    {
      name: 'author',
      type: 'relationship',
      admin: {
        position: 'sidebar',
      },
      maxDepth: 0,
      relationTo: 'users',
      required: true,
    },
    {
      name: 'authorName',
      type: 'text',
      admin: {
        hidden: true,
      },
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      admin: {
        position: 'sidebar',
      },
      defaultValue: 'draft',
      options: [
        {
          label: 'Draft',
          value: 'draft',
        },
        {
          label: 'Published',
          value: 'published',
        },
      ],
      required: true,
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },
    {
      name: 'tags',
      type: 'relationship',
      hasMany: true,
      relationTo: 'blog-tags',
    },
    {
      name: 'excerpt',
      localized: true,
      type: 'textarea',
      maxLength: 220,
    },
    {
      name: 'content',
      localized: true,
      type: 'richText',
      required: true,
    },
    {
      name: 'images',
      label: 'Blog Images',
      type: 'upload',
      hasMany: true,
      localized: true,
      relationTo: 'blog-images',
    },
    {
      name: 'relatedPosts',
      type: 'relationship',
      hasMany: true,
      relationTo: 'blogs',
    },
    {
      name: 'readingTimeMinutes',
      type: 'number',
      localized: true,
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          localized: true,
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
          maxLength: 160,
        },
        {
          name: 'keywords',
          type: 'text',
          localized: true,
        },
        {
          name: 'noIndex',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },
  ],
  timestamps: true,
}
