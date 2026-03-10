import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

type FaqSectionProps = {
  title: string
  description: string
  items: ReadonlyArray<{
    question: string
    answer: string
  }>
}

const FaqSection = ({ title, description, items }: FaqSectionProps) => {
  return (
    <Stack spacing={3} alignItems="stretch" mb={2}>
      <Stack spacing={1.5} maxWidth={760}>
        <Typography
          variant="body2"
          color="warning.main"
          fontWeight={700}
          textTransform="uppercase"
          letterSpacing={1.6}
        >
          Frequently Asked Questions
        </Typography>
        <Typography variant="h4" color="grey.900" fontWeight={600} lineHeight={1.15}>
          {title}
        </Typography>
        <Typography variant="body2" color="grey.600" lineHeight={1.8}>
          {description}
        </Typography>
      </Stack>

      <Stack spacing={1.5}>
        {items.map((item) => {
          const baseId =
            item.question
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/^-+|-+$/g, '') || 'faq-item'
          const summaryId = `${baseId}-header`
          const detailsId = `${baseId}-content`

          return (
            <Accordion
              key={item.question}
              disableGutters
              sx={{
                borderRadius: '20px',
                overflow: 'hidden',
                border: '1px solid rgba(34, 44, 35, 0.08)',
                boxShadow: 'none',
                '&::before': {
                  display: 'none',
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon color="primary" />}
                id={summaryId}
                aria-controls={detailsId}
              >
                <Typography variant="subtitle1" color="grey.900" fontWeight={600}>
                  {item.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails id={detailsId} aria-labelledby={summaryId}>
                <Typography variant="body2" color="grey.600" lineHeight={1.8}>
                  {item.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          )
        })}
      </Stack>
    </Stack>
  )
}

export default FaqSection
