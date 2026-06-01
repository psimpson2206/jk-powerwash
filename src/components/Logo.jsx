import { useId } from 'react'

/**
 * Simplified Lancaster County, PA outline (decorative polygon) with JK monogram.
 * Swap `countyPath` for a refined path when you have final artwork.
 */
const countyPath =
  'M 18 28 L 48 12 L 88 10 L 108 22 L 114 48 L 118 78 L 112 108 L 96 128 L 62 138 L 28 130 L 12 104 L 8 72 L 10 44 Z'

export default function Logo({ size = 'sm' }) {
  const height = size === 'lg' ? 80 : 40
  const gradId = `logo-shine-${useId().replace(/:/g, '')}`

  return (
    <svg
      role="img"
      aria-label="Lancaster County outline with JK monogram"
      height={height}
      width={height * (120 / 140)}
      viewBox="0 0 120 140"
      className="shrink-0"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1a56db" />
        </linearGradient>
      </defs>
      <path
        d={countyPath}
        fill={`url(#${gradId})`}
        stroke="#1d4ed8"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <text
        x="62"
        y="82"
        textAnchor="middle"
        fill="#f8fafc"
        fontFamily="Poppins, system-ui, sans-serif"
        fontSize="38"
        fontWeight="700"
        letterSpacing="-1"
      >
        JK
      </text>
    </svg>
  )
}
