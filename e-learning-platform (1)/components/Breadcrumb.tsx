"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaChevronRight } from 'react-icons/fa'

export function Breadcrumb() {
  const pathname = usePathname()
  const pathSegments = pathname.split('/').filter(segment => segment !== '')

  return (
    <nav className="text-sm mb-4" aria-label="Breadcrumb">
      <ol className="list-none p-0 inline-flex">
        <li className="flex items-center">
          <Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors">
            Home
          </Link>
        </li>
        {pathSegments.map((segment, index) => {
          const href = `/${pathSegments.slice(0, index + 1).join('/')}`
          const isLast = index === pathSegments.length - 1
          return (
            <li key={href} className="flex items-center">
              <FaChevronRight className="mx-2 text-gray-400" />
              {isLast ? (
                <span className="text-white" aria-current="page">
                  {segment.charAt(0).toUpperCase() + segment.slice(1)}
                </span>
              ) : (
                <Link href={href} className="text-gray-400 hover:text-white transition-colors">
                  {segment.charAt(0).toUpperCase() + segment.slice(1)}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

