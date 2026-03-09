import { alpha } from '@mui/material/styles'
import createPalette from 'node_modules/@mui/material/esm/styles/createPalette'

const PRIMARY = {
  main: '#2F9E44',
  light: '#8ADC99',
  dark: '#14532D',
} as const

const SECONDARY = {
  main: '#F1FFE9',
  light: '#e6f4ea',
  // light: '#3C3A59',
} as const

const WARNING = {
  main: '#EB6F0A',
} as const

const GREY = {
  0: '#FFFFFF',
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#637381',
  700: '#454F5B',
  800: '#212B36',
  900: '#161C24',
  500_8: alpha('#919EAB', 0.08),
  500_12: alpha('#919EAB', 0.12),
  500_16: alpha('#919EAB', 0.16),
  500_24: alpha('#919EAB', 0.24),
  500_32: alpha('#919EAB', 0.32),
  500_48: alpha('#919EAB', 0.48),
  500_56: alpha('#919EAB', 0.56),
  500_80: alpha('#919EAB', 0.8),
} as const

export const palette = {
  primary: PRIMARY,
  secondary: SECONDARY,
  warning: WARNING,
  grey: GREY,
  error: {
    main: '#FD5056',
  },

  background: {
    paper: '#FCFCFC',
    default: '#FFFFFF',
    grey: '#E8E8E8',
    neutral: '#F3F3F3',
  },

  text: {
    primary: PRIMARY.main,
    secondary: SECONDARY.main,
    light: '#DADFEC',
  },
}

export { GREY, PRIMARY, SECONDARY, WARNING }

export default createPalette(palette)
