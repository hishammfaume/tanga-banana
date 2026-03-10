import Image from 'next/image'
import Logo from 'src/assets/Logo/Logo.svg'

const LOGO = {
  light: Logo,
}
interface LogoWideProps {
  isScrolled?: boolean
}

const LogoWide = ({ isScrolled }: LogoWideProps) => {
  return (
    <Image
      src={isScrolled ? LOGO.light : LOGO.light}
      alt="Tanga Banana Garden logo"
      priority
      unoptimized
      className="logo-wide"
    />
  )
}

export { LogoWide, LOGO }
