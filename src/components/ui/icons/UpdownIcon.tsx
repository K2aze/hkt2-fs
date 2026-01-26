interface UpdownIconProps {
  size?: string | number;
  strokeWidth?: string | number;
  className?: string;
}
const UpdownIcon = ({
  size = 24,
  strokeWidth = 2,
  className,
}: UpdownIconProps) => (
  <svg
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    height={size}
    width={size}
    strokeWidth={strokeWidth}
    className={className}
  >
    <path d="m7 15 5 5 5-5M7 9l5-5 5 5" />
  </svg>
);
export default UpdownIcon;
