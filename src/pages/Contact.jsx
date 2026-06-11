import { useState } from 'react'
import { motion } from 'framer-motion'
import { BUSINESS_EMAIL, submitToBusinessEmail } from '../lib/businessContact.js'

const initial = { name: '', email: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState(initial)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const setField = (name, value) => {
    setForm((f) => ({ ...f, [name]: value }))
    setErrors((e) => ({ ...e, [name]: undefined }))
  }

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = 'Required'
    if (!form.email.trim()) next.email = 'Required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = 'Enter a valid email'
    if (!form.message.trim()) next.message = 'Required'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setSending(true)
    setSubmitError('')

    try {
      await submitToBusinessEmail({
        subject: `New contact message from ${form.name}`,
        fields: {
          name: form.name,
          email: form.email,
          message: form.message,
        },
      })
      setSent(true)
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : 'Unable to send your message. Please try again.',
      )
    } finally {
      setSending(false)
    }
  }

  const input =
    'mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none ring-accent/30 focus:ring-2'

  if (sent) {
    return (
      <div className="min-h-[60vh] bg-slate-100 px-6 py-20 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-lg rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm"
        >
          <p className="font-display text-xl font-semibold text-slate-800">
            Message sent! Jackson will get back to you soon.
          </p>
          <button
            type="button"
            onClick={() => {
              setSent(false)
              setForm(initial)
            }}
            className="mt-8 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-navy"
          >
            Send another message
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="bg-slate-100 px-6 py-20 lg:px-12">
      <div className="mx-auto max-w-5xl">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center font-display text-4xl font-bold text-slate-800"
        >
          Contact
        </motion.h1>
        <p className="mx-auto mt-3 max-w-xl text-center text-slate-600">
          Questions about a job or service area? Send a note: we reply fast.
        </p>

        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:items-start">
          <motion.form
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            onSubmit={onSubmit}
            className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
            noValidate
          >
            <div>
              <label htmlFor="c-name" className="text-sm font-medium text-slate-700">
                Name
              </label>
              <input
                id="c-name"
                className={input}
                value={form.name}
                onChange={(e) => setField('name', e.target.value)}
                autoComplete="name"
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="c-email" className="text-sm font-medium text-slate-700">
                Email
              </label>
              <input
                id="c-email"
                type="email"
                className={input}
                value={form.email}
                onChange={(e) => setField('email', e.target.value)}
                autoComplete="email"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>
            <div>
              <label htmlFor="c-msg" className="text-sm font-medium text-slate-700">
                Message
              </label>
              <textarea
                id="c-msg"
                rows={5}
                className={input}
                value={form.message}
                onChange={(e) => setField('message', e.target.value)}
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-600">{errors.message}</p>
              )}
            </div>
            {submitError && (
              <p className="text-sm text-red-600" role="alert">
                {submitError}
              </p>
            )}

            <button
              type="submit"
              disabled={sending}
              className="w-full rounded-full bg-accent py-3 text-sm font-semibold text-white transition hover:bg-navy disabled:cursor-not-allowed disabled:opacity-60"
            >
              {sending ? 'Sending…' : 'Send message'}
            </button>
          </motion.form>

          <motion.aside
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl border border-slate-200 bg-navy p-6 text-white shadow-sm sm:p-8"
          >
            <h2 className="font-display text-lg font-semibold">Contact details</h2>
            <ul className="mt-6 space-y-4 text-sm text-white/90">
              <li>
                <span className="block text-xs font-semibold uppercase tracking-wide text-white/50">
                  Phone
                </span>
                <a href="tel:+17177164003" className="mt-1 block font-semibold text-brand hover:text-white">
                  (717)-716-4003
                </a>
              </li>
              <li>
                <span className="block text-xs font-semibold uppercase tracking-wide text-white/50">
                  Email
                </span>
                <a
                  href={`mailto:${BUSINESS_EMAIL}`}
                  className="mt-1 block hover:text-white"
                >
                  {BUSINESS_EMAIL}
                </a>
              </li>
              <li>
                <span className="block text-xs font-semibold uppercase tracking-wide text-white/50">
                  Service areas
                </span>
                <ul className="mt-2 list-inside list-disc space-y-1">
                  <li>Allegheny County, PA</li>
                  <li>Lancaster County, PA</li>
                </ul>
              </li>
            </ul>
          </motion.aside>
        </div>
      </div>
    </div>
  )
}
