import { motion } from 'framer-motion'

const services = [
  {
    name: 'Concrete & Driveways',
    price: '$0.55-$0.75 per sq ft',
    description:
      'Removes oil stains, dirt, mildew, and built-up grime from driveways, sidewalks, patios, and garage aprons.',
  },
  {
    name: 'Brick Surfaces',
    price: '$0.60-$0.80 per sq ft',
    description:
      'Safe, effective cleaning for brick walls, walkways, and facades without damaging mortar.',
  },
  {
    name: 'Vinyl Siding (1-story)',
    price: 'Flat rate, quote-based',
    description:
      'Restores curb appeal by removing algae, mold, and weathering from siding.',
  },
  {
    name: 'Vinyl Siding (2-story)',
    price: 'Flat rate, quote-based',
    description:
      'Same as above for two-story homes, priced accordingly for height and access.',
  },
  {
    name: 'Wood Decks & Fences',
    price: '$0.80 per sq ft',
    description:
      'Low-pressure soft wash to clean wood without splintering or damage.',
  },
  {
    name: 'Trash Can Cleaning',
    price: '$45 for one can, $60 for two',
    description:
      'Deodorizing deep clean inside and out for fresher bins at the curb.',
  },
]

const faqs = [
  {
    q: 'How long does a typical job take?',
    a: 'Most residential jobs finish in a few hours. Larger properties or heavy buildup can take longer. Your quote includes a time estimate.',
  },
  {
    q: 'Do I need to be home?',
    a: 'Not always. If we can access water and the work area safely, many customers provide instructions ahead of time. We will confirm what works best when we schedule.',
  },
  {
    q: 'What areas do you serve?',
    a: 'Allegheny County (Pittsburgh area) and Lancaster County, PA. Contact us if you are nearby and unsure: we can let you know quickly.',
  },
  {
    q: 'Is power washing safe for all surfaces?',
    a: 'Different surfaces need different pressure and detergents. We adjust technique for concrete, brick, vinyl, wood, and more, and we will tell you upfront if something should not be high-pressure cleaned.',
  },
]

export default function Services() {
  return (
    <div className="bg-slate-50">
      <section className="bg-navy px-6 py-16 text-white lg:px-12">
        <div className="mx-auto max-w-4xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="font-display text-4xl font-bold md:text-5xl"
          >
            Services & Pricing
          </motion.h1>
          <p className="mt-4 text-lg text-white/90">
            Clear starting points: final pricing confirmed after we see the job.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-20 lg:px-12">
        <div className="space-y-6">
          {services.map((s, index) => (
            <motion.article
              key={s.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
            >
              <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                <h2 className="font-display text-xl font-semibold text-slate-800 md:text-2xl">
                  {s.name}
                </h2>
                <p className="shrink-0 rounded-full bg-accent/10 px-4 py-1.5 text-sm font-semibold text-accent md:text-right">
                  {s.price}
                </p>
              </div>
              <p className="mt-4 text-slate-600">{s.description}</p>
            </motion.article>
          ))}
        </div>

        <p className="mt-10 rounded-2xl border border-amber-200/80 bg-amber-50 px-5 py-4 text-center text-sm text-slate-700">
          Pricing varies based on surface condition and accessibility. Final quote
          provided after on-site assessment.
        </p>
      </section>

      <section className="border-t border-slate-200 bg-white px-6 py-20 lg:px-12">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center font-display text-3xl font-bold text-slate-800">
            FAQ
          </h2>
          <div className="mt-10 space-y-4">
            {faqs.map((item) => (
              <details
                key={item.q}
                className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 open:bg-white open:shadow-sm"
              >
                <summary className="cursor-pointer font-display text-lg font-semibold text-slate-800 marker:text-accent">
                  {item.q}
                </summary>
                <p className="mt-3 text-slate-600">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
