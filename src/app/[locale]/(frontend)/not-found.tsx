import Link from 'next/link'
import React from 'react'
import { getLocale } from 'next-intl/server'

import { Button } from '@/app/(payload)/admin/components/ui/button'
import { getLocaleHomePath } from '@/utilities/localizedRoutes'

export default async function NotFound() {
  const locale = await getLocale()

  return (
    <div className="container py-28">
      <div className="prose max-w-none">
        <h1 style={{ marginBottom: 0 }}>404</h1>
        <p className="mb-4">This page could not be found.</p>
      </div>
      <Button asChild variant="default">
        <Link href={getLocaleHomePath(locale)}>Go home</Link>
      </Button>
    </div>
  )
}
