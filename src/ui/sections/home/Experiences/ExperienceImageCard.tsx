import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import type { SxProps, Theme } from '@mui/material/styles'
import type { StaticImageData } from 'next/image'
import React from 'react'

const ExperienceImageCard = ({
  title,
  description,
  backgroundImage,
  minHeight = 320,
  sx,
}: ExperienceImageCardProps) => {
  const imageSource = typeof backgroundImage === 'string' ? backgroundImage : backgroundImage.src

  return (
    <Card
      sx={[
        {
          minHeight,
          display: 'flex',
          alignItems: 'flex-end',
          color: 'common.white',
          overflow: 'hidden',
          backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.65) 100%), url(${imageSource})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        },
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
    >
      <CardContent sx={{ width: '100%' }}>
        <Stack spacing={1}>
          <Typography variant="h6" color="secondary.light" component="h3" fontWeight={700}>
            {title}
          </Typography>
          <Typography variant="body2" color="grey.200">
            {description}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  )
}

export interface ExperienceImageCardProps {
  title: string
  description: string
  backgroundImage: StaticImageData | string
  minHeight?: number | string
  sx?: SxProps<Theme>
}

export default ExperienceImageCard
