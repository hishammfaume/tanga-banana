'use client'

import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import landingImage from 'src/assets/Landing/Landing2.webp'
import NextImage from 'next/image'

const LandingImage = (props: LandingImageProps) => {
  const { className, priority = true, sizes, ...restProps } = props

  return (
    <Box
      className={`landing-image-shell ${className || ''}`}
      sx={{
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        borderRadius: { xs: 4, md: 5 },
        aspectRatio: { xs: '4 / 3', md: '6 / 5' },
        background:
          'linear-gradient(160deg, rgba(241, 255, 233, 0.95) 0%, rgba(230, 244, 234, 0.9) 100%)',
        boxShadow: '0 26px 60px rgba(22, 28, 36, 0.14)',
      }}
    >
      <Image
        {...restProps}
        src={landingImage}
        alt="Visitors enjoying a banana, coffee, and spice farm tour at Tanga Banana Garden in Tanga"
        placeholder="blur"
        priority={priority}
        fill
        sizes={sizes || '(max-width: 900px) 100vw, 50vw'}
      />
    </Box>
  )
}

const Image = styled(NextImage)(() => ({
  objectPosition: 'center',
  objectFit: 'cover',
}))

export type LandingImageProps = Omit<React.ComponentProps<typeof Image>, 'src' | 'alt' | 'fill'>

export default LandingImage
