"use client";
import styles from "./AuthStatusDesktop.module.scss";
import { EllipsisVertical, LogOut, User } from "lucide-react";
import { useAuth, UserType } from "@/providers/AuthContext";
import { useState } from "react";
import clsx from "clsx";
import { GUEST_ACTION } from "../constants/guestActions";
import { autoUpdate, offset, shift, useFloating } from "@floating-ui/react";
import { USER_ACTION } from "../constants/userActions";
import { Link } from "@/lib/i18n/navigation";

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
    <div className="flex items-center gap-2 bg-white p-1 rounded-full group h-12">
      <div className={styles.userImage}>
        <User className={styles.userSvg} />
      </div>
      <span className={styles.userName}>Guest</span>

      <button
        className="h-12 aspect-square place-items-center rounded-full group-hover:bg-neutral-200"
        ref={refs.setReference}
        onClick={() => setOpen((prev) => !prev)}
      >
        <EllipsisVertical size={18} />
      </button>

      {open && (
        <ul
          className="p-2 rounded-md bg-white border border-neutral-200 "
          // eslint-disable-next-line react-hooks/refs
          ref={refs.setFloating}
          style={floatingStyles}
        >
          {GUEST_ACTION.map((item) => (
            <li key={item.id} className="rounded-md border-s-stone-200">
              <a
                href={item.to}
                className="flex items-center gap-2 w-full  hover:text-green-500 p-2 "
              >
                <item.icon size={16} />
                <span>{item.label}</span>
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

  const { logout } = useAuth();

  return (
    <div className="flex items-center gap-2 bg-white p-1 rounded-full group h-12">
      <div className={styles.userImage}>
        <User className={styles.userSvg} />
      </div>
      <div className={styles.userInfo}>
        <span className="text-sm font-medium">{user.username}</span>
        <span className="text-xs font-light text-neutral-500">
          {user.contact.email}
        </span>
      </div>

      <button
        className="h-12 aspect-square place-items-center rounded-full group-hover:bg-neutral-200"
        ref={refs.setReference}
        onClick={() => setOpen((prev) => !prev)}
      >
        <EllipsisVertical size={18} />
      </button>

      {open && (
        <ul
          className="p-2 rounded-md bg-white border border-neutral-200 "
          // eslint-disable-next-line react-hooks/refs
          ref={refs.setFloating}
          style={floatingStyles}
        >
          {USER_ACTION.map((item) => (
            <li key={item.id} className="rounded-md border-s-stone-200">
              <Link
                href={item.to}
                className="flex items-center gap-2 w-full  hover:text-green-500 p-2 "
              >
                <item.icon size={16} />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
          <li className="rounded-md border-s-stone-200">
            <button
              className="flex items-center gap-2 w-full  hover:text-green-500 p-2 "
              onClick={() => logout()}
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};
