"use client";
import styles from "./Header.module.scss";
import { Activity, useState } from "react";
import HamburgerIcon from "@/svgPack/HamburgerIcon";
import LogoIcon from "@/svgPack/LogoIcon";
import SearchIcon from "@/svgPack/SearchIcon";
import BookmarkIcon from "@/svgPack/BookmarkIcon";
import Navigation from "./Navigation";
import clsx from "clsx";
export const Header = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(true);
  return (
    <header className={styles["header"]}>
      <div className={styles["menu"]}>
        <button
          type="button"
          className={clsx(styles["menu__btn"], {
            [styles.active]: menuOpen,
          })}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <HamburgerIcon state={menuOpen} size={32} strokeWidth={6} />
        </button>
        <Activity mode={menuOpen ? "visible" : "hidden"}>
          <Navigation />
        </Activity>
      </div>
      <a href="#" className={styles.logo}>
        <LogoIcon size={48} />
      </a>
      <button type="button" className={styles.search}>
        <SearchIcon strokeWidth={1.75} />
      </button>
      <button type="button" className={styles.bookmark}>
        <BookmarkIcon strokeWidth={1.75} />
      </button>
    </header>
  );
};

const SvgComponent = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
  >
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <circle cx={12} cy={12} r={4} />
  </svg>
);
