"use client";
import { ChevronsUpDown, Globe } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import styles from "./LanguageSwitch.module.scss";
import { useTranslations } from "next-intl";
import { LANGUAGE } from "../constants/language";
import { useState } from "react";
import { useChangeLocale } from "../hook/useChangeLocale";

const LanguageSwitchMobile = () => {
  const t = useTranslations("language");
  const { locale, changeLocale } = useChangeLocale();
  const [selected, setSelected] = useState<string>(locale);

  return (
    <Select placement="bottom">
      <SelectTrigger className={styles.trigger}>
        <Globe strokeWidth={1} />
        <span className={styles.triggerCode}>{t("language")}</span>
        <ChevronsUpDown strokeWidth={1} />
      </SelectTrigger>
      <SelectContent className={styles.selectContent}>
        {LANGUAGE.map((lang) => (
          <SelectItem
            key={lang.code}
            aria-selected={lang.code == locale}
            onClick={() => {
              setSelected(lang.code);
              changeLocale(lang.code);
            }}
            selected={selected == lang.code}
          >
            {lang.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LanguageSwitchMobile;
