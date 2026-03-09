'use client'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import NextImage, { StaticImageData } from 'next/image'

const HeroImage = ({ src, alt, priority = false, eyebrow, indexLabel }: HeroImageProps) => {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: { xs: 300, sm: 360, md: 420 },
        display: 'flex',
        alignItems: 'stretch',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: { xs: 14, md: 20 },
          transform: 'translate(18px, 18px)',
          borderRadius: { xs: '28px', md: '36px' },
          background:
            'linear-gradient(180deg, rgba(140, 166, 140, 0.28) 0%, rgba(215, 190, 120, 0.18) 100%)',
          filter: 'blur(2px)',
        }}
      />
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
          borderRadius: { xs: '28px', md: '36px' },
          overflow: 'hidden',
          border: '1px solid rgba(35, 42, 34, 0.08)',
          boxShadow: '0 28px 60px rgba(17, 24, 22, 0.16)',
          backgroundColor: 'grey.100',
        }}
      >
        <NextImage
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 600px) 100vw, (max-width: 900px) 70vw, 440px"
          style={{ objectFit: 'cover', transform: 'scale(1.03)' }}
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(15, 22, 18, 0.06) 0%, rgba(15, 22, 18, 0.2) 48%, rgba(15, 22, 18, 0.66) 100%)',
          }}
        />

        {(eyebrow || indexLabel) && (
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            sx={{
              position: 'absolute',
              inset: 0,
              p: { xs: 2, md: 2.5 },
            }}
          >
            {eyebrow ? (
              <Box
                sx={{
                  px: 1.5,
                  py: 0.75,
                  borderRadius: 999,
                  backgroundColor: 'rgba(255,255,255,0.16)',
                  color: 'common.white',
                  backdropFilter: 'blur(14px)',
                }}
              >
                <Typography variant="caption" fontWeight={700} letterSpacing={1.1} color="grey.100">
                  {eyebrow.toUpperCase()}
                </Typography>
              </Box>
            ) : (
              <Box />
            )}

            {indexLabel ? (
              <Box
                sx={{
                  minWidth: 56,
                  px: 1.5,
                  py: 0.9,
                  borderRadius: 999,
                  backgroundColor: 'rgba(20, 27, 22, 0.48)',
                  color: 'common.white',
                  textAlign: 'center',
                  backdropFilter: 'blur(18px)',
                }}
              >
                <Typography variant="caption" fontWeight={700} letterSpacing={1.3}>
                  {indexLabel}
                </Typography>
              </Box>
            ) : null}
          </Stack>
        )}
      </Box>
    </Box>
  )
}

export type HeroImageProps = {
  src: string | StaticImageData
  alt: string
  priority?: boolean
  eyebrow?: string
  indexLabel?: string
}

export default HeroImage
