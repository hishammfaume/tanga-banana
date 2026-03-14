// src/ui/sections/blog/BlogPostCard.tsx
// Reusable blog post card — used on the index grid and related posts.
// Matches the site card style (Card, rounded-2xl, shadow-sm).

import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import NextImage from 'next/image'
import Link from 'next/link'
import type { BlogPost } from '@/app/[locale]/(frontend)/blog/page'

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
    { year: 'numeric', month: 'short', day: 'numeric' },
  )
}

const BlogPostCard = ({
  post,
  locale,
  priority = false,
}: {
  post: BlogPost
  locale: string
  priority?: boolean
}) => {
  const href = `/${locale}/blog/${post.slug}`
  const categoryLabel =
    post.category ? (categoryLabels[locale]?.[post.category] ?? post.category) : null

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '20px',
        overflow: 'hidden',
        border: '1px solid rgba(34,44,35,0.08)',
        boxShadow: '0 4px 20px rgba(14,20,14,0.06)',
        transition: 'box-shadow 0.2s ease, transform 0.2s ease',
        '&:hover': {
          boxShadow: '0 12px 36px rgba(14,20,14,0.12)',
          transform: 'translateY(-2px)',
        },
      }}
    >
      <CardActionArea component={Link} href={href} sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
        {/* Featured image */}
        {post.featuredImage?.url ? (
          <Box sx={{ position: 'relative', height: 200, flexShrink: 0, overflow: 'hidden', backgroundColor: 'secondary.light' }}>
            <NextImage
              src={post.featuredImage.url}
              alt={post.featuredImage.alt ?? post.title}
              fill
              priority={priority}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 380px"
              style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
            />
          </Box>
        ) : (
          // Placeholder when no image
          <Box
            sx={{
              height: 160,
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, rgba(141,169,126,0.22) 0%, rgba(194,173,96,0.14) 100%)',
            }}
          >
            <Typography variant="h2" sx={{ opacity: 0.25 }}>🌿</Typography>
          </Box>
        )}

        <CardContent sx={{ flexGrow: 1, p: 3 }}>
          <Stack spacing={1.5}>
            {/* Category + date */}
            <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
              {categoryLabel && (
                <Chip
                  label={categoryLabel}
                  size="small"
                  sx={{
                    height: 22,
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    letterSpacing: 0.5,
                    backgroundColor: 'rgba(141,169,126,0.14)',
                    color: 'grey.800',
                    borderRadius: 999,
                  }}
                />
              )}
              {post.publishedAt && (
                <Typography variant="caption" color="grey.400">
                  {formatDate(post.publishedAt, locale)}
                </Typography>
              )}
              {post.readingTimeMinutes && (
                <Typography variant="caption" color="grey.400">
                  · {post.readingTimeMinutes}{locale === 'sw' ? ' dak' : ' min'}
                </Typography>
              )}
            </Stack>

            {/* Title */}
            <Typography variant="subtitle1" fontWeight={700} color="grey.900" lineHeight={1.35}>
              {post.title}
            </Typography>

            {/* Excerpt */}
            {post.excerpt && (
              <Typography
                variant="body2"
                color="grey.500"
                lineHeight={1.7}
                sx={{
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {post.excerpt}
              </Typography>
            )}
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default BlogPostCard
