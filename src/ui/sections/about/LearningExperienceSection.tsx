import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import React from 'react'
import Learning from '@/assets/Farm/LearningExp.png'
import HeroImage from '../experiences/hero-image'
import Typography from '@mui/material/Typography'
import PageContainer from '@/ui/components/page-container'

const LearningExperienceSection = () => {
  return (
    <Box>
      <PageContainer>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={4}
          justifyContent="center"
          alignItems="center"
          alignContent="center"
          mb={4}
        >
          <Stack spacing={3} textAlign="left">
            <Typography
              variant="h4"
              align="left"
              color="grey.800"
              textAlign={'left'}
              fontWeight={600}
              lineHeight={1.25}
            >
              A Learning Experience
            </Typography>
            <Typography variant="body2" align="left" color="grey.500">
              We open our gates to everyone—from curious toddlers to seasoned nature lovers. The
              Tanga Banana Garden is a living classroom where you can touch, smell, and taste the
              fruits of the land.
            </Typography>
            <Typography variant="body2" align="left" color="grey.500">
              Whether it is a cultural walk to nearby caves or a hands-on lesson in Tanga coffee
              making, our goal is to share the &quot;real aroma&quot; of Tanzania with you. We
              invite you to leave the noise of the city behind and enjoy quality time in our green
              embrace.
            </Typography>
          </Stack>
          <HeroImage src={Learning} alt="Learning Experience Image" />
        </Stack>
      </PageContainer>
    </Box>
  )
}

export default LearningExperienceSection
