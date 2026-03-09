import { ThemeOptions, Theme as _Theme } from '@mui/material/styles'
import typography from './typography'
import palette from './palette'
import components from './components'
import { customShadows, shadows } from './shadows'
import breakpoints from '@/utilities/breakpoints'

const spacing = (abs: number) => `${abs * 8}px`

const shape: ThemeOptions['shape'] = {
  borderRadius: 24,
}

const theme = {
  typography: typography as ThemeOptions['typography'],
  palette,
  shape,
  components,
  breakpoints,
  shadows,
  customShadows,
  spacing,
}

declare global {
  type Theme = _Theme
}

export { shape, spacing, theme }
