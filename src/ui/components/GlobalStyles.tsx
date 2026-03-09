/* eslint-disable @typescript-eslint/no-explicit-any */
import { alpha } from '@mui/material/styles'
import MuiGlobalStyles from '@mui/material/GlobalStyles'
import { NAVBAR, NAVBAR_BROCHURE, NAVBAR_LOGO } from './navbar/constants'
import palette from '@/Theme/palette'
import typography from '@/Theme/typography'
import { responsive } from '@/utilities/breakpoints'
import { numberToPx } from '@/utilities/getFontValue'
import { shadows } from '@/Theme/shadows'
import { shape, spacing } from '@/Theme'

const color = palette.text.primary
const backgroundColor = palette.background.paper

const navBackgroundColor = alpha(palette.background.default, 0.4)
const fontFamily = typography.fontFamily

const globalVars = {
  'nav-height': '--nav-height',
  'nav-brochure-height': '--nav-brochure-height',
  'nav-brochure-display': '--nav-brochure-display',
  'nav-toggle-display': '--nav-toggle-display',
  'logo-height': '--logo-height',
  'page-container-padding-top': '--page-container-padding-top',
  'nav-toggle-size': '--nav-toggle-size',
  'nav-background-color': '--nav-background-color',
} as const

export type GlobalVars = keyof typeof globalVars

const globalCssVarName = <T extends GlobalVars>(name: T) => globalVars[name]
const globalCssVar = <T extends GlobalVars, X extends (typeof globalVars)[T]>(
  name: T,
): `var(${X})` => `var(${globalCssVarName<T>(name)})` as any

const GlobalStyles = () => {
  return (
    <MuiGlobalStyles
      styles={{
        body: {
          color,
          backgroundColor,
          fontFamily,
        },

        [responsive('up', 'xs')]: {
          ':root': {
            [globalCssVarName('nav-height')]: numberToPx(NAVBAR.HEIGHT_SM),
            [globalCssVarName('nav-brochure-height')]: numberToPx(NAVBAR_BROCHURE.HEIGHT_SM),
            [globalCssVarName('nav-brochure-display')]: 'none',
            [globalCssVarName('nav-toggle-display')]: 'block',
            [globalCssVarName('nav-background-color')]: backgroundColor,

            // navbar logo
            [globalCssVarName('logo-height')]: numberToPx(NAVBAR_LOGO.HEIGHT_SM),

            // combined navbar height with brochure banner height
            [globalCssVarName('page-container-padding-top')]:
              `calc(var(--nav-height) + var(--nav-brochure-height))`,

            // nav toggle
            [globalCssVarName('nav-toggle-size')]: numberToPx(NAVBAR.TOGGLE_SIZE),
          },
        },
        [responsive('up', NAVBAR.BREAKPOINT)]: {
          ':root': {
            [globalCssVarName('nav-height')]: numberToPx(NAVBAR.HEIGHT_MD),
            [globalCssVarName('nav-brochure-display')]: 'flex',
            [globalCssVarName('nav-toggle-display')]: 'none',

            [globalCssVarName('nav-background-color')]: navBackgroundColor,

            [globalCssVarName('nav-brochure-height')]: numberToPx(NAVBAR_BROCHURE.HEIGHT_MD),
            // navbar logo
            [globalCssVarName('logo-height')]: numberToPx(NAVBAR_LOGO.HEIGHT_MD),
          },
        },

        '& .chat': {
          '& .MuiDrawer-paper': {
            left: 'auto',
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            boxShadow: shadows[12],
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: palette.divider,

            maxWidth: 400,
            maxHeight: 500,
            height: '100%',
            width: '100%',
            display: 'flex',
            padding: spacing(1),

            [responsive('down', 'sm')]: {
              maxWidth: 'unset',
              minHeight: 350,
              maxHeight: 400,
              height: 'auto',
            },
          },

          '& .block': {
            display: 'block',
          },

          '& .header': {
            paddingBottom: spacing(1),
            borderBottomWidth: 1,
            borderBottomStyle: 'solid',
            borderBottomColor: palette.divider,
          },
          '& .footer': {
            paddingTop: spacing(1),

            '& .MuiInputBase-root': {
              backgroundColor: palette.grey[100],
              paddingTop: spacing(1),
              paddingBottom: spacing(1),
              ...typography.caption,

              [responsive('down', 'sm')]: {
                fontSize: '1rem',
              },
              // change the borderradius of the input
              '& .MuiOutlinedInput-notchedOutline': {
                borderRadius:
                  typeof shape?.borderRadius === 'number'
                    ? shape?.borderRadius * 0.5
                    : shape?.borderRadius,
              },
            },
          },

          '& .messages-container': {
            paddingTop: spacing(2),

            '& .spacer': {
              flexGrow: 1,
            },

            '& .message': {
              maxWidth: '80%',
              backgroundColor: palette.grey[100],
              padding: `${spacing(1.25)} ${spacing(2)}`,
              borderRadius:
                typeof shape?.borderRadius === 'number'
                  ? shape?.borderRadius * 0.75
                  : shape?.borderRadius,
              boxShadow: shadows[1],
              marginBottom: spacing(2),
              minWidth: 100,

              '& .time': {
                fontWeight: 500,
                color: 'text.alt',
              },

              '& .MuiTypography-root': {
                borderRadius:
                  typeof shape?.borderRadius === 'number'
                    ? shape?.borderRadius * 0.5
                    : shape?.borderRadius,
                ...typography.body2,

                whiteSpace: 'pre-wrap',
              },
              alignSelf: 'flex-start',
              '&.me': {
                alignSelf: 'flex-end',
                backgroundColor: palette.primary.main,

                '& .MuiTypography-root': {
                  color: palette.primary.contrastText,
                },
              },
            },
          },
        },
        // "#__next": {
        //   width: "100%",
        //   height: "100%",
        //   isolation: "isolate",
        // },
        // img: {
        //   maxWidth: "100%",
        //   height: "auto",
        //   display: "block",
        // },
        // Optimize animations
        // "*": {
        //   WebkitBackfaceVisibility: "hidden",
        //   backfaceVisibility: "hidden",
        //   WebkitPerspective: 1000,
        //   perspective: 1000,
        // },
      }}
    />
  )
}

export { globalCssVar, globalCssVarName, globalVars }

export default GlobalStyles
