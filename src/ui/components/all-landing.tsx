import Box from '@mui/material/Box'
import { SxProps } from '@mui/material/styles'
import heroImage from 'src/assets/Landing/Background.png'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { NAVBAR } from './navbar/constants'
import { FONTS } from '@/Theme/fonts'
import { globalCssVar } from './GlobalStyles'
import { getOptimizedImage } from '@/utilities/image'
import palette from '@/Theme/palette'
import { theme } from '@/Theme'
import { spacing } from 'src/Theme'
import { responsive } from 'src/utilities/breakpoints'
import typography from '@/Theme/typography'

const Landing: React.FC<LandingProps> = ({ title, description }) => {
  return (
    <Box sx={sx} display="flex" component="section">
      <Box className="content-wrapper">
        <Stack
          direction="column"
          spacing={2}
          justifyContent={'center'}
          alignItems="center"
          alignContent={'center'}
          paddingTop={{ xs: 2, [NAVBAR.BREAKPOINT]: 2 }}
        >
          <span>
            <Typography
              color="grey.100"
              variant="h2"
              component="h1"
              fontWeight={FONTS.poppins.fontWeights[600]}
              marginTop={1}
              lineHeight={1.25}
              className="hero-title"
              textAlign="center"
            >
              {title}
            </Typography>
          </span>
          <div>
            <Typography
              variant="body2"
              color="grey.100"
              display="flex"
              textAlign={'center'}
              maxWidth={{
                xs: '100%',
                [NAVBAR.BREAKPOINT]: 500,
              }}
              gutterBottom
            >
              {description}
            </Typography>
          </div>
        </Stack>
      </Box>
    </Box>
  )
}

export type LandingProps = {
  title: string
  description: string
}

const sx: SxProps = {
  position: 'relative',
  // top: 0,
  width: '100vw',
  left: '50%',
  right: '50%',
  padding: 0,
  marginLeft: '-50vw',
  marginRight: '-50vw',
  marginTop: `calc(-1 * ${globalCssVar('page-container-padding-top')})`,
  background: `url(${getOptimizedImage(heroImage)}) no-repeat`,
  backgroundColor: palette.secondary.main,
  backgroundSize: 'cover',
  zIndex: 0,
  backgroundPosition: 'center',
  minHeight: `calc(100px + ${globalCssVar('page-container-padding-top')})`,

  '& .content-wrapper': {
    position: 'relative',
    width: '100%',
    maxWidth: theme.breakpoints.values.xl,
    margin: '0 auto',
    padding: spacing(10),
    paddingTop: globalCssVar('page-container-padding-top'),
    zIndex: 1,
    [responsive('down', 'sm')]: {
      padding: spacing(4),
      paddingTop: globalCssVar('page-container-padding-top'),
    },
  },
  '& .mobile': {
    display: 'none',
  },
  [responsive('down', NAVBAR.BREAKPOINT)]: {
    flexDirection: 'column-reverse',
    '& .desktop': {
      display: 'none',
    },
    '& .mobile': {
      display: 'flex',
    },
  },

  //   "& .left-section": {
  //     [responsive("up", NAVBAR.BREAKPOINT)]: {
  //       width: "100%",
  //     },
  //     "& .overline": {
  //       ...typography.body2,
  //     },
  //   },

  '& .hero-title': {
    [responsive('down', 'sm')]: {
      ...typography.h3,
      fontWeight: FONTS.poppins.fontWeights[600],
      textAlign: 'center',

      '& span:not(:first-of-type)': {
        textTransform: 'lowercase',
      },
    },

    [responsive('up', 'sm')]: {
      '& span': {
        display: 'block',
      },
    },
  },
}

export default Landing
