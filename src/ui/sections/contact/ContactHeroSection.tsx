import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import PageContainer from '@/ui/components/page-container'
import { useTranslations } from 'next-intl'

const ContactHeroSection = () => {
  const t = useTranslations('contact.hero')
  return (
    <Box component="section" sx={{ py: { xs: 6, md: 8 } }}>
      <PageContainer>
        <Stack spacing={2} alignItems="center" textAlign="center">
          <Typography variant="h3" fontWeight={700} color="primary.main">
            {t('heading')}
          </Typography>
          <Typography variant="body1" color="grey.600" maxWidth={760} sx={{ lineHeight: 1.8 }}>
            {t('subheading')}
          </Typography>
        </Stack>
      </PageContainer>
    </Box>
  )
}

export default ContactHeroSection
