interface LoginIconProps {
  size?: string | number;
  strokeWidth?: string | number;
}
const LoginIcon = ({ size = 24, strokeWidth = 2 }: LoginIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={strokeWidth}
    height={size}
    width={size}
  >
    <path d="m10 17 5-5-5-5M15 12H3M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
  </svg>
);
export default LoginIcon;
