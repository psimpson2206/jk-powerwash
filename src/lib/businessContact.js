export const BUSINESS_EMAIL = 'unitedexteriorcare@gmail.com'

export async function submitToBusinessEmail({ subject, fields }) {
  const response = await fetch(
    `https://formsubmit.co/ajax/${encodeURIComponent(BUSINESS_EMAIL)}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        _subject: subject,
        _template: 'table',
        _captcha: 'false',
        ...fields,
      }),
    },
  )

  const data = await response.json().catch(() => ({}))

  if (!response.ok || data.success === false) {
    throw new Error(data.message || 'Unable to send your message. Please try again.')
  }

  return data
}
