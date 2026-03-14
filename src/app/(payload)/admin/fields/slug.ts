import type { TextField } from 'payload'

const slugify = (value: string) => {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export const slugField = (fieldToUse = 'title'): TextField => ({
  name: 'slug',
  type: 'text',
  admin: {
    position: 'sidebar',
  },
  hooks: {
    beforeValidate: [
      ({ value, data }) => {
        if (typeof value === 'string' && value.length > 0) {
          return slugify(value)
        }

        const sourceValue =
          data && typeof data === 'object' ? (data as Record<string, unknown>)[fieldToUse] : undefined

        if (typeof sourceValue === 'string' && sourceValue.length > 0) {
          return slugify(sourceValue)
        }

        return value
      },
    ],
  },
  index: true,
  required: true,
  unique: true,
})

