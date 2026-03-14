'use client'
// src/ui/sections/blog/BlogCategoryFilter.tsx
// Category filter tabs on the blog index page.
// Uses URL search params (?category=agritourism) so filters are shareable.

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { Suspense, useCallback } from 'react'
import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { alpha } from '@mui/material/styles'
import palette from '@/Theme/palette'
import type { BlogPost } from '@/app/[locale]/(frontend)/blog/page'

const categoryLabels: Record<string, Record<string, string>> = {
  en: {
    all:           'All Articles',
    agritourism:  'Farm & Agritourism',
    'tanga-guide': 'Things to Do in Tanga',
    'coffee-food': 'Coffee & Food',
    eco:           'Eco & Sustainability',
    education:     'School & Education',
    travel:        'Travel Tips',
    volunteer:     'Volunteer & Gap Year',
  },
  sw: {
    all:           'Makala Zote',
    agritourism:  'Shamba na Agritourism',
    'tanga-guide': 'Mambo ya Kufanya Tanga',
    'coffee-food': 'Kahawa na Chakula',
    eco:           'Eco na Uendelevu',
    education:     'Shule na Elimu',
    travel:        'Vidokezo vya Safari',
    volunteer:     'Kujitolea na Gap Year',
  },
}

type BlogCategoryFilterProps = {
  posts: BlogPost[]
  locale: string
  activeCategory: string
}

const BlogCategoryFilterInner = ({
  posts,
  locale,
  activeCategory,
}: BlogCategoryFilterProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Only show categories that have at least one post
  const usedCategories = Array.from(new Set(posts.map((p) => p.category).filter(Boolean))) as string[]
  const categoryCounts = posts.reduce<Record<string, number>>((counts, post) => {
    if (!post.category) {
      return counts
    }

    counts[post.category] = (counts[post.category] ?? 0) + 1
    return counts
  }, {})

  const setCategory = useCallback(
    (cat: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (cat === 'all') {
        params.delete('category')
      } else {
        params.set('category', cat)
      }
      router.push(`${pathname}?${params.toString()}`, { scroll: false })
    },
    [router, pathname, searchParams],
  )

  if (!usedCategories.length) return null

  const labels = categoryLabels[locale] ?? categoryLabels.en

  return (
    <Box
      sx={{
        borderRadius: { xs: '22px', md: '28px' },
        border: `1px solid ${alpha(palette.primary.main, 0.08)}`,
        background:
          'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(245,247,242,0.96) 100%)',
        boxShadow: `0 18px 38px ${alpha(palette.grey[900], 0.05)}`,
        px: { xs: 1.25, md: 1.5 },
        py: { xs: 1.25, md: 1.4 },
      }}
    >
      <Box
        sx={{
          overflowX: 'auto',
          pb: 0.5,
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        <Stack direction="row" spacing={1} flexWrap="nowrap" sx={{ minWidth: 'max-content' }}>
          {/* "All" tab */}
          <FilterChip
            label={labels.all}
            count={posts.length}
            active={activeCategory === 'all'}
            onClick={() => setCategory('all')}
          />
          {/* Per-category tabs */}
          {usedCategories.map((cat) => (
            <FilterChip
              key={cat}
              label={labels[cat] ?? cat}
              count={categoryCounts[cat] ?? 0}
              active={activeCategory === cat}
              onClick={() => setCategory(cat)}
            />
          ))}
        </Stack>
      </Box>
    </Box>
  )
}

const FilterChip = ({
  label,
  count,
  active,
  onClick,
}: {
  label: string
  count: number
  active: boolean
  onClick: () => void
}) => {
  return (
    <ButtonBase
      onClick={onClick}
      sx={{
        alignItems: 'center',
        borderRadius: '999px',
        border: `1px solid ${active ? alpha(palette.secondary.dark, 0.18) : alpha(palette.primary.main, 0.08)}`,
        background: active
          ? `linear-gradient(135deg, ${palette.secondary.main} 0%, ${palette.secondary.dark} 100%)`
          : `linear-gradient(135deg, ${alpha('#FFFFFF', 0.96)} 0%, ${alpha(palette.secondary.light, 0.58)} 100%)`,
        boxShadow: active
          ? `0 16px 32px ${alpha(palette.secondary.dark, 0.22)}`
          : `0 8px 18px ${alpha(palette.grey[900], 0.05)}`,
        color: active ? 'common.white' : 'grey.800',
        cursor: 'pointer',
        flexShrink: 0,
        gap: 1,
        minHeight: 46,
        px: { xs: 1.7, md: 2 },
        transition:
          'transform 180ms ease, box-shadow 180ms ease, background-color 180ms ease, border-color 180ms ease',
        '&:hover': {
          transform: 'translateY(-1px)',
          boxShadow: active
            ? `0 18px 34px ${alpha(palette.secondary.dark, 0.26)}`
            : `0 12px 24px ${alpha(palette.grey[900], 0.08)}`,
        },
      }}
    >
      <Typography
        component="span"
        sx={{
          fontSize: { xs: 13, md: 14 },
          fontWeight: active ? 700 : 600,
          letterSpacing: 0.1,
          lineHeight: 1,
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </Typography>
      <Box
        component="span"
        sx={{
          alignItems: 'center',
          borderRadius: '999px',
          backgroundColor: active ? alpha('#FFFFFF', 0.18) : alpha(palette.primary.main, 0.07),
          color: active ? 'common.white' : 'grey.700',
          display: 'inline-flex',
          fontSize: 12,
          fontWeight: 700,
          justifyContent: 'center',
          minWidth: 24,
          px: 0.8,
          py: 0.4,
        }}
      >
        {count}
      </Box>
    </ButtonBase>
  )
}

const BlogCategoryFilter = (props: BlogCategoryFilterProps) => {
  return (
    <Suspense fallback={null}>
      <BlogCategoryFilterInner {...props} />
    </Suspense>
  )
}

export default BlogCategoryFilter
