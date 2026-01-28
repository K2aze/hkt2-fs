"use client";

import styles from "./NavigationMobile.module.scss";
import { AuthStatusMobile } from "@/features/auth";
import { LanguageSwitch } from "@/features/language";
import { Link } from "@/lib/i18n/navigation";
import { MAIN_NAV } from "@/data/navigation";
import { ArrowUpRight } from "lucide-react";
import { SOCIAL_MEDIA } from "@/data/socialmedia";

const NavigationMobile = () => {
  return (
    <div className={styles.root}>
      <AuthStatusMobile />
      <LanguageSwitch />
      <nav>
        <ul className={styles.navList}>
          {MAIN_NAV.map((item) => (
            <li key={item.id} className={styles.navItem}>
              <Link href={item.to} className={styles.navLink}>
                <span>{item.label}</span>
                <ArrowUpRight />
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <nav className={styles.navListSocials}>
        <ul className={styles.navLis}>
          {SOCIAL_MEDIA.map((item) => (
            <li key={item.id} className={styles.navItem}>
              <a href={item.to} className={styles.navSocials}>
                <span>{item.id}</span>
                <ArrowUpRight size={16} />
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <small>© 2026 KURASHIKI</small>
    </div>
  );
};

export default NavigationMobile;
