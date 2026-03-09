import { StaticImageData } from 'next/image'
import Tour from 'src/assets/Farm/FarmTour.png'
import Coffee from 'src/assets/Landing/coffee.png'
import Walk from 'src/assets/Landing/caves.png'
import Relax from 'src/assets/Landing/culture.png'

const FULL_EXPERIENCE_ITEMS: {
  sectionId: string
  title: string
  caption: string
  description: string
  points: string[]
  chips: string[]
  image: StaticImageData
}[] = [
  {
    sectionId: 'farm-tours',
    title: 'Farm Tours & Hands-on Learning',
    caption:
      'A rich, educational walkthrough the groves that offers practical lessons for students,families, and curious minds of all generations.',
    description:
      'Beyond a simple walk, this tour is an interactive classroom. Schools and students can engage in practical lessons right here in the soil, learning about organic cycles and crop care firsthand. It is a learning experience designed for everyone—especially children— to touch, smell, and understand the real work of farming.',
    points: [
      'Hands-on agricultural lessons for school groups and students',
      'Interactive learning for children and families',
      'See how bananas, coffee, and spices are cultivated',
      'Gain practical knowledge of organic farming methods',
    ],
    chips: ['Educational', 'Interactive', 'Family-friendly'],
    image: Tour,
  },
  {
    sectionId: 'tanga-coffee',
    title: 'Tanga Coffee Experience',
    caption:
      'Enjoy the authentic aroma of organic coffee, brewed right in the garden by the local farmers.',
    description:
      'There is no machine here—just the skill of local farmers roasting and brewing fresh beans in the traditional way. Sit back and watch the process unfold, then enjoy a warm cup that captures the true essence of the land in Tanga. It’s a direct connection from the soil to your cup, served with genuine hospitality.',
    points: [
      'Coffee prepared and brewed by local farmers',
      'Experience the real aroma of organic Tanga coffee',
      'Learn the traditional methods of roasting and brewing',
      'Enjoy a cup of fresh coffee in a peaceful garden setting',
    ],
    chips: ['Authentic', 'Locally brewed', 'Cultural connection'],
    image: Coffee,
  },
  {
    sectionId: 'cultural-walks',
    title: 'Cultural & Nature Walks',
    caption:
      'Extend your journey beyond the farm to discover historical caves, village life, and unique local landmarks.',
    description:
      "This guided walk takes you deeper into the Tanga region's heritage. Visit fascinating nearby sites like the Tongoni Ruins and the Amboni Natural Caves that hold stories of the past. It is an opportunity to explore the hidden gems of the area while connecting with the people who call this place home.",
    points: [
      'Visit local historical sites.',
      'Walk through the village and meet community members',
      "Hear stories about the land's history and culture",
      'A blend of nature, history, and daily life',
    ],
    chips: ['Cultural', 'Historical', 'Community-focused'],
    image: Walk,
  },
  {
    sectionId: 'garden-relaxation',
    title: 'Fresh Air & Garden Relaxation',
    caption:
      'Escape the city congestion and breathe deeply in the cool, oxygen-rich environment of our green groves.',
    description:
      'Sometimes the best activity is simply being present. The farm offers a sanctuary of fresh, clean air and quiet corners where you can unwind. Whether you want to read a book, take a nap, or just let the kids run free in a safe space, the garden provides the perfect natural reset.',
    points: [
      'Breathe pure, fresh country air away from the city',
      'Enjoy a peaceful environment for mental relaxation',
      'Safe, open green spaces for children to play',
      'Perfect for a quick city break to recharge your energy',
    ],
    chips: ['Fresh Air', 'Mental Wellness', 'Relaxation'],
    image: Relax,
  },
]

export default FULL_EXPERIENCE_ITEMS
