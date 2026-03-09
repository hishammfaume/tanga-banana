import Box, { BoxProps } from '@mui/material/Box'
import { fadeInUp, fadeInUpTranslateXY } from './constants'
import { mergeSxProps } from '@/utilities/sx'

const FadeInUp = (props: BoxProps) => {
  return (
    <Box {...props} sx={mergeSxProps(fadeInUp, props.sx)}>
      {props.children}
    </Box>
  )
}

const FadeInUpTranslateXY = (props: BoxProps) => {
  return (
    <Box {...props} sx={mergeSxProps(fadeInUpTranslateXY, props.sx)}>
      {props.children}
    </Box>
  )
}

export { FadeInUp, FadeInUpTranslateXY }
