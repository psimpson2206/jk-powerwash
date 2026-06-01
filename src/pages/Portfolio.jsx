import { useMemo, useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'

const categories = ['All', 'Concrete', 'Brick', 'Siding', 'Wood', 'Trash Cans']

const portfolioItems = [
  { id: 1, type: 'Concrete', label: 'Driveway refresh' },
  { id: 2, type: 'Concrete', label: 'Sidewalk strip' },
  { id: 3, type: 'Brick', label: 'Walkway' },
  { id: 4, type: 'Brick', label: 'Accent wall' },
  { id: 5, type: 'Siding', label: 'Ranch home' },
  { id: 6, type: 'Siding', label: 'Two-story' },
  { id: 7, type: 'Wood', label: 'Deck boards' },
  { id: 8, type: 'Wood', label: 'Privacy fence' },
  { id: 9, type: 'Trash Cans', label: 'Curbside bins' },
]

function PlaceholderPane({ phase, subtitle }) {
  return (
    <div
      className="flex h-[300px] flex-col items-center justify-center bg-[#374151] text-center text-white/90"
      data-slot={phase}
    >
      <span className="text-xs font-semibold uppercase tracking-widest text-white/50">
        {phase}
      </span>
      <span className="mt-2 font-display text-sm font-medium">{subtitle}</span>
      <span className="mt-1 max-w-[12rem] text-xs text-white/55">
        Image placeholder: replace with img or background-image later.
      </span>
    </div>
  )
}

function BeforeAfterCard({ item, onOpen }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(item)}
      className="group w-full overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-sm outline-none ring-accent/40 transition hover:shadow-md focus-visible:ring-2"
    >
      <div className="grid grid-cols-2 gap-px bg-slate-900/20">
        <PlaceholderPane phase="Before" subtitle={item.label} />
        <PlaceholderPane phase="After" subtitle={item.label} />
      </div>
      <div className="flex items-center justify-between px-4 py-3">
        <span className="font-display text-sm font-semibold text-slate-800">
          {item.label}
        </span>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 group-hover:bg-accent/10 group-hover:text-accent">
          {item.type}
        </span>
      </div>
    </button>
  )
}

export default function Portfolio() {
  const [filter, setFilter] = useState('All')
  const [active, setActive] = useState(null)

  useEffect(() => {
    if (!active) return
    const onKey = (e) => {
      if (e.key === 'Escape') setActive(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active])

  const filtered = useMemo(() => {
    if (filter === 'All') return portfolioItems
    return portfolioItems.filter((p) => p.type === filter)
  }, [filter])

  const lightbox =
    typeof document !== 'undefined' &&
    createPortal(
      <AnimatePresence>
        {active ? (
          <motion.div
            key={active.id}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <button
              type="button"
              aria-label="Close gallery"
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setActive(null)}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="lightbox-title"
              initial={{ opacity: 0, scale: 0.94, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              className="relative z-[101] w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-navy shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 text-white">
                <h2 id="lightbox-title" className="font-display text-lg font-semibold">
                  {active.label}
                </h2>
                <button
                  type="button"
                  onClick={() => setActive(null)}
                  className="rounded-full bg-white/10 px-3 py-1 text-sm font-medium hover:bg-white/20"
                >
                  Close
                </button>
              </div>
              <div className="grid gap-px bg-black/40 md:grid-cols-2">
                <PlaceholderPane phase="Before" subtitle={active.label} />
                <PlaceholderPane phase="After" subtitle={active.label} />
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>,
      document.body
    )

  return (
    <div className="bg-slate-50">
      {lightbox}
      <section className="bg-navy px-6 py-16 text-white lg:px-12">
        <div className="mx-auto max-w-4xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl font-bold md:text-5xl"
          >
            Our Work
          </motion.h1>
          <p className="mt-3 text-white/80">
            Before & after highlights. Tap a project to view larger.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-12">
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                filter === cat
                  ? 'bg-accent text-white shadow-md shadow-blue-900/20'
                  : 'bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <BeforeAfterCard key={item.id} item={item} onOpen={setActive} />
          ))}
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white px-6 py-16 text-center lg:px-12">
        <p className="mx-auto max-w-2xl text-slate-600">
          Want to see more? Follow us on Instagram{' '}
          <a
            href="https://instagram.com/lpowerwash"
            className="font-semibold text-accent hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            @lpowerwash
          </a>
        </p>
      </section>
    </div>
  )
}
