'use client'

import { NAVBAR } from '@/ui/components/navbar/constants'
import { responsive } from '@/utilities/breakpoints'
import { styled } from '@mui/material/styles'
import Tourimage from 'src/assets/Farm/gateaway.png'
import NextImage from 'next/image'

const IMAGE_SIZE = 600

const TourImage = (props: TourImageProps) => {
  return <Image src={Tourimage} alt="Tour" className={`tour-image ${props.className || ''}`} />
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

export type TourImageProps = Omit<React.ComponentProps<typeof Image>, 'src' | 'alt'>

export default TourImage
