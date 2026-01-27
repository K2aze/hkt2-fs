"use client";

import { AuthStatus } from "@/features/auth";
import styles from "./Navigation.module.scss";

export const Navigation = () => {
  return (
    <div className={styles.root}>
      <AuthStatus className={styles.authStatus} />
      <nav>Navigation menu</nav>
      <div>language button group</div>
      <div>social media</div>
      <small>coppyright</small>
    </div>
  );
};
