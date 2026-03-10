import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import React from 'react'
import { ICONS } from '@/utilities/constants/common'
import CardActions from '@mui/material/CardActions'

const ExperienceCard = ({ icon, title, description, learnMoreHref }: ExperienceCardProps) => {
  return (
    <Card>
      <CardContent>
        <Stack spacing={2} justifyContent={'center'} alignItems="center" textAlign="center">
          <Box
            sx={{
              width: 50,
              height: 50,
              display: 'flex',
              backgroundColor: 'secondary.main',
              borderRadius: '20%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {icon}
          </Box>
          <Typography variant="body1" fontWeight={600} color="grey.600">
            {title}
          </Typography>
          <Typography variant="body2" color="grey.500" maxWidth={500}>
            {description}
          </Typography>
        </Stack>
      </CardContent>
      <CardActions>
        {learnMoreHref ? (
          <Button
            size="small"
            variant="text"
            component={Link}
            href={learnMoreHref}
            disableElevation
            sx={{
              border: 'none',
              textTransform: 'none',
              borderRadius: '10px',
              boxShadow: 'none',
              px: 2,
              '&:hover': { boxShadow: 'none' },
            }}
            endIcon={ICONS.arrow_forward}
          >
            Learn more
          </Button>
        ) : null}
      </CardActions>
    </Card>
  )
}

interface ExperienceCardProps {
  icon?: React.ReactNode
  title: string
  description: string
  /** Optional link to show a Learn more button; omit to hide (used outside home page) */
  learnMoreHref?: string
}

export default ExperienceCard
