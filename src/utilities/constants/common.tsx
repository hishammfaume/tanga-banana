import AccessTimeFilled from '@mui/icons-material/AccessTimeFilled'
import ArrowBack from '@mui/icons-material/ArrowBack'
import ArrowForward from '@mui/icons-material/ArrowForward'
import CalendarTodayRounded from '@mui/icons-material/CalendarTodayRounded'
import Call from '@mui/icons-material/Call'
import CheckCircleOutline from '@mui/icons-material/CheckCircleOutline'
import ChevronRight from '@mui/icons-material/ChevronRight'
import Circle from '@mui/icons-material/Circle'
import Close from '@mui/icons-material/Close'
import EmailOutlined from '@mui/icons-material/EmailOutlined'
import Facebook from '@mui/icons-material/Facebook'
import Instagram from '@mui/icons-material/Instagram'
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown'
import LinkedIn from '@mui/icons-material/LinkedIn'
import LocationOnRounded from '@mui/icons-material/LocationOnRounded'
import Minimize from '@mui/icons-material/MinimizeOutlined'
import Person from '@mui/icons-material/PersonOutlined'
import Search from '@mui/icons-material/Search'
import Settings from '@mui/icons-material/Settings'
import X from '@mui/icons-material/X'
import GavelIcon from '@mui/icons-material/Gavel'
import FactoryIcon from '@mui/icons-material/Factory'
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff'
import GroupsIcon from '@mui/icons-material/Groups'
import SecurityIcon from '@mui/icons-material/Security'
import StarBorderPurple500Icon from '@mui/icons-material/StarBorderPurple500'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import {
  CheckIcon,
  CoffeeIcon,
  GoogleIcon,
  MapIcon,
  PlantIcon,
  ShoesIcon,
  SunIcon,
  WhatsappIcon,
} from '@/ui/components/icons'

const SITE_TITLE = 'Tanga Banana Garden' as const
const SITE_TITLE_UPPERCASE = SITE_TITLE.toUpperCase()

const EMAILS = {
  mail: 'mfaumehisham@gmail.com',
}

const INSTAGRAM_LINK = 'https://www.instagram.com/thebg_farm/reels/?__d=1%3Futm_source%3Dig_embed'
const GOOGLE_MAPS_LINK = 'https://maps.app.goo.gl/VhBWDs2HJHPjsbVk8'
const ADDRESS = 'Ungwana, Mtakuja Mkembe, Tanga, Tanzania'
export const CURRENT_YEAR =
  typeof window === 'undefined' ? new Date().getFullYear() : new Date().getFullYear()

const PHONE_NUMBER = {
  contact: {
    formatted: '+1234567890',
    href: 'tel:+1234567890',
  },
  whatsapp: {
    formatted: '+0987654321',
    href: '+0987654321',
  },
}

const CONTACT_PHONE_DIGITS = PHONE_NUMBER.contact.formatted.replace(/\D/g, '')
const WHATSAPP_LINK = `https://wa.me/${CONTACT_PHONE_DIGITS}?text=${encodeURIComponent(
  'Hello Tanga Banana Garden, I would like to plan a farm visit.',
)}`

const ICONS = {
  call: <Call />,
  search: <Search />,
  map_pin: <LocationOnRounded />,
  email_outlined: <EmailOutlined />,
  arrow_forward: <ArrowForward />,
  arrow_back: <ArrowBack />,
  chevron_right: <ChevronRight />,
  chevron_down: <KeyboardArrowDown />,
  access_time: <AccessTimeFilled />,
  dot: <Circle />,
  check_circle_outline: <CheckCircleOutline />,
  settings: <Settings />,
  close: <Close />,
  minimize: <Minimize />,
  calendar: <CalendarTodayRounded />,
  person: <Person />,
  group: <GroupsIcon />,
  plane: <FlightTakeoffIcon />,
  factory: <FactoryIcon />,
  gavel: <GavelIcon />,
  shield: <SecurityIcon />,
  star: <StarBorderPurple500Icon />,
  trending: <TrendingUpIcon />,
  sun: <SunIcon />,
  coffee: <CoffeeIcon />,
  map: <MapIcon />,
  shoes: <ShoesIcon />,
  check: <CheckIcon />,
  plant: <PlantIcon />,

  // socials
  instagram: <Instagram />,
  facebook: <Facebook />,
  x: <X />,
  linkedin: <LinkedIn />,
  google: <GoogleIcon />,
  whatsapp: <WhatsappIcon />,
}

const SOCIALS = {
  instagram: {
    icon: ICONS.instagram,
    link: INSTAGRAM_LINK,
    title: 'Instagram',
  },
  google: {
    icon: ICONS.google,
    link: GOOGLE_MAPS_LINK,
    title: 'Google',
  },
  whatsapp: {
    icon: ICONS.whatsapp,
    link: WHATSAPP_LINK,
    title: 'WhatsApp',
  },
}

export const SEO_KEYWORDS = [
  'Tanga Banana Garden',
  'Tanga farm tours',
  'banana farm Tanzania',
  'Tanga coffee tasting',
  'spice farm Tanzania',
  'family day trip Tanga',
  'eco tourism Tanga',
  'organic farm visit Tanzania',
  'banana plantation tour',
  'coffee farm experience',
  'spice tour Tanzania',
  'agritourism Tanga',
  'nature getaway Tanga',
  'weekend escape Tanga',
  'farm walk Tanzania',
  'fresh air Tanga',
  'farm to table Tanzania',
  'guided farm tour',
  'kids friendly farm tour',
  'sustainable farming Tanga',
  'banana coffee spice farm',
]

export {
  SITE_TITLE,
  SITE_TITLE_UPPERCASE,
  ICONS,
  SOCIALS,
  PHONE_NUMBER,
  EMAILS,
  ADDRESS,
  INSTAGRAM_LINK,
  WHATSAPP_LINK,
}
