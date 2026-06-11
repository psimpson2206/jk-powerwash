import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useState, useEffect, useCallback, useRef } from 'react'
import heroHome from '../assets/hero-home-bg.jpg'

const PHONE_DISPLAY = '(717)-716-4003'
const PHONE_HREF = 'tel:+17177164003'

function PhoneIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.36 11.36 0 003.56.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.36 11.36 0 00.57 3.56 1 1 0 01-.25 1.01l-2.2 2.22z" />
    </svg>
  )
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.08 * (typeof i === 'number' ? i : 0),
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

const whyCards = [
  {
    icon: '📍',
    title: 'Local & Reliable',
    text: 'Based in Pittsburgh and Lancaster, serving both regions with dependable scheduling.',
  },
  {
    icon: '💵',
    title: 'Fair Pricing',
    text: 'Transparent quotes and clear scope, with no surprise add-ons after the fact.',
  },
  {
    icon: '✨',
    title: 'Quality Results',
    text: 'Three years of experience and hundreds of satisfied customers across PA.',
  },
]

const serviceTiles = [
  {
    name: 'Concrete & Driveways',
    desc: 'Oil stains, dirt, and grime lifted from hard surfaces.',
  },
  {
    name: 'Brick Surfaces',
    desc: 'Mortar-safe cleaning for walls, walks, and accents.',
  },
  {
    name: 'Vinyl Siding',
    desc: 'Algae and weathering removed to restore curb appeal.',
  },
  {
    name: 'Wood Decks & Fences',
    desc: 'Low-pressure soft wash that respects wood grain.',
  },
  {
    name: 'Trash Can Cleaning',
    desc: 'Deodorizing deep clean inside and out.',
  },
]

const reviews = [
  {
    name: 'Sarah M.',
    text: 'Driveway looks brand new, with quick response and a fair price.',
    rating: 5,
  },
  {
    name: 'Mike R.',
    text: 'Professional from quote to cleanup. Highly recommend.',
    rating: 5,
  },
  {
    name: 'Jennifer L.',
    text: 'Siding came out spotless. Will book again next season.',
    rating: 5,
  },
]

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 56 : -56,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction < 0 ? 56 : -56,
    opacity: 0,
  }),
}

function ReviewsCarousel() {
  const [[index, direction], setSlide] = useState([0, 0])
  const indexRef = useRef(0)

  useEffect(() => {
    indexRef.current = index
  }, [index])

  const goTo = useCallback((nextIndex, dir) => {
    const len = reviews.length
    let i = nextIndex % len
    if (i < 0) i += len
    setSlide([i, dir])
  }, [])

  useEffect(() => {
    const id = setInterval(() => {
      const i = indexRef.current
      setSlide([(i + 1) % reviews.length, 1])
    }, 4000)
    return () => clearInterval(id)
  }, [])

  const r = reviews[index]

  return (
    <div className="mx-auto max-w-xl">
      <div className="relative flex items-center gap-2 sm:gap-4">
        <button
          type="button"
          aria-label="Previous review"
          onClick={() => goTo(index - 1, -1)}
          className="z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-accent hover:bg-slate-50 hover:text-accent"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="relative min-h-[168px] flex-1 overflow-hidden sm:min-h-[152px]">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.article
              key={index}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-display font-semibold text-slate-800">
                  {r.name}
                </span>
                <span className="text-amber-400" aria-hidden>
                  {'★'.repeat(r.rating)}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                &ldquo;{r.text}&rdquo;
              </p>
            </motion.article>
          </AnimatePresence>
        </div>

        <button
          type="button"
          aria-label="Next review"
          onClick={() => goTo(index + 1, 1)}
          className="z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-accent hover:bg-slate-50 hover:text-accent"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {reviews.map((_, i) => (
          <button
            key={`review-dot-${i}`}
            type="button"
            aria-label={`Show review ${i + 1}`}
            aria-current={i === index ? 'true' : undefined}
            onClick={() => {
              if (i === index) return
              goTo(i, i > index ? 1 : -1)
            }}
            className={`h-2.5 rounded-full transition-all ${
              i === index
                ? 'w-8 bg-accent'
                : 'w-2.5 bg-slate-300 hover:bg-slate-400'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

function SectionReveal({ children, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function Home() {
  return (
    <div>
      <section className="relative flex min-h-[min(100svh,900px)] flex-col items-center justify-center overflow-hidden px-6 py-28 text-center text-white lg:min-h-[85vh] lg:px-12">
        <img
          src={heroHome}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/55 via-black/50 to-black/65"
          aria-hidden
        />
        <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center">
          <motion.h1
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="font-display text-2xl font-bold uppercase leading-tight tracking-wide sm:text-3xl md:text-4xl lg:text-[2.75rem] lg:leading-tight"
          >
            Restoring Lancaster one home at a time
          </motion.h1>
          <motion.p
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-5 font-display text-lg font-bold uppercase tracking-wide sm:text-xl md:text-2xl"
          >
            Request your free estimate today!
          </motion.p>
          <motion.div
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4"
          >
            <a
              href={PHONE_HREF}
              className="inline-flex items-center justify-center gap-2 bg-transparent px-5 py-3.5 font-display text-sm font-bold uppercase tracking-wide text-white transition hover:bg-brand sm:px-6 sm:text-base"
            >
              <PhoneIcon className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" />
              Call us: {PHONE_DISPLAY}
            </a>
            <Link
              to="/book"
              className="inline-flex items-center justify-center bg-transparent px-5 py-3.5 font-display text-sm font-bold uppercase tracking-wide text-white transition hover:bg-brand sm:px-6 sm:text-base"
            >
              Get a free estimate
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="px-6 py-20 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <SectionReveal>
            <h2 className="text-center font-display text-3xl font-bold text-slate-800 md:text-4xl">
              Why Choose Us
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600">
              Straight talk, careful technique, and results you can see from the
              curb.
            </p>
          </SectionReveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {whyCards.map((card) => (
              <SectionReveal key={card.title}>
                <div className="h-full rounded-2xl border border-slate-200/80 bg-white p-8 shadow-sm transition hover:shadow-md">
                  <div className="text-3xl" aria-hidden>
                    {card.icon}
                  </div>
                  <h3 className="mt-4 font-display text-xl font-semibold text-slate-800">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-slate-600">{card.text}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-20 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <SectionReveal>
            <h2 className="text-center font-display text-3xl font-bold text-slate-800 md:text-4xl">
              What We Clean
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600">
              From driveways to siding, we match pressure and chemistry to the
              surface.
            </p>
          </SectionReveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {serviceTiles.map((s) => (
              <SectionReveal key={s.name}>
                <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-slate-50 p-6">
                  <h3 className="font-display text-lg font-semibold text-slate-800">
                    {s.name}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-slate-600">{s.desc}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <Link
              to="/services"
              className="inline-flex rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-navy"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <SectionReveal>
            <h2 className="text-center font-display text-3xl font-bold text-slate-800 md:text-4xl">
              What Our Customers Say
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600">
              Real feedback coming soon. This carousel is ready for your reviews.
            </p>
          </SectionReveal>
          <div className="mt-12">
            <ReviewsCarousel />
          </div>
        </div>
      </section>

      <section className="bg-navy px-6 py-20 text-center text-white lg:px-12">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-3xl font-bold md:text-4xl">
            Ready to get started?
          </h2>
          <p className="mt-4 text-lg text-white/90">
            Get a free quote today. We&apos;ll get back to you within 24 hours.
          </p>
          <Link
            to="/book"
            className="mt-8 inline-flex rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-navy"
          >
            Book Now
          </Link>
        </div>
      </section>
    </div>
  )
}
