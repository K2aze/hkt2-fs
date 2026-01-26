interface SearchIconProps {
  size?: string | number;
  strokeWidth?: string | number;
}
const SearchIcon = ({ size = 24, strokeWidth = 4 }: SearchIconProps) => (
  <svg
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
    <path d="m21 21-4.34-4.34" />
    <circle cx={11} cy={11} r={8} />
  </svg>
);
export default SearchIcon;
