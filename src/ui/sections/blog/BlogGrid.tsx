// src/ui/sections/blog/BlogGrid.tsx
// Responsive 3-column post grid for the blog index page.

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import type { BlogPost } from '@/app/[locale]/(frontend)/blog/page'
import BlogPostCard from './BlogPostCard'

const BlogGrid = ({
  posts,
  locale,
  activeCategory,
  emptyLabel,
}: {
  posts: BlogPost[]
  locale: string
  activeCategory: string
  emptyLabel: string
}) => {
  const filtered =
    activeCategory === 'all'
      ? posts
      : posts.filter((p) => p.category === activeCategory)

  if (!filtered.length) {
    return (
      <Box
        sx={{
          py: 10,
          textAlign: 'center',
          borderRadius: '20px',
          backgroundColor: 'grey.100',
        }}
      >
        <Typography variant="body1" color="grey.400">
          {emptyLabel}
        </Typography>
      </Box>
    )
  }

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          lg: 'repeat(3, 1fr)',
        },
        gap: { xs: 3, md: 4 },
      }}
    >
      {filtered.map((post, index) => (
        <BlogPostCard key={post.id} post={post} locale={locale} priority={index < 3} />
      ))}
    </Box>
  )
}

export default BlogGrid
