import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-orbitron font-bold text-cyan-400">TechQuest Academy</Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link href="/dashboard" className="hover:text-cyan-400 transition-colors">Dashboard</Link></li>
            <li><Link href="/profile" className="hover:text-cyan-400 transition-colors">Profile</Link></li>
            <li><Link href="/logout" className="hover:text-cyan-400 transition-colors">Logout</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

