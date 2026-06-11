import finalLogo from '../assets/final-logo.jpeg'

const sizeClasses = {
  header:
    'h-28 w-auto max-w-[min(78vw,28rem)] origin-left scale-[1.2] sm:h-32 sm:max-w-[34rem] sm:scale-[1.25] md:h-40 md:max-w-[40rem] md:scale-[1.3] lg:h-48 lg:max-w-[46rem] lg:scale-[1.35] xl:h-52 xl:max-w-[50rem]',
  sm: 'h-12 w-auto max-w-[12rem] sm:h-14 sm:max-w-[14rem]',
  md: 'h-16 w-auto max-w-[16rem]',
  lg: 'h-24 w-auto max-w-[min(90vw,20rem)] sm:h-28 sm:max-w-[22rem] md:h-32 md:max-w-[26rem]',
}

export default function Logo({ size = 'sm', className = '', blend = false }) {
  return (
    <img
      src={finalLogo}
      alt="United Exterior Care LLC"
      className={[
        'block object-contain object-left',
        sizeClasses[size] ?? sizeClasses.sm,
        blend ? 'mix-blend-multiply' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    />
  )
}
