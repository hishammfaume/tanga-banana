import Box from '@mui/material/Box'
import React from 'react'

import PageContainer from '@/ui/components/page-container'
import SectionSpacer from '@/ui/components/section-spacer'
import ContactFormSection from '@/ui/sections/contact/ContactFormSection'
import ContactInfoSection from '@/ui/sections/contact/ContactInfoSection'
import Landing from '@/ui/components/all-landing'
import Stack from '@mui/material/Stack'
import Card from '@mui/material/Card'

const ContactPage = () => {
  return (
    <Box>
      <PageContainer>
        <Landing
          title="Get in Touch"
          description="Have questions about our farm tours, coffee tasting, bananas, banana growing or planning a school visit? We'd love to hear from you."
        />
      </PageContainer>
      <SectionSpacer small />
      <PageContainer>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 2, md: 8 }}>
          <ContactInfoSection />
          <ContactFormSection />
        </Stack>
      </PageContainer>
      <PageContainer>
        <Card sx={{ mb: 4 }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3973.2666459599404!2d38.9810794!3d-5.220742699999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1843eb7fae1334fb%3A0x670bb0cca8190d64!2sTanga%20Banana%20Garden%3A%20Coffee%20%7C%20Banana%20%7C%20Spice%20%7C%20Fruit%20%7C%20Eco%20Farm%20Tour%20%7C%20Tanga%2C%20Tanzania%7C!5e0!3m2!1sen!2suk!4v1772908103516!5m2!1sen!2suk"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Map showing the location of Tanga Banana Garden in Tanzania"
          />
        </Card>
      </PageContainer>
    </Box>
  )
}

export default ContactPage
