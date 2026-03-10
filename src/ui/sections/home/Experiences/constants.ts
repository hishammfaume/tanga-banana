import { ICONS } from '@/utilities/constants/common'
import { StaticImageData } from 'next/image'

const EXPERIENCE_ITEMS: {
  title: string
  description: string
  icon: React.ReactNode
  image?: StaticImageData
}[] = [
  {
    title: 'Farm Tours',
    description:
      'Walk through banana and spice groves, learn how crops are grown, and enjoy a guided farm visit that feels close to the land.',
    icon: ICONS.map,
  },
  {
    title: 'Tanga Coffee',
    description:
      'Taste freshly prepared Tanga coffee straight from the Tanga farmers in a calm garden setting.',
    icon: ICONS.coffee,
  },
  {
    title: 'Cultural Walks',
    description:
      'Connect with village life, local stories, and nearby heritage on a peaceful guided cultural walk.',
    icon: ICONS.shoes,
  },
  {
    title: 'Fresh Air',
    description:
      'Take a break from the city and enjoy a quiet family-friendly escape surrounded by greenery and fresh country air.',
    icon: ICONS.sun,
  },
]

export default EXPERIENCE_ITEMS
