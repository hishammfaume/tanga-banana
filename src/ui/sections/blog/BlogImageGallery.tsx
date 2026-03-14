// src/ui/sections/blog/BlogImageGallery.tsx
// Masonry-style image gallery for blog posts.
// Shown when the author uploads photos in the Payload 'images' array field.
// Matches the AboutImageCarouselSection visual style.

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import NextImage from 'next/image'
import PageContainer from '@/ui/components/page-container'

type GalleryImage = {
  url: string
  alt?: string
  caption?: string
}

const BlogImageGallery = ({
  images,
  locale,
  heading,
}: {
  images: GalleryImage[]
  locale: string
  heading: string
}) => {
  if (!images.length) return null

  // Split into two columns for a simple masonry feel
  const left  = images.filter((_, i) => i % 2 === 0)
  const right = images.filter((_, i) => i % 2 !== 0)

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 5, md: 7 },
        background: 'linear-gradient(180deg, rgba(245,246,242,1) 0%, rgba(236,239,232,1) 100%)',
        borderRadius: { xs: '28px', md: '36px' },
        overflow: 'hidden',
      }}
    >
      <Stack spacing={4} px={{ xs: 2.5, md: 4 }}>
        {/* Heading */}
        <Typography
          variant="h5"
          component="h2"
          fontWeight={700}
          color="grey.900"
          textAlign="center"
        >
          {heading}
        </Typography>

        {/* Two-column masonry */}
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="flex-start">
          <GalleryColumn images={left} />
          <GalleryColumn images={right} />
        </Stack>
      </Stack>
    </Box>
  )
}

const GalleryColumn = ({ images }: { images: GalleryImage[] }) => (
  <Stack spacing={2} flex={1} width="100%">
    {images.map((img, i) => (
      <GalleryItem key={i} img={img} priority={i === 0} />
    ))}
  </Stack>
)

const GalleryItem = ({ img, priority }: { img: GalleryImage; priority?: boolean }) => (
  <Box>
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        // Alternate aspect ratios for visual rhythm
        aspectRatio: '4/3',
        borderRadius: { xs: '20px', md: '24px' },
        overflow: 'hidden',
        backgroundColor: 'grey.200',
        boxShadow: '0 8px 28px rgba(14,20,16,0.10)',
      }}
    >
      <NextImage
        src={img.url}
        alt={img.alt ?? ''}
        fill
        priority={priority}
        sizes="(max-width: 600px) 100vw, 50vw"
        style={{ objectFit: 'cover' }}
      />
      {/* Subtle bottom gradient for captions */}
      {img.caption && (
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(0deg, rgba(10,16,12,0.54) 0%, transparent 60%)',
          }}
        />
      )}
      {img.caption && (
        <Typography
          variant="caption"
          color="rgba(255,255,255,0.88)"
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            p: { xs: 1.5, md: 2 },
            lineHeight: 1.4,
          }}
        >
          {img.caption}
        </Typography>
      )}
    </Box>
  </Box>
)

export default BlogImageGallery
