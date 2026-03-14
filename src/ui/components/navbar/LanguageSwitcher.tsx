'use client'
// src/ui/components/navbar/LanguageSwitcher.tsx
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useTransition } from 'react'
import TranslateRoundedIcon from '@mui/icons-material/TranslateRounded'
import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import Typography from '@mui/material/Typography'
import { alpha } from '@mui/material/styles'
import palette from '@/Theme/palette'

const LANGUAGES = [
  { code: 'en', label: 'English', shortLabel: 'EN' },
  { code: 'sw', label: 'Kiswahili', shortLabel: 'SW' },
] as const

type LanguageSwitcherProps = {
  locale: string
  mobile?: boolean
  onSwitch?: () => void
}

const getNextLanguage = (locale: string) => {
  return LANGUAGES.find((language) => language.code !== locale) ?? LANGUAGES[0]
}

const LanguageSwitcherButton = ({
  mobile,
  disabled = false,
  label,
  onClick,
}: {
  mobile: boolean
  disabled?: boolean
  label: (typeof LANGUAGES)[number]
  onClick?: () => void
}) => {
  return (
    <Box className={`language-switch ${mobile ? 'mobile' : 'desktop'}`} sx={switcher_sx(mobile)}>
      <ButtonBase
        aria-label={`Switch language to ${label.label}`}
        disabled={disabled}
        onClick={onClick}
        sx={language_option_sx(mobile)}
      >
        <Box className="language-switch__badge">
          <TranslateRoundedIcon sx={{ fontSize: mobile ? 17 : 15 }} />
        </Box>

        <Typography
          component="span"
          sx={{
            fontSize: mobile ? 13 : 12,
            fontWeight: 700,
            letterSpacing: mobile ? 0.7 : 0.5,
          }}
        >
          {label.shortLabel}
        </Typography>

        <Typography
          component="span"
          sx={{
            color: 'text.secondary',
            display: mobile ? 'inline' : 'none',
            fontSize: 11,
            fontWeight: 500,
          }}
        >
          {label.label}
        </Typography>
      </ButtonBase>
    </Box>
  )
}

const LanguageSwitcherInner = ({
  locale,
  mobile = false,
  onSwitch,
}: LanguageSwitcherProps) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const nextLanguage = getNextLanguage(locale)

  const switchTo = (nextLocale: string) => {
    if (!pathname || nextLocale === locale || isPending) {
      return
    }

    const segments = pathname.split('/')

    if (segments[1]) {
      segments[1] = nextLocale
    } else {
      segments.splice(1, 0, nextLocale)
    }

    const queryString = searchParams.toString()
    const nextPath = `${segments.join('/')}${queryString ? `?${queryString}` : ''}`

    onSwitch?.()

    startTransition(() => {
      router.replace(nextPath)
    })
  }

  return (
    <LanguageSwitcherButton
      mobile={mobile}
      disabled={isPending}
      label={nextLanguage}
      onClick={() => switchTo(nextLanguage.code)}
    />
  )
}

const LanguageSwitcherFallback = ({
  locale,
  mobile = false,
}: Pick<LanguageSwitcherProps, 'locale' | 'mobile'>) => {
  return <LanguageSwitcherButton mobile={mobile} disabled label={getNextLanguage(locale)} />
}

const LanguageSwitcher = (props: LanguageSwitcherProps) => {
  return (
    <Suspense fallback={<LanguageSwitcherFallback locale={props.locale} mobile={props.mobile} />}>
      <LanguageSwitcherInner {...props} />
    </Suspense>
  )
}

const switcher_sx = (mobile: boolean) => ({
  alignItems: 'center',
  backdropFilter: 'blur(12px)',
  background: `linear-gradient(135deg, ${alpha('#FFFFFF', 0.94)} 0%, ${alpha(palette.secondary.main, 0.96)} 100%)`,
  border: `1px solid ${alpha(palette.primary.main, 0.12)}`,
  borderRadius: '999px',
  boxShadow: `0 12px 30px ${alpha(palette.primary.main, 0.1)}, inset 0 1px 0 ${alpha('#FFFFFF', 0.9)}`,
  display: 'inline-flex',
  flexShrink: 0,
  minHeight: mobile ? 48 : 40,
  p: mobile ? 0.5 : 0.375,
  width: mobile ? '100%' : 'auto',
  '& .language-switch__badge': {
    alignItems: 'center',
    backgroundColor: alpha(palette.primary.main, 0.1),
    borderRadius: '999px',
    color: 'primary.main',
    display: 'inline-flex',
    height: mobile ? 36 : 30,
    justifyContent: 'center',
    width: mobile ? 36 : 30,
  },
})

const language_option_sx = (mobile: boolean) => ({
  alignItems: 'center',
  backgroundColor: 'transparent',
  borderRadius: '999px',
  boxShadow: 'none',
  color: 'text.primary',
  display: 'inline-flex',
  flex: mobile ? 1 : undefined,
  gap: mobile ? 1 : 0.75,
  justifyContent: mobile ? 'center' : 'flex-start',
  minHeight: mobile ? 40 : 32,
  minWidth: mobile ? 0 : 72,
  px: mobile ? 1.5 : 1.1,
  transition: 'background-color 160ms ease, box-shadow 160ms ease, color 160ms ease, transform 160ms ease',
  '&:hover': {
    backgroundColor: alpha(palette.primary.main, 0.08),
    transform: 'translateY(-1px)',
  },
  '&.Mui-disabled': {
    opacity: 1,
  },
})

export default LanguageSwitcher
