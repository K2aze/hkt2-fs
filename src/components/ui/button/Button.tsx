import type { ComponentPropsWithoutRef, ReactNode } from "react";
import styles from "./Button.module.scss";
import clsx from "clsx";

type ButtonProps = Omit<ComponentPropsWithoutRef<"button">, "className"> & {
  className?: string;
  children?: ReactNode;
};

const Button = ({ className, children, ...props }: ButtonProps) => {
  return (
    <button
      type={props.type ?? "button"}
      className={clsx(styles.btn, className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
