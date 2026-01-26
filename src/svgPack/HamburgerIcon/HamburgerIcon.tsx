import { motion, Variants } from "framer-motion";

interface HamburgerIconProps {
  state: boolean;
  size?: string | number;
  strokeWidth?: number;
}

export const HamburgerIcon = ({
  state = false,
  size = 24,
  strokeWidth = 4,
}: HamburgerIconProps) => {
  const LINES = {
    line1: {
      closed: { x1: 15, y1: 20, x2: 56, y2: 20 },
      open: { x1: 14, y1: 47.9914, x2: 42.9914, y2: 19 },
    },
    line2: {
      closed: { x1: 15, y1: 48, x2: 60, y2: 48 },
      open: { x1: 15, y1: 48, x2: 67, y2: 48 },
    },
    line3: {
      closed: { x1: 15, y1: 76, x2: 81, y2: 76 },
      open: { x1: 13.8284, y1: 48, x2: 42, y2: 76.9914 },
    },
    line4: {
      closed: { x1: 68, y1: 20, x2: 81, y2: 20 },
      open: { x1: 73, y1: 48, x2: 81, y2: 48 },
    },
  } as const;

  type LineKey = keyof typeof LINES;
  const lineVariants: Variants = {
    closed: (key: LineKey) => ({
      ...LINES[key].closed,
    }),
    open: (key: LineKey) => ({
      ...LINES[key].open,
    }),
  };

  return (
    <motion.svg
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      animate={state ? "open" : "closed"}
      height={size}
      width={size}
    >
      <rect width={96} height={96} fill="none" />
      {(Object.keys(LINES) as LineKey[]).map((key) => (
        <motion.line
          key={key}
          custom={key}
          variants={lineVariants}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          transition={{ ease: "easeInOut", duration: 0.2 }}
        />
      ))}
    </motion.svg>
  );
};
