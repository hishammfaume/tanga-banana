import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import React from 'react'
import { CheckIcon } from '@/ui/components/icons'
import FULL_EXPERIENCE_ITEMS from './constants'
import HeroImage from './hero-image'

const ExperiencesSection = () => {
  return (
    <Stack spacing={{ xs: 5, md: 7 }} justifyContent="center" alignItems="center" mb={6}>
      <Stack
        spacing={2}
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        maxWidth={760}
      >
        <Typography
          variant="body2"
          color="warning.main"
          textAlign="center"
          fontWeight={700}
          textTransform="uppercase"
          letterSpacing={1.6}
        >
          Experiences
        </Typography>
        <Typography variant="h4" color="grey.900" fontWeight={600} lineHeight={1.15}>
          Explore each experience through richer stories and a stronger visual rhythm.
        </Typography>
        <Typography variant="body2" color="grey.600">
          From hands-on learning to quiet garden breaks, each stop on the farm now sits in a more
          polished, gallery-style layout.
        </Typography>
      </Stack>

      {FULL_EXPERIENCE_ITEMS.map((item, index) => (
        <Box
          key={item.sectionId}
          id={item.sectionId}
          width="100%"
          sx={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: { xs: '28px', md: '36px' },
            border: '1px solid rgba(34, 44, 35, 0.08)',
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(244,246,240,0.96) 100%)',
            boxShadow: '0 22px 54px rgba(18, 24, 19, 0.08)',
            px: { xs: 2, md: 3.5 },
            py: { xs: 2.5, md: 3.5 },
            scrollMarginTop: { xs: 96, md: 120 },
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              width: { xs: 160, md: 240 },
              height: { xs: 160, md: 240 },
              borderRadius: '50%',
              background: 'rgba(194, 173, 96, 0.18)',
              filter: 'blur(24px)',
              top: -70,
              right: index % 2 === 0 ? -60 : 'auto',
              left: index % 2 === 0 ? 'auto' : -60,
            }}
          />

          <Stack
            spacing={{ xs: 3, md: 0 }}
            justifyContent="center"
            alignItems="stretch"
            direction={{
              xs: 'column',
              md: index % 2 === 0 ? 'row' : 'row-reverse',
            }}
          >
            <Box display="flex" width={{ xs: '100%', md: '46%' }} flexShrink={0}>
              <HeroImage
                src={item.image}
                alt={item.title}
                priority={index === 0}
                eyebrow={item.chips[0]}
                indexLabel={`${index + 1}`.padStart(2, '0')}
              />
            </Box>

            <Stack
              flex={1}
              minWidth={0}
              spacing={3}
              justifyContent="center"
              alignItems="flex-start"
              px={{ xs: 0.5, md: 4 }}
              py={{ xs: 0.5, md: 1 }}
            >
              <Stack spacing={1.5}>
                <Typography variant="h4" color="grey.800" fontWeight={600} lineHeight={1.12}>
                  {item.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="grey.500"
                  fontWeight={500}
                  textAlign="start"
                  lineHeight={1.5}
                >
                  {item.caption}
                </Typography>
              </Stack>

              <Typography variant="body2" color="grey.500" textAlign="start" lineHeight={1.8}>
                {item.description}
              </Typography>

              <Box
                sx={{
                  display: 'grid',
                  width: '100%',
                  gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
                  gap: 1.5,
                }}
              >
                {item.points.map((point) => (
                  <Stack
                    key={point}
                    direction="row"
                    spacing={1.5}
                    alignItems="flex-start"
                    sx={{
                      p: 1.75,
                      borderRadius: '18px',
                      backgroundColor: 'rgba(255,255,255,0.72)',
                      border: '1px solid rgba(34, 44, 35, 0.08)',
                    }}
                  >
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        backgroundColor: 'secondary.main',
                        color: 'common.white',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <CheckIcon />
                    </Box>
                    <Typography
                      variant="body2"
                      color="grey.500"
                      textAlign="start"
                      lineHeight={1.65}
                    >
                      {point}
                    </Typography>
                  </Stack>
                ))}
              </Box>

              <Stack direction="row" spacing={1.25} useFlexGap flexWrap="wrap">
                {item.chips.map((chip) => (
                  <Chip
                    key={chip}
                    label={chip}
                    variant="filled"
                    sx={{
                      backgroundColor: 'rgba(141, 169, 126, 0.14)',
                      color: 'grey.900',
                      borderRadius: 999,
                      fontWeight: 600,
                      px: 0.5,
                    }}
                  />
                ))}
              </Stack>
            </Stack>
          </Stack>
        </Box>
      ))}
    </Stack>
  )
}

export default ExperiencesSection
