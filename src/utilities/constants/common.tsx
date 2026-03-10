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
const SITE_ALIASES = ['Tanga Garden', 'Tanga Banana', 'Tanga Banana Garden'] as const

const EMAILS = {
  mail: 'mfaumehisham@gmail.com',
  mailto: 'mailto:mfaumehisham@gmail.com',
}

const INSTAGRAM_LINK = 'https://www.instagram.com/thebg_farm/reels/?__d=1%3Futm_source%3Dig_embed'
const GOOGLE_MAPS_LINK = 'https://maps.app.goo.gl/VhBWDs2HJHPjsbVk8'
const ADDRESS = 'Ungwana, Mtakuja Mkembe, Tanga, Tanzania'
const BUSINESS_COORDINATES = {
  latitude: -5.2207427,
  longitude: 38.9810794,
} as const
const BUSINESS_OPENING_HOURS = {
  days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  opens: '08:00',
  closes: '18:00',
  label: 'Mon-Sun, 8am - 6pm',
} as const
export const CURRENT_YEAR =
  typeof window === 'undefined' ? new Date().getFullYear() : new Date().getFullYear()

const PHONE_NUMBER = {
  contact: {
    formatted: '0702 666773',
    href: 'tel:+255702666773',
  },
  whatsapp: {
    formatted: '0742104020',
    href: 'tel:+255742104020',
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

const CORE_SEO_KEYWORDS = [
  'Tanga Banana Garden',
  'Tanga Banana Garden Tanzania',
  'tanga garden',
  'tanga-garden',
  'Tanga Garden Tanzania',
  'Tanga farm tours',
  'farm tours',
  'farm tour',
  'farm tours in Tanga',
  'farm tours in Tanzania',
  'coastal Tanzania farm tours',
  'banana farm tours',
  'banana farm Tanzania',
  'banana plantation tour',
  'banana grove walk',
  'banana farming in Tanzania',
  'banana farming in Tanga',
  'banana farming in coastal Tanzania',
  'coffee tours',
  'coffee tasting in Tanga',
  'Tanga coffee',
  'Tanga coffee tasting',
  'coffee farm experience',
  'coffee tour Tanzania',
  'coffee farming in Tanzania',
  'spice farm tours',
  'spice farm Tanzania',
  'spice tour Tanzania',
  'cultural tours',
  'cultural farm tours',
  'cultural walks Tanga',
  'agritourism Tanga',
  'agritourism Tanzania',
  'eco farming Tanga',
  'eco farming Tanzania',
  'eco tourism Tanga',
  'organic farm visit Tanzania',
  'sustainable farming Tanga',
  'sustainable agriculture Tanzania',
  'farm experience Tanzania',
  'farm walk Tanzania',
  'farm to table Tanzania',
  'guided farm tour',
  'hands-on learning farm tour',
  'kids friendly farm tour',
  'family day trip Tanga',
  'nature getaway Tanga',
  'weekend escape Tanga',
  'fresh air Tanga',
  'fresh fruits Tanga',
  'farms in Tanga',
  'farming in Tanzania',
  'banana coffee spice farm',
] as const

const LOCAL_DISCOVERY_KEYWORDS = [
  'Tanga',
  'Tanga Tanzania',
  'Tanga tourist attractions',
  'visit Tanga Tanzania',
  'things to do in Tanga',
  'activities in Tanga',
  'top things to do in Tanga',
  'top activities in Tanga',
  'top places to visit in Tanga',
  'travel guide Tanga',
  'day trip Tanga',
  'garden tour Tanga',
  'beautiful gardens in Tanga',
  'city escape Tanga',
  'educational school trip in Tanga',
  'educational school trip in Tanzania',
  'school visit Tanga',
  'school trip Tanga',
  'field trip Tanga',
  'agricultural field trip Tanzania',
  'Amboni Caves',
  'Amboni Caves Tanga',
  'Amboni Caves tour',
  'Tongoni Ruins',
  'Tongoni Ruins Tanga',
  'Tongoni Ruins tour',
  'cultural tour Tanga',
  'nature walk Tanga',
] as const

const SWAHILI_SEO_KEYWORDS = [
  'kilimo',
  'kilimo cha ndizi',
  'kilimo cha ndizi Tanzania',
  'kilimo cha kahawa',
  'kilimo cha kahawa Tanzania',
  'kilimo endelevu Tanga',
  'utalii wa kilimo',
  'utalii wa kilimo Tanzania',
  'ziara ya shamba',
  'ziara ya shamba Tanga',
  'ziara ya kilimo Tanga',
  'ziara ya wanafunzi Tanga',
  'safari ya shamba Tanga',
  'shamba la ndizi Tanga',
  'shamba la kahawa Tanzania',
  'mashamba ya Tanga',
  'kahawa ya Tanga',
  'ndizi Tanzania',
  'tanga raha',
] as const

export const SEO_KEYWORDS = Array.from(
  new Set([
    ...SITE_ALIASES,
    ...CORE_SEO_KEYWORDS,
    ...LOCAL_DISCOVERY_KEYWORDS,
    ...SWAHILI_SEO_KEYWORDS,
  ]),
)

export {
  SITE_TITLE,
  SITE_TITLE_UPPERCASE,
  SITE_ALIASES,
  ICONS,
  SOCIALS,
  PHONE_NUMBER,
  EMAILS,
  ADDRESS,
  BUSINESS_COORDINATES,
  BUSINESS_OPENING_HOURS,
  INSTAGRAM_LINK,
  GOOGLE_MAPS_LINK,
  WHATSAPP_LINK,
}
