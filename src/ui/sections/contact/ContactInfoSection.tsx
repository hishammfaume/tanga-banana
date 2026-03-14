import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import CallIcon from '@mui/icons-material/Call'
import EmailIcon from '@mui/icons-material/Email'
import RoomIcon from '@mui/icons-material/Room'
import type React from 'react'
import {
  ADDRESS,
  // BUSINESS_OPENING_HOURS,
  EMAILS,
  PHONE_NUMBER,
  SOCIALS,
} from '@/utilities/constants/common'
import Box from '@mui/material/Box'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'

const ContactInfoSection = async ({ locale }: { locale: string }) => {
  const t = await getTranslations({ locale, namespace: 'contact' })

  return (
    <Box
      sx={{
        p: { xs: 2.5, md: 3 },
        bgcolor: 'secondary.light',
        borderRadius: 1,
      }}
    >
      <Stack spacing={{ xs: 2, md: 3 }}>
        <ContactInfoRow
          icon={<RoomIcon color="primary" />}
          title={t('locate.label')}
          titleHref={SOCIALS.google.link}
          lines={[
            { text: t('locate.address1'), href: SOCIALS.google.link },
            { text: t('locate.address2'), href: SOCIALS.google.link },
            { text: ADDRESS, href: SOCIALS.google.link },
          ]}
        />
        <ContactInfoRow
          icon={<EmailIcon color="primary" />}
          title={t('email.label')}
          titleHref={EMAILS.mailto}
          lines={[{ text: EMAILS.mail, href: EMAILS.mailto }]}
        />
        <ContactInfoRow
          icon={<CallIcon color="primary" />}
          title={t('phone.label')}
          titleHref={PHONE_NUMBER.contact.href}
          lines={[
            { text: PHONE_NUMBER.contact.formatted, href: PHONE_NUMBER.contact.href },
            { text: t('phone.hours') },
          ]}
        />
        <ContactInfoRow
          icon={
            <Box component="span" sx={{ display: 'flex', color: 'primary.main' }}>
              {SOCIALS.whatsapp.icon}
            </Box>
          }
          title={t('whatsapp.label')}
          titleHref={SOCIALS.whatsapp.link}
          lines={[
            { text: PHONE_NUMBER.contact.formatted, href: SOCIALS.whatsapp.link },
            { text: t('whatsapp.body') },
          ]}
        />
      </Stack>
    </Box>
  )
}

const ContactInfoRow = ({
  icon,
  title,
  lines,
  titleHref,
}: {
  icon: React.ReactNode
  title: string
  lines: ContactInfoLine[]
  titleHref?: string
}) => (
  <Stack direction="row" spacing={2}>
    <ListItemIcon sx={{ minWidth: 40 }}>{icon}</ListItemIcon>
    <ListItemText
      primary={
        titleHref ? (
          <Link href={titleHref} {...getLinkProps(titleHref)}>
            <Typography variant="subtitle1" fontWeight={600} color="grey.700">
              {title}
            </Typography>
          </Link>
        ) : (
          <Typography variant="subtitle1" fontWeight={600} color="grey.700">
            {title}
          </Typography>
        )
      }
      secondary={
        <Stack spacing={0.3} component="span">
          {lines.map((line) =>
            line.href ? (
              <Link href={line.href} key={`${title}-${line.text}`} {...getLinkProps(line.href)}>
                <Typography variant="body2" color="grey.600" component="span">
                  {line.text}
                </Typography>
              </Link>
            ) : (
              <Typography
                key={`${title}-${line.text}`}
                variant="body2"
                color="grey.600"
                component="span"
              >
                {line.text}
              </Typography>
            ),
          )}
        </Stack>
      }
    />
  </Stack>
)

type ContactInfoLine = {
  text: string
  href?: string
}

const getLinkProps = (href: string) =>
  href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {}

export default ContactInfoSection
