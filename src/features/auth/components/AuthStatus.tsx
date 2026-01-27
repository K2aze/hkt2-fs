"use client";
import { Button } from "@/components/ui/button";
import styles from "./AuthStatus.module.scss";
import { User } from "lucide-react";
import { useAuth } from "@/providers/AuthContext";
import { ComponentPropsWithoutRef } from "react";
import clsx from "clsx";

type AuthStatusProps = Omit<ComponentPropsWithoutRef<"button">, "className"> & {
  className?: string;
};

const AuthStatus = ({ className, ...props }: AuthStatusProps) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Button className={clsx(styles.btn, className)} {...props}>
        <div className={styles.svgWrap}>
          <User className={styles.svg} />
        </div>
        <span className={styles.label}>Loading</span>
      </Button>
    );
  }

  return (
    <Button className={clsx(styles.btn, className)} {...props}>
      <div className={styles.svgWrap}>
        <User className={styles.svg} />
      </div>
      <span className={styles.label}>{user?.name ?? "Guest"}</span>
    </Button>
  );
};

export default AuthStatus;
