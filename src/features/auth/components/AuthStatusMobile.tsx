"use client";
import styles from "./AuthStatusDesktop.module.scss";
import { EllipsisVertical, LogOut, User } from "lucide-react";
import { useAuth, UserType } from "@/providers/AuthContext";
import { useState } from "react";
import clsx from "clsx";
import { GUEST_ACTION } from "../constants/guestActions";
import { autoUpdate, offset, shift, useFloating } from "@floating-ui/react";
import { USER_ACTION } from "../constants/userActions";
import { Link, useRouter } from "@/lib/i18n/navigation";

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
  return (
    <div className="grid gap-2 max-w-2xl">
      <div className="flex items-center gap-2 p-1 rounded-full group h-12">
        <div className={styles.userImage}>
          <User className={styles.userSvg} />
        </div>
        <span className={styles.userName}>Guest</span>
      </div>

      <ul className="p-2 rounded-md bg-white ">
        {GUEST_ACTION.map((item) => (
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
      </ul>
    </div>
  );
};

const UserState = ({ user }: { user: UserType }) => {
  const { logout } = useAuth();
  const route = useRouter();
  return (
    <div className="grid gap-2 max-w-2xl">
      <div className="flex gap-2">
        <div className={styles.userImage}>
          <User className={styles.userSvg} />
        </div>
        <div className={styles.userInfo}>
          <span className="text-sm font-medium">{user.username}</span>
          <span className="text-xs font-light text-neutral-500">
            {user.contact.email}
          </span>
        </div>
      </div>

      <ul className="p-2 rounded-md bg-white ">
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
            onClick={() => {
              logout();
              route.refresh();
            }}
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </li>
      </ul>
    </div>
  );
};
