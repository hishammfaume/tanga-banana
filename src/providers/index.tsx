import React from 'react'

import { ThemeProvider } from './Theme'
import { SettingsProvider } from './Settings'
import { NotistackProvider } from './Notistack'
import { BookingModalProvider } from './BookingModal'
import GlobalStyles from '@/ui/components/GlobalStyles'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <ThemeProvider>
      <NotistackProvider>
        <SettingsProvider>
          <BookingModalProvider>{children}</BookingModalProvider>
        </SettingsProvider>
      </NotistackProvider>
      <GlobalStyles />{' '}
    </ThemeProvider>
  )
}
