import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, Payload } from 'payload'

import { revalidateTag } from 'next/cache'

const getLocaleCodes = (payload: Payload) => {
  const localization = payload.config.localization

  if (!localization) {
    return ['en']
  }

  const localeCodes = localization.localeCodes

  return localeCodes?.length ? localeCodes : ['en']
}

const revalidateBlogTags = ({ payload }: { payload: Payload }) => {
  payload.logger.info('Revalidating blogs')

  for (const locale of getLocaleCodes(payload)) {
    revalidateTag(`blogs_list_${locale}`)
    revalidateTag(`blog_pages_${locale}`)
    revalidateTag(`blog_slugs_${locale}`)
  }
}

export const revalidateBlogsAfterChange: CollectionAfterChangeHook = ({
  doc,
  req: { context, payload },
}) => {
  if (!context.disableRevalidate) {
    revalidateBlogTags({ payload })
  }

  return doc
}

export const revalidateBlogsAfterDelete: CollectionAfterDeleteHook = ({
  doc,
  req: { context, payload },
}) => {
  if (!context.disableRevalidate) {
    revalidateBlogTags({ payload })
  }

  return doc
}
