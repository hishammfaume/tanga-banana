import configPromise from '@payload-config'
import { getPayload } from 'payload'

import type { Locale } from '@/i18n/routing'
import type { Blog, BlogImage, BlogTag } from '@/payload-types'
import { BLOG_IMAGE_PRESETS, getBlogImageSource } from '@/utilities/blogImages'
import { getSubstringFromLexicalRichText } from '@/utilities/functions'

const BLOG_DEPTH = 2

type BlogImageRelation =
  | Blog['featuredImage']
  | NonNullable<Blog['images']>[number]
  | null
  | undefined
type BlogTagRelation = NonNullable<Blog['tags']>[number]

const isBlogImage = (value: unknown): value is BlogImage => {
  return Boolean(value && typeof value === 'object' && 'url' in value)
}

const isBlogTag = (value: unknown): value is BlogTag => {
  return Boolean(value && typeof value === 'object' && 'title' in value)
}

export const getBlogImageURL = (image: BlogImageRelation) => {
  return isBlogImage(image) ? getBlogImageSource(image, BLOG_IMAGE_PRESETS.card)?.url : undefined
}

export const getBlogDescription = (blog: Pick<Blog, 'content' | 'excerpt'>) => {
  if (blog.excerpt) {
    return blog.excerpt
  }

  if (blog.content) {
    return getSubstringFromLexicalRichText(blog.content, 200)
  }

  return ''
}

export const getBlogTagTitles = (tags: Blog['tags']) => {
  if (!tags) {
    return []
  }

  return tags
    .map((tag: BlogTagRelation) => {
      if (isBlogTag(tag)) {
        return tag.title
      }

      return undefined
    })
    .filter((tag): tag is string => Boolean(tag))
}

export const getPrimaryBlogTag = (tags: Blog['tags']) => {
  if (!tags) {
    return undefined
  }

  return tags.find((tag): tag is BlogTagRelation => isBlogTag(tag))
}

type LocalizedBlogQueryOptions = {
  fallbackLocale?: false | Locale
  locale?: Locale
}

export const getPublishedBlogs = async ({
  fallbackLocale = 'en',
  locale = 'en',
}: LocalizedBlogQueryOptions = {}) => {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'blogs',
    depth: BLOG_DEPTH,
    fallbackLocale,
    limit: 100,
    locale,
    overrideAccess: false,
    sort: '-publishedAt',
    where: {
      status: {
        equals: 'published',
      },
    },
  })

  return result.docs
}

export const getPublishedBlogBySlug = async (
  slug: string,
  { fallbackLocale = 'en', locale = 'en' }: LocalizedBlogQueryOptions = {},
) => {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'blogs',
    depth: BLOG_DEPTH,
    fallbackLocale,
    limit: 1,
    locale,
    overrideAccess: false,
    where: {
      and: [
        {
          slug: {
            equals: slug,
          },
        },
        {
          status: {
            equals: 'published',
          },
        },
      ],
    },
  })

  return result.docs[0]
}

export const getPublishedBlogSlugs = async ({
  fallbackLocale = 'en',
  locale = 'en',
}: LocalizedBlogQueryOptions = {}) => {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'blogs',
    depth: 0,
    fallbackLocale,
    limit: 100,
    locale,
    overrideAccess: false,
    select: {
      slug: true,
    },
    sort: '-publishedAt',
    where: {
      status: {
        equals: 'published',
      },
    },
  })

  return result.docs
    .map((blog) => blog.slug)
    .filter((slug): slug is string => typeof slug === 'string' && slug.length > 0)
}
