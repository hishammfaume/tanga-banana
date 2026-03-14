import { SOCIALS } from '@/utilities/constants/common'
import { mergeSxProps } from '@/utilities/sx'
import { Tooltip } from '@mui/material'
import Link from '@mui/material/Link'
import Stack, { StackProps } from '@mui/material/Stack'
import { SxProps } from '@mui/material/styles'

const SOCIALS_ENTRIES = Object.entries(SOCIALS)

type FooterSocialsProps = StackProps & {
  titles?: Partial<Record<keyof typeof SOCIALS, string>>
}

const FooterSocials = ({ titles, ...props }: FooterSocialsProps) => {
  return (
    <Stack direction="row" spacing={2} {...props} sx={mergeSxProps(sx, props.sx)}>
      {SOCIALS_ENTRIES.map(([key, value]) => {
        const title = titles?.[key as keyof typeof SOCIALS] ?? value.title
        return (
          <Tooltip key={key} title={title} arrow>
            <Link
              href={value.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={title}
            >
              {value.icon}
            </Link>
          </Tooltip>
        )
      })}
    </Stack>
  )
}

const sx: SxProps = {
  '& a': {
    color: 'inherit',
    svg: {
      height: 24,
      width: 24,
    },
  },
}

export { FooterSocials }
