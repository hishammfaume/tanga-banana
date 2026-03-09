'use client'

import Banana from '@/assets/Landing/banana.jpeg'
import Coffee from '@/assets/Landing/coffee.jpg'
import Farm from '@/assets/Farm/FarmTour.png'
import Garden from '@/assets/Landing/gardenn.jpeg'
import Learning from '@/assets/Farm/LearningExp.png'
import Spices from '@/assets/Landing/spices.jpeg'
import PageContainer from '@/ui/components/page-container'
import { ICONS } from '@/utilities/constants/common'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import type { StaticImageData } from 'next/image'
import NextImage from 'next/image'
import React, { startTransition, useEffect, useState } from 'react'

const AUTO_ADVANCE_MS = 4800

const CAROUSEL_ITEMS: AboutCarouselItem[] = [
  {
    title: 'Banana Groves',
    eyebrow: 'Fresh harvest',
    description: 'Walk through shaded rows of banana trees and enjoy the quiet rhythm of the farm.',
    image: Banana,
  },
  {
    title: 'Learning Trails',
    eyebrow: 'Hands-on visits',
    description:
      'Every visit opens up a close look at planting, tasting, and learning from the land.',
    image: Learning,
  },
  {
    title: 'Coffee Moments',
    eyebrow: 'Tanga aroma',
    description:
      'Slow down with fresh coffee and discover the farm stories shared by local growers.',
    image: Coffee,
  },
  {
    title: 'Garden Calm',
    eyebrow: 'Nature reset',
    description:
      'Quiet corners, cool shade, and open green space make the garden feel like a retreat.',
    image: Garden,
  },
  {
    title: 'Spice Colours',
    eyebrow: 'Local flavour',
    description:
      'See, smell, and taste the ingredients that bring the garden to life beyond the grove.',
    image: Spices,
  },
  {
    title: 'Farm Views',
    eyebrow: 'Open air',
    description:
      'Wide paths and lush greenery create the kind of scenery that invites you to stay longer.',
    image: Farm,
  },
]

const AboutImageCarouselSection = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const moveSlide = (direction: number) => {
    startTransition(() => {
      setActiveIndex((currentIndex) => {
        return (currentIndex + direction + CAROUSEL_ITEMS.length) % CAROUSEL_ITEMS.length
      })
    })
  }

  useEffect(() => {
    if (isPaused) return

    const intervalId = window.setInterval(() => {
      startTransition(() => {
        setActiveIndex((currentIndex) => {
          return (currentIndex + 1) % CAROUSEL_ITEMS.length
        })
      })
    }, AUTO_ADVANCE_MS)

    return () => window.clearInterval(intervalId)
  }, [isPaused])

  return (
    <Box sx={sectionSx}>
      <PageContainer transparent>
        <Stack spacing={5}>
          <Stack spacing={2} alignItems="center" textAlign="center">
            <Typography variant="h4" component="h2" color="grey.900" fontWeight={600}>
              Life Around the Garden
            </Typography>
            <Typography variant="body2" color="grey.600" maxWidth={640}>
              A moving glimpse of the spaces, produce, and moments that shape a visit to Tanga
              Banana Garden.
            </Typography>
          </Stack>

          <Box
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            sx={viewportSx}
          >
            {CAROUSEL_ITEMS.map((item, index) => {
              const offset = getOffset(index, activeIndex, CAROUSEL_ITEMS.length)
              const isActive = offset === 0
              const isFar = Math.abs(offset) > 2

              return (
                <Box
                  key={item.title}
                  sx={getSlideWrapperSx(offset, isActive, isFar)}
                  aria-hidden={!isActive}
                >
                  <Box sx={getCardSx(isActive)}>
                    <NextImage
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 600px) 74vw, (max-width: 900px) 52vw, 36vw"
                      style={{ objectFit: 'cover' }}
                    />
                    <Box sx={getOverlaySx(isActive)} />

                    <Stack sx={contentSx} spacing={2}>
                      <Box sx={eyebrowSx}>
                        <Typography variant="caption" fontWeight={700} letterSpacing={1.2}>
                          {item.eyebrow.toUpperCase()}
                        </Typography>
                      </Box>

                      <Stack spacing={1}>
                        <Typography
                          variant="h4"
                          component="h3"
                          fontWeight={700}
                          color="common.white"
                          lineHeight={1.05}
                        >
                          {item.title}
                        </Typography>
                        <Typography variant="body2" color="rgba(255,255,255,0.88)" maxWidth={360}>
                          {item.description}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Box>
                </Box>
              )
            })}
          </Box>

          <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
            <IconButton aria-label="Previous image" onClick={() => moveSlide(-1)} sx={navButtonSx}>
              {ICONS.arrow_back}
            </IconButton>

            <Stack direction="row" spacing={1.25} alignItems="center">
              {CAROUSEL_ITEMS.map((item, index) => (
                <Box
                  key={item.title}
                  component="button"
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  sx={getDotSx(activeIndex === index)}
                  aria-label={`Show ${item.title}`}
                />
              ))}
            </Stack>

            <IconButton aria-label="Next image" onClick={() => moveSlide(1)} sx={navButtonSx}>
              {ICONS.arrow_forward}
            </IconButton>
          </Stack>
        </Stack>
      </PageContainer>
    </Box>
  )
}

type AboutCarouselItem = {
  title: string
  eyebrow: string
  description: string
  image: StaticImageData
}

const getOffset = (index: number, activeIndex: number, length: number) => {
  let offset = index - activeIndex

  if (offset > length / 2) offset -= length
  if (offset < -length / 2) offset += length

  return offset
}

const getScale = (offset: number) => {
  if (offset === 0) return 1
  if (Math.abs(offset) === 1) return 0.82
  return 0.66
}

const getOpacity = (offset: number) => {
  if (offset === 0) return 1
  if (Math.abs(offset) === 1) return 0.7
  return 0.28
}

const getSlideWrapperSx = (offset: number, isActive: boolean, isFar: boolean) => ({
  position: 'absolute',
  inset: 0,
  left: '50%',
  width: { xs: '74vw', sm: 360, md: 420 },
  height: '100%',
  transform: {
    xs: `translate3d(calc(-50% + ${offset * 31}%), 0, 0) scale(${getScale(offset)})`,
    sm: `translate3d(calc(-50% + ${offset * 42}%), 0, 0) scale(${getScale(offset)})`,
    md: `translate3d(calc(-50% + ${offset * 48}%), 0, 0) scale(${getScale(offset)})`,
  },
  opacity: getOpacity(offset),
  filter: isActive ? 'grayscale(0) brightness(1)' : 'grayscale(1) brightness(0.72)',
  transition:
    'transform 720ms cubic-bezier(0.22, 1, 0.36, 1), opacity 720ms ease, filter 720ms ease',
  zIndex: 10 - Math.abs(offset),
  visibility: isFar ? 'hidden' : 'visible',
  pointerEvents: 'none',
  willChange: 'transform, opacity, filter',
})

const getCardSx = (isActive: boolean) => ({
  position: 'relative',
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  borderRadius: { xs: '28px', md: '36px' },
  boxShadow: isActive ? '0 28px 70px rgba(14, 20, 19, 0.2)' : '0 14px 34px rgba(14, 20, 19, 0.12)',
  backgroundColor: 'grey.300',
})

const getOverlaySx = (isActive: boolean) => ({
  position: 'absolute',
  inset: 0,
  background: isActive
    ? 'linear-gradient(180deg, rgba(12, 18, 17, 0.06) 0%, rgba(12, 18, 17, 0.66) 100%)'
    : 'linear-gradient(180deg, rgba(12, 18, 17, 0.16) 0%, rgba(12, 18, 17, 0.78) 100%)',
})

const getDotSx = (isActive: boolean) => ({
  width: isActive ? 30 : 10,
  height: 10,
  border: 'none',
  borderRadius: 999,
  backgroundColor: isActive ? 'secondary.main' : 'grey.400',
  cursor: 'pointer',
  transition: 'all 240ms ease',
  padding: 0,
})

const sectionSx = {
  py: { xs: 6, md: 8 },
  background: 'linear-gradient(180deg, rgba(245, 246, 242, 1) 0%, rgba(236, 239, 232, 1) 100%)',
}

const viewportSx = {
  position: 'relative',
  height: { xs: 360, sm: 420, md: 500 },
  overflow: 'hidden',
  px: { xs: 0, md: 4 },
}

const contentSx = {
  position: 'absolute',
  inset: 0,
  justifyContent: 'flex-end',
  p: { xs: 2.5, sm: 3, md: 4 },
}

const eyebrowSx = {
  alignSelf: 'flex-start',
  px: 1.5,
  py: 0.75,
  borderRadius: 999,
  backgroundColor: 'rgba(255,255,255,0.18)',
  backdropFilter: 'blur(14px)',
}

const navButtonSx = {
  width: 48,
  height: 48,
  border: '1px solid',
  borderColor: 'rgba(45, 51, 50, 0.12)',
  backgroundColor: 'rgba(255,255,255,0.8)',
  color: 'grey.900',
  '&:hover': {
    backgroundColor: 'rgba(255,255,255,0.96)',
  },
}

export default AboutImageCarouselSection
