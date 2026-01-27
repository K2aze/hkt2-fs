"use client";
import { Leaf, Menu, X } from "lucide-react";
import styles from "./Header.module.scss";
import { useState } from "react";
import Navigation from "./Navigation";
export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const handleMenuClick = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className={styles.header}>
      <a href="#" className={styles.logo}>
        <Leaf className={styles.logoSvg} />
        <span className={styles.logoLabel}>Kurashiki Bikan</span>
      </a>
      <button className={styles.menuTrigger} onClick={handleMenuClick}>
        {isMenuOpen ? (
          <X className={styles.menuSvg} />
        ) : (
          <Menu className={styles.menuSvg} />
        )}
      </button>

      {isMenuOpen && <Navigation />}
    </header>
  );
};
