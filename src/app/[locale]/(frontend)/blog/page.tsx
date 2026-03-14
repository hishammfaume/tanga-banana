/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import { getTranslations } from 'next-intl/server'
import { unstable_cache } from 'next/cache'
import { JsonLd } from '@/components/JsonLd'
import type { Locale } from '@/i18n/routing'
import { createBreadcrumbStructuredData, getAbsoluteURL } from '@/utilities/seo'
import { BLOG_IMAGE_PRESETS, getBlogImageSource } from '@/utilities/blogImages'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import PageContainer from '@/ui/components/page-container'
import SectionSpacer from '@/ui/components/section-spacer'
import Landing from '@/ui/components/all-landing'
import BlogGrid from '@/ui/sections/blog/BlogGrid'
import BlogCategoryFilter from '@/ui/sections/blog/BlogCategoryFilter'

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'https://tanga-banana.vercel.app'

const isBlogImage = (
  value: unknown,
): value is {
  alt?: string
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

// ── Types ─────────────────────────────────────────────────────────
export type BlogPost = {
  id: string
  title: string
  slug: string
  excerpt?: string
  publishedAt?: string
  category?: string
  readingTimeMinutes?: number
  featuredImage?: {
    url: string
    alt?: string
    width?: number
    height?: number
  }
}

// ── Metadata ──────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'blog.meta' })

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    alternates: {
      canonical: `${BASE_URL}/${locale}/blog`,
      languages: {
        en: `${BASE_URL}/en/blog`,
        sw: `${BASE_URL}/sw/blog`,
        'x-default': `${BASE_URL}/en/blog`,
      },
    },
    openGraph: mergeOpenGraph({
      title: t('title'),
      description: t('description'),
      url: `${BASE_URL}/${locale}/blog`,
      locale: locale === 'sw' ? 'sw_TZ' : 'en_TZ',
    }),
    robots: { index: true, follow: true },
  }
}

// ── Data fetching ─────────────────────────────────────────────────
const getPosts = (locale: Locale) =>
  unstable_cache(
    async (): Promise<BlogPost[]> => {
      try {
        const payload = await getPayload({ config })
        const result = await payload.find({
          collection: 'blogs',
          depth: 1,
          fallbackLocale: 'en',
          limit: 50,
          locale,
          overrideAccess: false,
          sort: '-publishedAt',
          where: {
            and: [
              { status: { equals: 'published' } },
              { publishedAt: { less_than_equal: new Date().toISOString() } },
            ],
          },
        })

        return result.docs.map((doc: any) => {
          const featuredImage = getFeaturedImage(doc)
          const featuredImageSource = getBlogImageSource(featuredImage, BLOG_IMAGE_PRESETS.card)

          return {
            id: String(doc.id),
            title: doc.title,
            slug: doc.slug,
            excerpt: doc.excerpt,
            publishedAt: doc.publishedAt,
            category: getPrimaryCategory(doc.tags),
            readingTimeMinutes: doc.readingTimeMinutes,
            featuredImage: featuredImageSource
              ? {
                  url: featuredImageSource.url,
                  alt: doc.featuredImageAlt || featuredImage?.alt || doc.title,
                  width: featuredImageSource.width,
                  height: featuredImageSource.height,
                }
              : undefined,
          }
        })
      } catch (err) {
        console.error('Failed to fetch blog posts:', err)
        return []
      }
    },
    ['blogs-list', locale],
    {
      revalidate: 60,
      tags: [`blogs_list_${locale}`],
    },
  )()

// Cached because the list is used by the public frontend only and invalidated from collection hooks.
async function getCachedPosts(locale: Locale): Promise<BlogPost[]> {
  try {
    return await getPosts(locale)
  } catch (err) {
    console.error('Failed to fetch blog posts:', err)
    return []
  }
}

// ── JSON-LD ────────────────────────────────────────────────────────
function createBlogJsonLd(locale: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': getAbsoluteURL(`/${locale}/blog`),
    name: locale === 'sw' ? 'Makala — Tanga Banana Garden' : 'Blog — Tanga Banana Garden',
    description:
      locale === 'sw'
        ? 'Mwongozo wa agritourism Tanzania, mambo ya kufanya Tanga, ziara za shamba, na uzoefu wa kahawa.'
        : 'Guides on agritourism Tanzania, things to do in Tanga, farm tours, coffee experiences, and eco travel.',
    url: getAbsoluteURL(`/${locale}/blog`),
    inLanguage: locale === 'sw' ? 'sw-TZ' : 'en-TZ',
    publisher: {
      '@type': 'Organization',
      name: 'Tanga Banana Garden',
      url: getAbsoluteURL('/'),
    },
  }
}

// ── Page ──────────────────────────────────────────────────────────
export default async function BlogIndexPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>
  searchParams?: Promise<{ category?: string }>
}) {
  const { locale } = await params
  const sp = await searchParams
  const activeCategory = sp?.category ?? 'all'

  const t = await getTranslations({ locale, namespace: 'blog' })
  const posts = await getCachedPosts(locale)

  const breadcrumbData = createBreadcrumbStructuredData([
    { name: locale === 'sw' ? 'Nyumbani' : 'Home', path: `/${locale}` },
    { name: locale === 'sw' ? 'Makala' : 'Blog', path: `/${locale}/blog` },
  ])

  return (
    <>
      <JsonLd data={breadcrumbData} />
      <JsonLd data={createBlogJsonLd(locale)} />

      {/* Hero banner — reuses the same Landing component as other pages */}
      <PageContainer>
        <Landing title={t('index.heading')} description={t('index.subheading')} />
      </PageContainer>

      <PageContainer>
        {/* <SectionSpacer small /> */}

        {/* Category filter tabs */}
        {/* <BlogCategoryFilter locale={locale} activeCategory={activeCategory} posts={posts} /> */}

        {/* <SectionSpacer small /> */}

        {/* Post grid */}
        <BlogGrid
          locale={locale}
          posts={posts}
          activeCategory={activeCategory}
          emptyLabel={t('index.empty')}
        />

        <SectionSpacer />
      </PageContainer>
    </>
  )
}
