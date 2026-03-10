'use client'

import { NAVBAR } from '@/ui/components/navbar/constants'
import { responsive } from '@/utilities/breakpoints'
import { styled } from '@mui/material/styles'
import landingImage from 'src/assets/Landing/Landing.png'
import NextImage from 'next/image'

const IMAGE_SIZE = 1100

const LandingImage = (props: LandingImageProps) => {
  return (
    <Image
      src={landingImage}
      alt="Visitors enjoying a banana, coffee, and spice farm tour at Tanga Banana Garden in Tanga"
      className={`landing-image ${props.className || ''}`}
    />
  )
}

const Image = styled(NextImage)(() => ({
  objectPosition: 'center',
  [responsive('down', NAVBAR.BREAKPOINT)]: {
    width: '100%',
    height: 'auto',
    maxWidth: 400,
  },

  borderRadius: 20,
  objectFit: 'contain',

  width: IMAGE_SIZE,
  height: 'auto',
}))

export type LandingImageProps = Omit<React.ComponentProps<typeof Image>, 'src' | 'alt'>

export default LandingImage
