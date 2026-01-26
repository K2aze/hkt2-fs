import { motion } from "framer-motion";
interface PlusIconProps {
  size?: string | number;
  strokeWidth?: string | number;
  open?: boolean;
}
const PlusIcon = ({
  size = 24,
  strokeWidth = 2,
  open = true,
}: PlusIconProps) => {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      height={size}
      width={size}
      strokeWidth={strokeWidth}
    >
      <motion.path d="M5 12h14" />
      <motion.path
        animate={open ? { opacity: 0, y: 15 } : { opacity: 1, y: 0 }}
        d="M12 5v14"
      />
    </motion.svg>
  );
};
export default PlusIcon;
