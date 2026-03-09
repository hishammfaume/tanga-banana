import Stack from '@mui/material/Stack'
import { NAVBAR } from './constants'
import Button from '@mui/material/Button'
import { SxProps } from '@mui/material/styles'
import { responsive } from 'src/utilities/breakpoints'
import { ICONS, PHONE_NUMBER } from '@/utilities/constants/common'
import { useBookingModal } from '@/providers/BookingModal'
// import { ICONS, PHONE_NUMBER } from "src/utilities/constants/common";

const NavbarCallToActionButtons: React.FC<NavbarCallToActionButtonsProps> = ({ mobile }) => {
  const { openModal } = useBookingModal()
  return (
    <Stack
      className={`nav-items ${mobile ? 'mobile' : ''}`}
      direction={{
        xs: 'column',
        [NAVBAR.BREAKPOINT]: 'row',
      }}
      spacing={2}
      alignItems="center"
      sx={sx}
    >
      <Button
        size="medium"
        variant="contained"
        color="primary"
        disableElevation
        // LinkComponent={Link}
        // href={routes.contact}
        onClick={() => openModal()}
        fullWidth
        sx={{ color: 'grey.100', borderRadius: '10px' }}
      >
        Book Farm Tour
      </Button>
      <Button
        size="medium"
        variant="outlined"
        className="call-button"
        elevation="small"
        sx={{ borderRadius: '10px' }}
        fullWidth
        startIcon={ICONS.call}
        href={PHONE_NUMBER.contact.href}
      >
        {PHONE_NUMBER.contact.formatted}
      </Button>
    </Stack>
  )
}

const sx: SxProps = {
  display: 'none',

  '& a': {
    whiteSpace: 'nowrap',
    textAlign: 'center',
    minWidth: 150,
  },

  '&:not(.mobile)': {
    [responsive('down', NAVBAR.BREAKPOINT)]: {
      display: 'none',
    },

    [responsive('up', NAVBAR.BREAKPOINT)]: {
      display: 'flex',
    },
  },

  '&.mobile': {
    [responsive('up', NAVBAR.BREAKPOINT)]: {
      display: 'none',
    },

    [responsive('between', 'md', NAVBAR.BREAKPOINT)]: {
      borderTop: '1px dotted',
      borderColor: 'grey.300',
      paddingTop: 2,
    },

    paddingX: 2,
    paddingBottom: 3,
  },
}

export type NavbarCallToActionButtonsProps = {
  mobile?: boolean
}

export { NavbarCallToActionButtons }
