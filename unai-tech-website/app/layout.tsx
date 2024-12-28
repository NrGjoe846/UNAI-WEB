'use client'

import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { ThemeProvider } from 'next-themes'
import AuthProvider from '@/components/auth-provider'
import NotificationsProvider from '@/components/notifications-provider'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import Sidebar from '@/components/sidebar'
import { OfflineBanner } from '@/components/offline-banner'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} flex flex-col min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-black text-gray-900 dark:text-white`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            <NotificationsProvider>
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <OfflineBanner />
                <div className="flex flex-1 pt-16">
                  <Sidebar />
                  <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 lg:p-10">
                    {children}
                  </main>
                </div>
                <Footer />
              </div>
            </NotificationsProvider>
          </AuthProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}

