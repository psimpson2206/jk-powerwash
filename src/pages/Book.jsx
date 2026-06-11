import { useState } from 'react'
import { motion } from 'framer-motion'
import { submitToBusinessEmail } from '../lib/businessContact.js'

const initial = {
  fullName: '',
  phone: '',
  email: '',
  serviceType: '',
  sizeDescription: '',
  surfaceCondition: '',
  preferredDate: '',
  notes: '',
}

export default function Book() {
  const [form, setForm] = useState(initial)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const setField = (name, value) => {
    setForm((f) => ({ ...f, [name]: value }))
    setErrors((e) => ({ ...e, [name]: undefined }))
  }

  const validate = () => {
    const next = {}
    if (!form.fullName.trim()) next.fullName = 'Required'
    if (!form.phone.trim()) next.phone = 'Required'
    if (!form.email.trim()) next.email = 'Required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = 'Enter a valid email'
    if (!form.serviceType) next.serviceType = 'Select a service type'
    if (!form.sizeDescription.trim()) next.sizeDescription = 'Required'
    if (!form.surfaceCondition) next.surfaceCondition = 'Select surface condition'
    if (!form.preferredDate) next.preferredDate = 'Choose a preferred date'
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
        subject: `New booking request from ${form.fullName}`,
        fields: {
          name: form.fullName,
          email: form.email,
          phone: form.phone,
          'Service Type': form.serviceType,
          'Size / Description': form.sizeDescription,
          'Surface Condition': form.surfaceCondition,
          'Preferred Date': form.preferredDate,
          Notes: form.notes || '—',
        },
      })
      setSubmitted(true)
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : 'Unable to send your request. Please try again.',
      )
    } finally {
      setSending(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-[70vh] bg-slate-100 px-6 py-20 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-lg rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm"
        >
          <p className="font-display text-xl font-semibold text-slate-800">
            Thanks! Jackson will reach out within 24 hours to confirm your booking.
          </p>
          <button
            type="button"
            onClick={() => {
              setSubmitted(false)
              setForm(initial)
            }}
            className="mt-8 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-navy"
          >
            Submit another request
          </button>
        </motion.div>
      </div>
    )
  }

  const fieldClass =
    'mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none ring-accent/30 transition focus:ring-2'

  return (
    <div className="bg-slate-100 px-6 py-20 lg:px-12">
      <div className="mx-auto w-full max-w-[600px]">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="font-display text-4xl font-bold text-slate-800">
            Request a Quote
          </h1>
          <p className="mt-3 text-slate-600">
            Tell us about the job. Jackson reviews every request personally.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          onSubmit={onSubmit}
          className="mt-10 space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
          noValidate
        >
          <div>
            <label htmlFor="fullName" className="text-sm font-medium text-slate-700">
              Full Name
            </label>
            <input
              id="fullName"
              className={fieldClass}
              value={form.fullName}
              onChange={(e) => setField('fullName', e.target.value)}
              autoComplete="name"
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="text-sm font-medium text-slate-700">
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              className={fieldClass}
              value={form.phone}
              onChange={(e) => setField('phone', e.target.value)}
              autoComplete="tel"
            />
            {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
          </div>

          <div>
            <label htmlFor="email" className="text-sm font-medium text-slate-700">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              className={fieldClass}
              value={form.email}
              onChange={(e) => setField('email', e.target.value)}
              autoComplete="email"
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="serviceType" className="text-sm font-medium text-slate-700">
              Service Type
            </label>
            <select
              id="serviceType"
              className={fieldClass}
              value={form.serviceType}
              onChange={(e) => setField('serviceType', e.target.value)}
            >
              <option value="">Select…</option>
              <option>Concrete/Driveway</option>
              <option>Brick</option>
              <option>Vinyl Siding</option>
              <option>Wood Deck/Fence</option>
              <option>Trash Cans</option>
              <option>Not Sure</option>
            </select>
            {errors.serviceType && (
              <p className="mt-1 text-sm text-red-600">{errors.serviceType}</p>
            )}
          </div>

          <div>
            <label htmlFor="sizeDescription" className="text-sm font-medium text-slate-700">
              Approximate Size or Description
            </label>
            <textarea
              id="sizeDescription"
              rows={3}
              placeholder='e.g. "2-car driveway, about 400 sq ft"'
              className={fieldClass}
              value={form.sizeDescription}
              onChange={(e) => setField('sizeDescription', e.target.value)}
            />
            {errors.sizeDescription && (
              <p className="mt-1 text-sm text-red-600">{errors.sizeDescription}</p>
            )}
          </div>

          <div>
            <label htmlFor="surfaceCondition" className="text-sm font-medium text-slate-700">
              Surface Condition
            </label>
            <select
              id="surfaceCondition"
              className={fieldClass}
              value={form.surfaceCondition}
              onChange={(e) => setField('surfaceCondition', e.target.value)}
            >
              <option value="">Select…</option>
              <option>Lightly dirty</option>
              <option>Moderately dirty</option>
              <option>Very dirty / heavy buildup</option>
            </select>
            {errors.surfaceCondition && (
              <p className="mt-1 text-sm text-red-600">{errors.surfaceCondition}</p>
            )}
          </div>

          <div>
            <label htmlFor="preferredDate" className="text-sm font-medium text-slate-700">
              Preferred Date
            </label>
            <input
              id="preferredDate"
              type="date"
              className={fieldClass}
              value={form.preferredDate}
              onChange={(e) => setField('preferredDate', e.target.value)}
            />
            {errors.preferredDate && (
              <p className="mt-1 text-sm text-red-600">{errors.preferredDate}</p>
            )}
          </div>

          <div>
            <label htmlFor="notes" className="text-sm font-medium text-slate-700">
              Additional Notes{' '}
              <span className="font-normal text-slate-500">(optional)</span>
            </label>
            <textarea
              id="notes"
              rows={3}
              className={fieldClass}
              value={form.notes}
              onChange={(e) => setField('notes', e.target.value)}
            />
          </div>

          {submitError && (
            <p className="text-center text-sm text-red-600" role="alert">
              {submitError}
            </p>
          )}

          <button
            type="submit"
            disabled={sending}
            className="w-full rounded-full bg-accent py-3 text-sm font-semibold text-white transition hover:bg-navy disabled:cursor-not-allowed disabled:opacity-60"
          >
            {sending ? 'Sending…' : 'Submit request'}
          </button>
        </motion.form>
      </div>
    </div>
  )
}
