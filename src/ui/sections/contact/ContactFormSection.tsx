'use client'

import { useForm } from 'react-hook-form'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useSnackbar } from 'notistack'

type ContactFormValues = {
  firstName: string
  lastName: string
  email: string
  phone?: string
  subject: string
  message: string
}

const ContactFormSection = () => {
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
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      const payload = await res.json()

      if (!res.ok) {
        throw new Error(payload?.error || 'Failed to send message')
      }

      enqueueSnackbar('Message sent successfully. Check your email for confirmation.', {
        variant: 'success',
      })
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
          Send us a Message
        </Typography>
        <Typography variant="body2" color="grey.600">
          Fill out the form below and our team will get back to you shortly.
        </Typography>
      </Stack>

      <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={{ xs: 2, md: 3 }} mb={3}>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
            <TextField
              label="First Name"
              fullWidth
              {...register('firstName', { required: true })}
              required
            />
            <TextField
              label="Last Name"
              fullWidth
              {...register('lastName', { required: true })}
              required
            />
          </Stack>
          <TextField
            label="Email Address"
            type="email"
            fullWidth
            {...register('email', { required: true })}
            required
          />
          <TextField label="Phone" fullWidth {...register('phone')} />
          <TextField
            label="Subject"
            fullWidth
            {...register('subject', { required: true })}
            required
          />
          <TextField
            label="Message"
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
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </Button>{' '}
        </Stack>
      </Box>
    </Paper>
  )
}

export default ContactFormSection
