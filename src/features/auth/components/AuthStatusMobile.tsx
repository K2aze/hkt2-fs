import { useAuth } from "@/providers/AuthContext";
import type { UserType } from "@/providers/AuthContext";
import styles from "./AuthStatusMobile.module.scss";
import { User } from "lucide-react";
import clsx from "clsx";

const AuthStatusMobile = () => {
  const { user, loading } = useAuth();
  if (loading) {
    return <LoadingState />;
  }
  if (!user) {
    return <GuestState />;
  }

  return <UserState user={user} />;
};

export default AuthStatusMobile;

const LoadingState = () => {
  return (
    <div className={styles.root}>
      <div className={clsx(styles.userImage, styles.skeleton)} />
      <span className={clsx(styles.textBlock, styles.skeleton)} />
    </div>
  );
};

const GuestState = () => {
  return (
    <div className={styles.root}>
      <div className={styles.userImage}>
        <User className={styles.userSvg} />
      </div>
      <span className={styles.userName}>Guest</span>

      <div className={styles.actions}>
        <a href="#" className={styles.actionLogin}>
          Login
        </a>
        <a href="#" className={styles.actionRegister}>
          or create an account
        </a>
      </div>
    </div>
  );
};

const UserState = ({ user }: { user: UserType }) => {
  return (
    <div className={styles.root}>
      <div className={styles.userImage}>
        <User className={styles.userSvg} />
      </div>
      <span className={styles.userName}>{user.username}</span>
      <span>{user.contact.email}</span>

      <div className={styles.actions}>
        <a href="#" className={styles.actionEdit}>
          Edit Profile
        </a>
      </div>
    </div>
  );
};
