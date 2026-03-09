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
      'Walk through lush banana groves and spice . Learn about sustainable farming practices and the journey of our produce from farm to table.',
    icon: ICONS.map,
  },
  {
    title: 'Tanga Coffee',
    description:
      'Taste the rich, authentic aroma of freshly brewed Tanga coffee straight from the tanga farmers.',
    icon: ICONS.coffee,
  },
  {
    title: 'Cultural Walks',
    description:
      'Experience the local culture and connect with the community during a peaceful guided walk.',
    icon: ICONS.shoes,
  },
  {
    title: 'Fresh Air',
    description:
      "Take a break from the city. Enjoy quality time with family surrounded by nature's tranquility.",
    icon: ICONS.sun,
  },
]

export default EXPERIENCE_ITEMS
