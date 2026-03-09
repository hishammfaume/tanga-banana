import { ICONS } from '@/utilities/constants/common'
import { StaticImageData } from 'next/image'
import Organic from '@/assets/Landing/gardenn.jpeg'
import Community from '@/assets/Landing/culture.png'
import Sanctuary from '@/assets/Landing/garden.jpeg'

const PHILOSOPHY_ITEMS: {
  title: string
  description: string
  icon: React.ReactNode
  image: StaticImageData
}[] = [
  {
    title: '100% Organic',
    description:
      'We strictly adhere to organic farming principles. No harsh chemicals—just natural growth cycles that protect our soil and your health.',
    icon: ICONS.plant,
    image: Organic,
  },
  {
    title: 'Community Focused',
    description:
      'We are committed to supporting local farmers and promoting sustainable agriculture in Tanga.',
    icon: ICONS.coffee,
    image: Community,
  },
  {
    title: "Nature's Sanctuary",
    description:
      'Our groves provide a quick city break where fresh air and tranquility are abundant, perfect for mental relaxation.',
    icon: ICONS.sun,
    image: Sanctuary,
  },
]

export default PHILOSOPHY_ITEMS
