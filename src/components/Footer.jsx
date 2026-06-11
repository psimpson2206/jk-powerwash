import { Link } from 'react-router-dom'
import Logo from './Logo.jsx'
import { BUSINESS_EMAIL } from '../lib/businessContact.js'

const PHONE_DISPLAY = '(717)-716-4003'
const PHONE_HREF = 'tel:+17177164003'

const quickLinks = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  // { to: '/portfolio', label: 'Portfolio' },
  { to: '/book', label: 'Book' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-3 lg:px-12">
        <div className="space-y-4">
          <Link to="/" className="inline-block rounded-lg bg-white/95 p-2">
            <Logo size="sm" />
          </Link>
          <p className="max-w-sm text-sm text-white/80">
            Professional power washing for residential and commercial properties.
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
              <a href={PHONE_HREF} className="font-semibold text-brand hover:text-white">
                {PHONE_DISPLAY}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${BUSINESS_EMAIL}`}
                className="hover:text-white"
              >
                {BUSINESS_EMAIL}
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
        © 2025 United Exterior Care LLC. All rights reserved.
      </div>
    </footer>
  )
}
