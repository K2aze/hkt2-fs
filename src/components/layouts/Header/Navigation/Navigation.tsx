"use client";
import { MAIN_NAV } from "@/data/navigation";
import styles from "./Navigation.module.scss";
import { useState } from "react";
import PlusIcon from "@/svgPack/PlusIcon";
import ArrowRightIcon from "@/svgPack/ArrowRightIcon";
import { LanguageSwitchMobile } from "@/features/language";
import { AuthStatus } from "@/features/auth";
export const Navigation = () => {
  const [openMap, setOpenMap] = useState<Record<string, boolean>>({
    about: false,
    info: false,
    things: false,
  });
  return (
    <div className={styles["menu__layout"]} data-lenis-prevent>
      <nav className={styles["menu__nav"]}>
        <ul className={styles["nv__list"]}>
          {MAIN_NAV.map((item) => (
            <li className={styles["nv__item"]} key={item.id}>
              {item.children ? (
                <div>
                  <button
                    type="button"
                    className={styles["nv__btn"]}
                    onClick={() =>
                      setOpenMap((prev) => ({
                        ...prev,
                        [item.id]: !prev[item.id],
                      }))
                    }
                  >
                    <span>{item.label}</span>
                    <PlusIcon open={openMap[item.id] == true} />
                  </button>
                  {openMap[item.id] && (
                    <ul className={styles["nv__list--inner"]}>
                      {item.children.map((child) => (
                        <li
                          key={child.id}
                          className={styles["nv__item--inner"]}
                        >
                          <a
                            href={child.href}
                            className={styles["nv__link--inner"]}
                          >
                            {child.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <a href={item.href} className={styles["nv__link"]}>
                  {item.label}
                </a>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles["bottom"]}>
        <LanguageSwitchMobile />

        <AuthStatus />
      </div>
      <div className={styles["cta"]}>
        <button type="button" className={styles["cta__btn"]}>
          Book now
          <ArrowRightIcon
            size={20}
            strokeWidth={2}
            className={styles["cta__btn__svg"]}
          />
        </button>
      </div>
    </div>
  );
};
