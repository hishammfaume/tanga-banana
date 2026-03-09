'use client'

import GlobalStyles from '@mui/material/GlobalStyles'
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles'
import { SnackbarProvider } from 'notistack'
import { notistackRef } from './ref'
import { theme as appTheme } from '@/Theme'

const muiTheme = createTheme(appTheme)

const NotistackProvider = (props: React.PropsWithChildren) => {
  return (
    <MuiThemeProvider theme={muiTheme}>
      <GlobalStyles
        styles={(theme) => ({
          '& .notistack-MuiContent': {
            borderRadius: theme.shape.borderRadius,
            maxWidth: 420,
            color: theme.palette.grey[50],
          },
          '& .notistack-MuiContent.notistack-MuiContent-success': {
            backgroundColor: theme.palette.success.main,
            boxShadow: theme.customShadows.success,
          },
          '& .notistack-MuiContent.notistack-MuiContent-error': {
            backgroundColor: theme.palette.error.main,
            boxShadow: theme.customShadows.error,
          },
          '& .notistack-MuiContent.notistack-MuiContent-warning': {
            backgroundColor: theme.palette.warning.main,
            boxShadow: theme.customShadows.warning,
          },
          '& .notistack-MuiContent.notistack-MuiContent-info': {
            backgroundColor: theme.palette.info.main,
            boxShadow: theme.customShadows.info,
          },
        })}
      />
      <SnackbarProvider
        ref={notistackRef}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        autoHideDuration={4000}
      >
        {props.children}
      </SnackbarProvider>
    </MuiThemeProvider>
  )
}

export { NotistackProvider }
