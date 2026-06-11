import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Logo from '../components/Logo.jsx'

const featureCards = [
  {
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <path d="M12 15l-2 5 2-1 2 1-2-5-2 1-2-1 2 5z" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="8" r="6" />
      </svg>
    ),
    title: 'Quality First',
    text: 'We never cut corners. Every job gets our full attention and best effort.',
  },
  {
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <path d="M12 21s7-4.35 7-10a7 7 0 10-14 0c0 5.65 7 10 7 10z" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="11" r="2.5" />
      </svg>
    ),
    title: 'Locally Rooted',
    text: 'Serving Lancaster County and the Pittsburgh area. We know these communities because we live and work here.',
  },
]

export default function About() {
  return (
    <div className="bg-white">
      <section className="bg-gradient-to-b from-sky-100 via-sky-50/60 to-white px-6 pb-16 pt-12 lg:px-12 lg:pb-20 lg:pt-16">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto flex max-w-4xl flex-col items-center text-center"
        >
          <Logo size="lg" className="mx-auto object-center" />
          <h1 className="mt-10 font-display text-4xl font-bold tracking-tight text-slate-800 md:text-5xl">
            About{' '}
            <span className="text-brand">United Exterior Care</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            A locally owned and operated exterior cleaning company dedicated to
            making Lancaster County and the Pittsburgh area shine — one home at a
            time.
          </p>
        </motion.div>
      </section>

      <section className="px-6 pb-20 lg:px-12 lg:pb-28">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
          >
            <div className="flex items-center gap-2 text-brand">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <span className="text-xs font-bold uppercase tracking-widest">
                Our Story
              </span>
            </div>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-800 md:text-4xl">
              Built on hard work, integrity and remarkable results
            </h2>
            <div className="mt-6 space-y-5 text-base leading-relaxed text-slate-600">
              <p>
                I&apos;m Jackson Kautz, a student at the University of Pittsburgh
                and the owner of United Exterior Care LLC. I started this business
                three years ago with a pressure washer and a lot of drive, and
                I&apos;ve been growing it ever since.
              </p>
              <p>
                What started as a way to earn money on weekends turned into
                something I&apos;m genuinely proud of. I take care of every job
                personally, which means you&apos;re always getting the owner
                on-site — not a crew you&apos;ve never met. I care about doing
                the work right, showing up on time, and leaving your property
                looking better than I found it.
              </p>
              <p>
                Whether you&apos;re a homeowner looking to clean up your driveway
                or a property manager with a bigger job, I&apos;ll give you a
                straight quote and get it done.
              </p>
            </div>
          </motion.div>

          <div className="flex flex-col gap-6 sm:flex-row lg:flex-col">
            {featureCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="flex-1 rounded-2xl border border-slate-200/80 bg-white p-8 shadow-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10 text-brand">
                  {card.icon}
                </div>
                <h3 className="mt-5 font-display text-xl font-bold text-slate-800">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {card.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-6xl text-center">
          <p className="font-display text-xl font-semibold text-slate-800">
            Want to work together?
          </p>
          <Link
            to="/book"
            className="mt-6 inline-flex rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-navy"
          >
            Get a free quote
          </Link>
        </div>
      </section>
    </div>
  )
}
