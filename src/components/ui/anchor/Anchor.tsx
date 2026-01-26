import clsx from "clsx";
import { HTMLProps, ReactNode } from "react";
import styles from "./anchor.module.scss";

export interface AnchorProps extends HTMLProps<HTMLAnchorElement> {
  children: ReactNode;
  href: string;
  className?: string;
  variant?: "nav" | "default";
}

export const Anchor = ({
  children,
  href = "#",
  className,
  variant = "default",
}: AnchorProps) => {
  return (
    <a href={href} className={clsx(styles.anchor, styles[variant], className)}>
      {children}
    </a>
  );
};
