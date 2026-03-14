import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import React from 'react'
import Learning from '@/assets/Farm/LearningExp.webp'
import HeroImage from '../experiences/hero-image'
import Typography from '@mui/material/Typography'
import PageContainer from '@/ui/components/page-container'
import { getTranslations } from 'next-intl/server'
import Link from '@mui/material/Link'
import NextLink from 'next/link'
import { routes } from '@/routes'

const LearningExperienceSection = async ({ locale }: { locale: string }) => {
  const t = await getTranslations({ locale, namespace: 'about.learning' })

  const contactLabel =
    locale === 'sw' ? 'ukurasa wa uhifadhi na mawasiliano' : 'booking and contact page'

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
              {t('heading')}
            </Typography>
            <Typography variant="body2" align="left" color="grey.500">
              {t('body')}
            </Typography>
            <Typography variant="body2" align="left" color="grey.500">
              {locale === 'sw' ? (
                <>
                  Wageni wanaweza kujifunza kuhusu ulimaji wa ndizi na viungo, kutazama uzoefu wa
                  kahawa ya Tanga ukikamilika, na kuunganisha ziara ya shamba na vituo vya utamaduni
                  vya karibu. Kwa maswali kuhusu kupanga vikundi, tembelea{' '}
                  <Link
                    component={NextLink}
                    href={routes.contact}
                    color="primary.main"
                    underline="hover"
                  >
                    {contactLabel}
                  </Link>
                  .
                </>
              ) : (
                <>
                  Guests can learn about banana and spice cultivation, watch a Tanga coffee moment
                  come together, and connect the farm visit to nearby cultural stops. For questions
                  about group planning, visit our{' '}
                  <Link
                    component={NextLink}
                    href={routes.contact}
                    color="primary.main"
                    underline="hover"
                  >
                    {contactLabel}
                  </Link>
                  .
                </>
              )}
            </Typography>
          </Stack>
          <HeroImage
            src={Learning}
            alt={
              locale === 'sw'
                ? 'Wanafunzi na wageni wanaofundisha kuhusu ukufu wa mabega, kahawa, na mizizi katika Tanga'
                : 'Students and visitors learning about banana, coffee, and spice farming in Tanga'
            }
          />
        </Stack>
      </PageContainer>
    </Box>
  )
}

export default LearningExperienceSection
