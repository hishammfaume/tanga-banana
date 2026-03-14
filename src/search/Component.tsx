'use client'
import { Input } from '@/app/(payload)/admin/components/ui/input'
import { Label } from '@/app/(payload)/admin/components/ui/label'
import React, { useState, useEffect } from 'react'
import { useDebounce } from '@/utilities/useDebounce'
import { useRouter } from 'next/navigation'

const normalizePath = (path: string) => {
  return path.startsWith('/') ? path : `/${path}`
}

export const Search: React.FC<{
  path: string
}> = ({ path }) => {
  const [value, setValue] = useState('')
  const router = useRouter()

  const debouncedValue = useDebounce(value)
  const searchPath = normalizePath(path)

  useEffect(() => {
    router.push(`${searchPath}${debouncedValue ? `?q=${debouncedValue}` : ''}`)
  }, [debouncedValue, router, searchPath])

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
        }}
      >
        <Label htmlFor="search" className="sr-only">
          Search
        </Label>
        <Input
          id="search"
          onChange={(event) => {
            setValue(event.target.value)
          }}
          placeholder="Search"
        />
        <button type="submit" className="sr-only">
          submit
        </button>
      </form>
    </div>
  )
}
