'use client'

import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined'
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useTranslations } from 'next-intl'

import { createReservation, type CreateReservationPayload } from '@/utilities/api/tours'
import { notistackRef } from '../Notistack'
import { ADDRESS, EMAILS, ICONS, PHONE_NUMBER, WHATSAPP_LINK } from '@/utilities/constants/common'

type BookingModalContextValue = {
  open: boolean
  openModal: (opts?: { date?: string; slotId?: string }) => void
  closeModal: () => void
}

const BookingModalContext = createContext<BookingModalContextValue | null>(null)

export const useBookingModal = () => {
  const ctx = useContext(BookingModalContext)
  if (!ctx) throw new Error('useBookingModal must be used within BookingModalProvider')
  return ctx
}

const todayIsoDate = () => new Date().toISOString().slice(0, 10)

export const BookingModalProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [open, setOpen] = useState(false)
  const [preferredDate, setPreferredDate] = useState<string | null>(null)
  const [preferredSlotId, setPreferredSlotId] = useState<string | null>(null)

  const openModal = useCallback((opts?: { date?: string; slotId?: string }) => {
    setPreferredDate(opts?.date ?? null)
    setPreferredSlotId(opts?.slotId ?? null)
    setOpen(true)
  }, [])

  const closeModal = useCallback(() => setOpen(false), [])

  const value = useMemo(
    () => ({
      open,
      openModal,
      closeModal,
    }),
    [open, openModal, closeModal],
  )

  return (
    <BookingModalContext.Provider value={value}>
      {children}
      <BookingModalUI
        open={open}
        onClose={closeModal}
        preferredDate={preferredDate ?? undefined}
        preferredSlotId={preferredSlotId ?? undefined}
      />
    </BookingModalContext.Provider>
  )
}

type BookingModalUIProps = {
  open: boolean
  onClose: () => void
  preferredDate?: string
  preferredSlotId?: string
}

type TimeBand = 'morning' | 'afternoon' | 'fullday'

const BookingModalUI: React.FC<BookingModalUIProps> = ({
  open,
  onClose,
  preferredDate,
  preferredSlotId,
}) => {
  const t = useTranslations('bookingModal')
  const [date, setDate] = useState<string>(preferredDate ?? todayIsoDate())
  const [timeBand, setTimeBand] = useState<TimeBand>('morning')
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    adults: 1,
    children: 0,
    notes: '',
  })

  useEffect(() => {
    if (!open) return

    setDate(preferredDate ?? todayIsoDate())
    setTimeBand(inferTimeBandFromSlot(preferredSlotId))
    setSubmitError(null)
    setSubmitSuccess(null)
  }, [open, preferredDate, preferredSlotId])

  const handleField = useCallback((key: keyof typeof form, value: string | number) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }, [])

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      setSubmitError(null)
      setSubmitSuccess(null)

      if (!form.name || !form.email) {
        setSubmitError(t('messages.validation.nameEmailRequired'))
        return
      }

      const payload: CreateReservationPayload = {
        date,
        timePreference: timeBand,
        durationMinutes: timeBand === 'fullday' ? 360 : 180,
        adults: form.adults,
        children: form.children,
        name: form.name,
        email: form.email,
        phone: form.phone || undefined,
        notes: form.notes || undefined,
      }

      try {
        setSubmitting(true)
        const res = await createReservation(payload)
        if (res) {
          notistackRef.current?.enqueueSnackbar(t('messages.snackbar.success'), {
            variant: 'success',
          })
        }
        setSubmitSuccess(t('messages.success', { code: res.confirmationCode }))
        setSubmitError(null)
      } catch (err) {
        setSubmitError((err as Error).message)
        notistackRef.current?.enqueueSnackbar(
          t('messages.snackbar.error'),
          {
            variant: 'error',
          },
        )
      } finally {
        setSubmitting(false)
        onClose()
      }
    },
    [date, form, timeBand, onClose, t],
  )

  const timeBandChips = useMemo<Array<{ value: TimeBand; label: string }>>(
    () => [
      { value: 'morning', label: t('timeBands.morning') },
      { value: 'afternoon', label: t('timeBands.afternoon') },
      { value: 'fullday', label: t('timeBands.fullday') },
    ],
    [t],
  )

  const timeBandLabel = useCallback(
    (band: TimeBand) =>
      band === 'morning'
        ? t('timeBands.morning')
        : band === 'afternoon'
          ? t('timeBands.afternoon')
          : t('timeBands.fullday'),
    [t],
  )

  const formatGuestsText = useCallback(
    (adults: number, children: number): string => {
      const adultsLabel = t('guests.adults', { count: adults })

      if (children <= 0) return adultsLabel

      const childrenLabel = t('guests.children', { count: children })
      return `${adultsLabel}, ${childrenLabel}`
    },
    [t],
  )

  return (
    <Dialog fullWidth maxWidth="md" open={open} onClose={onClose}>
      <DialogTitle
        sx={{
          pb: 1,
          borderBottom: '1px solid #e4e8e4',
        }}
      >
        <Stack>
          <Typography variant="h6" color="grey.800" fontWeight={600}>
            {t('title')}
          </Typography>
          <Typography variant="body2" sx={{ color: '#5b6671' }}>
            {t('subtitle')}
          </Typography>
        </Stack>
      </DialogTitle>

      <DialogContent sx={{ p: { xs: 2.5, md: 3.5 } }}>
        <Box component="form" id="booking-request-form" onSubmit={handleSubmit}>
          <Stack
            spacing={{ xs: 2.5, md: 4 }}
            direction={{ xs: 'column', md: 'row' }}
            alignItems="stretch"
            mt={2}
          >
            <Stack spacing={2.25}>
              <Typography sx={sectionLabelStyle}>{t('sections.tourDetails')}</Typography>

              <Box>
                <TextField
                  type="date"
                  size="small"
                  label={t('fields.date')}
                  fullWidth
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  inputProps={{ min: todayIsoDate() }}
                  sx={formFieldStyle}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarTodayOutlinedIcon sx={startIconStyle} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              <Box>
                <Typography variant="body2" color="grey.600" fontWeight={600}>
                  {t('fields.preferredTime')}
                </Typography>
                <Stack direction="row" spacing={1.25} flexWrap="wrap" useFlexGap>
                  {timeBandChips.map((band) => (
                    <Button
                      key={band.value}
                      variant={timeBand === band.value ? 'contained' : 'outlined'}
                      onClick={() => setTimeBand(band.value)}
                      sx={{
                        borderRadius: '10px',
                        px: 2.4,
                        py: 0.8,
                        minWidth: 106,
                        fontWeight: 600,
                        bgcolor: timeBand === band.value ? 'primary.main' : '#ffffff',
                        borderColor: '#d8ddd8',
                        color: timeBand === band.value ? '#ffffff' : '#5a6571',
                        '&:hover': {
                          bgcolor: timeBand === band.value ? 'primary.dark' : '#f2f5f2',
                          borderColor: '#c8cec8',
                        },
                      }}
                    >
                      {band.label}
                    </Button>
                  ))}
                </Stack>
              </Box>

              <Typography sx={sectionLabelStyle}>{t('sections.yourDetails')}</Typography>

              <Box>
                <TextField
                  value={form.name}
                  onChange={(e) => handleField('name', e.target.value)}
                  required
                  fullWidth
                  label={t('fields.fullName')}
                  placeholder={t('placeholders.fullName')}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonOutlineIcon sx={startIconStyle} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              <Grid container spacing={1.5}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    type="email"
                    value={form.email}
                    onChange={(e) => handleField('email', e.target.value)}
                    required
                    label={t('fields.email')}
                    fullWidth
                    placeholder={t('placeholders.email')}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailOutlinedIcon sx={startIconStyle} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    value={form.phone}
                    onChange={(e) => handleField('phone', e.target.value)}
                    fullWidth
                    placeholder={t('placeholders.phone')}
                    label={t('fields.phone')}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PhoneOutlinedIcon sx={startIconStyle} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>

              <Box>
                <Stack spacing={1.5}>
                  <GuestStepper
                    label={t('fields.adults')}
                    value={form.adults}
                    min={1}
                    onDecrement={() => handleField('adults', Math.max(1, form.adults - 1))}
                    onIncrement={() => handleField('adults', form.adults + 1)}
                  />
                  <GuestStepper
                    label={t('fields.children')}
                    value={form.children}
                    min={0}
                    onDecrement={() => handleField('children', Math.max(0, form.children - 1))}
                    onIncrement={() => handleField('children', form.children + 1)}
                  />
                </Stack>
              </Box>

              <Box>
                <Typography variant="body2" color="grey.600" fontWeight={600}>
                  {t('fields.notes')}
                </Typography>
                <TextField
                  value={form.notes}
                  onChange={(e) => handleField('notes', e.target.value)}
                  fullWidth
                  multiline
                  minRows={3}
                  placeholder={t('placeholders.notes')}
                />
              </Box>

              <Typography variant="body2" sx={{ color: 'warning.main' }} fontWeight={600}>
                {t('notice')}
              </Typography>

              {submitError ? (
                <Alert
                  severity="error"
                  variant="outlined"
                  sx={{ borderColor: '#ef9a9a', color: 'error.main', bgcolor: '#fef2f2' }}
                >
                  {submitError}
                </Alert>
              ) : null}
              {submitSuccess ? (
                <Alert
                  severity="success"
                  variant="outlined"
                  sx={{ borderColor: '#bbf7d0', color: '#14532d', bgcolor: '#f0fdf4' }}
                >
                  {submitSuccess}
                </Alert>
              ) : null}
            </Stack>
            <Stack spacing={2.25} flexShrink={0} sx={{ minWidth: 280, maxWidth: 360 }}>
              <Box
                sx={{
                  bgcolor: 'secondary.main',
                  // borderRadius: 3,
                  p: { xs: 2.5, md: 3 },
                  height: '100%',
                }}
              >
                <Stack>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#1f2933', mb: 1.25 }}>
                    {t('summary.title')}
                  </Typography>

                  <Typography variant="body2" sx={{ color: '#5e6874', mb: 2.25, lineHeight: 1.65 }}>
                    {t('summary.description')}
                  </Typography>

                  <Stack spacing={1.4} sx={{ mb: 2.6 }}>
                    <SummaryRow label={t('summary.selectedTime')} value={timeBandLabel(timeBand)} />
                    <SummaryRow
                      label={t('summary.estimatedDuration')}
                      value={
                        timeBand === 'fullday'
                          ? t('summary.duration.fullday')
                          : t('summary.duration.partial')
                      }
                    />
                    <SummaryRow label={t('summary.idealForLabel')} value={t('summary.idealForValue')} />
                    <SummaryRow
                      label={t('summary.guests')}
                      value={formatGuestsText(form.adults, form.children)}
                    />
                  </Stack>

                  <Typography variant="body2" sx={{ color: '#5e6874', lineHeight: 1.7 }}>
                    {t('summary.footer')}
                  </Typography>
                </Stack>
              </Box>
              <Box
                sx={{
                  bgcolor: 'secondary.main',
                  // borderRadius: 3,
                  p: { xs: 2.5, md: 3 },
                  height: '100%',
                }}
              >
                <Stack spacing={1.25} sx={{ mb: 2.25 }}>
                  <Button
                    component="a"
                    href={PHONE_NUMBER.contact.href}
                    variant="outlined"
                    startIcon={<PhoneOutlinedIcon />}
                    sx={{
                      justifyContent: 'flex-start',
                      borderColor: '#d1d7d1',
                      color: '#4e5965',
                      textTransform: 'none',
                      borderRadius: 1.6,
                      '&:hover': {
                        borderColor: '#bbc4bb',
                        bgcolor: '#f2f5f2',
                      },
                    }}
                  >
                    {t('contact.call', { phone: PHONE_NUMBER.contact.formatted })}
                  </Button>
                  <Button
                    component="a"
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="contained"
                    startIcon={ICONS.whatsapp}
                    sx={{
                      justifyContent: 'flex-start',
                      bgcolor: '#27a148',
                      color: '#fff',
                      textTransform: 'none',
                      borderRadius: 1.6,
                      '&:hover': {
                        bgcolor: '#21873c',
                      },
                    }}
                  >
                    {t('contact.whatsapp')}
                  </Button>
                </Stack>

                <Stack spacing={1.2}>
                  <ContactDetailRow
                    icon={ICONS.email_outlined}
                    label={t('contact.labels.email')}
                    value={EMAILS.mail}
                    href={`mailto:${EMAILS.mail}`}
                  />
                  <ContactDetailRow
                    icon={ICONS.access_time}
                    label={t('contact.labels.availability')}
                    value={t('contact.availability')}
                  />
                  <ContactDetailRow
                    icon={ICONS.map_pin}
                    label={t('contact.labels.location')}
                    value={ADDRESS}
                  />
                </Stack>
              </Box>
            </Stack>
          </Stack>
        </Box>
      </DialogContent>

      <DialogActions
        sx={{
          px: { xs: 2.5, md: 3.5 },
          pb: { xs: 2.5, md: 3 },
          pt: 0.5,
          gap: 1.25,
          justifyContent: 'flex-end',
        }}
      >
        <Button onClick={onClose} variant="outlined" sx={secondaryButtonStyle}>
          {t('actions.cancel')}
        </Button>
        <Button
          type="submit"
          form="booking-request-form"
          variant="contained"
          sx={primaryButtonStyle}
          disabled={submitting}
          startIcon={submitting ? <CircularProgress size={18} color="inherit" /> : null}
        >
          {submitting ? t('actions.submitting') : t('actions.submit')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

const formFieldStyle = {
  '& .MuiOutlinedInput-root': {
    // borderRadius: 1.5,
    bgcolor: '#ffffff',
    '& fieldset': { borderColor: '#d8ddd8' },
    '&:hover fieldset': { borderColor: '#bcc5bc' },
    '&.Mui-focused fieldset': { borderColor: '#27a148' },
  },
  '& .MuiInputBase-input': {
    py: 1.55,
  },
  '& .MuiInputBase-inputMultiline': {
    py: 0,
  },
}

const sectionLabelStyle = {
  textTransform: 'uppercase',
  fontSize: 13,
  letterSpacing: 1,
  fontWeight: 700,
  color: '#6a7280',
}

// const fieldLabelStyle = {
//   fontSize: 16,
//   fontWeight: 600,
//   color: 'grey.600',
//   mb: 0.75,
// }

const startIconStyle = {
  color: '#7a8492',
  fontSize: 20,
}

const primaryButtonStyle = {
  bgcolor: '#27a148',
  color: '#fff',
  fontWeight: 700,
  textTransform: 'none',
  px: 2.75,
  borderRadius: 1.6,
  '&:hover': { bgcolor: '#21873c' },
}

const secondaryButtonStyle = {
  borderColor: '#d1d7d1',
  color: '#4e5965',
  textTransform: 'none',
  px: 2.75,
  borderRadius: 1.6,
  '&:hover': {
    borderColor: '#bbc4bb',
    bgcolor: '#f2f5f2',
  },
}

type SummaryRowProps = { label: string; value: string }

const SummaryRow: React.FC<SummaryRowProps> = ({ label, value }) => (
  <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1.5}>
    <Typography variant="body2" sx={{ color: '#5f6975' }}>
      {label}
    </Typography>
    <Typography variant="body2" sx={{ color: '#1f2933', fontWeight: 700, textAlign: 'right' }}>
      {value}
    </Typography>
  </Stack>
)

type ContactDetailRowProps = {
  icon: React.ReactNode
  label: string
  value: string
  href?: string
}

const ContactDetailRow: React.FC<ContactDetailRowProps> = ({ icon, label, value, href }) => (
  <Stack direction="row" spacing={1.25} alignItems="flex-start">
    <Box
      sx={{
        color: '#5f6975',
        display: 'flex',
        alignItems: 'center',
        pt: 0.15,
      }}
    >
      {icon}
    </Box>
    <Stack spacing={0.2}>
      <Typography variant="caption" sx={{ color: '#6f7a86', textTransform: 'uppercase' }}>
        {label}
      </Typography>
      {href ? (
        <Typography
          component="a"
          href={href}
          variant="body2"
          sx={{ color: '#1f2933', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
        >
          {value}
        </Typography>
      ) : (
        <Typography variant="body2" sx={{ color: '#1f2933' }}>
          {value}
        </Typography>
      )}
    </Stack>
  </Stack>
)

type GuestStepperProps = {
  label: string
  value: number
  min: number
  onDecrement: () => void
  onIncrement: () => void
}

const GuestStepper: React.FC<GuestStepperProps> = ({
  label,
  value,
  min,
  onDecrement,
  onIncrement,
}) => (
  <Box>
    <Typography
      sx={{
        textTransform: 'uppercase',
        fontSize: 13,
        letterSpacing: 1.6,
        fontWeight: 600,
        color: '#73808c',
        mb: 0.7,
      }}
    >
      {label}
    </Typography>
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 999,
        bgcolor: '#e9eef0',
        px: 1,
        minHeight: 40,
      }}
    >
      <IconButton
        size="small"
        onClick={onDecrement}
        disabled={value <= min}
        sx={{
          width: 28,
          height: 28,
          color: '#7a8692',
          fontSize: 24,
          '&.Mui-disabled': { color: '#b5bdc5' },
        }}
      >
        −
      </IconButton>
      <Typography sx={{ fontWeight: 700, color: '#4f5d69' }}>{value}</Typography>
      <IconButton
        size="small"
        onClick={onIncrement}
        sx={{
          width: 28,
          height: 28,
          color: '#7a8692',
          fontSize: 24,
        }}
      >
        +
      </IconButton>
    </Box>
  </Box>
)

const inferTimeBandFromSlot = (slotId?: string): TimeBand => {
  const normalized = slotId?.toLowerCase() ?? ''

  if (normalized.includes('after')) return 'afternoon'
  if (normalized.includes('full')) return 'fullday'

  return 'morning'
}
