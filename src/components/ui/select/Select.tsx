"use client";
import {
  autoUpdate,
  FloatingContext,
  offset,
  shift,
  useFloating,
} from "@floating-ui/react";
import clsx from "clsx";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { useId, useMemo, useState } from "react";
import styles from "./Select.module.scss";
import { SelectContext, useSelectContext } from "./useSelectContext";

type BaseProps<P> = P & {
  className?: string;
  children?: ReactNode;
};

//Select
type SelectProps = {
  children: ReactNode;
  placement?: FloatingContext["placement"];
};
export function Select({ children, placement = "right-start" }: SelectProps) {
  const [open, setOpen] = useState<boolean>(false);

  const { refs, floatingStyles } = useFloating({
    placement: placement,
    middleware: [offset(4), shift()],
    whileElementsMounted: autoUpdate,
  });

  const floatingId = useId();

  const value = useMemo(
    () => ({
      open,
      setOpen,
      refs,
      floatingStyles,
      floatingId,
    }),
    [open, refs, floatingStyles, floatingId],
  );

  return (
    <SelectContext.Provider value={value}>{children}</SelectContext.Provider>
  );
}

//Select Trigger
type SelectTriggerProps = BaseProps<
  Omit<ComponentPropsWithoutRef<"button">, "className" | "children" | "type">
>;

export function SelectTrigger({
  className,
  children,
  ...props
}: SelectTriggerProps) {
  const { open, setOpen, refs, floatingId } = useSelectContext();
  return (
    <button
      type="button"
      {...props}
      className={clsx(styles.trigger, className, {
        [styles.active]: open,
      })}
      onClick={() => setOpen(!open)}
      // eslint-disable-next-line react-hooks/refs
      ref={refs.setReference}
      aria-haspopup="listbox"
      aria-expanded={open ? "true" : "false"}
      aria-controls={floatingId}
    >
      {children}
    </button>
  );
}

//Select Content
type SelectContentProps = BaseProps<
  Omit<ComponentPropsWithoutRef<"ul">, "children" | "className" | "onClick"> & {
    onClick?: () => void;
  }
>;

export function SelectContent({
  children,
  className,
  onClick,
  ...props
}: SelectContentProps) {
  const { open, floatingStyles, refs, floatingId, setOpen } =
    useSelectContext();

  if (open) {
    const handerClick = () => {
      setOpen(false);
      onClick?.();
    };
    return (
      <ul
        // eslint-disable-next-line react-hooks/refs
        ref={refs.setFloating}
        style={floatingStyles}
        className={clsx(styles.content, className)}
        id={floatingId}
        role="listbox"
        onClick={handerClick}
        {...props}
      >
        {children}
      </ul>
    );
  }
}

//Select Item
type SelectItemProps = BaseProps<
  Omit<ComponentPropsWithoutRef<"li">, "children" | "className"> & {
    selected?: boolean;
  }
>;

export function SelectItem({
  children,
  className,
  selected,
  ...props
}: SelectItemProps) {
  return (
    <li
      className={clsx(styles.item, { [styles.selected]: selected }, className)}
      role="option"
      aria-selected={selected}
      {...props}
    >
      {children}
    </li>
  );
}
