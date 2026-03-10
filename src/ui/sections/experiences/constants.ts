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
    title: 'Farm Tours & Hands-on Learning in Tanga',
    caption:
      'A guided farm tour in Tanga that combines practical learning, calm walking paths, and up-close time with banana, coffee, and spice crops.',
    description:
      'Beyond a simple walk, this experience works like an outdoor classroom. Families and school groups can see how crops are cared for, ask practical farming questions, and understand how a working farm near Tanga city creates both food and meaningful visitor experiences.',
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
    title: 'Tanga Coffee Tasting Experience',
    caption:
      'Enjoy the aroma of fresh Tanga coffee prepared in the garden by local growers who understand the land and the process.',
    description:
      'This is a slower coffee experience built around storytelling and preparation, not just a quick drink. Watch the roasting and brewing, learn how coffee fits into the farm, and enjoy a cup that makes the visit feel rooted in Tanga rather than staged for tourists.',
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
      'Extend your visit beyond the farm to discover village life, local heritage, and nearby landmarks such as Amboni Caves and Tongoni Ruins.',
    description:
      "This guided walk helps visitors connect the farm to the wider Tanga region. It brings together local history, community stories, and the quieter side of travel for guests who want more than a standard checklist of attractions.",
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
      'Step away from city noise and spend time in a calm, oxygen-rich garden setting that rewards slower travel.',
    description:
      'Sometimes the most valuable experience is simply space to breathe. The garden offers shade, quiet corners, and safe open areas that let families rest, children explore, and day-trippers reset before returning to the city.',
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
