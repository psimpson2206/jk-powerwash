import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const stats = [
  { label: '3+ Years in Business', sub: 'Growing every season' },
  { label: '500+ Jobs Completed', sub: 'Residential & commercial' },
  { label: '2 Service Areas', sub: 'Lancaster & Pittsburgh' },
]

export default function About() {
  return (
    <div className="bg-slate-50">
      <section className="mx-auto max-w-3xl px-6 py-20 lg:px-12">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center font-display text-4xl font-bold text-slate-800 md:text-5xl"
        >
          About Jackson
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.05 }}
          className="mx-auto mt-12 flex h-36 w-36 items-center justify-center rounded-full bg-navy font-display text-3xl font-bold text-white shadow-lg"
          aria-hidden
        >
          JK
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mx-auto mt-12 max-w-none space-y-6 text-lg leading-relaxed text-slate-700"
        >
          <p>
            I&apos;m Jackson Kautz, a 20-year-old student at the University of
            Pittsburgh and the owner of Lancaster & Pittsburgh Powerwashing. I
            started this business three years ago with a pressure washer and a
            lot of drive, and I&apos;ve been growing it ever since.
          </p>
          <p className="mt-6">
            What started as a way to earn money on weekends turned into something
            I&apos;m genuinely proud of. I take care of every job personally, which
            means you&apos;re always getting the owner on-site, not a crew
            you&apos;ve never met. I care about doing the work right, showing up on
            time, and leaving your property looking better than I found it.
          </p>
          <p className="mt-6">
            I serve both the Lancaster and Pittsburgh areas because that&apos;s
            where my roots are. Whether you&apos;re a homeowner looking to clean up
            your driveway or a property manager with a bigger job, I&apos;ll give
            you a straight quote and get it done.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm"
            >
              <p className="font-display text-lg font-semibold text-slate-800">
                {s.label}
              </p>
              <p className="mt-2 text-sm text-slate-600">{s.sub}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="font-display text-xl font-semibold text-slate-800">
            Want to work together?
          </p>
          <Link
            to="/book"
            className="mt-6 inline-flex rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-600"
          >
            Get in touch
          </Link>
        </div>
      </section>
    </div>
  )
}
