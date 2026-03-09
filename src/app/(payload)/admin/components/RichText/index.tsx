import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import { RichText as PayloadRichText } from '@payloadcms/richtext-lexical/react'
import type React from 'react'

import { cn } from '@/utilities/ui'

type Props = {
  data: DefaultTypedEditorState
  enableGutter?: boolean
  enableProse?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export default function RichText(props: Props) {
  const { className, data, enableGutter = true, enableProse = true } = props

  return (
    <PayloadRichText
      className={cn(
        'payload-richtext',
        {
          container: enableGutter,
          'max-w-none': !enableGutter,
          prose: enableProse,
        },
        className,
      )}
      data={data}
      disableContainer={!enableGutter}
    />
  )
}
