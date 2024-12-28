'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export function Analytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const url = pathname + searchParams.toString()
    // This is where you would typically send the data to your analytics service
    console.log(`Page view: ${url}`)
  }, [pathname, searchParams])

  return null
}

