import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import PageContainer from '@/ui/components/page-container'

const ContactHeroSection = () => {
  return (
    <Box component="section" sx={{ py: { xs: 6, md: 8 } }}>
      <PageContainer>
        <Stack spacing={2} alignItems="center" textAlign="center">
          <Typography variant="h3" fontWeight={700} color="primary.main">
            Get in Touch
          </Typography>
          <Typography
            variant="body1"
            color="grey.600"
            maxWidth={760}
            sx={{ lineHeight: 1.8 }}
          >
            Have questions about our farm tours, coffee tasting, or planning a school visit? We&apos;d
            love to hear from you.
          </Typography>
        </Stack>
      </PageContainer>
    </Box>
  )
}

export default ContactHeroSection
