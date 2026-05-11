interface SpectrumIconProps {
  size?: number;
  className?: string;
}

const SpectrumIcon = ({ size = 32, className = "" }: SpectrumIconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 72 72"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="Spectrum News"
    role="img"
  >
    {/* Dark base triangle */}
    <polygon points="36,8 68,62 4,62" fill="#1a1a2e" />

    {/* Right half — blue (right perspective) */}
    <polygon points="36,8 68,62 36,62" fill="#185FA5" opacity="0.9" />

    {/* Left half — orange (left perspective) */}
    <polygon points="36,8 4,62 36,62" fill="#D85A30" opacity="0.9" />

    {/* Center divider — the "truth" line */}
    <line
      x1="36" y1="8"
      x2="36" y2="62"
      stroke="white"
      strokeWidth="1.5"
      opacity="0.6"
    />

    {/* Outer border for crispness */}
    <polygon
      points="36,8 68,62 4,62"
      fill="none"
      stroke="white"
      strokeWidth="1"
      opacity="0.12"
    />
  </svg>
);

export default SpectrumIcon;
