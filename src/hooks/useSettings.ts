'use client'

import { SettingsContext } from '@/providers/Settings'
import { useContext } from 'react'

const useSettings = () => {
  const context = useContext(SettingsContext)

  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider')
  }

  return context
}

export default useSettings
