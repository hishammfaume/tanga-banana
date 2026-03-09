'use client'

import React, { createContext, useCallback, useMemo, useState } from 'react'

const SettingsContext = createContext<SettingsContextType | null>(null)

const SettingsProvider: React.FC<React.PropsWithChildren> = (props) => {
  const [state, setState] = useState<SettingsContextTypeState>({
    isNavbarOpen: false,
    activeChildLink: null,
  })

  const onLinkClick = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      e.stopPropagation()
      setState((state) => ({ ...state, isNavbarOpen: false }))
    },
    [setState],
  )

  const onChildLinkClick = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      e.stopPropagation()
      setState((state) => ({ ...state, isNavbarOpen: false }))
    },
    [setState],
  )

  const closeNavbar = useCallback(() => {
    setState((state) => ({
      ...state,
      isNavbarOpen: false,
      activeChildLink: null,
    }))
  }, [setState])

  const toggleNavbar = useCallback(() => {
    setState((state) => ({ ...state, isNavbarOpen: !state.isNavbarOpen }))
  }, [setState])

  const value = useMemo<SettingsContextType>(
    () => ({
      ...state,
      toggleNavbar,
      closeNavbar,
      onLinkClick,
      onChildLinkClick,
      setActiveChildLink(link) {
        setState((state) => ({
          ...state,
          activeChildLink: link,
          isNavbarOpen: !!link,
        }))
      },

      onToggleChildLink(link, preventDefault = true) {
        return (e) => {
          e.stopPropagation()

          if (preventDefault) {
            e.preventDefault()
          }
          setState((state) => ({
            ...state,
            activeChildLink: state.activeChildLink === link ? null : link,
          }))
        }
      },
      onCloseChildMenu(e) {
        e?.stopPropagation()
        setState((state) => ({
          ...state,
          activeChildLink: null,
        }))
      },
      onClickAway(e) {
        if (state.isNavbarOpen) {
          e.stopPropagation()
          closeNavbar()
        }
      },
    }),
    [closeNavbar, onChildLinkClick, onLinkClick, state, toggleNavbar, setState],
  )

  return (
    <SettingsContext.Provider value={value} {...props}>
      {props.children}
    </SettingsContext.Provider>
  )
}

export type SettingsContextTypeState = {
  isNavbarOpen: boolean
  activeChildLink: string | null
}

export type SettingsContextType = {
  toggleNavbar: () => void
  closeNavbar: () => void

  onLinkClick: (e: React.MouseEvent | React.TouchEvent) => void
  onChildLinkClick: (e: React.MouseEvent | React.TouchEvent) => void
  onCloseChildMenu: (e?: React.MouseEvent | React.TouchEvent) => void
  onToggleChildLink: (
    link: string,
    preventDefault?: boolean,
  ) => (e: React.MouseEvent | React.TouchEvent) => void
  setActiveChildLink: (link: string) => void
  onClickAway: (e: React.MouseEvent | React.TouchEvent) => void
} & SettingsContextTypeState

export { SettingsContext, SettingsProvider }
