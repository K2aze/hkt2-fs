import { MAIN_NAV } from "@/data/navigation";
import styles from "./NavigationDesktop.module.scss";
import { Link } from "@/lib/i18n/navigation";
import { LanguageSwitch } from "@/features/language";
import { AuthStatusDesktop } from "@/features/auth";

const NavigationDesktop = () => {
  return (
    <div className={styles.root}>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          {MAIN_NAV.map((item) => (
            <li key={item.id} className={styles.navItem}>
              <Link
                href={item.to}
                className="text-sm font-bold uppercase tracking-[0.15em] hover:text-green-700 transition-all text-white"
              >
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <AuthStatusDesktop />

      <LanguageSwitch />
    </div>
  );
};

export default NavigationDesktop;
