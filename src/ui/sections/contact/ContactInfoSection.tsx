import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import CallIcon from '@mui/icons-material/Call'
import EmailIcon from '@mui/icons-material/Email'
import RoomIcon from '@mui/icons-material/Room'
import type React from 'react'
import { ADDRESS, EMAILS, PHONE_NUMBER, SOCIALS } from '@/utilities/constants/common'
import Box from '@mui/material/Box'
import Link from 'next/link'
import { CONTACT_FAQS } from './constants'

const ContactInfoSection = () => {
  return (
    <Stack spacing={3}>
      <Box sx={{ p: { xs: 2.5, md: 3 }, bgcolor: 'secondary.light', borderRadius: 1 }}>
        <Stack spacing={{ xs: 2, md: 3 }}>
          <ContactInfoRow
            icon={<RoomIcon color="primary" />}
            title="Locate Us"
            titleHref={SOCIALS.google.link}
            lines={[
              { text: 'Tanga Banana Garden', href: SOCIALS.google.link },
              { text: 'City of Tanga, Tanzania', href: SOCIALS.google.link },
              { text: ADDRESS, href: SOCIALS.google.link },
            ]}
          />
          <ContactInfoRow
            icon={<EmailIcon color="primary" />}
            title="Email Us"
            lines={[{ text: EMAILS.mail }]}
          />
          <ContactInfoRow
            icon={<CallIcon color="primary" />}
            title="Call Us"
            titleHref={PHONE_NUMBER.contact.href}
            lines={[
              { text: PHONE_NUMBER.contact.formatted, href: PHONE_NUMBER.contact.href },
              { text: 'Mon–Sun, 8am – 6pm' },
            ]}
          />
          <ContactInfoRow
            icon={<Box component="span" sx={{ display: 'flex', color: 'primary.main' }}>{SOCIALS.whatsapp.icon}</Box>}
            title="WhatsApp Us"
            titleHref={SOCIALS.whatsapp.link}
            lines={[
              { text: PHONE_NUMBER.contact.formatted, href: SOCIALS.whatsapp.link },
              { text: 'Open WhatsApp and chat with us directly' },
            ]}
          />
        </Stack>
      </Box>

      <Box sx={{ p: { xs: 2.5, md: 3 }, borderRadius: 1 }}>
        <Typography variant="h6" fontWeight={600} gutterBottom color="grey.700">
          Frequently Asked Questions
        </Typography>
        <List disablePadding>
          {CONTACT_FAQS.map((item, idx) => (
            <ListItem
              key={item.question}
              disableGutters
              alignItems="flex-start"
              sx={{ mb: idx === CONTACT_FAQS.length - 1 ? 0 : 2 }}
            >
              <ListItemText
                primary={
                  <Typography variant="subtitle1" fontWeight={600} color="grey.700">
                    {item.question}
                  </Typography>
                }
                secondary={
                  <Typography variant="body2" color="grey.600" sx={{ mt: 0.5 }}>
                    {item.answer}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Stack>
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
              <Typography key={`${title}-${line.text}`} variant="body2" color="grey.600" component="span">
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
