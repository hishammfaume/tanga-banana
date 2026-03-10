// import { getCachedGlobal } from '@/utilities/getGlobals'
// import Link from 'next/link'
'use client'
import React from 'react'

// import type { Footer } from '@/payload-types'
import PageContainer from '@/ui/components/page-container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { useBookingModal } from '@/providers/BookingModal'
import { FooterSocials } from './socials'
import { FONTS } from '@/Theme/fonts'
import { SITE_TITLE } from '@/utilities/constants/common'
import Grid, { GridProps } from '@mui/material/Grid'
import { LogoWide } from '@/ui/components/navbar/logo'
import { LINKS } from './constants'
// import SectionSpacer from '@/ui/components/section-spacer'

export function Footer() {
  // const footerData: Footer = await getCachedGlobal('footer', 1)()

  // const navItems = footerData?.navItems || []
  const { openModal } = useBookingModal()
  return (
    <Box sx={sx}>
      <Box className="call-to-action">
        <PageContainer ignoreNavHeight transparent>
          <Stack alignItems="center" justifyContent="center" py={8} spacing={3}>
            <Typography variant="h3" color="grey.800">
              Ready to book a farm tour in Tanga?
            </Typography>
            <Stack alignItems={'center'} justifyContent="center" spacing={3}>
              <Typography variant="body2" color="grey.500" mt={2} textAlign="center" maxWidth={500}>
                Plan a family outing, coffee visit, or school trip and spend time at a working
                banana, coffee, and spice farm close to Tanga city.
              </Typography>
              <Button
                size="large"
                variant="contained"
                color="primary"
                disableElevation
                LinkComponent={Link}
                onClick={() => openModal()}
                sx={{ borderRadius: '10px' }}
              >
                Book Your Farm Visit
              </Button>
            </Stack>
          </Stack>
        </PageContainer>
      </Box>
      {/* <SectionSpacer /> */}
      <Box>
        <PageContainer>
          <Grid container spacing={2}>
            <Grid size={gridSize}>
              <Stack
                spacing={{
                  xs: 2,
                }}
              >
                <LogoWide />
                <Typography
                  variant="body2"
                  color="grey.500"
                  sx={{ marginTop: 2 }}
                  fontWeight={FONTS.poppins.fontWeights[400]}
                >
                  Tanga Banana Garden is a working farm in Tanga, Tanzania offering guided farm
                  tours, coffee tasting, cultural walks, and educational visits for families,
                  travelers, and school groups.
                </Typography>
              </Stack>
            </Grid>

            {LINKS.map((group, index) => (
              <Grid key={index} size={gridSize}>
                <Stack spacing={1}>
                  <Typography
                    variant="subtitle1"
                    color="grey.500"
                    fontWeight={FONTS.poppins.fontWeights[600]}
                    paddingLeft={1.75}
                  >
                    {group.title}
                  </Typography>

                  <List className="">
                    {group.links.map((link) => (
                      <ListItem disablePadding key={link.href} disableGutters>
                        <ListItemButton
                          href={link.href}
                          {...(link.external
                            ? {
                                component: 'a',
                                ...(link.newTab
                                  ? {
                                      target: '_blank',
                                      rel: 'noopener noreferrer',
                                    }
                                  : {}),
                              }
                            : {
                                component: Link,
                              })}
                        >
                          {!!link.icon && (
                            <ListItemIcon color="secondary.main">{link.icon}</ListItemIcon>
                          )}
                          <ListItemText
                            primary={link.title}
                            primaryTypographyProps={{
                              variant: 'body2',
                              color: 'grey.500',
                            }}
                          />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </PageContainer>
      </Box>

      <PageContainer ignoreNavHeight transparent>
        <Stack
          direction={{
            xs: 'column',
            md: 'row',
          }}
          py={3}
          alignItems={{
            xs: 'center',
          }}
          spacing={{
            xs: 2,
            md: 0,
          }}
        >
          <Box flex={1}>
            <Typography
              variant="body2"
              color="text.primary"
              fontWeight={FONTS.poppins.fontWeights[600]}
              textAlign={{
                xs: 'center',
                md: 'left',
              }}
            >
              © {new Date().getFullYear()} All rights reserved
            </Typography>
          </Box>
          <Box
            flex={1}
            display={{
              xs: 'none',
              md: 'block',
            }}
          >
            <Typography
              variant="body2"
              color="text.primary"
              fontWeight={FONTS.poppins.fontWeights[400]}
              textAlign="center"
            >
              Copyright © {new Date().getFullYear()} {SITE_TITLE}. All rights reserved.
            </Typography>
          </Box>

          <FooterSocials flex={1} justifyContent="center" />
        </Stack>
      </PageContainer>
    </Box>
  )
}
const gridSize: GridProps['size'] = {
  xs: 12,
  sm: 6,
  md: 12 / 5,
}

const sx = {
  marginTop: 'auto',
  '& .call-to-action': {
    backgroundColor: 'secondary.light',
  },
}
