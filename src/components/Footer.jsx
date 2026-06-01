import { Link } from 'react-router-dom'
import Logo from './Logo.jsx'

const quickLinks = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/book', label: 'Book' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-3 lg:px-12">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Logo size="sm" />
            <span className="font-display text-sm font-semibold leading-snug">
              Lancaster & Pittsburgh Powerwashing
            </span>
          </div>
          <p className="max-w-sm text-sm text-white/80">
            Professional power washing serving Lancaster & Pittsburgh
          </p>
        </div>

        <div>
          <h3 className="mb-4 font-display text-sm font-semibold uppercase tracking-wide text-white/70">
            Quick links
          </h3>
          <ul className="space-y-2 text-sm">
            {quickLinks.map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="text-white/85 transition-colors hover:text-white"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-display text-sm font-semibold uppercase tracking-wide text-white/70">
            Contact
          </h3>
          <ul className="space-y-3 text-sm text-white/85">
            <li>
              <a href="tel:+15558675309" className="hover:text-white">
                555-867-5309
              </a>
            </li>
            <li>
              <a
                href="mailto:jackson@lppowerwash.com"
                className="hover:text-white"
              >
                jackson@lppowerwash.com
              </a>
            </li>
            <li className="pt-1 leading-relaxed">
              <span className="font-medium text-white">Service area</span>
              <br />
              Allegheny County & Lancaster County, PA
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-6 text-center text-xs text-white/60">
        © 2025 Lancaster & Pittsburgh Powerwashing. All rights reserved.
      </div>
    </footer>
  )
}
