import Link from 'next/link'
import { Instagram, Linkedin, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-black/30 backdrop-blur-md py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between gap-8">
        <div className="w-full sm:w-auto mb-8 sm:mb-0">
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            {['About Us', 'Careers', 'Privacy Policy', 'Terms of Service'].map((item) => (
              <li key={item}>
                <Link href={`/${item.toLowerCase().replace(/\s+/g, '-')}`} className="text-gray-400 hover:text-yellow-400 transition-colors">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full sm:w-auto mb-8 sm:mb-0">
          <h4 className="font-semibold mb-4">Connect with Us</h4>
          <div className="flex gap-4">
            {[
              { Icon: Instagram, href: 'https://instagram.com' },
              { Icon: Linkedin, href: 'https://linkedin.com' },
              { Icon: Twitter, href: 'https://twitter.com' },
            ].map(({ Icon, href }, index) => (
              <a
                key={index}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
        <div className="w-full sm:w-auto">
          <h4 className="font-semibold mb-4">Contact Us</h4>
          <p className="text-gray-400">support@unaitech.com</p>
          <p className="text-gray-400">+1 (555) 123-4567</p>
        </div>
      </div>
      <div className="mt-8 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} UNAI TECH. All rights reserved.
      </div>
    </footer>
  )
}

