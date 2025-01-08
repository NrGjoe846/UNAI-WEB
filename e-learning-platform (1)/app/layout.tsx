import { Orbitron, Roboto } from 'next/font/google'
import './globals.css'
import { Sidebar } from '@/components/Sidebar'

const orbitron = Orbitron({ subsets: ['latin'], variable: '--font-orbitron' })
const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-roboto' })

export const metadata = {
  title: 'TechQuest Academy',
  description: 'Master emerging tech concepts through micro-learning',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${orbitron.variable} ${roboto.variable} font-sans bg-gray-900 text-white`}>
        <div className="flex">
          <Sidebar />
          <main className="flex-grow p-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}

