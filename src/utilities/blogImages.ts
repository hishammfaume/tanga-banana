import type { BlogImage } from '@/payload-types'

type BlogImageVariant = {
  url?: string | null
  width?: number | null
  height?: number | null
}

type BlogImageLike = BlogImageVariant & {
  sizes?: BlogImage['sizes'] | null
}

type BlogImageSizeName = keyof NonNullable<BlogImage['sizes']>

export type ResolvedBlogImage = {
  url: string
  width?: number
  height?: number
}

export const BLOG_IMAGE_PRESETS = {
  card: ['medium', 'small', 'large'],
  gallery: ['large', 'medium', 'small'],
  hero: ['xlarge', 'large', 'og', 'medium'],
  inline: ['large', 'medium', 'small'],
} as const satisfies Record<string, BlogImageSizeName[]>

const toResolvedImage = (
  variant?: BlogImageVariant | null,
  fallback?: BlogImageVariant | null,
): ResolvedBlogImage | undefined => {
  if (!variant?.url) {
    return undefined
  }

  return {
    url: variant.url,
    width: variant.width ?? fallback?.width ?? undefined,
    height: variant.height ?? fallback?.height ?? undefined,
  }
}

export const getBlogImageSource = (
  image: BlogImageLike | null | undefined,
  preferredSizes: readonly BlogImageSizeName[],
): ResolvedBlogImage | undefined => {
  if (!image) {
    return undefined
  }

  for (const sizeName of preferredSizes) {
    const size = image.sizes?.[sizeName]
    const resolvedSize = toResolvedImage(size, image)

    if (resolvedSize) {
      return resolvedSize
    }
  }

  return toResolvedImage(image)
}
