import styles from "./test.module.scss";
import { AuthStatus } from "@/features/auth";

const page = () => {
  return (
    <div className={styles.placement}>
      {/*==========================================*/}
      <AuthStatus />
      {/*==========================================*/}
    </div>
  );
};

export default page;
