"use client";
import styles from "./AuthStatusDesktop.module.scss";
import { EllipsisVertical, User } from "lucide-react";
import { useAuth, UserType } from "@/providers/AuthContext";
import { useState } from "react";
import clsx from "clsx";
import { GUEST_ACTION } from "../constants/guestActions";
import { autoUpdate, offset, shift, useFloating } from "@floating-ui/react";
import { USER_ACTION } from "../constants/userActions";

const AuthStatusDesktop = () => {
  const { loading, user } = useAuth();
  if (loading) {
    return <LoadingState />;
  }
  if (!user) {
    return <GuestState />;
  }

  return <UserState user={user} />;
};

export default AuthStatusDesktop;

const LoadingState = () => {
  return (
    <div className={styles.root}>
      <div className={clsx(styles.userImage, styles.skeleton)} />
      <span className={clsx(styles.textBlock, styles.skeleton)} />
      <span className={clsx(styles.btnBlock, styles.skeleton)} />
    </div>
  );
};

const GuestState = () => {
  const [open, setOpen] = useState(false);
  const { refs, floatingStyles } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: "bottom-end",
    middleware: [offset(8), shift({ padding: 4 })],
  });
  return (
    <div className={styles.root}>
      <div className={styles.userImage}>
        <User className={styles.userSvg} />
      </div>
      <span className={styles.userName}>Guest</span>

      <button
        className={styles.actionTrigger}
        ref={refs.setReference}
        onClick={() => setOpen((prev) => !prev)}
      >
        <EllipsisVertical size={18} />
      </button>

      {open && (
        <ul
          className={styles.actions}
          // eslint-disable-next-line react-hooks/refs
          ref={refs.setFloating}
          style={floatingStyles}
        >
          {GUEST_ACTION.map((item) => (
            <li key={item.id} className={styles.actionItem}>
              <a
                href={item.to}
                className={clsx(styles.actionLink, {
                  [styles.login]: item.id == "login",
                  [styles.create]: item.id == "create",
                })}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const UserState = ({ user }: { user: UserType }) => {
  const [open, setOpen] = useState(false);
  const { refs, floatingStyles } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: "bottom-end",
    middleware: [offset(8), shift({ padding: 4 })],
    whileElementsMounted: autoUpdate,
  });
  return (
    <div className={styles.root}>
      <div className={styles.userImage}>
        <User className={styles.userSvg} />
      </div>
      <div className={styles.userInfo}>
        <span className={styles.userName}>{user.username}</span>
        <span className={styles.userEmail}>{user.contact.email}</span>
      </div>

      <button
        className={styles.actionTrigger}
        ref={refs.setReference}
        onClick={() => setOpen((prev) => !prev)}
      >
        <EllipsisVertical size={18} />
      </button>

      {open && (
        <ul
          className={styles.actions}
          // eslint-disable-next-line react-hooks/refs
          ref={refs.setFloating}
          style={floatingStyles}
        >
          {USER_ACTION.map((item) => (
            <li key={item.id} className={styles.actionItem}>
              <a
                href={item.to}
                className={clsx(styles.actionLink, {
                  [styles.login]: item.id == "edit",
                })}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
