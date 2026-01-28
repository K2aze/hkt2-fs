"use client";
import { Leaf, Menu, X } from "lucide-react";
import styles from "./Header.module.scss";
import { useEffect, useEffectEvent, useState } from "react";
import clsx from "clsx";
import { NavigationDesktop, NavigationMobile } from "./Navigation";
import { usePathname } from "@/lib/i18n/navigation";
export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const closeIfNeeded = useEffectEvent(() => {
    setIsMenuOpen((open) => {
      if (!open) return open;
      return false;
    });
  });
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 912px)");

    closeIfNeeded();
    if (mq.matches) {
      closeIfNeeded();
    }
    mq.addEventListener("change", (e) => {
      if (e.matches) closeIfNeeded();
    });
    return () => {
      mq.removeEventListener("change", closeIfNeeded);
    };
  }, []);

  const pathname = usePathname();
  useEffect(() => {
    closeIfNeeded();
  }, [pathname]);

  const handleMenuClick = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className={styles.header}>
      <a href="#" className={styles.logo}>
        <Leaf className={styles.logoSvg} />
        <span className={styles.logoLabel}>Kurashiki Bikan</span>
      </a>

      {/*Mobile Navigation START*/}
      <button className={styles.menuTrigger} onClick={handleMenuClick}>
        {isMenuOpen ? (
          <X className={styles.menuSvg} />
        ) : (
          <Menu className={styles.menuSvg} />
        )}
      </button>

      <div className={clsx(styles.backdrop, { [styles.draw]: isMenuOpen })} />
      {isMenuOpen && <NavigationMobile />}

      {/*Mobile Navigation END*/}

      <NavigationDesktop />
    </header>
  );
};
