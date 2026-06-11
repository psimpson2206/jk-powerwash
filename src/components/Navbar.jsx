import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Logo from './Logo.jsx'

const PHONE_DISPLAY = '(717)-716-4003'
const PHONE_HREF = 'tel:+17177164003'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  // { to: '/portfolio', label: 'Portfolio' },
  { to: '/book', label: 'Book' },
  { to: '/contact', label: 'Contact' },
]

function FacebookIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

function LinkedInIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

const navItemClass = ({ isActive }) =>
  `flex h-full items-center justify-center px-2 py-3.5 text-center text-xs font-bold uppercase tracking-wider transition-colors sm:text-sm lg:text-base ${
    isActive ? 'text-brand' : 'text-slate-800 hover:text-brand'
  }`

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={`sticky top-0 z-50 w-full max-w-[100vw] overflow-x-hidden bg-white transition-shadow duration-300 ${
        scrolled ? 'shadow-md shadow-slate-200/80' : ''
      }`}
    >
      <div className="border-b border-slate-200/80 bg-white">
        <div className="flex w-full items-center justify-between gap-4 overflow-visible px-4 py-4 sm:gap-6 sm:px-6 sm:py-5 lg:px-10 lg:py-6 xl:px-14">
          <Link
            to="/"
            className="min-w-0 flex-shrink-0 overflow-visible bg-white leading-none"
            onClick={() => setOpen(false)}
          >
            <Logo size="header" blend />
          </Link>

          <div className="ml-auto flex flex-shrink-0 items-center gap-3 sm:gap-5 md:gap-6 lg:gap-8">
            <div className="hidden items-center gap-2.5 md:flex lg:gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-white transition hover:bg-navy lg:h-11 lg:w-11"
              >
                <FacebookIcon className="h-5 w-5 lg:h-6 lg:w-6" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded bg-brand text-white transition hover:bg-navy lg:h-11 lg:w-11"
              >
                <LinkedInIcon className="h-5 w-5 lg:h-6 lg:w-6" />
              </a>
            </div>

            <a
              href={PHONE_HREF}
              className="hidden whitespace-nowrap text-base font-bold text-slate-900 md:block lg:text-lg xl:text-xl"
            >
              Call Us: {PHONE_DISPLAY}
            </a>

            <Link
              to="/book"
              className="inline-flex shrink-0 items-center justify-center bg-brand px-4 py-3 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-navy sm:px-6 sm:py-3.5 sm:text-sm md:px-8 md:py-4 md:text-base"
            >
              <span className="sm:hidden">Free Estimate</span>
              <span className="hidden sm:inline">Get a Free Estimate</span>
            </Link>

            <button
              type="button"
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded border border-slate-300 bg-white text-slate-800 lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((v) => !v)}
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden
              >
                {open ? (
                  <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      <nav
        className="hidden w-full border-b border-slate-200 bg-white lg:block"
        aria-label="Main"
      >
        <ul className="grid w-full grid-cols-5 px-4 sm:px-6 lg:px-10 xl:px-14">
          {navLinks.map(({ to, label }) => (
            <li key={to} className="min-w-0">
              <NavLink to={to} end={to === '/'} className={navItemClass}>
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-b border-slate-200 bg-white lg:hidden"
          >
            <div className="border-b border-slate-100 px-4 py-3">
              <a href={PHONE_HREF} className="text-sm font-bold text-slate-900">
                Call Us: {PHONE_DISPLAY}
              </a>
              <div className="mt-3 flex gap-2">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-white"
                >
                  <FacebookIcon className="h-4 w-4" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="flex h-8 w-8 items-center justify-center rounded bg-brand text-white"
                >
                  <LinkedInIcon className="h-4 w-4" />
                </a>
              </div>
            </div>
            <motion.ul
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.04 } },
              }}
              className="flex flex-col px-2 py-2"
            >
              {navLinks.map(({ to, label }) => (
                <motion.li
                  key={to}
                  variants={{
                    hidden: { opacity: 0, x: -8 },
                    show: { opacity: 1, x: 0 },
                  }}
                >
                  <NavLink
                    to={to}
                    end={to === '/'}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `block px-4 py-3 text-sm font-bold uppercase tracking-wide ${
                        isActive ? 'text-brand' : 'text-slate-800'
                      }`
                    }
                  >
                    {label}
                  </NavLink>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
