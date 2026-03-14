import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import { getTranslations } from 'next-intl/server'
import { unstable_cache } from 'next/cache'
import { JsonLd } from '@/components/JsonLd'
import type { Locale } from '@/i18n/routing'
import { createBreadcrumbStructuredData, getAbsoluteURL } from '@/utilities/seo'
import { BLOG_IMAGE_PRESETS, getBlogImageSource } from '@/utilities/blogImages'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { SITE_TITLE } from '@/utilities/constants/common'
import { getSubstringFromLexicalRichText } from '@/utilities/functions'
import PageContainer from '@/ui/components/page-container'
import SectionSpacer from '@/ui/components/section-spacer'
import BlogPostHero from '@/ui/sections/blog/BlogPostHero'
import BlogPostBody from '@/ui/sections/blog/BlogPostBody'
import BlogImageGallery from '@/ui/sections/blog/BlogImageGallery'
import BlogRelatedPosts from '@/ui/sections/blog/BlogRelatedPosts'
import BlogCta from '@/ui/sections/blog/BlogCta'

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'https://tanga-banana.vercel.app'

const isBlogImage = (
  value: unknown,
): value is {
  alt?: string
  caption?: unknown
  height?: number
  url: string
  width?: number
} => {
  return Boolean(
    value &&
    typeof value === 'object' &&
    'url' in value &&
    typeof (value as { url?: unknown }).url === 'string',
  )
}

const isBlogTag = (value: unknown): value is { slug?: string } => {
  return Boolean(value && typeof value === 'object' && 'slug' in value)
}

const getFeaturedImage = (doc: Record<string, any>) => {
  const image = doc.featuredImage ?? doc.thumbnail

  return isBlogImage(image) ? image : undefined
}

const getPrimaryCategory = (tags: unknown) => {
  if (!Array.isArray(tags)) {
    return undefined
  }

  const primaryTag = tags.find((tag) => isBlogTag(tag))

  return primaryTag?.slug
}

const getCaptionText = (value: unknown) => {
  if (typeof value === 'string') {
    return value
  }

  if (value && typeof value === 'object' && 'root' in value) {
    return getSubstringFromLexicalRichText(
      value as Parameters<typeof getSubstringFromLexicalRichText>[0],
      160,
    )
  }

  return undefined
}

// ── Types ──────────────────────────────────────────────────────────
export type FullPost = {
  id: string
  title: string
  slug: string
  excerpt?: string
  content: any
  publishedAt?: string
  category?: string
  readingTimeMinutes?: number
  featuredImage?: { url: string; alt?: string; width?: number; height?: number }
  images?: { url: string; alt?: string; caption?: string }[]
  seo?: { title?: string; description?: string; keywords?: string; noIndex?: boolean }
  relatedPosts?: RelatedPost[]
}

export type RelatedPost = {
  id: string
  title: string
  slug: string
  excerpt?: string
  publishedAt?: string
  category?: string
  featuredImage?: { url: string; alt?: string }
}

// ── Data fetching ──────────────────────────────────────────────────
async function queryPost(locale: Locale, slug: string): Promise<FullPost | null> {
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'blogs',
      depth: 2, // resolve featuredImage, images, relatedPosts
      fallbackLocale: 'en',
      limit: 1,
      locale,
      overrideAccess: false,
      where: {
        and: [
          { slug: { equals: slug } },
          { status: { equals: 'published' } },
          { publishedAt: { less_than_equal: new Date().toISOString() } },
        ],
      },
    })

    if (!result.docs.length) return null
    const doc = result.docs[0] as any
    const featuredImage = getFeaturedImage(doc)
    const featuredImageSource = getBlogImageSource(featuredImage, BLOG_IMAGE_PRESETS.hero)

    return {
      id: String(doc.id),
      title: doc.title,
      slug: doc.slug,
      excerpt: doc.excerpt,
      content: doc.content,
      publishedAt: doc.publishedAt,
      category: getPrimaryCategory(doc.tags),
      readingTimeMinutes: doc.readingTimeMinutes ?? estimateReadingTime(doc.content),
      featuredImage: featuredImageSource
        ? {
            url: featuredImageSource.url,
            alt: doc.featuredImageAlt || featuredImage?.alt || doc.title,
            width: featuredImageSource.width,
            height: featuredImageSource.height,
          }
        : undefined,
      images: Array.isArray(doc.images)
        ? doc.images
            .map((item: any) => ({
              image: isBlogImage(item?.image) ? item.image : isBlogImage(item) ? item : null,
              alt: item?.alt,
              caption: item?.caption,
            }))
            .map((item: any) => {
              const imageSource = getBlogImageSource(item.image, BLOG_IMAGE_PRESETS.gallery)

              if (!imageSource?.url) {
                return null
              }

              return {
                url: imageSource.url,
                alt: item.alt || item.image?.alt || doc.title,
                caption: getCaptionText(item.caption ?? item.image.caption),
              }
            })
            .filter(
              (
                image: NonNullable<FullPost['images']>[number] | null,
              ): image is NonNullable<FullPost['images']>[number] => Boolean(image),
            )
        : [],
      seo: doc.seo,
      relatedPosts: Array.isArray(doc.relatedPosts)
        ? doc.relatedPosts
            .map((rel: any) => {
              if (!rel || typeof rel !== 'object') {
                return null
              }

              const relatedImage = getFeaturedImage(rel)
              const relatedImageSource = getBlogImageSource(relatedImage, BLOG_IMAGE_PRESETS.card)

              return {
                id: String(rel.id),
                title: rel.title,
                slug: rel.slug,
                excerpt: rel.excerpt,
                publishedAt: rel.publishedAt,
                category: getPrimaryCategory(rel.tags),
                featuredImage: relatedImageSource
                  ? {
                      url: relatedImageSource.url,
                      alt: rel.featuredImageAlt || relatedImage?.alt || rel.title,
                    }
                  : undefined,
              }
            })
            .filter((post: RelatedPost | null): post is RelatedPost => Boolean(post))
        : [],
    }
  } catch (err) {
    console.error('Failed to fetch post:', err)
    return null
  }
}

const getPost = (locale: Locale, slug: string) =>
  unstable_cache(async () => queryPost(locale, slug), ['blog-post', locale, slug], {
    revalidate: 60,
    tags: [`blog_pages_${locale}`],
  })()

const getAllSlugs = (locale: Locale) =>
  unstable_cache(
    async (): Promise<string[]> => {
      try {
        const payload = await getPayload({ config })
        const result = await payload.find({
          collection: 'blogs',
          fallbackLocale: 'en',
          limit: 200,
          locale,
          overrideAccess: false,
          select: { slug: true },
          where: {
            and: [
              { status: { equals: 'published' } },
              { publishedAt: { less_than_equal: new Date().toISOString() } },
            ],
          },
        })
        return result.docs.map((doc: any) => doc.slug)
      } catch {
        return []
      }
    },
    ['blog-slugs', locale],
    {
      revalidate: 60,
      tags: [`blog_slugs_${locale}`],
    },
  )()

// Rough word count → reading time
function estimateReadingTime(content: any): number {
  try {
    const text = JSON.stringify(content)
    const words = text.split(/\s+/).length
    return Math.max(1, Math.round(words / 200))
  } catch {
    return 3
  }
}

// ── Static params ──────────────────────────────────────────────────
export async function generateStaticParams() {
  const slugs = await getAllSlugs('en')
  return ['en', 'sw'].flatMap((locale) => slugs.map((slug) => ({ locale, slug })))
}

// ── Metadata ───────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const post = await getPost(locale, slug)
  if (!post) return { title: 'Not Found' }

  const metaTitle = post.seo?.title || `${post.title} | ${SITE_TITLE}`
  const metaDescription = post.seo?.description || post.excerpt || ''
  const metaKeywords = post.seo?.keywords

  return {
    title: metaTitle,
    description: metaDescription,
    ...(metaKeywords ? { keywords: metaKeywords } : {}),
    robots: post.seo?.noIndex ? { index: false, follow: false } : { index: true, follow: true },
    alternates: {
      canonical: `${BASE_URL}/${locale}/blog/${slug}`,
      languages: {
        en: `${BASE_URL}/en/blog/${slug}`,
        sw: `${BASE_URL}/sw/blog/${slug}`,
        'x-default': `${BASE_URL}/en/blog/${slug}`,
      },
    },
    openGraph: mergeOpenGraph({
      title: metaTitle,
      description: metaDescription,
      url: `${BASE_URL}/${locale}/blog/${slug}`,
      locale: locale === 'sw' ? 'sw_TZ' : 'en_TZ',
      ...(post.featuredImage
        ? { images: [{ url: post.featuredImage.url, width: 1200, height: 630 }] }
        : {}),
    }),
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      ...(post.featuredImage ? { images: [post.featuredImage.url] } : {}),
    },
  }
}

// ── JSON-LD ────────────────────────────────────────────────────────
function createArticleJsonLd(post: FullPost, locale: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': getAbsoluteURL(`/${locale}/blog/${post.slug}`),
    headline: post.title,
    description: post.excerpt,
    url: getAbsoluteURL(`/${locale}/blog/${post.slug}`),
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    inLanguage: locale === 'sw' ? 'sw-TZ' : 'en-TZ',
    author: {
      '@type': 'Organization',
      name: 'Tanga Banana Garden',
      url: getAbsoluteURL('/'),
    },
    publisher: {
      '@type': 'Organization',
      name: 'Tanga Banana Garden',
      url: getAbsoluteURL('/'),
      logo: {
        '@type': 'ImageObject',
        url: getAbsoluteURL('/android-chrome-512x512.png'),
      },
    },
    ...(post.featuredImage
      ? { image: { '@type': 'ImageObject', url: post.featuredImage.url } }
      : {}),
    isPartOf: {
      '@type': 'Blog',
      '@id': getAbsoluteURL(`/${locale}/blog`),
      name: SITE_TITLE,
    },
  }
}

// ── Page ──────────────────────────────────────────────────────────
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>
}) {
  const { locale, slug } = await params
  const post = await getPost(locale, slug)
  if (!post) notFound()

  const t = await getTranslations({ locale, namespace: 'blog' })

  const breadcrumbData = createBreadcrumbStructuredData([
    { name: locale === 'sw' ? 'Nyumbani' : 'Home', path: `/${locale}` },
    { name: locale === 'sw' ? 'Makala' : 'Blog', path: `/${locale}/blog` },
    { name: post.title, path: `/${locale}/blog/${slug}` },
  ])

  const hasGallery = post.images && post.images.length > 0
  const hasRelated = post.relatedPosts && post.relatedPosts.length > 0

  return (
    <>
      <JsonLd data={breadcrumbData} />
      <JsonLd data={createArticleJsonLd(post, locale)} />

      {/* Full-width hero with featured image */}
      <BlogPostHero post={post} locale={locale} />

      <PageContainer>
        {/* Article body — Lexical rich text rendered to MUI */}
        <BlogPostBody post={post} locale={locale} />

        {/* Inline image gallery (if images were uploaded) */}
        {hasGallery && (
          <>
            <SectionSpacer small />
            <BlogImageGallery
              images={post.images!}
              locale={locale}
              heading={t('post.galleryHeading')}
            />
          </>
        )}

        {/* Booking CTA block */}
        <SectionSpacer small />
        <BlogCta locale={locale} />

        {/* Related posts */}
        {hasRelated && (
          <>
            <SectionSpacer small />
            <BlogRelatedPosts
              posts={post.relatedPosts!}
              locale={locale}
              heading={t('post.relatedHeading')}
            />
          </>
        )}

        <SectionSpacer />
      </PageContainer>
    </>
  )
}
