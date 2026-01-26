interface ArrowRightIconProps {
  size?: string | number;
  strokeWidth?: string | number;
  className?: string;
}
const ArrowRightIcon = ({
  size = 24,
  strokeWidth = 2,
  className,
}: ArrowRightIconProps) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    height={size}
    width={size}
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);
export default ArrowRightIcon;
