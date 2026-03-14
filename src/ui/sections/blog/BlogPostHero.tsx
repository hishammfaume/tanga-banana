// src/ui/sections/blog/BlogPostHero.tsx
// Full-width hero section for individual blog posts.
// Uses the same image overlay style as HeroImage / AboutImageCarouselSection.

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import NextImage from 'next/image'
import Link from 'next/link'
import { ICONS } from '@/utilities/constants/common'
import Button from '@mui/material/Button'
import type { FullPost } from '@/app/[locale]/(frontend)/blog/[slug]/page'

const categoryLabels: Record<string, Record<string, string>> = {
  en: {
    agritourism:  'Farm & Agritourism',
    'tanga-guide': 'Things to Do in Tanga',
    'coffee-food': 'Coffee & Food',
    eco:           'Eco & Sustainability',
    education:     'School & Education',
    travel:        'Travel Tips',
    volunteer:     'Volunteer & Gap Year',
  },
  sw: {
    agritourism:  'Shamba na Agritourism',
    'tanga-guide': 'Mambo ya Kufanya Tanga',
    'coffee-food': 'Kahawa na Chakula',
    eco:           'Eco na Uendelevu',
    education:     'Shule na Elimu',
    travel:        'Vidokezo vya Safari',
    volunteer:     'Kujitolea na Gap Year',
  },
}

function formatDate(dateStr: string, locale: string) {
  return new Date(dateStr).toLocaleDateString(
    locale === 'sw' ? 'sw-TZ' : 'en-TZ',
    { year: 'numeric', month: 'long', day: 'numeric' },
  )
}

const BlogPostHero = ({ post, locale }: { post: FullPost; locale: string }) => {
  const categoryLabel =
    post.category
      ? (categoryLabels[locale]?.[post.category] ?? post.category)
      : null

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        width: '100vw',
        left: '50%',
        right: '50%',
        marginLeft: '-50vw',
        marginRight: '-50vw',
        minHeight: { xs: 340, md: 480 },
        display: 'flex',
        alignItems: 'flex-end',
        overflow: 'hidden',
        backgroundColor: 'secondary.main',
      }}
    >
      {/* Featured image */}
      {post.featuredImage?.url && (
        <NextImage
          src={post.featuredImage.url}
          alt={post.featuredImage.alt ?? post.title}
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
      )}

      {/* Gradient overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(10,16,13,0.08) 0%, rgba(10,16,13,0.55) 55%, rgba(10,16,13,0.88) 100%)',
        }}
      />

      {/* Content */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          maxWidth: 'xl',
          mx: 'auto',
          px: { xs: 3, md: 6 },
          pb: { xs: 5, md: 7 },
          pt: { xs: 10, md: 12 },
        }}
      >
        {/* Back link */}
        <Button
          component={Link}
          href={`/${locale}/blog`}
          variant="text"
          startIcon={ICONS.arrow_back}
          sx={{
            color: 'rgba(255,255,255,0.78)',
            textTransform: 'none',
            mb: 2,
            px: 0,
            '&:hover': { color: 'common.white', background: 'none' },
          }}
        >
          {locale === 'sw' ? 'Rudi kwenye Makala' : 'Back to Blog'}
        </Button>

        <Stack spacing={2} maxWidth={760}>
          {/* Category + read time */}
          <Stack direction="row" spacing={1.5} alignItems="center" flexWrap="wrap">
            {categoryLabel && (
              <Chip
                label={categoryLabel}
                size="small"
                sx={{
                  backgroundColor: 'rgba(255,255,255,0.18)',
                  color: 'common.white',
                  fontWeight: 700,
                  fontSize: '0.7rem',
                  letterSpacing: 0.8,
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.22)',
                }}
              />
            )}
            {post.readingTimeMinutes && (
              <Typography variant="caption" color="rgba(255,255,255,0.7)">
                {post.readingTimeMinutes} {locale === 'sw' ? 'dakika' : 'min read'}
              </Typography>
            )}
          </Stack>

          {/* Headline */}
          <Typography
            variant="h3"
            component="h1"
            color="common.white"
            fontWeight={700}
            lineHeight={1.18}
          >
            {post.title}
          </Typography>

          {/* Excerpt */}
          {post.excerpt && (
            <Typography
              variant="body1"
              color="rgba(255,255,255,0.80)"
              lineHeight={1.7}
              maxWidth={640}
            >
              {post.excerpt}
            </Typography>
          )}

          {/* Date */}
          {post.publishedAt && (
            <Typography variant="caption" color="rgba(255,255,255,0.55)">
              {formatDate(post.publishedAt, locale)}
            </Typography>
          )}
        </Stack>
      </Box>
    </Box>
  )
}

export default BlogPostHero
