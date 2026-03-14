'use client'

import { useForm } from 'react-hook-form'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useSnackbar } from 'notistack'
import { useTranslations } from 'next-intl'
import { getLocalizedAppPath } from '@/utilities/localizedRoutes'

type ContactFormValues = {
  firstName: string
  lastName: string
  email: string
  phone?: string
  subject: string
  message: string
}

const ContactFormSection = ({ locale }: { locale: string }) => {
  const t = useTranslations('contact.form')
  const { register, handleSubmit, reset, formState } = useForm<ContactFormValues>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    },
  })
  const { enqueueSnackbar } = useSnackbar()

  const isSubmitting = formState.isSubmitting

  const onSubmit = async (values: ContactFormValues) => {
    try {
      const res = await fetch(getLocalizedAppPath(locale, '/api/contact'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
      const responseText = await res.text()
      let payload: { error?: string } | null = null

      if (responseText) {
        try {
          payload = JSON.parse(responseText) as { error?: string }
        } catch {
          payload = null
        }
      }

      if (!res.ok) {
        throw new Error(payload?.error || 'Failed to send message')
      }

      enqueueSnackbar(
        locale === 'sw'
          ? 'Ujumbe umetumwa. Angalia barua pepe yako kwa uthibitisho.'
          : 'Message sent successfully. Check your email for confirmation.',
        {
          variant: 'success',
        },
      )
      reset()
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Something went wrong'
      enqueueSnackbar(message, { variant: 'error' })
    }
  }

  return (
    <Paper
      component="section"
      elevation={0}
      sx={{
        width: '100%',
        p: { xs: 3, md: 4 },
        borderRadius: 1,
        border: '1px solid #e5e7eb',
        bgcolor: 'background.paper',
      }}
    >
      <Stack spacing={1.5} mb={2}>
        <Typography variant="h6" fontWeight={700} color="grey.700">
          {t('heading')}
        </Typography>
        <Typography variant="body2" color="grey.600">
          {t('subheading')}
        </Typography>
      </Stack>

      <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={{ xs: 2, md: 3 }} mb={3}>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
            <TextField
              label={t('firstName')}
              fullWidth
              {...register('firstName', { required: true })}
              required
            />
            <TextField
              label={t('lastName')}
              fullWidth
              {...register('lastName', { required: true })}
              required
            />
          </Stack>
          <TextField
            label={t('email')}
            type="email"
            fullWidth
            {...register('email', { required: true })}
            required
          />
          <TextField label={t('phone')} fullWidth {...register('phone')} />
          <TextField
            label={t('subject')}
            fullWidth
            {...register('subject', { required: true })}
            required
          />
          <TextField
            label={t('message')}
            fullWidth
            multiline
            minRows={4}
            {...register('message', { required: true })}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            disabled={isSubmitting}
            sx={{ textTransform: 'none', py: 1.4 }}
          >
            {isSubmitting ? (locale === 'sw' ? 'Inatuma...' : 'Sending...') : t('submit')}
          </Button>{' '}
        </Stack>
      </Box>
    </Paper>
  )
}

export default ContactFormSection
