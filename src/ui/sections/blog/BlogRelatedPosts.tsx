// src/ui/sections/blog/BlogRelatedPosts.tsx
// Shows up to 3 related posts at the bottom of a blog article.
// Uses the same card style as BlogGrid.

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import type { RelatedPost } from '@/app/[locale]/(frontend)/blog/[slug]/page'
import BlogPostCard from './BlogPostCard'

const BlogRelatedPosts = ({
  posts,
  locale,
  heading,
}: {
  posts: RelatedPost[]
  locale: string
  heading: string
}) => {
  if (!posts.length) return null

  return (
    <Box component="section">
      <Stack spacing={4}>
        <Typography variant="h5" component="h2" fontWeight={700} color="grey.900">
          {heading}
        </Typography>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={3}
          flexWrap="wrap"
          useFlexGap
        >
          {posts.slice(0, 3).map((post) => (
            <Box key={post.id} sx={{ flex: '1 1 280px', minWidth: 0 }}>
              <BlogPostCard post={post as any} locale={locale} />
            </Box>
          ))}
        </Stack>
      </Stack>
    </Box>
  )
}

export default BlogRelatedPosts
