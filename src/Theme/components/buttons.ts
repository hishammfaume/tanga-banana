import { ThemeOptions } from '@mui/material/styles'

const buildShadow = (color: string, elevation: Elevation = 'small') => {
  switch (elevation) {
    case 'small':
      return `2px 4px 6px ${color}2A`
    case 'medium':
      return `0px 4px 8px ${color}2A`
    default:
      return `0px 15px 30px ${color}2A`
  }
}

type Elevation = 'small' | 'medium' | 'large'

const Buttons: ThemeOptions['components'] = {
  MuiButton: {
    styleOverrides: {
      root({ disableElevation, color = 'primary', theme, elevation }) {
        if (disableElevation || color === 'inherit')
          return {
            textTransform: 'none',
          }
        return {
          textTransform: 'none',
          boxShadow: buildShadow(theme.palette[color].main, elevation as Elevation),
          '&:hover': {
            boxShadow: buildShadow(theme.palette[color].main, elevation as Elevation),
          },
        }
      },

      disableElevation: {
        boxShadow: 'none !important',
        '&:hover': {
          boxShadow: 'none !important',
        },
      },
      sizeLarge: {
        padding: '0.5rem 1.5rem',
      },

      sizeSmall: ({ theme }) => ({
        fontSize: '0.75rem !important',

        [theme.breakpoints.down('sm')]: {
          fontSize: '.95rem !important',
        },
      }),
    },

    defaultProps: {
      elevation: 'large',
      color: 'primary',
      variant: 'contained',
    },

    variants: [
      {
        props: { size: 'xlarge' },
        style({ theme }) {
          return {
            fontSize: '1rem',
            padding: '.55rem 1.5rem',

            [theme.breakpoints.up('md')]: {
              fontSize: '1.25rem',
              padding: '.6rem 2rem',
            },
          }
        },
      },
    ],
  },
}

declare module '@mui/material/Button' {
  interface ButtonPropsSizeOverrides {
    xlarge: true
    large: true
    medium: true
    small: true
  }

  interface ButtonOwnProps {
    elevation?: Elevation
  }
}

export default Buttons
